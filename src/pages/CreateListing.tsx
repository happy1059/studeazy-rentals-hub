
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Category } from "@/types";
import { createListing } from "@/services/listingsService";
import { supabase } from "@/integrations/supabase/client";

const CreateListing = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "" as Category,
    price: "",
    priceUnit: "month",
    location: "",
    contactPhone: "",
    contactEmail: "",
    amenities: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!form.title || !form.description || !form.category || !form.price || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please log in to create a listing");
      navigate("/auth");
      return;
    }

    try {
      setIsSubmitting(true);

      const listingData = {
        title: form.title,
        description: form.description,
        category: form.category,
        price: parseInt(form.price),
        price_unit: form.priceUnit,
        location: form.location,
        contact_phone: form.contactPhone,
        contact_email: form.contactEmail,
        tags: form.tags ? form.tags.split(',').map(tag => tag.trim()) : [],
        amenities: form.amenities ? form.amenities.split(',').map(amenity => amenity.trim()) : [],
        images: [] as string[],
        features: {} as Record<string, any>,
        status: 'active' as const
      };

      const listingId = await createListing(listingData);
      
      if (listingId) {
        toast.success("Listing created successfully!");
        navigate(`/listing/${listingId}`);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error("Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create a New Listing</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select 
                value={form.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                  <SelectItem value="food">Food Service</SelectItem>
                  <SelectItem value="laundry">Laundry Service</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priceUnit">Price Unit*</Label>
                <Select 
                  value={form.priceUnit} 
                  onValueChange={(value) => handleSelectChange("priceUnit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">Per Hour</SelectItem>
                    <SelectItem value="day">Per Day</SelectItem>
                    <SelectItem value="week">Per Week</SelectItem>
                    <SelectItem value="month">Per Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide detailed information about what you're offering"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location*</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter the location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities/Features</Label>
              <Textarea
                id="amenities"
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="List any amenities or features (comma separated)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Add tags (comma separated)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone*</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  placeholder="Your contact number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email*</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate("/")} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Listing"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
