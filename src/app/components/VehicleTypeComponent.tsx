import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { BusFront } from 'lucide-react';

const vehicleTypeArray = [
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' },
  { value: 'Kırkayak', label: 'Kırkayak', emoji: '🚛' },
  { value: 'Kamyon', label: 'Kamyon', emoji: '🚚' },
  { value: 'Tır', label: 'Tır', emoji: '🚛' },
  { value: 'Tenteli Araç', label: 'Tenteli Araç', emoji: '🛻' },
  { value: 'Dorse', label: 'Dorse', emoji: '🚛' },
  { value: 'Frigo', label: 'Frigo', emoji: '🧊' },
  { value: 'Kamyonet', label: 'Kamyonet', emoji: '🚐' },
  { value: 'Minivan', label: 'Minivan', emoji: '🚐' },
  { value: 'Panelvan', label: 'Panelvan', emoji: '🚐' },
  { value: 'Lowbed', label: 'Lowbed', emoji: '🛻' },
  { value: 'Çekici', label: 'Çekici', emoji: '🚜' },
  { value: 'Yükleyici', label: 'Yükleyici', emoji: '🚜' },
  { value: 'Damperli Kamyon', label: 'Damperli Kamyon', emoji: '🚛' },
  { value: 'Tanker', label: 'Tanker', emoji: '🛢️' },
  { value: 'Nakliye Aracı', label: 'Nakliye Aracı', emoji: '🚛' },
  { value: 'Flatbed', label: 'Flatbed', emoji: '🛻' },
  { value: 'Lowloader', label: 'Lowloader', emoji: '🛻' },
  { value: 'Konteyner Taşıyıcı', label: 'Konteyner Taşıyıcı', emoji: '🚛' },
  { value: 'Açık Kasa', label: 'Açık Kasa', emoji: '🚚' },
  { value: 'İzotermal', label: 'İzotermal', emoji: '🧊' },
];

const VehicleTypeComponent = () => {
  return (
    <Select name='vehicleType' required>
      <SelectTrigger className='flex justify-start gap-1 w-full text-gray-500'>
        <BusFront className='mr-2 h-4 w-4' />
        <SelectValue placeholder='Araç tipi seçin' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {vehicleTypeArray
            .sort((a, b) => a.label.localeCompare(b.label))
            .map(({ value, label, emoji }) => (
              <SelectItem
                key={value}
                value={value}
                className='flex items-center'
              >
                <span className='mr-2'>{emoji}</span> {label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default VehicleTypeComponent;
