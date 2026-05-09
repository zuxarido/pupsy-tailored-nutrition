-- Run this in the Supabase SQL editor to set up the schema

-- Dog profiles
CREATE TABLE IF NOT EXISTS dog_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  breed text,
  age_category text,
  sex text,
  is_neutered boolean DEFAULT false,
  weight_kg numeric,
  body_condition text,
  activity_level text,
  health_conditions text[] DEFAULT '{}',
  current_food text,
  recommended_recipe text,
  daily_grams integer,
  daily_price numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  dog_profile_id uuid REFERENCES dog_profiles(id),
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_subscription_id text,
  plan_type text DEFAULT 'monthly',
  amount numeric,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE dog_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own profiles"
  ON dog_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own subscriptions"
  ON subscriptions FOR ALL USING (auth.uid() = user_id);
-- Extend schema with customer profiles
CREATE TABLE customer_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  first_name text,
  last_name text,
  phone text,
  shipping_address text,
  city text,
  pincode text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own customer profile"
  ON customer_profiles FOR ALL USING (auth.uid() = user_id);

ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS next_billing_date timestamptz;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS delivery_instructions text;

-- Auto-create customer_profiles when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.customer_profiles (user_id, phone)
  VALUES (NEW.id, NEW.phone)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Wellness Logs
CREATE TABLE IF NOT EXISTS wellness_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  dog_profile_id uuid REFERENCES dog_profiles(id) ON DELETE CASCADE,
  log_date date DEFAULT CURRENT_DATE,
  weight numeric,
  calories integer,
  energy text,
  meal text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(dog_profile_id, log_date)
);

ALTER TABLE wellness_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own wellness logs"
  ON wellness_logs FOR ALL USING (auth.uid() = user_id);

