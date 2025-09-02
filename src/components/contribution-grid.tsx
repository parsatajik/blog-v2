"use client";

import { cn, formatBaseColor } from "@/lib/utils";
import {
  GoalWithRecentActivities,
  getContributionGrid,
  getCurrentStreak,
  getLongestStreak,
} from "@/data/progress";
import { useState } from "react";

interface ContributionGridProps {
  goal?: GoalWithRecentActivities;
  className?: string;
}

export function ContributionGrid({ goal, className }: ContributionGridProps) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const contributionData = getContributionGrid(goal);

  // Group by weeks chronologically (like GitHub)
  const weeks: Array<
    Array<{ date: string; completed: boolean; level: number }>
  > = [];

  let currentWeek: Array<{ date: string; completed: boolean; level: number }> =
    [];

  contributionData.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Start a new week on Sunday (except for the very first day)
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      // Fill any remaining days in the current week with empty spaces
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", completed: false, level: 0 });
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }

    // If this is the first day and it's not Sunday, add empty spaces at the beginning
    if (index === 0 && dayOfWeek > 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: "", completed: false, level: 0 });
      }
    }

    currentWeek.push(day);

    // If this is the last day, add the remaining week
    if (index === contributionData.length - 1) {
      // Fill any remaining days in the final week with empty spaces
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", completed: false, level: 0 });
      }
      weeks.push(currentWeek);
    }
  });

  const getIntensityClass = (level: number) => {
    const baseClasses =
      "w-[12px] h-[12px] rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer border";

    const colorClass = formatBaseColor(goal?.color || "");

    switch (level) {
      case 0:
        return cn(baseClasses, "bg-muted border-muted-foreground/20");
      case 1:
        return cn(baseClasses, colorClass, "opacity-25 border-current");
      case 2:
        return cn(baseClasses, colorClass, "opacity-50 border-current");
      case 3:
        return cn(baseClasses, colorClass, "opacity-75 border-current");
      case 4:
        return cn(baseClasses, colorClass, "opacity-100 border-current");
      default:
        return cn(baseClasses, "bg-muted border-muted-foreground/20");
    }
  };

  const formatTooltipDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hoveredData = hoveredDate
    ? contributionData.find((d) => d.date === hoveredDate)
    : null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Activity Overview</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={getIntensityClass(level)} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Contribution Grid */}
      <div className="relative">
        <div className="w-full">
          <div className="flex gap-[2px] w-full justify-between">
            {/* Render each week as a column */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {week.map((day, dayIndex) => {
                  // Only render if we have actual data for this cell
                  if (!day.date) {
                    return (
                      <div
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="w-[12px] h-[12px]"
                      />
                    );
                  }

                  return (
                    <div
                      key={day.date}
                      className={getIntensityClass(day.level)}
                      onMouseEnter={() => setHoveredDate(day.date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      title={`${formatTooltipDate(day.date)}: ${
                        day.completed ? "Completed" : "Not completed"
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredData && hoveredDate && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
            <div className="bg-popover text-popover-foreground text-sm rounded-lg border shadow-lg p-3 min-w-[200px]">
              <div className="font-medium">
                {formatTooltipDate(hoveredDate)}
              </div>
              <div className="text-muted-foreground">
                {hoveredData.completed ? "Completed" : "Not completed"}
              </div>
              {hoveredData.completed && (
                <div className="text-xs text-muted-foreground mt-1">
                  Activity level: {hoveredData.level}/4
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Month Labels */}
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {contributionData.length > 0 &&
          (() => {
            const months: string[] = [];
            const seenMonths = new Set<string>();

            // Sample every ~4 weeks to get month labels
            for (let i = 0; i < contributionData.length; i += 28) {
              const date = new Date(contributionData[i].date);
              const monthName = date.toLocaleDateString("en-US", {
                month: "short",
              });
              const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

              if (!seenMonths.has(monthKey)) {
                months.push(monthName);
                seenMonths.add(monthKey);
              }
            }

            // Ensure we have about 12 labels evenly spaced
            const step = Math.max(1, Math.floor(months.length / 12));
            const displayMonths = months
              .filter((_, index) => index % step === 0)
              .slice(0, 12);

            return displayMonths.map((month, index) => (
              <span key={`${month}-${index}`}>{month}</span>
            ));
          })()}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {contributionData.filter((d) => d.completed).length}
          </div>
          <div className="text-sm text-muted-foreground">Total active days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {getCurrentStreak(goal)}
          </div>
          <div className="text-sm text-muted-foreground">Current streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {getLongestStreak(goal)}
          </div>
          <div className="text-sm text-muted-foreground">Longest streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {Math.round(
              (contributionData.filter((d) => d.completed).length /
                contributionData.length) *
                100
            )}
            %
          </div>
          <div className="text-sm text-muted-foreground">Success rate</div>
        </div>
      </div>
    </div>
  );
}
