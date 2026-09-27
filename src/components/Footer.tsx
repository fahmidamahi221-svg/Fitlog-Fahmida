'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0d10]/90 backdrop-blur-md border-t border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold tracking-wider text-xs">
          <Image 
            src="/logo.png" 
            alt="FitLog Logo" 
            width={20} 
            height={20} 
            className="object-contain" 
          />
          <span>FITLOG</span>
        </Link>
        <div className="text-[11px] text-gray-400">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </div>
      </div>
    </footer>
  );
}