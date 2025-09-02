import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Returns all goals for the given user and embeds activities from the last 7 days per goal.
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const jwt = request.headers.get("Authorization")?.split(" ")[1];
    const refreshToken = request.headers.get("refreshToken");

    if (!jwt || !refreshToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    supabase.auth.setSession({
      access_token: jwt,
      refresh_token: refreshToken,
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const start = new Date();
    start.setDate(start.getDate() - 6);
    const startDate = formatDate(start);

    const { data: goals, error: goalsError } = await supabase
      .from("goals")
      .select(
        "id, title, description, category, color, icon, start_date, target_date, is_active, created_at, updated_at, user_id"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (goalsError) {
      return NextResponse.json({ error: goalsError.message }, { status: 500 });
    }

    if (!goals || goals.length === 0) {
      return NextResponse.json([]);
    }

    const goalsWithActivities = await Promise.all(
      goals.map(async (goal) => {
        const { data: activities, error: activitiesError } = await supabase
          .from("activities")
          .select("date, completed, notes, value, unit, created_at, updated_at")
          .eq("goal_id", goal.id)
          .gte("date", startDate)
          .order("date", { ascending: true });

        if (activitiesError) {
          return { ...goal, activities: [] };
        }

        return { ...goal, activities: activities || [] };
      })
    );

    return NextResponse.json(goalsWithActivities);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
