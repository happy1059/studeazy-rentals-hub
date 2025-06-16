
import { supabase } from "@/integrations/supabase/client";

export const setupTablesAndData = async () => {
  try {
    // First, let's try to create the listings table
    const { error: listingsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.listings (
          id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          price INTEGER NOT NULL,
          price_unit TEXT NOT NULL,
          category TEXT NOT NULL CHECK (category IN ('accommodation', 'food', 'laundry', 'transport')),
          location TEXT NOT NULL,
          images TEXT[] NOT NULL DEFAULT '{}',
          owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          contact_phone TEXT NOT NULL,
          contact_email TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          available_from TIMESTAMP WITH TIME ZONE,
          available_to TIMESTAMP WITH TIME ZONE,
          tags TEXT[] NOT NULL DEFAULT '{}',
          amenities TEXT[] NOT NULL DEFAULT '{}',
          features JSONB DEFAULT '{}',
          status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'rented'))
        );
        
        ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Anyone can view active listings" 
          ON public.listings 
          FOR SELECT 
          USING (status = 'active');

        CREATE POLICY IF NOT EXISTS "Users can create their own listings" 
          ON public.listings 
          FOR INSERT 
          WITH CHECK (auth.uid() = owner_id);

        CREATE POLICY IF NOT EXISTS "Users can update their own listings" 
          ON public.listings 
          FOR UPDATE 
          USING (auth.uid() = owner_id);

        CREATE POLICY IF NOT EXISTS "Users can delete their own listings" 
          ON public.listings 
          FOR DELETE 
          USING (auth.uid() = owner_id);
      `
    });

    if (listingsError) {
      console.error('Error creating listings table:', listingsError);
    }

    // Create user_profiles table
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.user_profiles (
          id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT,
          location TEXT,
          avatar TEXT,
          is_owner BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );
        
        ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "Users can view all profiles" 
          ON public.user_profiles 
          FOR SELECT 
          TO authenticated
          USING (true);

        CREATE POLICY IF NOT EXISTS "Users can update their own profile" 
          ON public.user_profiles 
          FOR UPDATE 
          USING (auth.uid() = id);

        CREATE POLICY IF NOT EXISTS "Users can insert their own profile" 
          ON public.user_profiles 
          FOR INSERT 
          WITH CHECK (auth.uid() = id);
      `
    });

    if (profilesError) {
      console.error('Error creating user_profiles table:', profilesError);
    }

    console.log('Tables setup complete');
    return { success: true };
  } catch (error) {
    console.error('Error setting up tables:', error);
    return { success: false, error };
  }
};
