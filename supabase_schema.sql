-- SponAi: Supabase SQL Schema Foundation

-- 1. EXTENSIONS (Useful for searching and UUIDs)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ORGANIZATIONS (DNA of organizers or companies)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    vision TEXT,
    resources JSONB DEFAULT '{}'::jsonb, -- Physical resources, team size, budget capacity
    audience_segments JSONB DEFAULT '[]'::jsonb, -- Target demographics
    marketing_objectives JSONB DEFAULT '[]'::jsonb, -- Increase brand awareness, drive sales, etc.
    website_url TEXT,
    logo_url TEXT,
    owner_id UUID REFERENCES auth.users(id) -- Linked to Supabase Auth
);

-- 3. EVENTS (Specific sponsorship opportunities)
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT, -- e.g., 'Sport', 'Tech', 'Art'
    date_start TIMESTAMP WITH TIME ZONE,
    date_end TIMESTAMP WITH TIME ZONE,
    location JSONB, -- { city: "Paris", venue: "Accor Arena", coordinates: { lat: ..., lng: ... } }
    expected_reach INTEGER,
    sponsorship_packages JSONB DEFAULT '[]'::jsonb, -- { title: "Gold", price: 5000, benefits: [...] }
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled'))
);

-- 4. SPONSORS (Database of potential partners)
CREATE TABLE IF NOT EXISTS sponsors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    domain TEXT, -- e.g., 'Beverage', 'Software'
    scraping_metadata JSONB DEFAULT '{}'::jsonb, -- Data from LinkedIn, website, news
    sponsorship_strategy_dna JSONB DEFAULT '{}'::jsonb, -- AI-extracted strategy
    typical_budget_range JSONB, -- { min: 1000, max: 100000 }
    brand_values JSONB DEFAULT '[]'::jsonb, 
    last_scraped_at TIMESTAMP WITH TIME ZONE
);

-- 5. MATCHES / COMPATIBILITY (Intersection logic)
CREATE TABLE IF NOT EXISTS sponsor_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    compatibility_score FLOAT CHECK (compatibility_score >= 0 AND compatibility_score <= 1),
    score_breakdown JSONB, -- AI explanation of the score
    status TEXT DEFAULT 'discovered' CHECK (status IN ('discovered', 'contacted', 'negotiating', 'signed', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. NEGOTIATIONS (Interaction history)
CREATE TABLE IF NOT EXISTS negotiations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES sponsor_matches(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    agent_id TEXT, -- identifier for the AI agent handling this
    history JSONB DEFAULT '[]'::jsonb, -- Array of messages, offers, and counter-offers
    current_state TEXT DEFAULT 'proposal_pending',
    is_automated BOOLEAN DEFAULT TRUE,
    final_contract_url TEXT
);

-- 7. RLS RULES (Base Security)
-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE negotiations ENABLE ROW LEVEL SECURITY;

-- Basic policy: users can only see their own organizations and related data
CREATE POLICY "Users can manage their own organizations" 
ON organizations FOR ALL 
USING (auth.uid() = owner_id);

CREATE POLICY "Users can manage their events" 
ON events FOR ALL 
USING (organization_id IN (SELECT id FROM organizations WHERE owner_id = auth.uid()));
