
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
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return convertDatabaseUserToUser(data);
};

export const getCurrentUserProfile = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  return getUserById(user.id);
};

export const updateUserProfile = async (updates: Partial<DatabaseUserProfile>): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', user.id);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
