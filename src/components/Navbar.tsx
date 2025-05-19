
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/listings/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-brand-600">StudentHub</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link 
              to="/listings/accommodation" 
              className={`text-sm font-medium ${location.pathname.includes('accommodation') ? 'text-brand-600' : 'text-foreground/60'} transition-colors hover:text-foreground`}
            >
              Accommodation
            </Link>
            <Link 
              to="/listings/food" 
              className={`text-sm font-medium ${location.pathname.includes('food') ? 'text-brand-600' : 'text-foreground/60'} transition-colors hover:text-foreground`}
            >
              Food
            </Link>
            <Link 
              to="/listings/laundry" 
              className={`text-sm font-medium ${location.pathname.includes('laundry') ? 'text-brand-600' : 'text-foreground/60'} transition-colors hover:text-foreground`}
            >
              Laundry
            </Link>
            <Link 
              to="/listings/transport" 
              className={`text-sm font-medium ${location.pathname.includes('transport') ? 'text-brand-600' : 'text-foreground/60'} transition-colors hover:text-foreground`}
            >
              Transport
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <Link to="/listings/create">
            <Button>List Your Service</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
