
export type Category = 'accommodation' | 'food' | 'laundry' | 'transport';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  category: Category;
  location: string;
  images: string[];
  ownerId: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: Date;
  availableFrom?: Date;
  availableTo?: Date;
  tags: string[];
  amenities?: string[];
  features?: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isOwner: boolean;
  avatar?: string;
}

// Mock data interfaces for our prototype
export interface MockDataStore {
  listings: Listing[];
  users: User[];
}
