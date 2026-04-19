-- Pupsy Supabase Mock Seed Data
-- Run this in the Supabase SQL Editor after running the schema to quickly populate your database for testing.

-- 1. Create a mock user in customer_profiles (You should ideally have a real auth.users ID first, but for testing UI without RLS we can mock it if RLS is bypassed or we just use null if not strict, but user_id is a foreign key. It's usually better to create the user in the Supabase Auth UI, copy their UUID, and replace 'YOUR-AUTH-USER-ID' below.

-- UPDATE THIS WITH YOUR ACTUAL USER ID FROM SUPABASE AUTH -> USERS
-- \set user_id 'YOUR-AUTH-USER-ID';

-- Insert a customer profile
-- INSERT INTO customer_profiles (user_id, first_name, last_name, phone, shipping_address, city, pincode)
-- VALUES (
--   :'user_id',
--   'Jaskaran',
--   'Singh',
--   '+91 9876543210',
--   '123 Pupsy HQ, Koramangala 4th Block',
--   'Bengaluru',
--   '560034'
-- );

-- Insert a dog profile
INSERT INTO dog_profiles (name, breed, age_category, sex, is_neutered, weight_kg, body_condition, activity_level, health_conditions, current_food, recommended_recipe, daily_grams, daily_price)
VALUES (
  'Buddy',
  'Golden Retriever',
  'adult',
  'male',
  true,
  30.5,
  'ideal',
  'high',
  ARRAY['None'],
  'kibble',
  'Chicken & Brown Rice',
  600,
  180
);

-- Insert a subscription for the dog
INSERT INTO subscriptions (dog_profile_id, plan_id, status, next_billing_date, delivery_instructions)
VALUES (
  (SELECT id FROM dog_profiles WHERE name = 'Buddy' LIMIT 1),
  'monthly',
  'active',
  now() + interval '30 days',
  'Leave by the front gate securely'
);
