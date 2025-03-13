
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard, { CarProps } from '@/components/CarCard';
import Filters from '@/components/Filters';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const Cars = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Mock data for cars
  const mockCars: CarProps[] = [
    {
      id: '1',
      name: 'Model 3',
      brand: 'Tesla',
      image: 'https://images.unsplash.com/photo-1619767886558-efdc7b9af5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      price: 120,
      priceUnit: 'per day',
      year: 2022,
      passengers: 5,
      fuelType: 'Electric',
      transmission: 'Automatic',
      featured: true
    },
    {
      id: '2',
      name: '911 Carrera',
      brand: 'Porsche',
      image: 'https://images.unsplash.com/photo-1550019479-9bff5c522de5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 350,
      priceUnit: 'per day',
      year: 2021,
      passengers: 2,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      featured: true
    },
    {
      id: '3',
      name: 'Range Rover Sport',
      brand: 'Land Rover',
      image: 'https://images.unsplash.com/photo-1566936342903-8192041f16dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      price: 250,
      priceUnit: 'per day',
      year: 2022,
      passengers: 5,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      featured: true
    },
    {
      id: '4',
      name: 'A4',
      brand: 'Audi',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      price: 150,
      priceUnit: 'per day',
      year: 2022,
      passengers: 5,
      fuelType: 'Gasoline',
      transmission: 'Automatic'
    },
    {
      id: '5',
      name: 'M4 Competition',
      brand: 'BMW',
      image: 'https://images.unsplash.com/photo-1617814076668-8dde6cd036d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      price: 280,
      priceUnit: 'per day',
      year: 2023,
      passengers: 4,
      fuelType: 'Gasoline',
      transmission: 'Automatic'
    },
    {
      id: '6',
      name: 'G-Class',
      brand: 'Mercedes',
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      price: 320,
      priceUnit: 'per day',
      year: 2022,
      passengers: 5,
      fuelType: 'Gasoline',
      transmission: 'Automatic'
    },
    {
      id: '7',
      name: 'GT-R',
      brand: 'Nissan',
      image: 'https://images.unsplash.com/photo-1622571555446-a523eb95ba7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      price: 290,
      priceUnit: 'per day',
      year: 2021,
      passengers: 2,
      fuelType: 'Gasoline',
      transmission: 'Automatic'
    },
    {
      id: '8',
      name: 'Model X',
      brand: 'Tesla',
      image: 'https://images.unsplash.com/photo-1613271314983-4234f396f48d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1444&q=80',
      price: 190,
      priceUnit: 'per day',
      year: 2023,
      passengers: 7,
      fuelType: 'Electric',
      transmission: 'Automatic'
    }
  ];

  // Load cars (simulated API call)
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setCars(mockCars);
      setFilteredCars(mockCars);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle search
  useEffect(() => {
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
    setFilteredCars(cars);
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
