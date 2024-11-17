'use client';
import { transportCategoriesArray } from '@/app/components/CategoriesComponent';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/app/components/ui/select';
import { useState } from 'react';
import { CitiesArray } from './CitiesArray';
import { CountriesArray } from './CountriesArray';
import { UrgencyArray } from './UrgencyArray';
import { vehicleTypeArray } from './VehicleTypeArray';
import { Button } from './ui/button';

interface FilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;

  selectedUrgency: string | null;
  setSelectedUrgency: (urgency: string | null) => void;

  selectedVehicleType: string | null;
  setSelectedVehicleType: (vehicleType: string | null) => void;

  selectedCountryFrom: string | null;
  setSelectedCountryFrom: (countryFrom: string | null) => void;

  selectedCityFrom: string | null;
  setSelectedCityFrom: (cityFrom: string | null) => void;

  selectedCountryTo: string | null;
  setSelectedCountryTo: (countryTo: string | null) => void;

  selectedCityTo: string | null;
  setSelectedCityTo: (cityTo: string | null) => void;
}

export default function JobFilter({
  selectedCategory,
  setSelectedCategory,
  selectedUrgency,
  setSelectedUrgency,
  selectedVehicleType,
  setSelectedVehicleType,
  selectedCountryFrom,
  setSelectedCountryFrom,
  selectedCityFrom,
  setSelectedCityFrom,
  selectedCountryTo,
  setSelectedCountryTo,
  selectedCityTo,
  setSelectedCityTo,
}: FilterProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUrgencyOpen, setIsUrgencyOpen] = useState(false);
  const [isVehicleTypeOpen, setIsVehicleTypeOpen] = useState(false);
  const [isCountryFromOpen, setIsCountryFromOpen] = useState(false);
  const [isCityFromOpen, setIsCityFromOpen] = useState(false);
  const [isCountryToOpen, setIsCountryToOpen] = useState(false);
  const [isCityToOpen, setIsCityToOpen] = useState(false);
  // I literally had to add these stupid usestate stuff to open and close dropdowns because i couldnt fix a dumb error inside <SelectItem>. I had to use a <Button> instead otherwise I couldnt deploy it.

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        {/* Select Category */}
        <Select
          value={selectedCategory || ''}
          onValueChange={(value) => {
            setSelectedCategory(value || '');
            setIsCategoryOpen(false);
          }}
          open={isCategoryOpen}
          onOpenChange={setIsCategoryOpen}
        >
          <SelectTrigger
            className='flex justify-start gap-1 w-full text-gray-500'
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            {selectedCategory || 'Kategori'}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <Button
                className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                onClick={() => {
                  setSelectedCategory('');
                  setIsCategoryOpen(false);
                }}
              >
                Tümünü Göster
              </Button>
              {transportCategoriesArray.map(({ value, emoji }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='hover:bg-gray-100'
                  onClick={() => setIsCategoryOpen(false)}
                >
                  {emoji} {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select Urgency */}
        <Select
          value={selectedUrgency || ''}
          onValueChange={(value) => {
            setSelectedUrgency(value || '');
            setIsUrgencyOpen(false);
          }}
          open={isUrgencyOpen}
          onOpenChange={setIsUrgencyOpen}
        >
          <SelectTrigger
            className='flex justify-start gap-1 w-full text-gray-500'
            onClick={() => setIsUrgencyOpen(!isUrgencyOpen)}
          >
            {selectedUrgency || 'Aciliyet'}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <Button
                className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                onClick={() => {
                  setSelectedUrgency('');
                  setIsUrgencyOpen(false);
                }}
              >
                Tümünü Göster
              </Button>
              {UrgencyArray.map(({ value, emoji }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='hover:bg-gray-100'
                  onClick={() => setIsUrgencyOpen(false)}
                >
                  {emoji} {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select Vehicle Type */}
        <Select
          value={selectedVehicleType || ''}
          onValueChange={(value) => {
            setSelectedVehicleType(value || '');
            setIsVehicleTypeOpen(false);
          }}
          open={isVehicleTypeOpen}
          onOpenChange={setIsVehicleTypeOpen}
        >
          <SelectTrigger
            className='flex justify-start gap-1 w-full text-gray-500'
            onClick={() => setIsVehicleTypeOpen(!isVehicleTypeOpen)}
          >
            {selectedVehicleType || 'Araç Tipi'}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <Button
                className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                onClick={() => {
                  setSelectedVehicleType('');
                  setIsVehicleTypeOpen(false);
                }}
              >
                Tümünü Göster
              </Button>
              {vehicleTypeArray.map(({ value, emoji }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='hover:bg-gray-100'
                  onClick={() => setIsVehicleTypeOpen(false)}
                >
                  {emoji} {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='w-full gap-2 flex flex-col'>
          {/* Select Country From */}
          <Select
            value={selectedCountryFrom || ''}
            onValueChange={(value) => {
              setSelectedCountryFrom(value || '');
              setIsCountryFromOpen(false);
            }}
            open={isCountryFromOpen}
            onOpenChange={(open) => setIsCountryFromOpen(open)}
          >
            <SelectTrigger
              onClick={() => setIsCountryFromOpen(!isCountryFromOpen)}
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCountryFrom || 'Hangi Ülkeden?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCountryFrom('');
                    setIsCountryFromOpen(false);
                  }}
                >
                  Tümünü Göster
                </Button>
                {CountriesArray.map(({ name, emoji }) => (
                  <SelectItem
                    key={name}
                    value={name}
                    className='hover:bg-gray-100'
                    onClick={() => setIsCountryFromOpen(false)}
                  >
                    {emoji} {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Select City From */}
          <Select
            value={selectedCityFrom || ''}
            onValueChange={(value) => {
              setSelectedCityFrom(value || '');
              setIsCityFromOpen(false);
            }}
            open={isCityFromOpen}
            onOpenChange={(open) => setIsCityFromOpen(open)}
          >
            <SelectTrigger
              onClick={() => setIsCityFromOpen(!isCityFromOpen)}
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCityFrom || 'Hangi Şehirden?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCityFrom('');
                    setIsCityFromOpen(false);
                  }}
                >
                  Tümünü Göster
                </Button>
                {CitiesArray.map(({ cities }) =>
                  cities.map(({ name }) => (
                    <SelectItem
                      key={name}
                      value={name}
                      className='hover:bg-gray-100'
                      onClick={() => setIsCityFromOpen(false)}
                    >
                      {name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='w-full gap-2 flex flex-col'>
          {/* Select Country To */}
          <Select
            value={selectedCountryTo || ''}
            onValueChange={(value) => {
              setSelectedCountryTo(value || '');
              setIsCountryToOpen(false);
            }}
            open={isCountryToOpen}
            onOpenChange={(open) => setIsCountryToOpen(open)}
          >
            <SelectTrigger
              onClick={() => setIsCountryToOpen(!isCountryToOpen)}
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCountryTo || 'Hangi Ülkeye?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCountryTo('');
                    setIsCountryToOpen(false);
                  }}
                >
                  Tümünü Göster
                </Button>
                {CountriesArray.map(({ name, emoji }) => (
                  <SelectItem
                    key={name}
                    value={name}
                    className='hover:bg-gray-100'
                    onClick={() => setIsCountryToOpen(false)}
                  >
                    {emoji} {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Select City To */}
          <Select
            value={selectedCityTo || ''}
            onValueChange={(value) => {
              setSelectedCityTo(value || '');
              setIsCityToOpen(false);
            }}
            open={isCityToOpen}
            onOpenChange={(open) => setIsCityToOpen(open)}
          >
            <SelectTrigger
              onClick={() => setIsCityToOpen(!isCityToOpen)}
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCityTo || 'Hangi Şehire?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCityTo('');
                    setIsCityToOpen(false);
                  }}
                >
                  Tümünü Göster
                </Button>
                {CitiesArray.map(({ cities }) =>
                  cities.map(({ name }) => (
                    <SelectItem
                      key={name}
                      value={name}
                      className='hover:bg-gray-100'
                      onClick={() => setIsCityToOpen(false)}
                    >
                      {name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
