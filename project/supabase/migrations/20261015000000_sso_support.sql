/*
# Support for single sign-on into the PHP system

1. my_referrer(): lets the signed-in user read WHO referred them (slug + name only),
   so the SSO token can carry the sponsor without exposing the referrals table.
2. Unique PayPal capture: one real payment can activate only ONE membership row.
   (If your table already has duplicate capture ids, the index is skipped with a notice;
   clean the duplicates and run the CREATE UNIQUE INDEX statement again.)
*/

CREATE OR REPLACE FUNCTION public.my_referrer()
RETURNS TABLE (slug text, full_name text)
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT m.slug, m.full_name
  FROM referrals r
  JOIN mother_line_members m ON m.id = r.leader_id
  WHERE r.referred_user_id = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.my_referrer() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_referrer() TO authenticated;

DO $$
BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS registrations_paypal_capture_uniq
    ON registrations (paypal_capture_id) WHERE paypal_capture_id IS NOT NULL;
EXCEPTION WHEN unique_violation THEN
  RAISE NOTICE 'registrations has duplicate paypal_capture_id values; unique index skipped. Review them and retry.';
END $$;
