/*
# Create registrations table for landing page sign-ups

## Overview
This migration creates a `registrations` table to store user sign-ups
from the landing page. Each registration records the user's Supabase
auth identity, the plan they selected, and the PayPal order used to
complete payment. A separate `payments` table tracks individual PayPal
payment attempts.

## New Tables

### registrations
- `id` (uuid, primary key) — unique registration record
- `user_id` (uuid, not null, defaults to auth.uid()) — the Supabase auth user
- `email` (text, unique, not null) — user email (also in auth.users)
- `full_name` (text, not null) — display name collected at sign-up
- `plan` (text, not null) — selected plan key ('starter', 'pro', 'business')
- `amount_paid` (numeric, not null, default 0) — amount charged via PayPal
- `payment_status` (text, not null, default 'pending') — 'pending' | 'completed' | 'failed'
- `paypal_order_id` (text) — PayPal order ID from checkout
- `paypal_capture_id` (text) — PayPal capture ID after payment is captured
- `created_at` (timestamptz, default now()) — record creation time
- `updated_at` (timestamptz, default now()) — last update time

### payments
- `id` (uuid, primary key) — unique payment record
- `registration_id` (uuid, references registrations(id)) — linked registration
- `user_id` (uuid, not null, defaults to auth.uid()) — owning user
- `paypal_order_id` (text, not null) — PayPal order ID
- `paypal_capture_id` (text) — capture ID after successful payment
- `amount` (numeric, not null) — amount charged
- `currency` (text, not null, default 'USD')
- `status` (text, not null, default 'created') — 'created' | 'approved' | 'completed' | 'failed'
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- Only the authenticated owner (auth.uid() = user_id) can SELECT, INSERT,
  UPDATE, or DELETE their own rows.
- 4 separate policies per table (SELECT, INSERT, UPDATE, DELETE).

## Notes
1. The `user_id` column defaults to `auth.uid()` so frontend inserts
   that omit user_id still satisfy the INSERT WITH CHECK policy.
2. The `registrations.email` column mirrors auth.users email for
   convenience; it is unique to prevent duplicate registrations.
3. An index on `user_id` speeds up ownership-filtered queries.
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  plan text NOT NULL,
  amount_paid numeric(10,2) NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'pending',
  paypal_order_id text,
  paypal_capture_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_registrations" ON registrations;
CREATE POLICY "select_own_registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_registrations" ON registrations;
CREATE POLICY "insert_own_registrations"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_registrations" ON registrations;
CREATE POLICY "update_own_registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_registrations" ON registrations;
CREATE POLICY "delete_own_registrations"
  ON registrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid REFERENCES registrations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  paypal_order_id text NOT NULL,
  paypal_capture_id text,
  amount numeric(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'created',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_registration_id ON payments(registration_id);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_payments" ON payments;
CREATE POLICY "select_own_payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_payments" ON payments;
CREATE POLICY "insert_own_payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_payments" ON payments;
CREATE POLICY "update_own_payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_payments" ON payments;
CREATE POLICY "delete_own_payments"
  ON payments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
