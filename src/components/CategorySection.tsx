
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ListingCard from "@/components/ListingCard";
import { Listing, Category } from "@/types";

interface CategorySectionProps {
  category: Category;
  title: string;
  listings: Listing[];
}

const CategorySection = ({ category, title, listings }: CategorySectionProps) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, listings.length));
  };

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link to={`/listings/${category}`}>
          <Button variant="outline">See All</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No listings available</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.slice(0, visibleCount).map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {visibleCount < listings.length && (
            <div className="mt-6 text-center">
              <Button onClick={showMore} variant="outline">Show More</Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CategorySection;
