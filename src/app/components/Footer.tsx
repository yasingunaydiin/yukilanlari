import { Home, Info, Package, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className='bg-white rounded-lg shadow dark:bg-gray-900 mt-8'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center justify-between'>
            <Button
              variant='ghost'
              className='self-center text-xl font-semibold text-orange-400 bg-white px-2 gap-2 hover:text-orange-400 hover:bg-orange-50 transition-colors duration-300'
            >
              <Package className='text-orange-400' />
              <Link href='/' className='flex items-center'>
                Yük İlanları.net
              </Link>
            </Button>
          </div>

          <ul className='flex flex-wrap items-center text-center justify-center sm:justify-end mt-4 sm:mt-0 space-x-2 sm:space-x-4 text-sm font-medium text-gray-500 dark:text-gray-400 '>
            <li>
              <Link href='/about' className='hover:underline'>
                <button className='inline-flex items-center justify-between gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs  text-blue-700 ring-1 ring-inset ring-blue-600/10 hover:bg-blue-100 transition-colors duration-300'>
                  <Info className='size-4' /> Hakkımızda
                </button>
              </Link>
            </li>
            <li>
              <Link href='/contact' className='hover:underline'>
                <button className='inline-flex items-center justify-between gap-1 rounded-md bg-orange-50 px-2 py-1 text-xs text-orange-700 ring-1 ring-inset ring-orange-600/10 hover:bg-orange-100 transition-colors duration-300'>
                  <Phone className='size-4' /> İletişim
                </button>
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <button className='inline-flex items-center justify-between gap-1 rounded-md bg-green-50 px-2 py-1 text-xs  text-green-700 ring-1 ring-inset ring-green-600/10 hover:bg-green-100 transition-colors duration-300'>
                  <Home className='size-4' /> Ana Sayfa
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © {new Date().getFullYear()}{' '}
          <Link href='/' className='hover:underline'>
            Yük İlanları™
          </Link>
          . Tüm Hakları Saklıdır.
        </span>
      </div>
    </footer>
  );
}
