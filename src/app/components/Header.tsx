import { getSignInUrl, signOut, withAuth } from '@workos-inc/authkit-nextjs';
import { ContactRound, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className='flex items-center justify-between mx-auto'>
        <div>
          <Link
            href={'/'}
            className='bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-bold text-2xl'
          >
            Yük Bul
          </Link>
        </div>
        <nav className='flex gap-4'>
          {/* Login button */}
          {!user && (
            <Link href={signInUrl}>
              <Button
                variant='outline'
                className='bg-white text-yellow-400 border-yellow-300 hover:bg-yellow-50 hover:text-yellow-300'
              >
                <LogIn className='w-4 h-4 mr-2' />
                Giriş
              </Button>
            </Link>
          )}

          {/* Logout button */}
          {user && (
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button
                type='submit'
                variant='outline'
                className='bg-white text-yellow-400 border-yellow-300 hover:bg-yellow-50 hover:text-yellow-300'
              >
                <LogOut className='w-4 h-4 mr-2' />
                Çıkış
              </Button>
            </form>
          )}

          {user && (
            <Link href={'/profile'}>
              <Button
                type='submit'
                variant='outline'
                className=' bg-white text-yellow-400 border-yellow-300 hover:bg-yellow-50 hover:text-yellow-300'
              >
                <ContactRound className='w-4 h-4 mr-2' />
                Profilin
              </Button>
            </Link>
          )}

          {/* Job post button */}

          <Link href={'/new-listing'}>
            <Button className='bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold'>
              İlan oluşturun
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
