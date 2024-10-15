import { connectToDB } from '@/lib/dbConnect';
import { ChauffeurModel } from '@/models/Chauffeur';
import { CompanyModel } from '@/models/Company';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default async function CompanyListPage() {
  // Automatically fetch authenticated user info using WorkOS authentication
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  // If the user is not authenticated, show a message to log in
  if (!user) {
    return (
      <div className='container mt-6'>
        <Alert>
          <AlertDescription>
            İş veya sürücü ilanlarınızı görmek için
            <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 w-12 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
              <Link href={signInUrl}>Giriş</Link>
            </Button>
            yapın
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Initialize an empty array to store the companies
  let companies = [];
  let chauffeur = [];

  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Fetch companies from MongoDB that were created by the authenticated user
    const mongoCompanies = await CompanyModel.find({
      createdBy: user.id, // Filter by the logged-in user's ID
    }).lean(); // Use `.lean()` to get plain JavaScript objects instead of Mongoose documents idk what this is

    const mongoChauffeurs = await ChauffeurModel.find({
      createdBy: user.id, // Filter by the logged-in user's ID
    }).lean(); // Use `.lean()` to get plain JavaScript objects instead of Mongoose documents idk what this is

    // Map the MongoDB company documents to a structure suitable for the frontend
    companies = mongoCompanies.map((mongoCompany) => ({
      id: String(mongoCompany._id), // Convert the MongoDB ObjectId to a string
      name: mongoCompany.newCompanyContactName, // Display contact name
    }));

    // Map the MongoDB chauffeur documents to a structure suitable for the frontend
    chauffeur = mongoChauffeurs.map((mongoChauffeur) => ({
      id: String(mongoChauffeur._id), // Convert the MongoDB ObjectId to a string
      name: mongoChauffeur.newChauffeurContactName, // Display contact name
    }));
  } catch (error) {
    // If there's an error, log it and display an error message to the user
    console.error('Error fetching companies:', error);
    return (
      <p>
        Şirketler getirilirken hata oluştu. Lütfen daha sonra tekrar deneyin.
      </p>
    );
  }

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === 'active'
  );

  const organizationsNames: { [key: string]: string } = {};
  const chauffeurNames: { [key: string]: string } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  for (const activeMembership of activeOrganizationMemberships) {
    const chauffeur = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    chauffeurNames[chauffeur.id] = chauffeur.name;
  }

  // Render the company list or a message if there are no companies
  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <ul className='space-y-4 m-5'>
        <h1 className='text-3xl font-bold'>Sirketler</h1>
        {companies.length > 0 ? (
          // If company exist, map over them and render each company with one organization
          companies.map((companies, index) => {
            // Get the first organization name (or any specific logic you want)
            const orgName = Object.values(organizationsNames)[index]; // Using index to get the organization

            return (
              <Card key={companies.id} className='p-4'>
                <Link href={''}>
                  <div className='space-y-2'>
                    {orgName && ( // Check if the organization name exists
                      <h1 className='flex items-center text-xl font-bold'>
                        {orgName}
                      </h1>
                    )}
                    <p>{companies.name}</p>
                  </div>
                  <div className='flex gap-2 justify-end'>
                    <button className='inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors duration-300'>
                      <Edit2 className='size-3' />
                      Düzenle
                    </button>
                    <button className='inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors duration-300'>
                      <Trash2 className='size-3' />
                      Sil
                    </button>
                  </div>
                </Link>
              </Card>
            );
          })
        ) : (
          // If there are no chauffeurs, display a message
          <Alert>
            <AlertDescription>
              Sirket oluşturmadınız.
              <Button className='m-1 text-orange-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                <Link href={'new-company'}>Sirket Oluşturun</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </ul>

      <ul className='space-y-4 m-5'>
        <h1 className='text-3xl font-bold'>Sürücüleriniz</h1>
        {chauffeur.length > 0 ? (
          // If chauffeurs exist, map over them and render each chauffeur with one organization
          chauffeur.map((chauffeur, index) => {
            // Get the first organization name (or any specific logic you want)
            const orgName = Object.values(organizationsNames)[index]; // Using index to get the organization

            return (
              <Card key={chauffeur.id} className='p-4'>
                <Link href={''}>
                  <div className='space-y-2'>
                    {orgName && ( // Check if the organization name exists
                      <h1 className='flex items-center text-xl font-bold'>
                        {orgName}
                      </h1>
                    )}
                    <p>{chauffeur.name}</p>
                  </div>
                  <div className='flex gap-2 justify-end'>
                    <button className='inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors duration-300'>
                      <Edit2 className='size-3' />
                      Düzenle
                    </button>
                    <button className='inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:bg-red-100 transition-colors duration-300'>
                      <Trash2 className='size-3' />
                      Sil
                    </button>
                  </div>
                </Link>
              </Card>
            );
          })
        ) : (
          // If there are no chauffeurs, display a message
          <Alert>
            <AlertDescription>
              Sürücü oluşturmadınız.
              <Button className='m-1 text-orange-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                <Link href={'new-chauffeur'}>Sürücü Oluşturun</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </ul>
    </div>
  );
}
