
import { Listing, User, MockDataStore } from '../types';

// Mock Users
const users: User[] = [
  {
    id: 'user1',
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '9876543210',
    isOwner: true,
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 'user2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '8765432109',
    isOwner: true,
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 'user3',
    name: 'Amit Patel',
    email: 'amit@example.com',
    phone: '7654321098',
    isOwner: true,
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 'user4',
    name: 'Deepa Verma',
    email: 'deepa@example.com',
    phone: '6543210987',
    isOwner: true,
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
];

// Mock Listings
const listings: Listing[] = [
  {
    id: 'listing1',
    title: 'Cozy Single Room near University',
    description: 'A comfortable single room with attached bathroom, 5 minutes walk from university gate. Includes WiFi, desk and cupboard.',
    price: 5000,
    priceUnit: 'month',
    category: 'accommodation',
    location: 'Gandhi Nagar, Delhi',
    images: ['/placeholder.svg', '/placeholder.svg'],
    ownerId: 'user1',
    contactPhone: '9876543210',
    contactEmail: 'raj@example.com',
    createdAt: new Date('2023-04-10'),
    availableFrom: new Date('2023-05-01'),
    tags: ['single room', 'near university', 'wifi'],
    amenities: ['WiFi', 'Attached Bathroom', 'Study Table', 'Cupboard']
  },
  {
    id: 'listing2',
    title: 'Shared 2BHK Apartment',
    description: 'Furnished 2BHK apartment to share with another student. Common living room and kitchen. Separate bedrooms.',
    price: 8000,
    priceUnit: 'month',
    category: 'accommodation',
    location: 'Malviya Nagar, Delhi',
    images: ['/placeholder.svg', '/placeholder.svg'],
    ownerId: 'user1',
    contactPhone: '9876543210',
    contactEmail: 'raj@example.com',
    createdAt: new Date('2023-04-05'),
    availableFrom: new Date('2023-05-15'),
    tags: ['shared apartment', '2BHK', 'furnished'],
    amenities: ['WiFi', 'Furnished', 'TV', 'Refrigerator', 'Washing Machine']
  },
  {
    id: 'listing3',
    title: 'Vegetarian Tiffin Service',
    description: 'Homemade vegetarian meals delivered to your doorstep. Morning and evening delivery available.',
    price: 2500,
    priceUnit: 'month',
    category: 'food',
    location: 'Rohini, Delhi',
    images: ['/placeholder.svg'],
    ownerId: 'user2',
    contactPhone: '8765432109',
    contactEmail: 'priya@example.com',
    createdAt: new Date('2023-04-02'),
    tags: ['vegetarian', 'homemade', 'daily delivery'],
    features: {
      meals: ['Breakfast', 'Dinner'],
      deliveryTimes: ['8:00 AM', '7:00 PM']
    }
  },
  {
    id: 'listing4',
    title: 'Premium Laundry Service',
    description: 'Weekly laundry pickup and delivery service. Wash, iron, and fold included.',
    price: 800,
    priceUnit: 'month',
    category: 'laundry',
    location: 'Kirti Nagar, Delhi',
    images: ['/placeholder.svg'],
    ownerId: 'user3',
    contactPhone: '7654321098',
    contactEmail: 'amit@example.com',
    createdAt: new Date('2023-03-25'),
    tags: ['laundry', 'ironing', 'pickup service'],
    features: {
      pickupDays: ['Monday', 'Thursday'],
      deliveryDays: ['Tuesday', 'Friday']
    }
  },
  {
    id: 'listing5',
    title: 'Mountain Bike for Rent',
    description: '21-speed mountain bike available for rent. Perfect for getting around campus. Helmet included.',
    price: 500,
    priceUnit: 'month',
    category: 'transport',
    location: 'Karol Bagh, Delhi',
    images: ['/placeholder.svg'],
    ownerId: 'user4',
    contactPhone: '6543210987',
    contactEmail: 'deepa@example.com',
    createdAt: new Date('2023-04-15'),
    tags: ['mountain bike', '21-speed', 'helmet included'],
    features: {
      brand: 'Trek',
      condition: 'Good',
      accessories: ['Helmet', 'Lock', 'Bell']
    }
  },
  {
    id: 'listing6',
    title: 'Honda Activa Scooter',
    description: 'Well-maintained Honda Activa scooter available for rent. Economical and reliable for daily commute.',
    price: 2000,
    priceUnit: 'month',
    category: 'transport',
    location: 'Dwarka, Delhi',
    images: ['/placeholder.svg'],
    ownerId: 'user4',
    contactPhone: '6543210987',
    contactEmail: 'deepa@example.com',
    createdAt: new Date('2023-04-08'),
    tags: ['scooter', 'honda activa', 'fuel efficient'],
    features: {
      model: 'Honda Activa 5G',
      mileage: '45 km/l',
      condition: 'Excellent',
      requirements: ['Valid Driving License', 'Security Deposit']
    }
  },
  {
    id: 'listing7',
    title: 'Non-Veg Tiffin Service',
    description: 'Delicious non-vegetarian meals prepared fresh daily. Wide variety of dishes.',
    price: 3000,
    priceUnit: 'month',
    category: 'food',
    location: 'Saket, Delhi',
    images: ['/placeholder.svg'],
    ownerId: 'user2',
    contactPhone: '8765432109',
    contactEmail: 'priya@example.com',
    createdAt: new Date('2023-03-30'),
    tags: ['non-veg', 'homemade', 'daily delivery'],
    features: {
      meals: ['Lunch', 'Dinner'],
      deliveryTimes: ['12:00 PM', '8:00 PM'],
      specialMenu: ['Chicken Biryani', 'Mutton Curry', 'Fish Fry']
    }
  },
  {
    id: 'listing8',
    title: 'PG Accommodation with Meals',
    description: 'Fully furnished paying guest accommodation with 3 meals included. Walking distance to metro station.',
    price: 12000,
    priceUnit: 'month',
    category: 'accommodation',
    location: 'Laxmi Nagar, Delhi',
    images: ['/placeholder.svg', '/placeholder.svg'],
    ownerId: 'user3',
    contactPhone: '7654321098',
    contactEmail: 'amit@example.com',
    createdAt: new Date('2023-04-12'),
    availableFrom: new Date('2023-05-10'),
    tags: ['PG', 'furnished', 'meals included', 'near metro'],
    amenities: ['WiFi', 'TV', 'AC', 'Geyser', '3 Meals', 'Housekeeping']
  }
];

export const mockDataStore: MockDataStore = {
  users,
  listings
};

// Helper functions to access mock data
export const getAllListings = (): Listing[] => {
  return listings;
};

export const getListingById = (id: string): Listing | undefined => {
  return listings.find(listing => listing.id === id);
};

export const getListingsByCategory = (category: string): Listing[] => {
  return listings.filter(listing => listing.category === category);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const searchListings = (query: string): Listing[] => {
  const lowerQuery = query.toLowerCase();
  return listings.filter(listing => 
    listing.title.toLowerCase().includes(lowerQuery) || 
    listing.description.toLowerCase().includes(lowerQuery) ||
    listing.location.toLowerCase().includes(lowerQuery) ||
    listing.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
