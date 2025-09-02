import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProgressCard } from "@/components/progress-card";
import { createClient } from "@/lib/supabase/server";
import { GoalWithRecentActivities } from "@/data/progress";
import { GoalDialog } from "@/components/goal-dialog";

import { redirect } from "next/navigation";

const BLUR_FADE_DELAY = 0.04;

export default async function ProgressTracker() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    redirect("/auth/login");
  }

  const goals = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/goals`, {
    headers: {
      Authorization: `Bearer ${data?.session?.access_token}`,
      refreshToken: data?.session?.refresh_token ?? "",
    },
  });

  const goalsData = ((await goals?.json()) as GoalWithRecentActivities[]) || [];
  const activeGoals = goalsData?.filter((goal) => goal.is_active);
  const pausedGoals = goalsData?.filter((goal) => !goal.is_active);

  return (
    <main className="flex flex-col space-y-10">
      {/* Header Section */}
      <section id="header">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="font-bold tracking-tighter sm:text-4xl xl:text-5xl/none"
              yOffset={8}
              text="Progress Tracker"
            />
            <BlurFadeText
              className="md:text-xl text-muted-foreground text-left"
              delay={BLUR_FADE_DELAY * 2}
              text="Track your daily habits and long-term goals with visual progress insights"
            />
          </div>
        </div>
      </section>

      {/* Active Goals Section */}
      <section id="active-goals">
        <div className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Goals</h2>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>
                  {activeGoals.length} goal{activeGoals.length !== 1 ? "s" : ""}{" "}
                  in progress
                </span>
                <GoalDialog />
              </div>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGoals.map((goal, index) => (
              <BlurFade
                key={goal.id}
                delay={BLUR_FADE_DELAY * 4 + index * 0.05}
              >
                <ProgressCard goal={goal} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Paused Goals Section (if any) */}
      {pausedGoals.length > 0 && (
        <section id="paused-goals">
          <div className="space-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Paused Goals</h2>
                <div className="text-sm text-muted-foreground">
                  {pausedGoals.length} goal{pausedGoals.length !== 1 ? "s" : ""}{" "}
                  paused
                </div>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pausedGoals.map((goal, index) => (
                <BlurFade
                  key={goal.id}
                  delay={BLUR_FADE_DELAY * 6 + index * 0.05}
                >
                  <ProgressCard goal={goal} className="opacity-75" />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
