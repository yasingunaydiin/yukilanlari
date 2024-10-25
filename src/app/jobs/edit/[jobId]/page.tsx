import { CompanyJobForm } from '@/app/components/CompanyJobForm';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import { JobModel } from '@/models/Job';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import { Link } from 'lucide-react';
import mongoose from 'mongoose';

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function EditJobPage(pageProps: PageProps) {
  const jobId = pageProps.params.jobId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobInfo = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  if (!jobInfo) {
    return 'Bulunamadı';
  }
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return (
      <div className='container mt-6'>
        <Alert>
          <Link href={signInUrl}>
            <AlertDescription>
              <Button className='m-1 text-yellow-400 inline-flex items-center gap-1 h-5 w-12 rounded-md bg-orange-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                Giriş
              </Button>
              yapmanız gerekiyor
            </AlertDescription>
          </Link>
        </Alert>
      </div>
    );
  }
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobInfo.orgId,
  });
  if (oms.data.length === 0) {
    return 'Erişim reddedildi';
  }
  return (
    <div>
      <CompanyJobForm orgId={jobInfo.orgId} jobInfo={jobInfo} />
    </div>
  );
}
