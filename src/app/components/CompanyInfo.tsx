'use server';
import { CardContent } from '@/app/components/ui/card';
import { connectToDB } from '@/lib/dbConnect';
import { Company, CompanyModel } from '@/models/Company';
import { WorkOS } from '@workos-inc/node';
import { Facebook, Globe, Mail, Map, Phone, User } from 'lucide-react';

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyInfo({ params }: PageProps) {
  await connectToDB();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const org = await workos.organizations.getOrganization(params.orgId);

  // Only one to fetch to get the Company details
  const companyDetails = (await CompanyModel.findOne({
    organizationId: org.id,
  }).lean()) as Company | null;

  return (
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
              {companyDetails.newCompanyWebsite && (
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
              {companyDetails.newCompanySocialFacebook && (
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
    </CardContent>
  );
}
