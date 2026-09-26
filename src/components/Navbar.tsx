'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <nav className="border-b border-gray-800 bg-[#0c0d10] px-6 py-4 flex items-center justify-between text-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-wider">
        <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} className="object-contain" />
        <span>FITLOG</span>
      </Link>

      <div className="flex items-center gap-2 bg-[#16181e] p-1 rounded-full border border-gray-800">
        <Link
          href="/"
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            pathname === '/' ? 'bg-[#22252f] text-[#ccff00]' : 'text-gray-400 hover:text-white'
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            pathname === '/my-plan' ? 'bg-[#22252f] text-[#ccff00]' : 'text-gray-400 hover:text-white'
          }`}
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/my-plan"
          className="bg-[#ccff00] text-black font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-2 hover:opacity-90"
        >
          <span>Plan</span>
          <span className="bg-black text-[#ccff00] rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
            {plan.length}
          </span>
        </Link>
        <Link
          href="/my-plan"
          className="border border-gray-700 text-gray-300 font-semibold text-xs px-3 py-1.5 rounded-full flex items-center gap-2 hover:border-gray-500"
        >
          <span>Saved</span>
          <span className="bg-gray-800 text-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">
            {saved.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}