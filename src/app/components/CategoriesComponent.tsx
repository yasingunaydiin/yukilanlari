import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Box } from 'lucide-react';

const transportCategoriesArray = [
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' },
  { value: 'Araç Kurtarma', label: 'Araç Kurtarma', emoji: '🚗' },
  { value: 'Gıda', label: 'Gıda', emoji: '🍽️' },
  { value: 'Giysi', label: 'Giysi', emoji: '👗' },
  { value: 'Mobilya', label: 'Mobilya', emoji: '🛋️' },
  { value: 'Elektronik', label: 'Elektronik', emoji: '💻' },
  { value: 'İnşaat Malzemeleri', label: 'İnşaat Malzemeleri', emoji: '🏗️' },
  { value: 'Kimyasallar', label: 'Kimyasallar', emoji: '⚗️' },
  { value: 'Otomotiv', label: 'Otomotiv', emoji: '🚗' },
  { value: 'Makine', label: 'Makine', emoji: '🛠️' },
  { value: 'Kitap', label: 'Kitap', emoji: '📚' },
  { value: 'Spor Eşyaları', label: 'Spor Eşyaları', emoji: '⚽' },
  { value: 'İnşaat Ekipmanları', label: 'İnşaat Ekipmanları', emoji: '🧰' },
  { value: 'Bitki', label: 'Bitki', emoji: '🌱' },
  { value: 'Çiçek', label: 'Çiçek', emoji: '🌸' },
];

const TransportCategories = () => {
  return (
    <Select name='category' required>
      <SelectTrigger className='flex justify-start gap-1 w-full text-gray-500'>
        <Box className='mr-2 h-4 w-4' />
        <SelectValue placeholder='Kategori seçin' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {transportCategoriesArray
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

export default TransportCategories;
