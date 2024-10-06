import Jobs from '@/app/components/Jobs';
import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  const { user } = await withAuth();
  let jobsInfo = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );
  jobsInfo = await addOrgAndUserData(jobsInfo, user);

  return (
    <div>
      <div className='container'>
        <h1 className='text-xl my-6'>{org.name} Jobs</h1>
      </div>
      <Jobs
        jobs={jobsInfo}
        header={org.name + ' Tarafından paylaşılan işler'}
      />
    </div>
  );
}
