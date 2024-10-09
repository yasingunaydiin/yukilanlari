'use server';
import DeleteOrganization from '@/app/components/DeleteOrganization'; // Import the DeleteOrganization component
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'; // Import UI components for card layout
import { connectToDB } from '@/lib/dbConnect'; // Import the database connection utility
import { Company, CompanyModel } from '@/models/Company'; // Import types and models for Company data
import { WorkOS } from '@workos-inc/node'; // Import WorkOS library for authentication and organization management
import { Facebook, Globe, Mail, Map, Phone, User } from 'lucide-react'; // Import icons from Lucide React for visual representation

type PageProps = {
  params: {
    orgId: string; // Define the expected shape of props, which includes a string for the organization ID
  };
};

export default async function CompanyInfo({ params }: PageProps) {
  // Connect to the database to ensure access to organization data
  await connectToDB();
  const workos = new WorkOS(process.env.WORKOS_API_KEY); // Initialize the WorkOS client using the API key

  // Retrieve organization details using the WorkOS client and the provided organization ID
  const org = await workos.organizations.getOrganization(params.orgId);

  // Fetch company details from the CompanyModel in the database using the organization ID
  const companyDetails = (await CompanyModel.findOne({
    organizationId: org.id,
  }).lean()) as Company | null; // Cast the result to the Company type or null if not found

  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <Card className='shadow-md rounded-xl'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>{org.name}</CardTitle>{' '}
          {/* Display organization name as card title */}
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-semibold mb-2'>İletişim Bilgileri</h2>{' '}
              {companyDetails /* Conditional based on whether company details are available */ ? (
                <div className='space-y-2'>
                  {/* Display each piece of company contact info with corresponding icons */}
                  <div className='flex items-center'>
                    <User className='w-5 h-5 mr-2 text-muted-foreground' />{' '}
                    <span className='capitalize'>
                      {companyDetails.newCompanyContactName}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Mail className='w-5 h-5 mr-2 text-muted-foreground' />{' '}
                    <span>{companyDetails.newCompanyEmail}</span>
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 mr-2 text-muted-foreground' />{' '}
                    <span>{companyDetails.newCompanyPhone}</span>
                  </div>
                  <div className='flex items-center'>
                    <Map className='w-5 h-5 mr-2 text-muted-foreground' />{' '}
                    <span>{companyDetails.newCompanyLocation}</span>
                  </div>

                  {/* Conditional for website link if it exists */}
                  {companyDetails.newCompanyWebsite && (
                    <div className='flex items-center'>
                      <Globe className='w-5 h-5 mr-2 text-muted-foreground' />{' '}
                      <a
                        href={companyDetails.newCompanyWebsite}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {companyDetails.newCompanyWebsite}
                      </a>
                    </div>
                  )}

                  {/* Conditional for social media link if it exists */}
                  {companyDetails.newCompanySocialFacebook && (
                    <div className='flex items-center'>
                      <Facebook className='w-5 h-5 mr-2 text-muted-foreground' />{' '}
                      <a
                        href={companyDetails.newCompanySocialFacebook}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {companyDetails.newCompanySocialFacebook}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <p>
                  Şirket bilgileri şu anda mevcut değil.
                </p> /* Message if no company details are found */
              )}
            </div>
          </div>
          {/* Render the DeleteOrganization component to allow users to delete the organization */}
          <div className='mt-6'>
            <DeleteOrganization organizationId={org.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
