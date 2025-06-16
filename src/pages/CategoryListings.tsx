
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getListingsByCategory } from "@/services/listingsService";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { Listing } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryListings = () => {
  const { category } = useParams<{ category: string }>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (category) {
        try {
          setIsLoading(true);
          const fetchedListings = await getListingsByCategory(category);
          setListings(fetchedListings);
          setFilteredListings(fetchedListings);
        } catch (error) {
          console.error('Error fetching listings:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchListings();
  }, [category]);

  useEffect(() => {
    let filtered = [...listings];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query) ||
          listing.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply price filter
    if (priceRange[0] !== null) {
      filtered = filtered.filter((listing) => listing.price >= (priceRange[0] || 0));
    }
    if (priceRange[1] !== null) {
      filtered = filtered.filter((listing) => listing.price <= (priceRange[1] || Infinity));
    }

    // Apply sorting
    switch (sortOrder) {
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredListings(filtered);
  }, [listings, searchQuery, sortOrder, priceRange]);

  const getCategoryTitle = () => {
    switch (category) {
      case "accommodation":
        return "Accommodation";
      case "food":
        return "Food Services";
      case "laundry":
        return "Laundry Services";
      case "transport":
        return "Transportation";
      default:
        return "Listings";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-16 text-center">
          <p>Loading listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{getCategoryTitle()}</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by location, keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your search with filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Price Range (₹)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="minPrice"
                      type="number"
                      placeholder="Min"
                      onChange={(e) =>
                        setPriceRange([
                          e.target.value ? Number(e.target.value) : null,
                          priceRange[1],
                        ])
                      }
                    />
                    <span>to</span>
                    <Input
                      id="maxPrice"
                      type="number"
                      placeholder="Max"
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          e.target.value ? Number(e.target.value) : null,
                        ])
                      }
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No listings found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setPriceRange([null, null]);
                setSortOrder("newest");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryListings;
