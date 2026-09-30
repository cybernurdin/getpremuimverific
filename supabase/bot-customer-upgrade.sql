-- Bot customer identity upgrade
-- Run once in the Supabase SQL Editor before deploying bot account creation.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_telegram_chat_id_unique
  ON public.profiles (telegram_chat_id)
  WHERE telegram_chat_id IS NOT NULL;

-- Profiles created by WhatsApp use the verified sender phone number supplied
-- by Meta. Telegram profiles use telegram_chat_id and do not invent a phone.

-- A short-lived, unguessable link lets a bot customer open a secure top-up
-- page without first creating a separate website login. Only server code uses
-- this table; the token is the customer's temporary capability.
CREATE TABLE IF NOT EXISTS public.bot_payment_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount_xaf NUMERIC(12, 2) NOT NULL CHECK (amount_xaf >= 500),
  payment_reference TEXT UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS bot_payment_links_token_idx
  ON public.bot_payment_links (token);

ALTER TABLE public.bot_payment_links ENABLE ROW LEVEL SECURITY;
-- No browser policy: payment links are read and redeemed only by trusted
-- server routes using the Supabase service-role key.
