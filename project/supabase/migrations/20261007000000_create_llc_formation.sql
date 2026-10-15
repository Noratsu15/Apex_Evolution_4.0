/*
# LLC formation service (separate from memberships)

## Overview
Users choose either a membership OR the LLC formation service. This migration
adds the LLC order, its partners, its documents and a private storage bucket.

## Tables
### llc_orders
One row per purchase. Payment + terms acceptance are written by the client right
after PayPal capture (same pattern as `registrations`). Progress columns
(formation/ein/bank status, approved name) are team-managed: clients cannot
write them (column-level grants).
### llc_partners
Owners and ownership % (must add up to 100). Written only through
`submit_llc_intake`.
### llc_documents
Metadata of files in the private `llc-documents` bucket.
  source = 'client' -> uploaded by the user (passport, proof of address, selfie)
  source = 'team'   -> uploaded by the team (Articles of Organization,
                       Operating Agreement, EIN letter)

## Storage layout (bucket `llc-documents`, private, 10 MB, pdf/jpg/png/webp)
  <user_id>/client/<order_id>/...   user uploads
  <user_id>/team/<order_id>/...     team deliverables (upload from the Supabase dashboard)

## Security
RLS on every table. Users only read their own rows. Users can upload/delete only
under their own `client/` folder and can read (not modify) the `team/` folder.

## Team workflow (Supabase dashboard / SQL)
  UPDATE llc_orders SET formation_status='completed', approved_name='Acme LLC' WHERE id='...';
  Statuses: 'pending' | 'in_progress' | 'completed'. bank_provider: 'relay' | 'wise'.

## Referrals
`my_referrals()` is replaced so a completed LLC purchase also counts as an
activation (new column `product`: membership | llc | both).
*/

CREATE TABLE IF NOT EXISTS llc_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  amount_paid numeric(10,2) NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'completed', 'failed')),
  paypal_order_id text,
  paypal_capture_id text,
  terms_accepted_at timestamptz NOT NULL,
  terms_version text NOT NULL,

  -- Module 1: intake (filled through submit_llc_intake)
  intake_submitted_at timestamptz,
  state text CHECK (state IN ('wyoming', 'florida')),
  contact_email text,
  contact_phone text,
  name_options text[],

  -- Module 2: business profile for the bank compliance review
  business_description text,
  business_website text,

  -- Team-managed progress
  formation_status text NOT NULL DEFAULT 'pending'
    CHECK (formation_status IN ('pending', 'in_progress', 'completed')),
  ein_status text NOT NULL DEFAULT 'pending'
    CHECK (ein_status IN ('pending', 'in_progress', 'completed')),
  bank_status text NOT NULL DEFAULT 'pending'
    CHECK (bank_status IN ('pending', 'in_progress', 'completed')),
  bank_provider text CHECK (bank_provider IN ('relay', 'wise')),
  approved_name text,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_llc_orders_user_id ON llc_orders(user_id);

