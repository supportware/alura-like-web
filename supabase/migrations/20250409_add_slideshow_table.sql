-- Create slideshow table
CREATE TABLE IF NOT EXISTS public.slideshow (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_base64 TEXT NOT NULL,
  primary_button_text TEXT,
  secondary_button_text TEXT,
  primary_button_url TEXT,
  secondary_button_url TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for slideshow
ALTER TABLE public.slideshow ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active slideshow items
CREATE POLICY "Anyone can view active slideshow items" 
  ON public.slideshow 
  FOR SELECT 
  USING (active = true);

-- Allow authenticated users to manage slideshow
CREATE POLICY "Authenticated users can manage slideshow" 
  ON public.slideshow 
  USING (auth.role() = 'authenticated');

-- Add realtime support
ALTER PUBLICATION supabase_realtime ADD TABLE public.slideshow;
