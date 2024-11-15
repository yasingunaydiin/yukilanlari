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

      <div className='sm:flex sm:gap-2 sm:flex-row flex gap-2'>
        <div className='w-full gap-2 flex flex-col'>
          {/* Select Country From */}
          <Select
            value={selectedCountryFrom || ''}
            onValueChange={(value) => {
              setSelectedCountryFrom(value || '');
              setIsCountryFromOpen(false); // Close the dropdown after selection
            }} // Set it to null on clearing
            open={isCountryFromOpen} // Control dropdown visibility
            onOpenChange={(open) => setIsCountryFromOpen(open)} // Update dropdown state on toggle
          >
            <SelectTrigger
              onClick={() => setIsCountryFromOpen(!isCountryFromOpen)} // Toggle dropdown visibility
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCountryFrom ? selectedCountryFrom : 'Hangi Ülkeden?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCountryFrom('');
                    setIsCountryFromOpen(false); // Close dropdown after clicking
                  }}
                >
                  Tümünü Göster
                </Button>

                {CountriesArray.map(({ name, emoji }) => (
                  <SelectItem
                    key={name}
                    value={name}
                    className='hover:bg-gray-100'
                    onClick={() => setIsCountryFromOpen(false)} // Close dropdown after clicking
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
              setIsCityFromOpen(false); // Close the dropdown after selection
            }} // Set it to null on clearing
            open={isCityFromOpen} // Control dropdown visibility
            onOpenChange={(open) => setIsCityFromOpen(open)} // Update dropdown state on toggle
          >
            <SelectTrigger
              onClick={() => setIsCityFromOpen(!isCityFromOpen)} // Toggle dropdown visibility
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCityFrom ? selectedCityFrom : 'Hangi Şehirden?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCityFrom('');
                    setIsCityFromOpen(false); // Close dropdown after clicking
                  }}
                >
                  Tümünü Göster
                </Button>

                {/* Loop through CitiesArray and then cities to get each city name */}
                {CitiesArray.map(({ cities }) =>
                  cities.map(({ name }) => (
                    <SelectItem
                      key={name}
                      value={name}
                      className='hover:bg-gray-100'
                      onClick={() => setIsCityFromOpen(false)} // Close dropdown after clicking
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
              setIsCountryToOpen(false); // Close the dropdown after selection
            }} // Set it to null on clearing
            open={isCountryToOpen} // Control dropdown visibility
            onOpenChange={(open) => setIsCountryToOpen(open)} // Update dropdown state on toggle
          >
            <SelectTrigger
              onClick={() => setIsCountryToOpen(!isCountryToOpen)} // Toggle dropdown visibility
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCountryTo ? selectedCountryTo : 'Hangi Ülkeye?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCountryTo('');
                    setIsCountryToOpen(false); // Close dropdown after clicking
                  }}
                >
                  Tümünü Göster
                </Button>
                {CountriesArray.map(({ name, emoji }) => (
                  <SelectItem
                    key={name}
                    value={name}
                    className='hover:bg-gray-100'
                    onClick={() => setIsCountryToOpen(false)} // Close dropdown after clicking
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
              setIsCityToOpen(false); // Close the dropdown after selection
            }} // Set it to null on clearing
            open={isCityToOpen} // Control dropdown visibility
            onOpenChange={(open) => setIsCityToOpen(open)} // Update dropdown state on toggle
          >
            <SelectTrigger
              onClick={() => setIsCityToOpen(!isCityToOpen)} // Toggle dropdown visibility
              className='flex justify-start gap-1 w-full text-gray-500'
            >
              {selectedCityTo ? selectedCityTo : 'Hangi Şehire?'}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Button
                  className='hover:bg-gray-100 flex justify-start bg-white text-black w-full'
                  onClick={() => {
                    setSelectedCityTo('');
                    setIsCityToOpen(false); // Close dropdown after clicking
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
                      onClick={() => setIsCityToOpen(false)} // Close dropdown after clicking
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
