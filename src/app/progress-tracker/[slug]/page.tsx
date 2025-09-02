"use client";
import { use, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContributionGrid } from "@/components/contribution-grid";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import {
  getCompletionRate,
  getCurrentWeekActivity,
  GoalWithRecentActivities,
} from "@/data/progress";
import { cn, formatBaseColor } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Calendar, Target, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ActivityDialog } from "@/components/activity-dialog";

const BLUR_FADE_DELAY = 0.04;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GoalDetailPage(props: PageProps) {
  const params = use(props.params);

  const [goal, setGoal] = useState<GoalWithRecentActivities | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGoal = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session) {
      redirect("/auth/login");
    }

    const goal = await fetch(`/api/goal?goalId=${params.slug}`, {
      headers: {
        Authorization: `Bearer ${data?.session?.access_token}`,
        refreshToken: data?.session?.refresh_token ?? "",
      },
    });
    const goalData = await goal.json();
    setGoal(goalData);
    setLoading(false);
  };

  useEffect(() => {
    fetchGoal();

    return () => {
      setLoading(false);
    };
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const completionRate = getCompletionRate(goal);
  const weekActivity = getCurrentWeekActivity(goal);
  const weekCompletions = weekActivity?.filter((a) => a.completed).length;

  const last30Days = goal?.activities?.slice(-30);
  const last30Completions = last30Days?.filter((a) => a.completed).length;
  const previous30Days = goal?.activities?.slice(-60, -30);
  const previous30Completions = previous30Days?.filter(
    (a) => a.completed
  ).length;
  const trend = (last30Completions || 0) - (previous30Completions || 0);

  const recentActivities = goal?.activities
    ?.slice(-14)
    .reverse()
    .map((activity) => ({
      ...activity,
      dayName: new Date(activity.date || "").toLocaleDateString("en-US", {
        weekday: "short",
      }),
      monthDay: new Date(activity.date || "").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-8">
      {/* Back Navigation */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/progress-tracker"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Progress Tracker
        </Link>
      </BlurFade>

      {/* Header */}
      <section className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0",
                  formatBaseColor(goal?.color || "")
                )}
              >
                {goal?.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY * 2}
                    className="text-3xl font-bold tracking-tight"
                    text={goal?.title || ""}
                  />
                  <Badge variant="secondary" className="capitalize">
                    {goal?.category}
                  </Badge>
                  <div
                    className={cn(
                      "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
                      goal?.is_active
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        goal?.is_active ? "bg-green-500" : "bg-gray-400"
                      )}
                    />
                    {goal?.is_active ? "Active" : "Paused"}
                  </div>
                </div>
                <BlurFadeText
                  delay={BLUR_FADE_DELAY * 3}
                  className="text-lg text-muted-foreground max-w-2xl"
                  text={goal?.description || ""}
                />
              </div>
            </div>
            {goal && <ActivityDialog goal={goal} onActivityAdded={fetchGoal} />}
          </div>
        </BlurFade>

        {/* Key Stats Cards */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">
                    Completion Rate
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionRate}%</div>
                <div className="text-xs text-muted-foreground">
                  {goal?.activities?.filter((a) => a.completed).length} of{" "}
                  {goal?.activities?.length} days
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">
                    Current Streak
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{goal?.currentStreak}</div>
                <div className="text-xs text-muted-foreground">
                  Best: {goal?.longestStreak} days
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">
                    This Week
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weekCompletions}/7</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((weekCompletions / 7) * 100)}% complete
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">
                    30-Day Trend
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    trend > 0
                      ? "text-green-600"
                      : trend < 0
                      ? "text-red-600"
                      : "text-muted-foreground"
                  )}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}
                </div>
                <div className="text-xs text-muted-foreground">
                  vs previous 30 days
                </div>
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </section>

      {/* Contribution Grid */}
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <Card>
            <CardContent className="p-0">
              <ContributionGrid goal={goal || undefined} />
            </CardContent>
          </Card>
        </BlurFade>
      </section>

      {/* Recent Activity Timeline */}
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid gap-3">
                {recentActivities?.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 py-3 px-4 rounded-lg border bg-card"
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full flex-shrink-0",
                        activity.completed
                          ? cn(goal?.color, "opacity-100")
                          : "bg-muted"
                      )}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">
                          {activity.dayName}, {activity.monthDay}
                        </span>
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            activity.completed
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          )}
                        >
                          {activity.completed ? "Completed" : "Missed"}
                        </span>
                      </div>

                      {activity.completed && activity.value && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {activity.value} {activity.unit}
                        </div>
                      )}

                      {activity.notes && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {activity.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </section>

      {/* Goal Info */}
      <section className="pb-12">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <Card>
            <CardHeader>
              <CardTitle>Goal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Started:</span>
                      <span>
                        {new Date(goal?.start_date || "").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    {goal?.target_date && (
                      <div className="flex justify-between">
                        <span>Target:</span>
                        <span>
                          {new Date(goal?.target_date || "").toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    )}
                    {/* <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{goal?.totalDays} days</span>
                    </div> */}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Progress Summary</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span>{completionRate}%</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span>Days Completed:</span>
                      <span>{goal?.completedDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Remaining:</span>
                      <span>{goal?.totalDays - goal?.completedDays}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </section>
    </main>
  );
}