CREATE TABLE IF NOT EXISTS llc_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES llc_orders(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  ownership_pct numeric(5,2) NOT NULL CHECK (ownership_pct > 0 AND ownership_pct <= 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_llc_partners_order_id ON llc_partners(order_id);

CREATE TABLE IF NOT EXISTS llc_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES llc_orders(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  doc_type text NOT NULL CHECK (doc_type IN (
    'passport', 'proof_of_address', 'selfie',
    'articles_of_organization', 'operating_agreement', 'ein_letter', 'other'
  )),
  source text NOT NULL DEFAULT 'client' CHECK (source IN ('client', 'team')),
  label text,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_llc_documents_order_id ON llc_documents(order_id);

ALTER TABLE llc_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE llc_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE llc_documents ENABLE ROW LEVEL SECURITY;

-- llc_orders policies
DROP POLICY IF EXISTS "select_own_llc_orders" ON llc_orders;
CREATE POLICY "select_own_llc_orders" ON llc_orders FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_llc_orders" ON llc_orders;
CREATE POLICY "insert_own_llc_orders" ON llc_orders FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_llc_orders" ON llc_orders;
CREATE POLICY "update_own_llc_orders" ON llc_orders FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- llc_partners policies (read-only for clients; writes go through the RPC)
DROP POLICY IF EXISTS "select_own_llc_partners" ON llc_partners;
CREATE POLICY "select_own_llc_partners" ON llc_partners FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- llc_documents policies
DROP POLICY IF EXISTS "select_own_llc_documents" ON llc_documents;
CREATE POLICY "select_own_llc_documents" ON llc_documents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_llc_documents" ON llc_documents;
CREATE POLICY "insert_own_llc_documents" ON llc_documents FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND source = 'client'
    AND doc_type IN ('passport', 'proof_of_address', 'selfie', 'other')
    AND storage_path LIKE (auth.uid()::text || '/client/%')
    AND EXISTS (SELECT 1 FROM llc_orders o WHERE o.id = order_id AND o.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_client_llc_documents" ON llc_documents;
CREATE POLICY "delete_own_client_llc_documents" ON llc_documents FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND source = 'client');

-- Column-level privileges: clients cannot touch payment-independent progress fields.
REVOKE ALL ON llc_orders, llc_partners, llc_documents FROM anon;
REVOKE INSERT, UPDATE, DELETE ON llc_orders FROM authenticated;
GRANT INSERT (
  user_id, email, full_name, amount_paid, payment_status,
  paypal_order_id, paypal_capture_id, terms_accepted_at, terms_version
) ON llc_orders TO authenticated;
GRANT UPDATE (business_description, business_website) ON llc_orders TO authenticated;
REVOKE INSERT, UPDATE, DELETE ON llc_partners FROM authenticated;

-- Private storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'llc-documents', 'llc-documents', false, 10485760,
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
  SET public = false,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "llc_docs_select_own" ON storage.objects;
CREATE POLICY "llc_docs_select_own" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'llc-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "llc_docs_insert_own_client" ON storage.objects;
CREATE POLICY "llc_docs_insert_own_client" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'llc-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND (storage.foldername(name))[2] = 'client'
  );

DROP POLICY IF EXISTS "llc_docs_delete_own_client" ON storage.objects;
CREATE POLICY "llc_docs_delete_own_client" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'llc-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND (storage.foldername(name))[2] = 'client'
  );

-- Module 1 intake: validates and stores contact data, name options and partners atomically.
CREATE OR REPLACE FUNCTION public.submit_llc_intake(
  p_order_id uuid,
  p_state text,
  p_contact_email text,
  p_contact_phone text,
  p_name_options text[],
  p_partners jsonb
)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order llc_orders%ROWTYPE;
  v_names text[];
  v_total numeric := 0;
  v_count int;
  v_partner jsonb;
BEGIN
  SELECT * INTO v_order FROM llc_orders WHERE id = p_order_id AND user_id = auth.uid() FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'order_not_found'; END IF;
  IF v_order.payment_status <> 'completed' THEN RAISE EXCEPTION 'payment_required'; END IF;
  IF v_order.formation_status <> 'pending' THEN RAISE EXCEPTION 'intake_locked'; END IF;

  IF p_state NOT IN ('wyoming', 'florida') THEN RAISE EXCEPTION 'invalid_state'; END IF;
  IF p_contact_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'invalid_email'; END IF;
  IF char_length(trim(coalesce(p_contact_phone, ''))) < 7 THEN RAISE EXCEPTION 'invalid_phone'; END IF;

  SELECT array_agg(DISTINCT trim(n)) INTO v_names
  FROM unnest(coalesce(p_name_options, ARRAY[]::text[])) AS n
  WHERE char_length(trim(n)) BETWEEN 3 AND 100;
  IF coalesce(array_length(v_names, 1), 0) NOT BETWEEN 2 AND 3 THEN RAISE EXCEPTION 'invalid_names'; END IF;

  IF jsonb_typeof(p_partners) <> 'array' THEN RAISE EXCEPTION 'invalid_partners'; END IF;
  v_count := jsonb_array_length(p_partners);
  IF v_count NOT BETWEEN 1 AND 10 THEN RAISE EXCEPTION 'invalid_partners'; END IF;

  FOR v_partner IN SELECT * FROM jsonb_array_elements(p_partners) LOOP
    IF char_length(trim(coalesce(v_partner ->> 'full_name', ''))) < 2 THEN RAISE EXCEPTION 'invalid_partners'; END IF;
    v_total := v_total + (v_partner ->> 'ownership_pct')::numeric;
  END LOOP;
  IF v_total <> 100 THEN RAISE EXCEPTION 'ownership_must_total_100'; END IF;

  DELETE FROM llc_partners WHERE order_id = p_order_id;
  INSERT INTO llc_partners (order_id, user_id, full_name, ownership_pct)
  SELECT p_order_id, auth.uid(), trim(e ->> 'full_name'), (e ->> 'ownership_pct')::numeric
  FROM jsonb_array_elements(p_partners) AS e;

  UPDATE llc_orders SET
    state = p_state,
    contact_email = trim(p_contact_email),
    contact_phone = trim(p_contact_phone),
    name_options = v_names,
    intake_submitted_at = now(),
    updated_at = now()
  WHERE id = p_order_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_llc_intake(uuid, text, text, text, text[], jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_llc_intake(uuid, text, text, text, text[], jsonb) TO authenticated;

-- Referrals: a completed LLC purchase also counts as an activation.
DROP FUNCTION IF EXISTS public.my_referrals();

CREATE FUNCTION public.my_referrals()
RETURNS TABLE (
  referral_id uuid,
  leader_id uuid,
  full_name text,
  email text,
  plan text,
  product text,
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
    reg.product,
    COALESCE(reg.payment_status, 'none'),
    COALESCE(reg.amount_paid, 0),
    r.created_at
  FROM referrals r
  JOIN public.my_mother_line_members() mm ON mm.id = r.leader_id
  JOIN auth.users u ON u.id = r.referred_user_id
  LEFT JOIN LATERAL (
    SELECT
      (array_agg(x.full_name ORDER BY x.created_at DESC))[1] AS full_name,
      CASE WHEN bool_or(x.payment_status = 'completed') THEN 'completed'
           ELSE (array_agg(x.payment_status ORDER BY x.created_at DESC))[1] END AS payment_status,
      COALESCE(sum(x.amount_paid) FILTER (WHERE x.payment_status = 'completed'), 0) AS amount_paid,
      (array_agg(x.plan ORDER BY (x.payment_status = 'completed') DESC, x.created_at DESC))[1] AS plan,
      CASE WHEN bool_or(x.product = 'membership' AND x.payment_status = 'completed')
                AND bool_or(x.product = 'llc' AND x.payment_status = 'completed') THEN 'both'
           ELSE (array_agg(x.product ORDER BY (x.payment_status = 'completed') DESC, x.created_at DESC))[1] END AS product
    FROM (
      SELECT g.full_name, g.plan, g.payment_status, g.amount_paid, 'membership'::text AS product, g.created_at
      FROM registrations g WHERE g.user_id = r.referred_user_id
      UNION ALL
      SELECT o.full_name, 'LLC'::text, o.payment_status, o.amount_paid, 'llc'::text, o.created_at
      FROM llc_orders o WHERE o.user_id = r.referred_user_id
    ) x
  ) reg ON true
  ORDER BY r.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.my_referrals() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_referrals() TO authenticated;
