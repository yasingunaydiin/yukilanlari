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
        <Script id='clarity-script' strategy='afterInteractive'>
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
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
