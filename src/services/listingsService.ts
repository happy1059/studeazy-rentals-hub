
import { supabase } from "@/integrations/supabase/client";
import { DatabaseListing } from "@/types/database";
import { Listing } from "@/types";

// Convert database listing to app listing format
const convertDatabaseListingToListing = (dbListing: DatabaseListing): Listing => {
  return {
    id: dbListing.id,
    title: dbListing.title,
    description: dbListing.description,
    price: dbListing.price,
    priceUnit: dbListing.price_unit,
    category: dbListing.category,
    location: dbListing.location,
    images: dbListing.images.length > 0 ? dbListing.images : ['/placeholder.svg'],
    ownerId: dbListing.owner_id,
    contactPhone: dbListing.contact_phone,
    contactEmail: dbListing.contact_email,
    createdAt: new Date(dbListing.created_at),
    availableFrom: dbListing.available_from ? new Date(dbListing.available_from) : undefined,
    availableTo: dbListing.available_to ? new Date(dbListing.available_to) : undefined,
    tags: dbListing.tags,
    amenities: dbListing.amenities,
    features: dbListing.features
  };
};

export const getAllListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings:', error);
    return [];
  }

  return data.map(convertDatabaseListingToListing);
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching listing:', error);
    return null;
  }

  return convertDatabaseListingToListing(data);
};

export const getListingsByCategory = async (category: string): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('category', category)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings by category:', error);
    return [];
  }

  return data.map(convertDatabaseListingToListing);
};

export const searchListings = async (query: string): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'active')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching listings:', error);
    return [];
  }

  return data.map(convertDatabaseListingToListing);
};

export const createListing = async (listing: Omit<DatabaseListing, 'id' | 'created_at' | 'updated_at' | 'owner_id'>): Promise<string | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create listing');
  }

  const { data, error } = await supabase
    .from('listings')
    .insert([{
      ...listing,
      owner_id: user.id
    }])
    .select('id')
    .single();

  if (error) {
    console.error('Error creating listing:', error);
    throw error;
  }

  return data.id;
};
