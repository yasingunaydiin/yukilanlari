'use client';
import { Mail } from 'lucide-react';

type MailButtonProps = {
  contactEmail: string;
};

const MailButton: React.FC<MailButtonProps> = ({ contactEmail }) => {
  const handleMailClick = () => {
    const formattedEmail = contactEmail.replace(/\s+/g, '');
    window.location.href = `mailto:${formattedEmail}`;
  };

  return (
    <div className='bg-gray-100 mt-5 p-5 rounded-lg w-[400px] mx-auto'>
      <div className='flex gap-2 items-center'>
        <Mail size={24} />
        <h3 className='text-xl font-semibold'>Email ile ulaşın</h3>
      </div>
      <button
        className='mt-2 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-md'
        onClick={handleMailClick}
      >
        Mail Gönder
      </button>
    </div>
  );
};

export default MailButton;
