import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0b0c0e] flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-8xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">PAGE NOT FOUND</h2>
      <p className="text-xs text-gray-400 mb-8 text-center max-w-sm">
        The lift or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-opacity-90"
      >
        Return to Home
      </Link>
    </main>
  );
}