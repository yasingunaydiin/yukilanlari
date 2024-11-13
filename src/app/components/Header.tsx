import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import logoIcon from '@/public/logoIcon.png';
import { getSignInUrl, signOut, withAuth } from '@workos-inc/authkit-nextjs';
import { ContactRound, LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header className='flex items-center justify-between mx-auto p-4'>
      <Button className='sm:text-2xl text-sm items-center gap-2 inline-flex rounded-md bg-white px-2 hover:bg-orange-50 transition-colors duration-300'>
        <Image src={logoIcon} width={45} height={45} alt='Platform Logo' />
        <Link href='/' className='text-orange-400 bg-clip-text font-bold '>
          Yük İlanları.net
        </Link>
      </Button>

      <Link href='/new-listing' className='flex items-center'>
        <Button className='bg-yellow-400 text-white text-sm md:hidden'>
          İlan oluşturun
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='md:hidden block focus:outline-none'
          >
            <div className='space-y-1'>
              <span className='block w-6 h-0.5 bg-yellow-400'></span>
              <span className='block w-6 h-0.5 bg-yellow-400'></span>
              <span className='block w-6 h-0.5 bg-yellow-400'></span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          {!user && (
            <DropdownMenuItem asChild>
              <Link href={signInUrl} className='flex items-center'>
                <LogIn className='w-4 h-4 mr-2' />
                Giriş
              </Link>
            </DropdownMenuItem>
          )}

          {user && (
            <>
              <DropdownMenuItem asChild>
                <Link href={'/profile'} className='flex items-center'>
                  <Button variant='ghost'>
                    <ContactRound className='w-4 h-4 mr-2' />
                    Profilin
                  </Button>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <Button variant='ghost' className='flex items-center'>
                    <LogOut className='w-4 h-4 mr-2' />
                    Çıkış
                  </Button>
                </form>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <nav className='hidden md:flex gap-4'>
        {!user && (
          <Link href={signInUrl}>
            <Button variant='outline'>
              <LogIn className='w-4 h-4 mr-2' />
              Giriş
            </Button>
          </Link>
        )}

        {user && (
          <>
            <Link href='/profile'>
              <Button variant='outline'>
                <ContactRound className='w-4 h-4 mr-2' />
                Profilin
              </Button>
            </Link>

            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button type='submit' variant='outline'>
                <LogOut className='w-4 h-4 mr-2' />
                Çıkış
              </Button>
            </form>
          </>
        )}

        <Link href='/new-listing'>
          <Button className='bg-yellow-400 text-white rounded-lg font-bold'>
            İlan oluşturun
          </Button>
        </Link>
      </nav>
    </header>
  );
}
