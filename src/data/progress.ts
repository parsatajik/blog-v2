import { Database } from "../../supabase/db-types";

export interface ProgressGoal {
  id: string;
  title: string;
  description: string;
  category: "fitness" | "learning" | "project" | "habit" | "other";
  startDate: string;
  targetDate?: string;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  completedDays: number;
  color: string;
  icon: string;
  isActive: boolean;
  activities: ProgressActivity[];
}

export type Goal = Database["public"]["Tables"]["goals"]["Row"];
export type Activity = Database["public"]["Tables"]["activities"]["Row"];
export type GoalWithRecentActivities = Goal & { activities: Activity[] };

export interface ProgressActivity {
  date: string; // YYYY-MM-DD format
  completed: boolean;
  notes?: string;
  value?: number; // for quantifiable goals
  unit?: string; // e.g., "minutes", "pages", "reps"
}

export function getCompletionRate(
  goal: GoalWithRecentActivities | null
): number {
  if (!goal) return 0;
  const completedDays = goal?.activities?.filter(
    (activity) => activity.completed
  ).length;

  const startDate = new Date(goal?.start_date || "");
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays =
    Math.floor((now.getTime() - startDate.getTime()) / msPerDay) + 1;

  if (totalDays <= 0) return 0;

  return Math.round((completedDays / totalDays) * 100);
}

export function getCurrentWeekActivity(
  goal: GoalWithRecentActivities | null
): Activity[] {
  if (!goal) return [];
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  return goal?.activities?.filter((activity) => {
    const activityDate = new Date(activity.date);
    return activityDate >= weekAgo && activityDate <= today;
  });
}

export function getActivityForDate(
  goal?: GoalWithRecentActivities,
  date?: string
): Activity | undefined {
  if (!goal) return undefined;
  return goal?.activities?.find((activity) => activity.date === date);
}

export function getActivitiesForDate(
  goal?: GoalWithRecentActivities,
  date?: string
): Activity[] {
  if (!goal || !date) return [];
  return goal?.activities?.filter((activity) => activity.date === date) || [];
}

export function hasCompletedActivityForDate(
  goal?: GoalWithRecentActivities,
  date?: string
): boolean {
  if (!goal || !date) return false;
  const activities = getActivitiesForDate(goal, date);
  return activities.some(activity => activity.completed);
}

export function getCurrentStreak(goal?: GoalWithRecentActivities): number {
  if (!goal?.activities) return 0;
  
  // Group activities by date and check if each day has at least one completed activity
  const activitiesByDate = new Map<string, Activity[]>();
  
  goal.activities.forEach(activity => {
    const date = activity.date;
    if (!activitiesByDate.has(date)) {
      activitiesByDate.set(date, []);
    }
    activitiesByDate.get(date)!.push(activity);
  });
  
  // Get unique dates sorted in descending order (newest first)
  const sortedDates = Array.from(activitiesByDate.keys())
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let streak = 0;
  const today = new Date().toISOString().split("T")[0];
  let currentDate = today;
  
  for (const date of sortedDates) {
    if (date === currentDate) {
      const dayActivities = activitiesByDate.get(date)!;
      const hasCompletedActivity = dayActivities.some(activity => activity.completed);
      
      if (hasCompletedActivity) {
        streak++;
        // Move to previous day
        const dateObj = new Date(currentDate);
        dateObj.setDate(dateObj.getDate() - 1);
        currentDate = dateObj.toISOString().split("T")[0];
      } else {
        // Day exists but no completed activities, streak breaks
        break;
      }
    } else if (date < currentDate) {
      // Gap in dates, streak breaks
      break;
    }
  }
  
  return streak;
}

export function getLongestStreak(goal?: GoalWithRecentActivities): number {
  if (!goal?.activities) return 0;
  
  // Group activities by date and check if each day has at least one completed activity
  const activitiesByDate = new Map<string, Activity[]>();
  
  goal.activities.forEach(activity => {
    const date = activity.date;
    if (!activitiesByDate.has(date)) {
      activitiesByDate.set(date, []);
    }
    activitiesByDate.get(date)!.push(activity);
  });
  
  // Get unique dates sorted in ascending order (oldest first)
  const sortedDates = Array.from(activitiesByDate.keys())
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: string | null = null;
  
  for (const date of sortedDates) {
    const dayActivities = activitiesByDate.get(date)!;
    const hasCompletedActivity = dayActivities.some(activity => activity.completed);
    
    if (hasCompletedActivity) {
      // Check if this date is consecutive to the previous date
      if (previousDate === null || isConsecutiveDay(previousDate, date)) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        // Gap in dates, start new streak
        currentStreak = 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      }
      previousDate = date;
    } else {
      // Day exists but no completed activities, reset streak
      currentStreak = 0;
      previousDate = null;
    }
  }
  
  return longestStreak;
}

// Helper function to check if two dates are consecutive
function isConsecutiveDay(previousDate: string, currentDate: string): boolean {
  const prev = new Date(previousDate);
  const curr = new Date(currentDate);
  const nextDay = new Date(prev);
  nextDay.setDate(prev.getDate() + 1);
  
  return nextDay.toISOString().split("T")[0] === curr.toISOString().split("T")[0];
}

export function getContributionGrid(
  goal?: GoalWithRecentActivities
): { date: string; completed: boolean; level: number }[] {
  if (!goal) return [];
  const today = new Date();
  
  // Start from exactly one year ago
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);
  startDate.setDate(startDate.getDate() + 1); // Start from day after one year ago
  
  const grid: { date: string; completed: boolean; level: number }[] = [];
  const currentDate = new Date(startDate);

  // Generate exactly 365 days (or 366 for leap years) ending on today
  while (currentDate <= today) {
    const dateString = currentDate.toISOString().split("T")[0];
    const activities = getActivitiesForDate(goal, dateString);
    const hasCompleted = hasCompletedActivityForDate(goal, dateString);

    // Calculate level based on multiple activities
    let level = 0;
    if (hasCompleted) {
      const completedActivities = activities.filter(activity => activity.completed);
      const totalValue = completedActivities.reduce((sum, activity) => sum + (activity.value || 1), 0);
      
      // Level calculation: more activities or higher values = higher level
      if (completedActivities.length >= 4 || totalValue >= 60) {
        level = 4;
      } else if (completedActivities.length >= 3 || totalValue >= 45) {
        level = 3;
      } else if (completedActivities.length >= 2 || totalValue >= 30) {
        level = 2;
      } else {
        level = 1;
      }
    }

    grid.push({
      date: dateString,
      completed: hasCompleted,
      level: level,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return grid;
}
