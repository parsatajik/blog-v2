drop policy "delete_own_activities" on "public"."activities";

drop policy "insert_own_activities" on "public"."activities";

drop policy "select_own_activities" on "public"."activities";

drop policy "update_own_activities" on "public"."activities";

drop policy "delete_own_goals" on "public"."goals";

drop policy "insert_own_goals" on "public"."goals";

drop policy "select_own_goals" on "public"."goals";

drop policy "update_own_goals" on "public"."goals";

drop policy "select_own_user" on "public"."users";

drop policy "update_own_user" on "public"."users";

alter table "public"."activities" disable row level security;

alter table "public"."goals" disable row level security;

alter table "public"."users" disable row level security;


