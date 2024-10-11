import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

const UrgencyComponentArray = [
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' },
  { value: 'Acil', label: 'Acil', emoji: '🚨' },
  { value: 'Bu Hafta', label: 'Bu Hafta', emoji: '📅' },
  { value: 'Bu Ay', label: 'Bu Ay', emoji: '📆' },
  { value: 'Bugün', label: 'Bugün', emoji: '☀️' },
];

const UrgencyComponent = () => {
  return (
    <Select name='urgency' required>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Aciliyet' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {UrgencyComponentArray.sort((a, b) =>
            a.label.localeCompare(b.label)
          ).map(({ value, label, emoji }) => (
            <SelectItem key={value} value={value} className='flex items-center'>
              <span className='mr-2'>{emoji}</span> {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UrgencyComponent;
