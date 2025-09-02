import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Creates a new activity for a goal
 */
export async function POST(request: Request) {
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

    const body = await request.json();
    const { goal_id, date, completed, value, unit, notes } = body;

    if (!goal_id || !date) {
      return NextResponse.json(
        { error: "Goal ID and date are required" },
        { status: 400 }
      );
    }

    // Verify the goal belongs to the authenticated user
    const { data: goal, error: goalError } = await supabase
      .from("goals")
      .select("user_id")
      .eq("id", goal_id)
      .single();

    if (goalError || !goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    if (goal.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Always create a new activity (users can have multiple activities per day)
    const { data: newActivity, error: insertError } = await supabase
      .from("activities")
      .insert({
        goal_id,
        date,
        completed,
        value: value || null,
        unit: unit || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
