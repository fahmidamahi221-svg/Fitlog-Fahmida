import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PlanProvider } from '@/context/PlanContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0b0c0e] text-white min-h-screen flex flex-col justify-between`}>
        <PlanProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        </PlanProvider>
      </body>
    </html>
  );
}