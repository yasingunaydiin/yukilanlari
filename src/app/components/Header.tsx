import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'; // Import shadcn dropdown components
import { getSignInUrl, signOut, withAuth } from '@workos-inc/authkit-nextjs';
import { ContactRound, LogIn, LogOut, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header className='flex items-center justify-between mx-auto p-4'>
      {/* Logo */}
      <Button
        className='items-center gap-2 inline-flex rounded-md bg-white px-2 py-1 
     ring-1 ring-inset ring-orange-600/10
      hover:bg-orange-50 transition-colors duration-300'
      >
        <Package className='text-orange-400' />
        <Link
          href='/'
          className='text-orange-400 bg-clip-text font-bold text-2xl'
        >
          Yük Bul
        </Link>
      </Button>

      {/* Dropdown Menu */}
      <Link href='/new-listing' className='flex items-center'>
        <Button className='bg-yellow-400 text-white w-full md:hidden'>
          İlan oluşturun
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='md:hidden block focus:outline-none' // Hamburger button on small screens
          >
            {/* Hamburger Icon */}
            <div className='space-y-1'>
              <span className='block w-6 h-0.5 bg-yellow-400'></span>
              <span className='block w-6 h-0.5 bg-yellow-400'></span>
              <span className='block w-6 h-0.5 bg-yellow-400'></span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          {/* Conditionally render login/logout options */}
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
      {/* Desktop Navigation */}
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
          <Button className='bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold'>
            İlan oluşturun
          </Button>
        </Link>
      </nav>
    </header>
  );
}
