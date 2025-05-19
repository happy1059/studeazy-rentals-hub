
import { Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Home, Utensils, Bike, Laundry } from "lucide-react";

interface CategoryBadgeProps {
  category: Category;
  showIcon?: boolean;
  className?: string;
}

const CategoryBadge = ({ category, showIcon = true, className = "" }: CategoryBadgeProps) => {
  const getCategoryDetails = (category: Category) => {
    switch (category) {
      case "accommodation":
        return { 
          label: "Accommodation", 
          icon: <Home className="h-3 w-3 mr-1" />,
          variant: "default" as const
        };
      case "food":
        return { 
          label: "Food Service", 
          icon: <Utensils className="h-3 w-3 mr-1" />,
          variant: "outline" as const
        };
      case "transport":
        return { 
          label: "Transport", 
          icon: <Bike className="h-3 w-3 mr-1" />,
          variant: "secondary" as const
        };
      case "laundry":
        return { 
          label: "Laundry", 
          icon: <Laundry className="h-3 w-3 mr-1" />,
          variant: "destructive" as const
        };
      default:
        return { 
          label: "Other", 
          icon: null,
          variant: "outline" as const
        };
    }
  };

  const { label, icon, variant } = getCategoryDetails(category);

  return (
    <Badge variant={variant} className={className}>
      {showIcon && icon}
      {label}
    </Badge>
  );
};

export default CategoryBadge;
