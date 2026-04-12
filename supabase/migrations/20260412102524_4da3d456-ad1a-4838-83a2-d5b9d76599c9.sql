
-- Create donors table
CREATE TABLE public.donors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_whatsapp TEXT NOT NULL,
  phone_secondary TEXT,
  wilaya TEXT,
  municipality TEXT,
  blood_type TEXT NOT NULL,
  last_donation_date DATE,
  date_of_birth DATE,
  gender TEXT DEFAULT 'male',
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_donations INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donation_history table
CREATE TABLE public.donation_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID NOT NULL REFERENCES public.donors(id) ON DELETE CASCADE,
  donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_logs table
CREATE TABLE public.contact_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID NOT NULL REFERENCES public.donors(id) ON DELETE CASCADE,
  contacted_by TEXT,
  contact_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  contact_method TEXT NOT NULL DEFAULT 'whatsapp',
  response_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_logs ENABLE ROW LEVEL SECURITY;

-- Donors policies (authenticated users only)
CREATE POLICY "Authenticated users can view donors" ON public.donors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert donors" ON public.donors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update donors" ON public.donors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete donors" ON public.donors FOR DELETE TO authenticated USING (true);

-- Allow anonymous inserts for the public registration form
CREATE POLICY "Anonymous can insert donors" ON public.donors FOR INSERT TO anon WITH CHECK (true);

-- Donation history policies
CREATE POLICY "Authenticated users can view donation_history" ON public.donation_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert donation_history" ON public.donation_history FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update donation_history" ON public.donation_history FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete donation_history" ON public.donation_history FOR DELETE TO authenticated USING (true);

-- Contact logs policies
CREATE POLICY "Authenticated users can view contact_logs" ON public.contact_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert contact_logs" ON public.contact_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update contact_logs" ON public.contact_logs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete contact_logs" ON public.contact_logs FOR DELETE TO authenticated USING (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for donors
CREATE TRIGGER update_donors_updated_at
  BEFORE UPDATE ON public.donors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
