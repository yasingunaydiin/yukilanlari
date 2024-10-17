import Jobs from '@/app/components/Jobs';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
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
      <form className='flex gap-2 mt-14 max-w-xl mx-auto'>
        <Input
          type='search'
          className='border border-gray-300 w-full py-2 px-3 rounded-md '
          placeholder='Ara...'
        />
        <Button className='bg-yellow-400 text-white py-2 px-4 rounded-md'>
          Ara
        </Button>
      </form>
      <div className='mt-5'>
        <Jobs header={''} jobs={latestJobs} />
        {/* Add a seperation between Company ads and chauffeur ads */}
      </div>
    </>
  );
}
