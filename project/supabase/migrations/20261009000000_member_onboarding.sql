/*
# Member onboarding (free sign-up + WhatsApp community group)

## Overview
Sign-up is free. Right after creating an account, every user who is NOT part of the
mother line sees a welcome modal with the WhatsApp group link. This table remembers
whether the welcome was shown and whether the user confirmed joining the group.

## New table: member_onboarding
- user_id           (PK, = auth.users.id)
- welcome_seen_at   set when the welcome modal is closed/used
- whatsapp_joined_at set when the user confirms "I already joined"

## Security
RLS: each user reads and writes only their own row. The team can see who joined
from the Supabase table editor / SQL.

## Existing users
Backfilled with welcome_seen_at = now(), so only NEW accounts get the modal
(existing members who have not joined still see the reminder card in their portal).
*/

CREATE TABLE IF NOT EXISTS member_onboarding (
  user_id uuid PRIMARY KEY DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  welcome_seen_at timestamptz,
  whatsapp_joined_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE member_onboarding ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_onboarding" ON member_onboarding;
CREATE POLICY "select_own_onboarding" ON member_onboarding FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_onboarding" ON member_onboarding;
CREATE POLICY "insert_own_onboarding" ON member_onboarding FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_onboarding" ON member_onboarding;
CREATE POLICY "update_own_onboarding" ON member_onboarding FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

REVOKE ALL ON member_onboarding FROM anon;

INSERT INTO member_onboarding (user_id, welcome_seen_at)
SELECT id, now() FROM auth.users
ON CONFLICT (user_id) DO NOTHING;
