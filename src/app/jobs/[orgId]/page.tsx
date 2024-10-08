import DeleteOrganization from '@/app/components/DeleteOrganization'; // Import the new component
import Jobs from '@/app/components/Jobs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { connectToDB } from '@/lib/dbConnect';
import { Company, CompanyModel } from '@/models/Company';
import { Job, JobModel, addOrgAndUserData } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { Facebook, Globe, Mail, Map, Phone, User } from 'lucide-react';

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage({ params }: PageProps) {
  await connectToDB();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const { user } = await withAuth();

  const org = await workos.organizations.getOrganization(params.orgId);

  // Fetch jobs associated with the organization
  const jobsInfo = await JobModel.find({ orgId: org.id }).lean();
  const jobsWithData = await addOrgAndUserData(jobsInfo as Job[], user);

  // Fetch company details
  const companyDetails = (await CompanyModel.findOne({
    organizationId: org.id,
  }).lean()) as Company | null;

  return (
    <div className='container my-6 max-w-3xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>{org.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-semibold mb-2'>İletişim Bilgileri</h2>
              {companyDetails ? (
                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <User className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span className='capitalize'>
                      {companyDetails.newCompanyContactName}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Mail className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span>{companyDetails.newCompanyEmail}</span>
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span>{companyDetails.newCompanyPhone}</span>
                  </div>
                  <div className='flex items-center'>
                    <Map className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span>{companyDetails.newCompanyLocation}</span>
                  </div>
                  {companyDetails.newCompanyWebsite && ( //If the user has not added a website
                    <div className='flex items-center'>
                      <Globe className='w-5 h-5 mr-2 text-muted-foreground' />
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
                  {companyDetails.newCompanySocialFacebook && ( //If the user has not added a website
                    <div className='flex items-center'>
                      <Facebook className='w-5 h-5 mr-2 text-muted-foreground' />
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
                <p>Şirket bilgileri şu anda mevcut değil.</p>
              )}
            </div>
          </div>
          <div className='mt-6'>
            <DeleteOrganization organizationId={org.id} />
          </div>
        </CardContent>
      </Card>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>
          {org.name} tarafından paylaşılan işler
        </h2>
        <Jobs
          jobs={jobsWithData}
          header={`${org.name} tarafından paylaşılan işler`}
        />
      </div>
    </div>
  );
}
