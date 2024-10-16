'use client'

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function WeekContent() {
  const pathname = usePathname();
  const week = pathname?.split('week-')[1] || '7';

  const WeekComponent = dynamic(() => import(`./week-${week}/week-${week}`), {
    loading: () => <p>Loading week content...</p>,
  });

  return <WeekComponent />;
}