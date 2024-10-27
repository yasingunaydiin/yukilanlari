// page.tsx
import Hero from '@/app/components/Hero';
import ShowMoreJobs from '@/app/components/ShowMoreJobs'; // Import the JobsList component
import { connectToDB } from '@/lib/dbConnect';
import { addOrgAndUserData, JobModel } from '@/models/Job';
import { withAuth } from '@workos-inc/authkit-nextjs';
import FAQ from './components/FAQ';

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
      <ShowMoreJobs initialJobs={latestJobs} />
      <FAQ />
    </>
  );
}
