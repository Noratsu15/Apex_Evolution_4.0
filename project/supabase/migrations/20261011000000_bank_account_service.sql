/*
# International bank account opening service (USD 680)

## Overview
A separate paid service, independent from memberships and from LLC formation.
It reuses the LLC order plumbing (payment, accepted terms, documents, private
storage, progress tracking) through a new `service` column on `llc_orders`:
  service = 'llc'  -> LLC formation (unchanged)
  service = 'bank' -> international bank account opening (bank_status is tracked)

## Changes
- llc_orders.service ('llc' | 'bank'), insertable by the client at purchase time.
- Clients may now also upload articles_of_organization, operating_agreement and
  ein_letter (required by the bank platforms) for their own orders.
- my_referrals(): a completed bank order counts as an activation; `product` is now
  membership | llc | bank | multiple.

## Team workflow
  UPDATE llc_orders SET bank_status='in_progress', bank_provider='relay' WHERE id='...';
*/

ALTER TABLE llc_orders
  ADD COLUMN IF NOT EXISTS service text NOT NULL DEFAULT 'llc'
  CHECK (service IN ('llc', 'bank'));

GRANT INSERT (service) ON llc_orders TO authenticated;

DROP POLICY IF EXISTS "insert_own_llc_documents" ON llc_documents;
CREATE POLICY "insert_own_llc_documents" ON llc_documents FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND source = 'client'
    AND doc_type IN (
      'passport', 'proof_of_address', 'selfie',
      'articles_of_organization', 'operating_agreement', 'ein_letter', 'other'
    )
    AND storage_path LIKE (auth.uid()::text || '/client/%')
    AND EXISTS (SELECT 1 FROM llc_orders o WHERE o.id = order_id AND o.user_id = auth.uid())
  );

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
      CASE WHEN count(DISTINCT x.product) FILTER (WHERE x.payment_status = 'completed') > 1 THEN 'multiple'
           ELSE (array_agg(x.product ORDER BY (x.payment_status = 'completed') DESC, x.created_at DESC))[1] END AS product
    FROM (
      SELECT g.full_name, g.plan, g.payment_status, g.amount_paid, 'membership'::text AS product, g.created_at
      FROM registrations g WHERE g.user_id = r.referred_user_id
      UNION ALL
      SELECT o.full_name,
             CASE WHEN o.service = 'bank' THEN 'Bank' ELSE 'LLC' END,
             o.payment_status, o.amount_paid, o.service, o.created_at
      FROM llc_orders o WHERE o.user_id = r.referred_user_id
    ) x
  ) reg ON true
  ORDER BY r.created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.my_referrals() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_referrals() TO authenticated;
