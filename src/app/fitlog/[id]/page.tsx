'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { usePlan, Workout } from '@/context/PlanContext';
import { Plus, Bookmark, Loader2 } from 'lucide-react';

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    async function fetchDetail() {
      if (!id) return;
      try {
        let res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
        if (!res.ok) {
          res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        }
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error('Failed to fetch details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c0e] flex items-center justify-center text-gray-400 gap-3">
        <Loader2 className="animate-spin text-[#ccff00]" size={32} />
        <span>Loading workout details…</span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0b0c0e] flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-xl font-bold">Workout details unavailable.</h2>
        <a href="/" className="text-[#ccff00] underline text-sm">Return to Home</a>
      </div>
    );
  }

  // Safe calorie display helper
  const getCaloriesText = () => {
    const rawVal =
      workout.calories ??
      (workout as any).calorie ??
      (workout as any).caloriesBurned;
    const num = typeof rawVal === 'number' ? rawVal : parseInt(String(rawVal), 10);
    return !isNaN(num) && num > 0 ? `${num} kcal` : 'N/A';
  };

  return (
    <main className="bg-[#0b0c0e] min-h-screen text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#16181e] border border-gray-800">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
            {workout.name}
          </h1>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            {workout.description}
          </p>

          <div className="flex gap-2 mb-6">
            {workout.categoryTags?.map((tag) => (
              <span
                key={tag}
                className="bg-[#ccff00] text-black font-bold text-xs px-3 py-1 rounded uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-[#13151b] border border-gray-800 rounded-xl p-4 mb-8 text-xs divide-y divide-gray-800">
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">EQUIPMENT</span>
              <span className="text-white font-medium">{workout.equipment}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">DIFFICULTY</span>
              <span className="text-white font-medium">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">SETS</span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">REPS</span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">DURATION</span>
              <span className="text-white font-medium">{workout.duration} min</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">CALORIES</span>
              <span className="text-white font-medium">{getCaloriesText()}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-gray-400 uppercase font-semibold">RATING</span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-black text-sm uppercase tracking-wider mb-3">INSTRUCTIONS</h3>
            <ol className="space-y-2 text-xs text-gray-300">
              {workout.instructions?.map((step, idx) => (
                <li key={idx} className="flex gap-2 leading-relaxed">
                  <span className="font-bold text-gray-500">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => addToPlan(workout)}
              className="bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3.5 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all"
            >
              <Plus size={16} />
              <span>Add to today's plan</span>
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="border border-gray-700 text-white font-bold text-xs uppercase px-6 py-3.5 rounded-xl flex items-center gap-2 hover:border-gray-500 transition-all"
            >
              <Bookmark size={16} />
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}