'use client';
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

export function JobForm({ orgId, jobInfo }: { orgId: string; jobInfo?: Job }) {
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

  async function handleSaveJob(data: FormData) {
    data.set('countryFrom', countryFrom ?? '');
    data.set('cityFrom', cityFrom ?? '');
    data.set('countryTo', countryTo ?? '');
    data.set('cityTo', cityTo ?? '');
    data.set('orgId', orgId);
    const jobInfo = await saveJobAction(data);
    redirect(`/jobs/${jobInfo.orgId}`);
  }

  return (
    <form action={handleSaveJob} className='container mt-6'>
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
              />
              <Input
                name='contactEmail'
                type='email'
                placeholder='E-mail'
                className='flex-1'
                defaultValue={jobInfo?.contactEmail || ''}
              />
              <Input
                name='contactPhone'
                type='tel'
                placeholder='Telefon Numarası'
                className='flex-1'
                defaultValue={jobInfo?.contactPhone || ''}
              />
            </div>
          </div>
          <Input
            name='title'
            placeholder='Başlık'
            defaultValue={jobInfo?.title || ''}
          />
          <Input
            name='tonaj'
            placeholder='Tonaj'
            defaultValue={jobInfo?.tonaj || ''}
          />
          <TransportCategories defaultValue={jobInfo?.category || ''} />
          <Textarea
            name='description'
            placeholder='Açıklama'
            defaultValue={jobInfo?.description || ''}
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
