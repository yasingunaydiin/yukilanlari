import Header from '@/app/components/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
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
          <Footer />
        </main>
      </body>
    </html>
  );
}
