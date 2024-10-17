import Header from '@/app/components/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';
import { Home } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yük Bul',
  description: 'Yük Bul Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='p-4 px-6 container mx-auto'>
          <Header />
          <AuthKitProvider>{children}</AuthKitProvider>
          <SpeedInsights />
          <Analytics />
          <footer className='container text-gray-500 mt-4'>
            Yük Bul &copy; 2024 - All rights reserved
          </footer>
          <Link href={'/'}>
            <button className='mt-2 inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10 hover:bg-green-100 transition-colors duration-300'>
              <Home className='size-3' />
              Ana Sayfaya Dön
            </button>{' '}
          </Link>
        </main>
      </body>
    </html>
  );
}
