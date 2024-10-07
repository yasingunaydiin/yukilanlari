import JobRow from '@/app/components/JobRow';
import type { Job } from '@/models/Job';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function Jobs({
  header,
  jobs,
}: {
  header: string;
  jobs: Job[];
}) {
  return (
    <Card className='bg-slate-50 p-6 rounded-2xl'>
      <h1 className='font-bold mb-4'>{header || 'Güncel İşler'}</h1>
      <div className='flex flex-col gap-4'>
        {!jobs?.length && <div>İş bulunamadı</div>}
        {jobs && jobs.map((job) => <JobRow jobInfo={job} />)}
        {/*Could also use this if there are issues deploying or buuldig: {jobs && jobs.map((job, index) => <JobRow key={index} jobInfo={job} />)}*/}
      </div>
      <div className='flex justify-center mt-3'>
        <Button className='bg-yellow-400 text-white rounded-md'>
          Daha fazla
        </Button>
      </div>
    </Card>
  );
}
