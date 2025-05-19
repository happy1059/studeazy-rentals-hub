
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CategoryBadge from "@/components/CategoryBadge";
import { Listing } from "@/types";
import { MapPin } from "lucide-react";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Link to={`/listing/${listing.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={listing.images[0] || "/placeholder.svg"} 
            alt={listing.title}
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
          />
          <div className="absolute top-2 left-2">
            <CategoryBadge category={listing.category} />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
          <div className="flex items-center mt-1 text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="text-xs">{listing.location}</span>
          </div>
          <p className="text-sm line-clamp-2 my-2 text-muted-foreground">{listing.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <div>
            <span className="font-bold">₹{listing.price}</span>
            <span className="text-muted-foreground text-sm">/{listing.priceUnit}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Available {listing.availableFrom ? new Date(listing.availableFrom).toLocaleDateString() : 'Now'}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
