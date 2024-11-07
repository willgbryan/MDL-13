'use client'

import { useState } from 'react';
import { PicksTabs } from "@/components/picks-tabs";
import dynamic from 'next/dynamic';

export default function PicksPage() {
  const [currentWeek, setCurrentWeek] = useState('10');

  const WeekComponent = dynamic(() => import(`./week-${currentWeek}/week-${currentWeek}`), {
    loading: () => <p></p>,
  });

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start py-20 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
      <PicksTabs currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
      <WeekComponent />
    </main>
  );
}
