
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CategorySection from "@/components/CategorySection";
import { getAllListings, getListingsByCategory } from "@/services/listingsService";
import { Listing } from "@/types";
import { Home, Utensils, Bike, Shirt } from "lucide-react";

const Index = () => {
  const [listings, setListings] = useState<{
    accommodation: Listing[];
    food: Listing[];
    laundry: Listing[];
    transport: Listing[];
  }>({
    accommodation: [],
    food: [],
    laundry: [],
    transport: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        
        // Fetch listings by category
        const [accommodationListings, foodListings, laundryListings, transportListings] = await Promise.all([
          getListingsByCategory("accommodation"),
          getListingsByCategory("food"),
          getListingsByCategory("laundry"),
          getListingsByCategory("transport"),
        ]);

        setListings({
          accommodation: accommodationListings,
          food: foodListings,
          laundry: laundryListings,
          transport: transportListings,
        });
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-brand-50 py-16">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-800 mb-4">
            Find Student Services Near Your Campus
          </h1>
          <p className="text-xl text-brand-600 max-w-2xl mb-8">
            Connect with local services for accommodation, food, laundry, and transportation - 
            all tailored for students.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/listings/accommodation">Find Accommodation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/listings/create">List Your Service</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container py-12">
        <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/listings/accommodation" className="group">
            <div className="border rounded-lg p-6 text-center transition-all hover:border-brand-500 hover:shadow-md">
              <div className="bg-brand-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-brand-200">
                <Home className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="font-medium">Accommodation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Rooms, PG, Apartments
              </p>
            </div>
          </Link>
          
          <Link to="/listings/food" className="group">
            <div className="border rounded-lg p-6 text-center transition-all hover:border-brand-500 hover:shadow-md">
              <div className="bg-brand-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-brand-200">
                <Utensils className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="font-medium">Food Services</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tiffin, Mess, Meal Plans
              </p>
            </div>
          </Link>
          
          <Link to="/listings/laundry" className="group">
            <div className="border rounded-lg p-6 text-center transition-all hover:border-brand-500 hover:shadow-md">
              <div className="bg-brand-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-brand-200">
                <Shirt className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="font-medium">Laundry Services</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Wash, Iron, Pickup
              </p>
            </div>
          </Link>
          
          <Link to="/listings/transport" className="group">
            <div className="border rounded-lg p-6 text-center transition-all hover:border-brand-500 hover:shadow-md">
              <div className="bg-brand-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-brand-200">
                <Bike className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="font-medium">Transportation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Bikes, Scooters, Carpools
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Listings by Category */}
      <div className="container">
        <CategorySection 
          category="accommodation" 
          title="Accommodation" 
          listings={listings.accommodation}
        />
        
        <CategorySection 
          category="food" 
          title="Food Services" 
          listings={listings.food}
        />
        
        <CategorySection 
          category="laundry" 
          title="Laundry Services" 
          listings={listings.laundry}
        />
        
        <CategorySection 
          category="transport" 
          title="Transportation" 
          listings={listings.transport}
        />
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-xl text-brand-600">StudentHub</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connecting students with local services.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-medium mb-2">Services</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><Link to="/listings/accommodation" className="hover:text-brand-600">Accommodation</Link></li>
                  <li><Link to="/listings/food" className="hover:text-brand-600">Food Services</Link></li>
                  <li><Link to="/listings/laundry" className="hover:text-brand-600">Laundry</Link></li>
                  <li><Link to="/listings/transport" className="hover:text-brand-600">Transportation</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><Link to="/about" className="hover:text-brand-600">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
                  <li><Link to="/terms" className="hover:text-brand-600">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="hover:text-brand-600">Privacy Policy</Link></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-medium mb-2">For Owners</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><Link to="/listings/create" className="hover:text-brand-600">List Your Service</Link></li>
                  <li><Link to="/pricing" className="hover:text-brand-600">Pricing</Link></li>
                  <li><Link to="/owner-faq" className="hover:text-brand-600">FAQ</Link></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-medium mb-2">Contact</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Email: info@studenthub.com</li>
                  <li>Phone: +91 98765 43210</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} StudentHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
