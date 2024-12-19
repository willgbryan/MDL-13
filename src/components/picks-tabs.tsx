'use client'
import React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const weeks = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

interface PicksTabsProps {
  currentWeek: string;
  onWeekChange: (week: string) => void;
}

export function PicksTabs({ currentWeek, onWeekChange }: PicksTabsProps) {
  return (
    <Tabs 
      value={currentWeek} 
      onValueChange={onWeekChange} 
      className="w-full max-w-7xl mx-auto bg-transparent"
    >
      <div className="overflow-x-auto">
        <TabsList className="inline-flex min-w-fit border-[#4BFFBA] w-full">
          {weeks.map((week) => (
            <TabsTrigger
              key={week}
              value={week.toString()}
              disabled={week === 4 || week === 5}
              className={`flex-1 min-w-[100px] ${
                (week === 4 || week === 5) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Week {week}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
