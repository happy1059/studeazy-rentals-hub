
import { supabase } from "@/integrations/supabase/client";
import { DatabaseUserProfile } from "@/types/database";
import { User } from "@/types";

const convertDatabaseUserToUser = (dbUser: DatabaseUserProfile): User => {
  return {
    id: dbUser.id,
    name: dbUser.name,
    email: '', // Email comes from auth.users, not our profile
    phone: dbUser.phone || '',
    isOwner: dbUser.is_owner,
    avatar: dbUser.avatar
  };
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles' as any)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return convertDatabaseUserToUser(data as DatabaseUserProfile);
  } catch (error) {
    console.error('Error in getUserById:', error);
    return null;
  }
};

export const getCurrentUserProfile = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    return getUserById(user.id);
  } catch (error) {
    console.error('Error in getCurrentUserProfile:', error);
    return null;
  }
};

export const updateUserProfile = async (updates: Partial<DatabaseUserProfile>): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { error } = await supabase
      .from('user_profiles' as any)
      .update(updates)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw error;
  }
};
