import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yük Yolu",
  description: "Yuk Yolu Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="p-4 px-6 container mx-auto">
          <Header />
          <AuthKitProvider>{children}</AuthKitProvider>
          <footer className="container text-gray-500 py-8">
            Yük Yolu &copy; 2024 - All rights reserved
          </footer>
        </main>
      </body>
    </html>
  );
}
