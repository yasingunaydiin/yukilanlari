import Jobs from '@/app/components/Jobs';
import { connectToDB } from '@/lib/dbConnect';
import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Home() {
  await connectToDB();

  const { user } = await withAuth();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 10, sort: '-createdAt' }),
    user
  );
  return (
    <>
      <div className='mt-5'>
        <Jobs header={''} jobs={latestJobs} />
      </div>
    </>
  );
}
