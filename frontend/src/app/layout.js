"use client";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/page';
import { Footer } from '@/components/footer/page';
import GlobalProvider  from './GlobalProvider'; // Correct the import if necessary
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
        <GlobalProvider>
          <Header />
          {children}
          <Toaster closeButton />
          <Footer />
        </GlobalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
