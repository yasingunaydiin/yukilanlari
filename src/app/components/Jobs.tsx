'use client';
import JobRow from '@/app/components/JobRow';
import { ProfileType } from '@/app/types/shared';
import type { Job } from '@/models/Job';
import { Building2, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import JobFilter from './JobFilter';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Jobs({ jobs }: { jobs: Job[] }) {
  const [activeTab, setActiveTab] = useState<ProfileType>('company');

  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(
    null
  );
  const [selectedCountryFrom, setSelectedCountryFrom] = useState<string | null>(
    null
  );
  const [selectedCityFrom, setSelectedCityFrom] = useState<string | null>(null);
  const [selectedCountryTo, setSelectedCountryTo] = useState<string | null>(
    null
  );
  const [selectedCityTo, setSelectedCityTo] = useState<string | null>(null);

  // Filter jobs based on the profile type, selected category, and urgency
  const companyJobs = jobs
    .filter((job) => job.profileType === 'company')

    .filter((job) =>
      selectedCategory ? job.category === selectedCategory : true
    )

    .filter((job) => (selectedUrgency ? job.urgency === selectedUrgency : true))

    .filter((job) =>
      selectedVehicleType ? job.vehicleType === selectedVehicleType : true
    )

    .filter((job) =>
      selectedCountryFrom ? job.countryFrom === selectedCountryFrom : true
    )

    .filter((job) =>
      selectedCityFrom ? job.cityFrom === selectedCityFrom : true
    )

    .filter((job) =>
      selectedCountryTo ? job.countryTo === selectedCountryTo : true
    )

    .filter((job) => (selectedCityTo ? job.cityTo === selectedCityTo : true));

  const chauffeurJobs = jobs
    .filter((job) => job.profileType === 'chauffeur')
    .filter((job) =>
      selectedCategory ? job.category === selectedCategory : true
    )
    .filter((job) => (selectedUrgency ? job.urgency === selectedUrgency : true))

    .filter((job) =>
      selectedVehicleType ? job.vehicleType === selectedVehicleType : true
    )

    .filter((job) =>
      selectedCountryFrom ? job.countryFrom === selectedCountryFrom : true
    )

    .filter((job) =>
      selectedCityFrom ? job.cityFrom === selectedCityFrom : true
    )

    .filter((job) =>
      selectedCountryTo ? job.countryTo === selectedCountryTo : true
    )

    .filter((job) => (selectedCityTo ? job.cityTo === selectedCityTo : true));

  return (
    <Card className='bg-slate-50 p-6 rounded-2xl shadow-md'>
      <CardHeader>
        <CardTitle>Güncel İlanlar</CardTitle>
      </CardHeader>
      <CardContent>
        <JobFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedUrgency={selectedUrgency}
          setSelectedUrgency={setSelectedUrgency}
          selectedVehicleType={selectedVehicleType}
          setSelectedVehicleType={setSelectedVehicleType}
          selectedCountryFrom={selectedCountryFrom}
          setSelectedCountryFrom={setSelectedCountryFrom}
          selectedCityFrom={selectedCityFrom}
          setSelectedCityFrom={setSelectedCityFrom}
          selectedCountryTo={selectedCountryTo}
          setSelectedCountryTo={setSelectedCountryTo}
          selectedCityTo={selectedCityTo}
          setSelectedCityTo={setSelectedCityTo}
        />
      </CardContent>
      <CardContent>
        {/* Tabs for switching between company and chauffeur jobs */}
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
      </CardContent>
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
