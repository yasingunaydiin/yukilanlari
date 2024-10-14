import JobRow from '@/app/components/JobRow';
import type { Job } from '@/models/Job';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function Jobs({ jobs }: { header: string; jobs: Job[] }) {
  return (
    <Card className='bg-slate-50 p-6 rounded-2xl shadow-md '>
      <h1 className='font-bold mb-4'>Güncel İşler</h1>
      <div className='flex flex-col gap-4'>
        {!jobs?.length && <div>İlan bulunamadı</div>}

        {jobs && jobs.map((job, index) => <JobRow key={index} jobInfo={job} />)}
        {/*If issues happen with this job code, use this older code: {jobs && jobs.map((job) => <JobRow jobInfo={job} />)}*/}
      </div>
      <div className='flex justify-center mt-3'>
        <Button className='bg-yellow-400 text-white rounded-md'>
          <a href={'/all-jobs'}>Daha fazla</a>
        </Button>
        {/* Change the Button into 1 - 2 - 3 from shadcn */}
      </div>
    </Card>
  );
}
