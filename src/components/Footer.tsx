import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0c0d10] px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
      <div className="flex items-center gap-2 text-white font-extrabold tracking-wider">
        <Image src="/logo.png" alt="FitLog Logo" width={20} height={20} className="object-contain" />
        <span>FITLOG</span>
      </div>
      <div>
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </div>
    </footer>
  );
}