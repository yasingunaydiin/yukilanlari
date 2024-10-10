import DeleteOrganization from '@/app/components/DeleteOrganization';
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
import { Trucker, TruckerModel } from '@/models/Trucker';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { Facebook, Globe, Mail, Map, Phone, User } from 'lucide-react';

type PageProps = {
  params: {
    orgId: string;
  };
};

type OrgDetails = Company | Trucker | null;

export default async function OrganizationDetailsPage({ params }: PageProps) {
  await connectToDB();

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const { user } = await withAuth();

  const org = await workos.organizations.getOrganization(params.orgId);

  const jobsInfo = await JobModel.find({ orgId: org.id }).lean();

  const jobsWithData = await addOrgAndUserData(jobsInfo as Job[], user);

  const companyDetails = (await CompanyModel.findOne({
    organizationId: org.id,
  }).lean()) as Company | null;

  const truckerDetails = (await TruckerModel.findOne({
    truckerId: org.id,
  }).lean()) as Trucker | null;

  const orgDetails: OrgDetails = companyDetails || truckerDetails;

  // Check if the user is an admin for this organization
  const isAdmin = jobsWithData.some((job) => job.isAdmin);

  const getOrgProperty = (key: string): string | null => {
    if (companyDetails) {
      return (
        (companyDetails[`newCompany${key}` as keyof Company] as string) ?? null
      );
    } else if (truckerDetails) {
      return (
        (truckerDetails[`newTrucker${key}` as keyof Trucker] as string) ?? null
      );
    }
    return null;
  };

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
              {orgDetails ? (
                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <User className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span className='capitalize'>
                      {getOrgProperty('ContactName')}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <Mail className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span>{getOrgProperty('Email')}</span>
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span>{getOrgProperty('Phone')}</span>
                  </div>
                  <div className='flex items-center'>
                    <Map className='w-5 h-5 mr-2 text-muted-foreground' />
                    <span>{getOrgProperty('Location')}</span>
                  </div>
                  {getOrgProperty('Website') && (
                    <div className='flex items-center'>
                      <Globe className='w-5 h-5 mr-2 text-muted-foreground' />
                      <a
                        href={getOrgProperty('Website') || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {getOrgProperty('Website')}
                      </a>
                    </div>
                  )}
                  {getOrgProperty('SocialFacebook') && (
                    <div className='flex items-center'>
                      <Facebook className='w-5 h-5 mr-2 text-muted-foreground' />
                      <a
                        href={getOrgProperty('SocialFacebook') || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {getOrgProperty('SocialFacebook')}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <p>Organizasyon bilgileri şu anda mevcut değil.</p>
              )}
            </div>
          </div>
          <div className='mt-6'>
            <DeleteOrganization
              organizationId={org.id}
              isAdmin={isAdmin}
              orgType={org ? 'trucker' : 'company'} // Dynamically determine the type
            />
          </div>
        </CardContent>
      </Card>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>
          {org.name} tarafından paylaşılan ilanlar
        </h2>
        <Jobs
          jobs={jobsWithData}
          header={`${org.name} tarafından paylaşılan ilanlar`}
        />
      </div>
    </div>
  );
}
