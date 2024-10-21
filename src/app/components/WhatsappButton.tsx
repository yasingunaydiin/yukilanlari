'use client';
import { MessageCircle } from 'lucide-react';

type WhatsAppButtonProps = {
  phoneNumber: string;
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  const handleWhatsAppClick = () => {
    const formattedPhone = phoneNumber.replace(/\s+/g, ''); // Remove spaces
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  return (
    <div className='bg-green-600 mt-5 p-5 rounded-lg text-white w-[400px] mx-auto'>
      <div className='flex gap-2 items-center'>
        <MessageCircle size={24} />
        <h3 className='text-xl font-semibold'>WhatsApp mesajı gönderin</h3>
      </div>
      <button
        className='mt-2 w-full bg-green-500 hover:bg-green-700 py-2 rounded-md'
        onClick={handleWhatsAppClick}
      >
        Mesaj Gönder
      </button>
    </div>
  );
};

export default WhatsAppButton;
