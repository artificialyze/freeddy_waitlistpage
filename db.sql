CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email STRING UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

SELECT * FROM waitlist;
