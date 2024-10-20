'use client';

import CitySelect from '@/app/components/EuropeanCities';
import CountrySelect from '@/app/components/EuropeanCountries';
import TransportCategories from '@/app/components/TransportCategories';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import { Textarea } from '@/app/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Job } from '@/models/Job';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronDown, Loader2 } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { saveJobAction } from '../actions/jobActions';
import UrgencyComponent from './UrgencyComponent';

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
  const [date, setDate] = useState<Date | undefined>(
    jobInfo?.jobDate ? new Date(jobInfo.jobDate) : undefined
  );

  async function handleSaveJob(data: FormData) {
    data.set('countryFrom', countryFrom ?? '');
    data.set('cityFrom', cityFrom ?? '');
    data.set('countryTo', countryTo ?? '');
    data.set('cityTo', cityTo ?? '');
    data.set('orgId', orgId);
    if (date) {
      data.set('jobDate', date.toISOString());
    } else {
      data.delete('jobDate');
    }
    const jobInfo = await saveJobAction(data);
    redirect(`/jobs/${jobInfo.orgId}`);
  }

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function navigate() {
    startTransition(() => {
      router.push('/');
    });
  }

  return (
    <form action={handleSaveJob} className='container max-w-6xl mx-auto mt-6'>
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
                placeholder='E-mail (Örnek: mehmet@gmail.com)'
                className='flex-1'
                defaultValue={jobInfo?.contactEmail || ''}
                required
              />
              <Input
                name='contactPhone'
                type='tel'
                placeholder='Telefon Numarası (Örnek: 0541 123 45 67)'
                className='flex-1'
                defaultValue={jobInfo?.contactPhone || ''}
                required
              />
            </div>
          </div>

          <Input
            name='title'
            placeholder='Başlık girin'
            defaultValue={jobInfo?.title || ''}
            required
          />
          <Input
            name='tonaj'
            placeholder='Tonaj girin'
            defaultValue={jobInfo?.tonaj || ''}
            required
          />
          <TransportCategories />
          <UrgencyComponent />
          <div className='flex flex-col gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-auto justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Tarih seçin</span>}
                  <ChevronDown className='text-gray-400 ml-2 h-4 w-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={tr}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Textarea
            name='description'
            placeholder='Açıklama girin'
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
        <Button className='bg-yellow-400' type='submit' onClick={navigate}>
          Oluştur
          {isPending && <Loader2 className='ml-2 mr-2 h-4 w-4 animate-spin' />}
        </Button>
      </div>
    </form>
  );
}
