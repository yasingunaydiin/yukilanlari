'use client';
import {
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';

interface SocialIconProps {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  socialLink: string;
}

const SocialIcon = ({
  icon: Icon,
  bgColor,
  iconColor,
  socialLink,
}: SocialIconProps) => (
  <a
    href={socialLink}
    target='_blank'
    rel='noopener noreferrer'
    className={`p-4 ${bgColor} rounded-full cursor-pointer transition-transform hover:scale-105`}
  >
    <Icon className={`${iconColor}`} size={24} />
  </a>
);

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/905417688751', '_blank');
  };

  return (
    <div className='max-w-6xl mx-auto py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Bize Ulaşın</h1>
        <p className='text-gray-600 mb-8'>
          Bizimle iletişime geçmekten çekinmeyin, sorularınızı buraya gönderin,
          sizi dinleyelim
        </p>

        <div className='flex justify-center gap-6 mb-12'>
          <SocialIcon
            icon={Facebook}
            bgColor='bg-blue-50'
            iconColor='text-blue-500'
            socialLink=''
          />
          <SocialIcon
            icon={Instagram}
            bgColor='bg-purple-50'
            iconColor='text-purple-500'
            socialLink=''
          />
          <SocialIcon
            icon={Linkedin}
            bgColor='bg-blue-50'
            iconColor='text-blue-500'
            socialLink='https://www.linkedin.com/in/yasin-gunaydin-b45466204/'
          />
        </div>
      </div>

      <div className='flex justify-center gap-12'>
        <div className='space-y-6 sm:w-[700px] w-[360px]'>
          <div className='bg-indigo-600 text-white p-6 rounded-lg'>
            <div className='flex gap-2 items-center mb-2'>
              <Phone size={24} />
              <h3 className='text-xl font-semibold'>Bizi doğrudan arayın</h3>
            </div>
            <p className='text-2xl font-bold'>+90 541 768 87 51</p>
            <a href='tel:0541-768-87-51'>
              <button className='mt-4 w-full bg-indigo-500 hover:bg-indigo-700 py-2 rounded-md'>
                Ara
              </button>
            </a>
          </div>

          <div className='bg-green-600 p-6 rounded-lg text-white'>
            <div className='flex gap-2 items-center mb-2'>
              <MessageCircle size={24} />
              <h3 className='text-xl font-semibold'>
                WhatsApp mesajı gönderin
              </h3>
            </div>
            <button
              className='mt-4 w-full bg-green-500 hover:bg-green-700 py-2 rounded-md'
              onClick={handleWhatsAppClick}
            >
              Mesaj Gönder
            </button>
          </div>

          <div className='bg-gray-100 p-6 rounded-lg'>
            <div className='flex gap-2 items-center mb-2'>
              <Mail size={24} />
              <h3 className='text-xl font-semibold'>Email ile bize ulaşın</h3>
            </div>
            <p className='text-2xl font-bold'>yukilanlarinet@gmail.com</p>
            <button
              className='mt-4 w-full bg-gray-100 hover:bg-gray-300 py-2 rounded-md'
              onClick={() =>
                (window.location.href = 'mailto:yukilanlarinet@gmail.com')
              }
            >
              Mail Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
