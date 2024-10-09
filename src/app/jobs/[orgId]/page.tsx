import CompanyInfo from '@/app/components/CompanyInfo'; // Import the CompanyInfo component to display organization details
import Jobs from '@/app/components/Jobs'; // Import the Jobs component to list job postings
import { connectToDB } from '@/lib/dbConnect'; // Import the database connection utility
import { Job, JobModel, addOrgAndUserData } from '@/models/Job'; // Import types and models for managing Job data
import { withAuth } from '@workos-inc/authkit-nextjs'; // Import authentication helper for securing the page
import { WorkOS } from '@workos-inc/node'; // Import the WorkOS library for organization management

// Define the structure of expected props, which includes an organization ID (orgId)
type PageProps = {
  params: {
    orgId: string; // The orgId string parameter that identifies the organization
  };
};

export default async function CompanyJobsPage({ params }: PageProps) {
  // Connect to the database to ensure access to the necessary job and organization data
  await connectToDB();

  // Initialize the WorkOS client using the API key from environment variables
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  // Retrieve authenticated user data using the WorkOS `withAuth` helper
  const { user } = await withAuth();

  // Fetch the organization's details using the organization ID provided in the URL params
  const org = await workos.organizations.getOrganization(params.orgId);

  // Retrieve the list of jobs associated with the organization from the database
  const jobsInfo = await JobModel.find({ orgId: org.id }).lean();

  // Add extra data such as organization and user details to each job using a helper function
  const jobsWithData = await addOrgAndUserData(jobsInfo as Job[], user);

  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <CompanyInfo params={{ orgId: params.orgId }} />

      {/* Section for displaying the list of jobs shared by the organization */}
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>
          {org.name} tarafından paylaşılan işler{' '}
        </h2>

        {/* Render the Jobs component and pass the jobsWithData as props */}
        <Jobs jobs={jobsWithData} header={''} />
      </div>
    </div>
  );
}
