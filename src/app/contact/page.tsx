'use client';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react';

const SocialIcon = ({ icon: Icon, bgColor, iconColor }) => (
  <div
    className={`p-4 ${bgColor} rounded-full cursor-pointer transition-transform hover:scale-105`}
  >
    <Icon className={`${iconColor}`} size={24} />
  </div>
);

export default function ContactPage() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Bize Ulaşın</h1>
        <p className='text-gray-600 mb-8'>
          Bizimle iletişime geçmekten çekinmeyin, sorularınızı buraya gönderin,
          sizi dinleyelim
        </p>

        {/* Social Media Icons */}
        <div className='flex justify-center gap-6 mb-12'>
          <SocialIcon
            icon={Facebook}
            bgColor='bg-blue-50'
            iconColor='text-blue-500'
          />
          <SocialIcon
            icon={Instagram}
            bgColor='bg-purple-50'
            iconColor='text-purple-500'
          />
          <SocialIcon
            icon={Linkedin}
            bgColor='bg-blue-50'
            iconColor='text-blue-500'
          />
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-12'>
        {/* Left Column - Contact Info */}
        <div className='space-y-6'>
          {/* Phone Card */}
          <div className='bg-indigo-600 text-white p-6 rounded-lg'>
            <div className='flex gap-2 items-center mb-2'>
              <Phone size={24} />
              <h3 className='text-xl font-semibold'>Bizi doğrudan arayın</h3>
            </div>

            <p className='text-2xl font-bold'>+90 541 768 87 51</p>
            <a href='tel:0541-768-87-51'>
              {' '}
              <button className='mt-4 w-full bg-indigo-500 hover:bg-indigo-700 py-2 rounded-md'>
                Ara
              </button>
            </a>
          </div>

          {/* Whatsapp Card */}
          <div className='bg-green-600 p-6 rounded-lg text-white'>
            <div className='flex gap-2 items-center mb-2'>
              <MessageCircle size={24} />
              <h3 className='text-xl font-semibold'>
                Whatsapp Mesajı Gönderin
              </h3>
            </div>

            <button className='mt-4 w-full bg-green-500 hover:bg-green-700 py-2 rounded-md'>
              Mesaj Gönder
            </button>
          </div>

          <div className='bg-gray-100 p-6 rounded-lg'>
            <div className='flex gap-2 items-center mb-2'>
              <Mail size={24} />
              <h3 className='text-xl font-semibold'>Email ile bize ulaşın</h3>
            </div>
            <p className='text-2xl font-bold'>y.gunaydinmail@gmail.com</p>
            <button className='mt-4 w-full bg-gray-100 hover:bg-gray-300 py-2 rounded-md'>
              Mail Gönder
            </button>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className='bg-white rounded-lg'>
          {/* Maıl Card */}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <input
                type='text'
                placeholder='İsim'
                className='w-full p-3 border rounded-lg'
              />
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <input
                type='email'
                placeholder='Email Adres'
                className='w-full p-3 border rounded-lg'
              />
              <input
                type='tel'
                placeholder='Telefon Numaran'
                className='w-full p-3 border rounded-lg'
              />
            </div>
            <div>
              <textarea
                placeholder='Buraya Mesajını Yaz...'
                rows={6}
                className='w-full p-3 border rounded-lg resize-none'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800'
            >
              Mesaj Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
