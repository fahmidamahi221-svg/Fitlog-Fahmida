'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Workout {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryTags?: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories?: number;
  rating: number;
  instructions?: string[];
  isDone?: boolean;
}

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
  notification: string | null;
  clearNotification: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const sanitizeWorkout = (workout: any): Workout => {
  const rawCal = workout.calories ?? workout.calorie ?? workout.caloriesBurned ?? 0;
  const parsedCal = typeof rawCal === 'number' ? rawCal : parseInt(String(rawCal), 10);

  const rawDur = workout.duration ?? workout.time ?? 0;
  const parsedDur = typeof rawDur === 'number' ? rawDur : parseInt(String(rawDur), 10);

  return {
    ...workout,
    calories: !isNaN(parsedCal) ? parsedCal : 0,
    duration: !isNaN(parsedDur) ? parsedDur : 0,
  };
};

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on initial client mount
  useEffect(() => {
    try {
      const localPlan = localStorage.getItem('fitlog_plan');
      const localSaved = localStorage.getItem('fitlog_saved');
      if (localPlan) setPlan(JSON.parse(localPlan));
      if (localSaved) setSaved(JSON.parse(localSaved));
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever state changes after initial hydration
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('fitlog_plan', JSON.stringify(plan));
    }
  }, [plan, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('fitlog_saved', JSON.stringify(saved));
    }
  }, [saved, isHydrated]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const clearNotification = () => setNotification(null);

  const addToPlan = (workout: Workout) => {
    const cleanWorkout = sanitizeWorkout(workout);
    setPlan((prev) => {
      if (prev.some((item) => item.id === cleanWorkout.id)) {
        showToast("Already added to today's plan!");
        return prev;
      }
      showToast(`Added "${cleanWorkout.name}" to today's plan!`);
      return [...prev, cleanWorkout];
    });
  };

  const addToSaved = (workout: Workout) => {
    const cleanWorkout = sanitizeWorkout(workout);
    setSaved((prev) => {
      if (prev.some((item) => item.id === cleanWorkout.id)) {
        showToast('Already saved for later!');
        return prev;
      }
      showToast(`Saved "${cleanWorkout.name}" for later!`);
      return [...prev, cleanWorkout];
    });
  };

  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from plan');
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from saved list');
  };

  const markAsDone = (id: string) => {
    setPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: true } : item))
    );
    showToast('Workout marked as completed!');
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        notification,
        clearNotification,
      }}
    >
      {children}

      {notification && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#16181e]/95 backdrop-blur-md border border-[#ccff00]/40 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
          <span className="font-medium">{notification}</span>
          <button
            onClick={clearNotification}
            className="text-gray-400 hover:text-white transition-colors ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};