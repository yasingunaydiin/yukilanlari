import { connectToDB } from '@/lib/dbConnect';
import { ChauffeurModel } from '@/models/Chauffeur';
import { CompanyModel } from '@/models/Company';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function CompanyListPage() {
  // Automatically fetch authenticated user info using WorkOS authentication
  const { user } = await withAuth();

  // If the user is not authenticated, show a message to log in
  if (!user) {
    return <p>Please log in to view your organizations.</p>;
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
      id: mongoCompany._id.toString(), // Convert the MongoDB ObjectId to a string
      name: mongoCompany.newCompanyContactName, // Use the contact name as the display name
    }));

    // Map the MongoDB company documents to a structure suitable for the frontend
    chauffeur = mongoChauffeurs.map((mongoChauffeur) => ({
      id: mongoChauffeur._id.toString(), // Convert the MongoDB ObjectId to a string
      name: mongoChauffeur.newChauffeurContactName, // Use the contact name as the display name
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
      <h1 className='text-3xl font-bold'>Şirketleriniz</h1>
      <ul className='space-y-4'>
        {companies.length > 0 ? (
          // If companies exist, map over them and render each company in a list
          companies.map((company) => (
            <li key={company.id} className='p-4 border rounded-md'>
              <h2 className='text-xl font-semibold'>{company.name}</h2>
            </li>
          ))
        ) : (
          // If there are no companies, display a message
          <p>Hiçbir kuruluş oluşturmadınız.</p>
          // Add a button that says "kurun" which leads them to new-company
        )}
      </ul>
      <h1 className='text-3xl font-bold'>Sürücüleriniz</h1>
      <ul className='space-y-4'>
        {chauffeur.length > 0 ? (
          // If chauffeur exist, map over them and render each chauffeur in a list
          chauffeur.map((chauffeur) => (
            <li key={chauffeur.id} className='p-4 border rounded-md'>
              <h2 className='text-xl font-semibold'>{chauffeur.name}</h2>
            </li>
          ))
        ) : (
          // If there are no companies, display a message
          <p>Hiçbir sürücü oluşturmadınız.</p>
          // Add a button that says "kurun" which leads them to new-chauffeur
        )}
      </ul>
    </div>
  );
}
