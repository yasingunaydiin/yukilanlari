import { connectToDB } from '@/lib/dbConnect';
import { ChauffeurModel } from '@/models/Chauffeur';
import { CompanyModel } from '@/models/Company';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';

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

  // Render the company list or a message if there are no companies
  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <ul className='space-y-4 m-5'>
        <h1 className='text-3xl font-bold'>Şirketleriniz</h1>
        {companies.length > 0 ? (
          // If companies exist, map over them and render each company in a list
          companies.map((company) => (
            <li key={company.id} className='p-4 border rounded-md'>
              <h2 className='text-xl font-semibold'>{company.name}</h2>
            </li>
          ))
        ) : (
          // If there are no companies, display a message
          <Alert>
            <AlertDescription>
              Şirket oluşturmadınınız.
              <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                <Link href={'new-company'}>Şirket Oluşturun</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </ul>

      <ul className='space-y-4 m-5'>
        <h1 className='text-3xl font-bold'>Sürücüleriniz</h1>
        {chauffeur.length > 0 ? (
          // If chauffeur exist, map over them and render each chauffeur in a list
          chauffeur.map((chauffeur) => (
            <li key={chauffeur.id} className='p-4 border rounded-md'>
              <h2 className='text-xl font-semibold'>{chauffeur.name}</h2>
            </li>
          ))
        ) : (
          // If there are no chauffeurs, display a message
          <Alert>
            <AlertDescription>
              Sürücü oluşturmadın.
              <Button className='m-1 text-orange-400 inline-flex items-center gap-1 h-5 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                <Link href={'new-chauffeur'}>Sürücü Oluştur</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </ul>
    </div>
  );
}
