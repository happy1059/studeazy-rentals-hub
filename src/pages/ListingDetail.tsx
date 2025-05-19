
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getListingById, getUserById } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import CategoryBadge from "@/components/CategoryBadge";
import { Listing, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, Mail, User as UserIcon } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchedListing = getListingById(id);
      
      if (fetchedListing) {
        setListing(fetchedListing);
        
        // Fetch owner details
        const fetchedOwner = getUserById(fetchedListing.ownerId);
        setOwner(fetchedOwner || null);
      }
      
      setIsLoading(false);
    }
  }, [id]);

  const handleContactOwner = () => {
    toast.success("Contact information copied to clipboard");
  };

  const handleBookNow = () => {
    toast.success("Booking request sent to the owner!");
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container py-16 text-center">
          <p>Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div>
        <Navbar />
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderAmenities = () => {
    if (!listing.amenities || listing.amenities.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {listing.amenities.map((amenity, index) => (
            <Badge key={index} variant="secondary">{amenity}</Badge>
          ))}
        </div>
      </div>
    );
  };

  const renderFeatures = () => {
    if (!listing.features) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(listing.features).map(([key, value]) => (
            <div key={key} className="border rounded p-3">
              <h4 className="font-medium capitalize mb-1">{key.replace(/_/g, ' ')}</h4>
              {Array.isArray(value) ? (
                <ul className="list-disc list-inside">
                  {value.map((item, i) => (
                    <li key={i} className="text-sm">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-brand-600">Home</Link>
          <span className="text-sm text-muted-foreground">/</span>
          <Link to={`/listings/${listing.category}`} className="text-sm text-muted-foreground hover:text-brand-600">
            {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">{listing.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="relative mb-6">
              <div className="absolute top-4 left-4 z-10">
                <CategoryBadge category={listing.category} className="text-sm" />
              </div>
              <div className="w-full rounded-lg overflow-hidden aspect-[16/9]">
                <img
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
            
            <div className="flex items-center mb-6">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">{listing.location}</span>
            </div>

            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-4">
                <div className="prose prose-slate max-w-none">
                  <p>{listing.description}</p>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="py-4">
                {renderAmenities()}
                {renderFeatures()}
                
                {listing.availableFrom && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Availability</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Available from{" "}
                        {format(new Date(listing.availableFrom), "dd MMM yyyy")}
                        {listing.availableTo ? 
                          ` to ${format(new Date(listing.availableTo), "dd MMM yyyy")}` : 
                          ""}
                      </span>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="owner" className="py-4">
                {owner ? (
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={owner.avatar || "/placeholder.svg"}
                        alt={owner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{owner.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">Service Provider</p>
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{owner.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{owner.email}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Owner information not available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="block text-3xl font-bold">₹{listing.price}</span>
                    <span className="text-muted-foreground">per {listing.priceUnit}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full" onClick={handleBookNow}>Book Now</Button>
                  <Button variant="outline" className="w-full" onClick={handleContactOwner}>
                    Contact Owner
                  </Button>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Listed by {owner?.name || 'Owner'}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(listing.createdAt), "dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm">
                    For fastest response, contact directly by phone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
