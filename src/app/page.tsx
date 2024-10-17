import Hero from '@/app/components/Hero';
import Jobs from '@/app/components/Jobs';
import { connectToDB } from '@/lib/dbConnect';
import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Home() {
  await connectToDB();

  const { user } = await withAuth();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: '-createdAt' }),
    user
  );
  return (
    <>
      <Hero />
      <Jobs header={''} jobs={latestJobs} />
      {/* Add a seperation between Company ads and chauffeur ads */}
    </>
  );
}
