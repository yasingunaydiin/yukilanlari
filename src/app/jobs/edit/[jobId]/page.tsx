import { JobForm } from '@/app/components/JobForm';
import { JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
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
    // If no job
    return 'Bulunamadı';
  }
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    // If user hasnt logged in
    return 'Giriş yapmanız gerekiyor';
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
      <JobForm orgId={jobInfo.orgId} jobInfo={jobInfo} />
    </div>
  );
}
