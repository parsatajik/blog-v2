alter table "public"."activities" enable row level security;

alter table "public"."goals" enable row level security;

alter table "public"."users" enable row level security;

create policy "delete_own_activities"
on "public"."activities"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM goals g
  WHERE ((g.id = activities.goal_id) AND (g.user_id = auth.uid())))));


create policy "insert_own_activities"
on "public"."activities"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM goals g
  WHERE ((g.id = activities.goal_id) AND (g.user_id = auth.uid())))));


create policy "select_own_activities"
on "public"."activities"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM goals g
  WHERE ((g.id = activities.goal_id) AND (g.user_id = auth.uid())))));


create policy "update_own_activities"
on "public"."activities"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM goals g
  WHERE ((g.id = activities.goal_id) AND (g.user_id = auth.uid())))));


create policy "delete_own_goals"
on "public"."goals"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "insert_own_goals"
on "public"."goals"
as permissive
for insert
to public
with check ((user_id = auth.uid()));


create policy "select_own_goals"
on "public"."goals"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "update_own_goals"
on "public"."goals"
as permissive
for update
to public
using ((user_id = auth.uid()));


create policy "select_own_user"
on "public"."users"
as permissive
for select
to public
using ((id = auth.uid()));


create policy "update_own_user"
on "public"."users"
as permissive
for update
to public
using ((id = auth.uid()));



