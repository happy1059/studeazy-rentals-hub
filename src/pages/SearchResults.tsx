
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ListingCard from "@/components/ListingCard";
import { searchListings } from "@/data/mockData";
import { Listing } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";
  
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (searchQuery) {
      const results = searchListings(searchQuery);
      setListings(results);
    } else {
      setListings([]);
    }
    setIsLoading(false);
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          {listings.length} result{listings.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>

        {isLoading ? (
          <div className="text-center py-16">
            <p>Loading results...</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find any listings matching your search.
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
