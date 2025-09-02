import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { title, description, category, startDate, targetDate, color, icon } =
      await request.json();

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { data, error } = await supabase
      .from("goals")
      .insert({
        title,
        description,
        category,
        start_date: startDate ?? null,
        target_date: targetDate ?? null,
        color: color ?? null,
        icon: icon ?? null,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.log("error", error);
      return new Response(error.message, { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const goalId = searchParams.get("goalId");

  if (!goalId) {
    return new Response("Goal ID is required", { status: 400 });
  }

  const supabase = await createClient();

  const jwt = request.headers.get("Authorization")?.split(" ")[1];
  const refreshToken = request.headers.get("refreshToken");

  if (!jwt || !refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  supabase.auth.setSession({
    access_token: jwt,
    refresh_token: refreshToken,
  });

  const { data, error } = await supabase
    .from("goals")
    .select("*, activities(*)")
    .eq("id", goalId)
    .single();

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
