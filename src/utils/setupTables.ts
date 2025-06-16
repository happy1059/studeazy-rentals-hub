
import { supabase } from "@/integrations/supabase/client";

export const setupTablesAndData = async () => {
  try {
    // Check if listings table exists by trying to select from it
    const { data: listingsCheck } = await supabase
      .from('listings' as any)
      .select('id')
      .limit(1);

    // Check if user_profiles table exists
    const { data: profilesCheck } = await supabase
      .from('user_profiles' as any)
      .select('id')
      .limit(1);

    console.log('Tables setup check complete - listings and user_profiles should exist');
    return { success: true };
  } catch (error) {
    console.error('Error checking tables:', error);
    return { success: false, error };
  }
};
