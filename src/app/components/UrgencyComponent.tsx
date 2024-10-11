import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

const UrgencyComponentArray = [
  { value: 'Diğer', label: 'Diğer', emoji: '🏷️' }, // Tag icon
  { value: 'Acil', label: 'Acil', emoji: '🚨' }, // Police car light (Urgent)
  { value: 'Bu Hafta', label: 'Bu Hafta', emoji: '📅' }, // Calendar (This Week)
  { value: 'Bu Ay', label: 'Bu Ay', emoji: '📆' }, // Calendar (This Month)
  { value: 'Bugün', label: 'Bugün', emoji: '☀️' }, // Sun (Today)
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
