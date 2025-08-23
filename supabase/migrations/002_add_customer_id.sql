-- Migration: Add customer_id columns to users and home_content tables
-- Date: 2025-08-22

-- Add customer_id column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS customer_id INTEGER;

-- Add customer_id column to home_content table
ALTER TABLE home_content ADD COLUMN IF NOT EXISTS customer_id INTEGER;

-- Create index for customer_id on home_content for better performance
CREATE INDEX IF NOT EXISTS idx_home_content_customer_id ON home_content(customer_id);

-- Update existing records to have customer_id = 1 (default business)
UPDATE users SET customer_id = 1 WHERE customer_id IS NULL;
UPDATE home_content SET customer_id = 1 WHERE customer_id IS NULL;

-- Make customer_id NOT NULL after setting default values
ALTER TABLE users ALTER COLUMN customer_id SET NOT NULL;
ALTER TABLE home_content ALTER COLUMN customer_id SET NOT NULL;

