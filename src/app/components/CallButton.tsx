'use client';
import { Phone } from 'lucide-react';

type CallButtonProps = {
  phoneNumber: string;
};

const CallButton: React.FC<CallButtonProps> = ({ phoneNumber }) => {
  const handleCallClick = () => {
    const formattedPhone = phoneNumber.replace(/\s+/g, ''); // Remove spaces
    window.open(`tel:${formattedPhone}`, '_blank'); // Use 'tel:' for calls
  };

  return (
    <div className='bg-indigo-600 mt-5 p-5 rounded-lg text-white w-[400px] mx-auto'>
      <div className='flex gap-2 items-center'>
        <Phone size={24} />
        <h3 className='text-xl font-semibold'>İlan sahibini arayın</h3>
      </div>
      <button
        onClick={handleCallClick}
        className='mt-2 w-full bg-indigo-500 hover:bg-indigo-700 py-2 rounded-md'
      >
        Ara
      </button>
    </div>
  );
};

export default CallButton;
