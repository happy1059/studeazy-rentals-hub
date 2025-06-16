
export interface DatabaseListing {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: string;
  category: 'accommodation' | 'food' | 'laundry' | 'transport';
  location: string;
  images: string[];
  owner_id: string;
  contact_phone: string;
  contact_email: string;
  created_at: string;
  updated_at: string;
  available_from?: string;
  available_to?: string;
  tags: string[];
  amenities: string[];
  features?: Record<string, any>;
  status: 'active' | 'inactive' | 'rented';
}

export interface DatabaseUserProfile {
  id: string;
  name: string;
  phone?: string;
  location?: string;
  avatar?: string;
  is_owner: boolean;
  created_at: string;
  updated_at: string;
}
