'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Workout } from '@/context/PlanContext';
import { ArrowDown, Flame, Clock, Star, ChevronDown, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error('Failed fetching workouts', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'calories') return b.calories - a.calories;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="bg-[#0b0c0e] min-h-screen text-white pb-16">
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#ccff00] text-xs font-bold uppercase tracking-widest block mb-3">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-6">
            TRAIN WITH INTENT.<br />LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded-full hover:bg-opacity-90 transition-all text-sm uppercase"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowDown size={18} />
          </a>
        </div>
        <div className="relative flex justify-center">
          <div className="w-full max-w-md aspect-square relative overflow-hidden flex items-center justify-center">
            <Image
              src="/banner.png"
              alt="Gym Companion Illustration"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section id="library" className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wide">THE LIBRARY</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#16181e] text-white border border-gray-800 rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
            <Loader2 className="animate-spin text-[#ccff00]" size={32} />
            <span className="text-sm">Loading workouts…</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {sortedWorkouts.map((item) => (
              <Link
                key={item.id}
                href={`/fitlog/${item.id}`}
                className="bg-[#13151b] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-[#1a1d26] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.categoryTags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#ccff00] text-black font-bold text-[10px] px-2 py-0.5 rounded uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-black text-lg uppercase tracking-wide mb-1 text-white group-hover:text-[#ccff00] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">{item.equipment}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-gray-800/50 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-500" />
                    <span>{item.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame size={14} className="text-gray-500" />
                    <span>{item.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#ccff00] fill-[#ccff00]" />
                    <span className="text-white font-medium">{item.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}