'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface Workout {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryTags: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
  isDone?: boolean;
}

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    const localPlan = localStorage.getItem('fitlog_plan');
    const localSaved = localStorage.getItem('fitlog_saved');
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("Plan cap reached (maximum 5 lifts allowed for today).");
      return;
    }
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan");
  };

  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast.success("Removed from today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Already in saved lifts!");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast.success("Removed from saved lifts");
  };

  const markAsDone = (id: string) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isDone: true } : w))
    );
    toast.success("Marked workout as done!");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return context;
};