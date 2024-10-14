import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';

type Company = {
  id: string;
  name: string;
  // Include other relevant properties
};

export default async function CompanyListPage() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  // Ensure the user is authenticated
  const { user } = await withAuth();

  // Log the authenticated user details for debugging
  console.log('Authenticated User:', user);

  let companies: Company[] = [];

  try {
    // Fetch all organizations for the logged-in user
    const response = await workos.organizations.listOrganizations();
    const allCompanies = response.data; // Adjust based on actual response structure

    // Filter organizations to include only those created by the user
    companies = allCompanies.filter((company) => {
      return company.createdBy === user.id; // Adjust this logic based on how you track organization ownership
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return <p>Error fetching organizations:</p>;
  }

  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold'>Your Organizations</h1>
      <ul className='space-y-4'>
        {companies.length > 0 ? (
          companies.map((company) => (
            <li key={company.id} className='p-4 border rounded-md'>
              <h2 className='text-xl font-semibold'>{company.name}</h2>
              {/* Add more details as needed */}
            </li>
          ))
        ) : (
          <p>You have not created any organizations.</p>
        )}
      </ul>
    </div>
  );
}
