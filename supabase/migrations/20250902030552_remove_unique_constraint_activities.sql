-- Remove unique constraint to allow multiple activities per goal per day
-- This enables users to log multiple activities for the same goal on the same date

-- Drop the unique constraint
ALTER TABLE "public"."activities" DROP CONSTRAINT "activities_goal_id_date_key";

-- Drop the unique index (it will be replaced with a regular index)
DROP INDEX IF EXISTS "activities_goal_id_date_key";

-- Keep the regular index for performance (but not unique)
-- Note: activities_goal_date_idx already exists from the initial migration
