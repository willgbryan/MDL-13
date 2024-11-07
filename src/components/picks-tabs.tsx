'use client'
import React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const weeks = [4, 5, 6, 7, 8, 9, 10];

interface PicksTabsProps {
  currentWeek: string;
  onWeekChange: (week: string) => void;
}

export function PicksTabs({ currentWeek, onWeekChange }: PicksTabsProps) {
  return (
    <Tabs value={currentWeek} onValueChange={onWeekChange} className="w-full max-w-5xl mx-auto bg-transparent">
      <TabsList className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 border-[#4BFFBA]">
        {weeks.map((week) => (
          <TabsTrigger 
            key={week} 
            value={week.toString()}
            disabled={week === 4 || week === 5}
            className={`${(week === 4 || week === 5) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Week {week}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
