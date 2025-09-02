import { Card } from "@/components/ui/card";
import { cn, formatBaseColor } from "@/lib/utils";
import { getCurrentWeekActivity } from "@/data/progress";
import Link from "next/link";
import type { Database } from "../../supabase/db-types";

type Goal = Database["public"]["Tables"]["goals"]["Row"];
type Activity = Database["public"]["Tables"]["activities"]["Row"];
type GoalWithRecentActivities = Goal & { activities: Activity[] };

interface ProgressCardProps {
  goal: GoalWithRecentActivities;
  className?: string;
}

export function ProgressCard({ goal, className }: ProgressCardProps) {
  const weekActivity = getCurrentWeekActivity(goal);
  const weekCompletions = weekActivity.filter((a) => a.completed).length;

  const last7Days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    const activity = goal.activities.find((a) => a.date === dateString);
    last7Days.push({
      date: dateString,
      completed: activity?.completed || false,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" })[0],
    });
  }

  return (
    <Link href={`/progress-tracker/${goal.id}`} className="block group">
      <Card
        className={cn(
          "aspect-square p-6 transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02] cursor-pointer",
          "border-2 hover:border-foreground/20 flex flex-col justify-between",
          className
        )}
      >
        {/* Header with icon and title */}
        <div className="space-y-3">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
              formatBaseColor(goal.color || "")
            )}
          >
            {goal.icon}
          </div>

          <div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {goal.title}
            </h3>
            <p className="text-xs text-muted-foreground capitalize mt-1">
              {goal.category}
            </p>
          </div>
        </div>

        {/* Activity Grid - Last 7 days */}
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground">
            {weekCompletions}/7 this week
          </div>

          <div className="grid grid-cols-7 gap-1">
            {last7Days.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-6 h-6 rounded-md transition-all duration-200",
                    day.completed
                      ? cn(
                          formatBaseColor(goal.color || ""),
                          "opacity-100 shadow-sm"
                        )
                      : "bg-muted opacity-60"
                  )}
                  title={`${day.dayName}: ${
                    day.completed ? "Completed" : "Missed"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {day.dayName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
