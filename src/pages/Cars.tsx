
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard, { CarProps } from '@/components/CarCard';
import Filters from '@/components/Filters';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState<CarProps[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Fetch all cars from Supabase
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['allCars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('brand');
      
      if (error) throw error;
      return data as CarProps[];
    }
  });

  // Show error toast if query fails
  useEffect(() => {
    if (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to load cars');
    }
  }, [error]);
  
  // Update filtered cars when cars data or search term changes
  useEffect(() => {
    if (!cars) return;
    
    if (searchTerm.trim() === '') {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [searchTerm, cars]);
  
  // Handle filters
  const handleFilter = (filters: any) => {
    if (!cars) return;
    
    let filtered = [...cars];
    const activeFiltersArray: string[] = [];
    
    // Filter by price range
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000)) {
      filtered = filtered.filter(car => 
        car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
      );
      activeFiltersArray.push(`Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`);
    }
    
    // Filter by brands
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(car => 
        filters.brands.includes(car.brand.toLowerCase())
      );
      activeFiltersArray.push(`Brands: ${filters.brands.map((b: string) => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}`);
    }
    
    // Filter by location
    if (filters.location) {
      // In a real app, you would filter by location
      activeFiltersArray.push(`Location: ${filters.location}`);
    }
    
    // Filter by transmission
    if (filters.transmission) {
      filtered = filtered.filter(car => 
        car.transmission.toLowerCase() === filters.transmission
      );
      activeFiltersArray.push(`Transmission: ${filters.transmission.charAt(0).toUpperCase() + filters.transmission.slice(1)}`);
    }
    
    setFilteredCars(filtered);
    setActiveFilters(activeFiltersArray);
  };
  
  // Clear a specific filter
  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
    // In a real app, you would reapply the remaining filters
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilteredCars(cars || []);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Find Your Perfect Ride</h1>
            <p className="text-gray-600 max-w-2xl">
              Browse our extensive collection of premium vehicles and find the one that fits your style and needs.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search by car name or brand" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-sm">
                <Filters onFilter={handleFilter} />
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1 pl-3 pr-1 py-1 bg-gray-50"
                >
                  {filter}
                  <button
                    className="ml-1 rounded-full bg-gray-200 h-5 w-5 inline-flex items-center justify-center hover:bg-gray-300"
                    onClick={() => removeFilter(filter)}
                  >
                    <span className="sr-only">Remove filter</span>
                    <span aria-hidden="true" className="text-xs">×</span>
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-sm h-auto py-1"
              >
                Clear all
              </Button>
            </div>
          )}
          
          {/* Main content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters (desktop) */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <Filters onFilter={handleFilter} />
            </aside>
            
            {/* Cars Grid */}
            <div className="flex-grow">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-100 animate-pulse rounded-lg h-80"></div>
                  ))}
                </div>
              ) : filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cars;
