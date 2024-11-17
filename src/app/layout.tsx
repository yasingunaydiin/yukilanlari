import Header from '@/app/components/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yük İlanları',
  description: 'Yük İlanları',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-CJJ5RK5220'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CJJ5RK5220');
          `}
        </Script>
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
