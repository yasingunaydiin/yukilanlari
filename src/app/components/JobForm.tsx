'use client'; // Directive indicating this is a client component
import CitySelect from '@/app/components/EuropeanCities';
import CountrySelect from '@/app/components/EuropeanCountries';
import TransportCategories from '@/app/components/TransportCategories';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import type { Job } from '@/models/Job';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { saveJobAction } from '../actions/jobActions';
import UrgencyComponent from './UrgencyComponent';

export function JobForm({ orgId, jobInfo }: { orgId: string; jobInfo?: Job }) {
  // State variables for tracking the form data and selected country/city information
  const [countryFrom, setCountryFrom] = useState<string | undefined>();
  const [countryTo, setCountryTo] = useState<string | undefined>();
  const [selectedCountryIdFrom, setSelectedCountryIdFrom] = useState<
    number | undefined
  >();
  const [selectedCountryIdTo, setSelectedCountryIdTo] = useState<
    number | undefined
  >();
  const [cityFrom, setCityFrom] = useState<string | undefined>();
  const [cityTo, setCityTo] = useState<string | undefined>();

  // Function to handle form submission and save the job data
  async function handleSaveJob(data: FormData) {
    data.set('countryFrom', countryFrom ?? '');
    data.set('cityFrom', cityFrom ?? '');
    data.set('countryTo', countryTo ?? '');
    data.set('cityTo', cityTo ?? '');
    data.set('orgId', orgId); // Set the organization ID
    const jobInfo = await saveJobAction(data); // Call the save action
    redirect(`/jobs/${jobInfo.orgId}`); // Redirect to the job's organization page after saving
  }

  return (
    <form action={handleSaveJob} className='container mt-6'>
      {/* Hidden input for job ID (used only when updating an existing job) */}
      {jobInfo && <input type='hidden' name='id' value={jobInfo?._id} />}

      <Card>
        <CardContent className='flex flex-col gap-4 p-5'>
          <div className='space-y-2'>
            <Label>İletişim</Label>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Input
                name='contactName'
                placeholder='İsim'
                className='flex-1'
                defaultValue={jobInfo?.contactName || ''}
                required
              />
              <Input
                name='contactEmail'
                type='email'
                placeholder='E-mail'
                className='flex-1'
                defaultValue={jobInfo?.contactEmail || ''}
                required
              />
              <Input
                name='contactPhone'
                type='tel'
                placeholder='Telefon Numarası'
                className='flex-1'
                defaultValue={jobInfo?.contactPhone || ''}
                required
              />
            </div>
          </div>

          <Input
            name='title'
            placeholder='Başlık'
            defaultValue={jobInfo?.title || ''}
            required
          />
          <Input
            name='tonaj'
            placeholder='Tonaj'
            defaultValue={jobInfo?.tonaj || ''}
            required
          />
          <TransportCategories />
          <UrgencyComponent />
          <Textarea
            name='description'
            placeholder='Açıklama'
            defaultValue={jobInfo?.description || ''}
            required
          />

          <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-2 flex-1'>
                <Label>Nereden</Label>
                <CountrySelect
                  setCountry={(countryId, countryName) => {
                    setCountryFrom(countryName);
                    setSelectedCountryIdFrom(countryId);
                  }}
                />
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <Label>Nereye</Label>
                <CountrySelect
                  setCountry={(countryId, countryName) => {
                    setCountryTo(countryName);
                    setSelectedCountryIdTo(countryId);
                  }}
                />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-2 flex-1'>
                <Label>Şehir (Nereden)</Label>
                <CitySelect
                  selectedCountryId={selectedCountryIdFrom}
                  setCity={setCityFrom}
                />
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <Label>Şehir (Nereye)</Label>
                <CitySelect
                  selectedCountryId={selectedCountryIdTo}
                  setCity={setCityTo}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='flex justify-center p-4'>
        <Button type='submit'>Kaydet</Button>
      </div>
    </form>
  );
}
