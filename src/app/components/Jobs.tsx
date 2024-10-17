import JobRow from '@/app/components/JobRow';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/components/ui/pagination';
import type { Job } from '@/models/Job';
import { Card } from './ui/card';

export default function Jobs({ jobs }: { header: string; jobs: Job[] }) {
  return (
    <Card className='bg-slate-50 p-6 rounded-2xl shadow-md '>
      <h1 className='font-bold mb-4'>Güncel İlanlar</h1>
      <div className='flex flex-col gap-4'>
        {!jobs?.length && <div>İlan bulunamadı</div>}

        {jobs && jobs.map((job, index) => <JobRow key={index} jobInfo={job} />)}
        {/*If issues happen with this job code, use this older code: {jobs && jobs.map((job) => <JobRow jobInfo={job} />)}*/}
      </div>
      <div className='flex justify-center mt-3'>
        <Pagination className='container'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={'/all-jobs'}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={'/all-jobs'}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={'/all-jobs'} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
}
