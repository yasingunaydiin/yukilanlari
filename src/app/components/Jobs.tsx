'use client';
import JobRow from '@/app/components/JobRow';
import { ProfileType } from '@/app/types/shared';
import type { Job } from '@/models/Job';
import { Building2, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Jobs({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState<ProfileType>('company');

  // Filter jobs based on the profile type
  const companyJobs = jobs.filter((job) => job.profileType === 'company');
  const chauffeurJobs = jobs.filter((job) => job.profileType === 'chauffeur');

  return (
    <Card className='bg-slate-50 p-6 rounded-2xl shadow-md'>
      <h1 className='font-bold mb-4'>Güncel İlanlar</h1>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ProfileType)}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='company'>
            <Building2 className='mr-2 h-5 w-5' />
            Şirketler
          </TabsTrigger>
          <TabsTrigger value='chauffeur'>
            <Truck className='mr-2 h-5 w-5' />
            Şoförler
          </TabsTrigger>
        </TabsList>
        <TabsContent value='company'>
          <ShowJobsList jobs={companyJobs} />
        </TabsContent>
        <TabsContent value='chauffeur'>
          <ShowJobsList jobs={chauffeurJobs} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function ShowJobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className='flex flex-col gap-4 mt-4'>
      {!jobs?.length && (
        <div className='flex items-center flex-col'>
          <span className='m-2'>İlan bulunamadı</span>
          <Link href='/new-listing'>
            <Button className='bg-yellow-400 text-white rounded-lg font-bold'>
              İlan oluşturun
            </Button>
          </Link>
        </div>
      )}
      {jobs && jobs.map((job) => <JobRow key={job._id} jobInfo={job} />)}
    </div>
  );
}
