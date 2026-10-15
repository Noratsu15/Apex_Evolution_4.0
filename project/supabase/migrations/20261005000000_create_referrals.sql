/*
# Referrals for the "mother line"

## Overview
Tracks which new members were referred by each member of the mother line.
Each member has a referral link (`/?ref=<slug>`). When a new user signs up
through that link, a row is stored in `referrals` linking the new user to the
leader.

## New Tables
### mother_line_members
- `id`, `full_name`, `role` ('founder_mentor' | 'mentor' | 'leader'), `slug`
  (unique referral code), `email` (links the member to their login account),
  `sort_order`, `active`.

### referrals
- `id`, `leader_id` -> mother_line_members, `referred_user_id` (unique: a user
  can only be referred once), `created_at`.

## Security
- RLS enabled on both tables with NO client policies: all access goes through
  SECURITY DEFINER functions that check the caller.
- Visibility: the founder sees every referral; any other member sees only their own.
- A member is recognised by a confirmed auth email matching `mother_line_members.email`.

## Functions (RPC)
- get_referrer_preview(code)   -> name/role for the landing banner (anon + authenticated)
- capture_referral(code)       -> attributes the signed-in user to a leader (authenticated)
- my_mother_line_members()     -> members visible to the caller
- my_referrals()               -> referrals visible to the caller, with plan/payment status

## Setup required
Fill in each member's login email so they can see their panel:
  UPDATE mother_line_members SET email = 'name@example.com' WHERE slug = 'luz-segura';
Keep email confirmation enabled in Supabase Auth.
*/

CREATE TABLE IF NOT EXISTS mother_line_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('founder_mentor', 'mentor', 'leader')),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{2,60}$'),
  email text UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leader_id uuid NOT NULL REFERENCES mother_line_members(id) ON DELETE RESTRICT,
  referred_user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referrals_leader_id ON referrals(leader_id);

ALTER TABLE mother_line_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

INSERT INTO mother_line_members (full_name, role, slug, sort_order) VALUES
  ('Luz Segura',        'founder_mentor', 'luz-segura',        1),
  ('Luisana Gutierrez', 'mentor',         'luisana-gutierrez', 2),
  ('Yuly Cañas',        'mentor',         'yuly-canas',        3),
  ('Aldo Moreno',       'leader',         'aldo-moreno',       4),
  ('Pedro Estrella',    'leader',         'pedro-estrella',    5),
  ('Jhonny Gonzalez',   'leader',         'jhonny-gonzalez',   6)
ON CONFLICT (slug) DO NOTHING;

-- Internal helper: member id of the caller (confirmed email match), or NULL.
CREATE OR REPLACE FUNCTION public._caller_member_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT m.id
  FROM mother_line_members m
  JOIN auth.users u ON lower(u.email) = lower(m.email)
  WHERE u.id = auth.uid()
    AND u.email_confirmed_at IS NOT NULL
    AND m.active
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_referrer_preview(p_code text)
RETURNS TABLE (full_name text, role text)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT m.full_name, m.role
  FROM mother_line_members m
  WHERE m.slug = lower(trim(p_code)) AND m.active;
$$;

CREATE OR REPLACE FUNCTION public.capture_referral(p_code text)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_leader mother_line_members%ROWTYPE;
  v_created timestamptz;
  v_email text;
  v_rows int;
BEGIN
  IF v_uid IS NULL THEN RETURN false; END IF;

  SELECT * INTO v_leader
  FROM mother_line_members
  WHERE slug = lower(trim(p_code)) AND active;
  IF NOT FOUND THEN RETURN false; END IF;

  SELECT created_at, email INTO v_created, v_email FROM auth.users WHERE id = v_uid;

  -- Only new accounts can be attributed (blocks hijacking old accounts).
  IF v_created IS NULL OR v_created < now() - interval '7 days' THEN RETURN false; END IF;

  -- Members of the mother line cannot be referred (includes self-referral).
  IF EXISTS (
    SELECT 1 FROM mother_line_members m
    WHERE m.email IS NOT NULL AND lower(m.email) = lower(v_email)
  ) THEN
    RETURN false;
  END IF;

  INSERT INTO referrals (leader_id, referred_user_id)
  VALUES (v_leader.id, v_uid)
  ON CONFLICT (referred_user_id) DO NOTHING;

  GET DIAGNOSTICS v_rows = ROW_COUNT;
  RETURN v_rows > 0;
END;
$$;

CREATE OR REPLACE FUNCTION public.my_mother_line_members()
RETURNS TABLE (id uuid, full_name text, role text, slug text, sort_order int, is_me boolean)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, auth
AS $$
  WITH me AS (
    SELECT m.id, m.role FROM mother_line_members m WHERE m.id = public._caller_member_id()
  )
  SELECT m.id, m.full_name, m.role, m.slug, m.sort_order, (m.id = me.id) AS is_me
  FROM mother_line_members m, me
  WHERE m.active AND (m.id = me.id OR me.role = 'founder_mentor')
  ORDER BY m.sort_order;
$$;

CREATE OR REPLACE FUNCTION public.my_referrals()
RETURNS TABLE (
  referral_id uuid,
  leader_id uuid,
  full_name text,
  email text,
  plan text,
  payment_status text,
  amount_paid numeric,
  referred_at timestamptz
)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT
    r.id,
    r.leader_id,
    COALESCE(reg.full_name, u.raw_user_meta_data ->> 'full_name', ''),
    u.email::text,
    reg.plan,
    COALESCE(reg.payment_status, 'none'),
    COALESCE(reg.amount_paid, 0),
    r.created_at
  FROM referrals r
  JOIN public.my_mother_line_members() mm ON mm.id = r.leader_id
  JOIN auth.users u ON u.id = r.referred_user_id
  LEFT JOIN LATERAL (
    SELECT g.full_name, g.plan, g.payment_status, g.amount_paid
    FROM registrations g
    WHERE g.user_id = r.referred_user_id
    ORDER BY (g.payment_status = 'completed') DESC, g.created_at DESC
    LIMIT 1
  ) reg ON true
  ORDER BY r.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public._caller_member_id() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_referrer_preview(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.capture_referral(text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.my_mother_line_members() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.my_referrals() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.get_referrer_preview(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.capture_referral(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_mother_line_members() TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_referrals() TO authenticated;
