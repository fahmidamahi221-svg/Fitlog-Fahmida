'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';
import { Clock, Flame, Star, Check, X, ChevronDown } from 'lucide-react';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = usePlan();

  // Active tab contextual list
  const currentList = activeTab === 'plan' ? plan : saved;

  const getCalories = (item: any): number => {
    const val = item.calories ?? item.calorie ?? item.caloriesBurned ?? 0;
    const num = typeof val === 'number' ? val : parseInt(String(val), 10);
    return !isNaN(num) ? num : 0;
  };

  const getDuration = (item: any): number => {
    const val = item.duration ?? item.time ?? 0;
    const num = typeof val === 'number' ? val : parseInt(String(val), 10);
    return !isNaN(num) ? num : 0;
  };

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') return getDuration(a) - getDuration(b);
    if (sortBy === 'calories') return getCalories(b) - getCalories(a);
    if (sortBy === 'rating') return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    return 0;
  });

  // Calculate stats based on current active tab
  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + getDuration(curr), 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + getCalories(curr), 0);

  return (
    <main className="bg-[#0b0c0e] min-h-screen text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-1">MY PLAN</h1>
        <p className="text-xs text-gray-400 mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Dynamic Summary Cards matching Active Tab */}
        <div className="grid grid-cols-3 gap-4 bg-[#13151b] border border-gray-800 rounded-xl p-6 mb-8">
          <div>
            <div className="text-xs text-gray-400 mb-1">
              {activeTab === 'plan' ? 'Exercises' : 'Saved Lifts'}
            </div>
            <div className="text-3xl font-black text-[#ccff00]">{totalExercises}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Minutes</div>
            <div className="text-3xl font-black">{totalMinutes}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Calories</div>
            <div className="text-3xl font-black">{totalCalories}</div>
          </div>
        </div>

        {/* Tab Selection Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex bg-[#16181e] p-1 rounded-full border border-gray-800">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'plan' ? 'bg-[#22252f] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan ({plan.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'saved' ? 'bg-[#22252f] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved ({saved.length})
            </button>
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

        {/* Active List Rendering */}
        {sortedList.length === 0 ? (
          <div className="bg-[#13151b] border border-dashed border-gray-800 rounded-xl p-16 text-center flex flex-col items-center justify-center">
            <h3 className="text-xl font-black uppercase tracking-wide mb-2">NOTHING HERE YET</h3>
            <p className="text-xs text-gray-400 mb-6">
              {activeTab === 'plan'
                ? 'Browse the library and add a lift to get today moving.'
                : 'No saved workouts found. Save some lifts from the library for later!'}
            </p>
            <Link
              href="/"
              className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-full hover:bg-opacity-90 transition-all"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((item) => {
              const cal = getCalories(item);
              const dur = getDuration(item);

              return (
                <div
                  key={item.id}
                  className="bg-[#13151b] border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-[#1a1d26] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-sm uppercase tracking-wide text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.isDone && (
                          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold">
                            DONE
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{item.equipment}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-500" />
                          <span>{dur} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame size={12} className="text-gray-500" />
                          <span>{cal > 0 ? `${cal} kcal` : 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-[#ccff00] fill-[#ccff00]" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Link
                      href={`/fitlog/${item.id}`}
                      className="border border-gray-700 text-gray-300 hover:text-white font-medium text-xs px-4 py-2 rounded-lg"
                    >
                      View Details
                    </Link>

                    {activeTab === 'plan' && !item.isDone && (
                      <button
                        onClick={() => markAsDone(item.id)}
                        className="bg-[#ccff00] text-black font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-opacity-90"
                      >
                        <Check size={14} />
                        <span>Mark as Done</span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === 'plan' ? removeFromPlan(item.id) : removeFromSaved(item.id)
                      }
                      className="text-gray-500 hover:text-red-400 p-2"
                      title="Remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}