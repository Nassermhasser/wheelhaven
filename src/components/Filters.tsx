
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';

interface FiltersProps {
  onFilter: (filters: any) => void;
  className?: string;
}

const Filters = ({ onFilter, className = '' }: FiltersProps) => {
  const [price, setPrice] = useState([0, 500]);
  const [brands, setBrands] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const allBrands = [
    { name: 'BMW', value: 'bmw' },
    { name: 'Audi', value: 'audi' },
    { name: 'Mercedes', value: 'mercedes' },
    { name: 'Toyota', value: 'toyota' },
    { name: 'Honda', value: 'honda' },
    { name: 'Ford', value: 'ford' },
    { name: 'Tesla', value: 'tesla' },
    { name: 'Porsche', value: 'porsche' }
  ];
  
  const locations = [
    { name: 'New York', value: 'new-york' },
    { name: 'Los Angeles', value: 'los-angeles' },
    { name: 'Chicago', value: 'chicago' },
    { name: 'Miami', value: 'miami' },
    { name: 'Seattle', value: 'seattle' },
    { name: 'Boston', value: 'boston' }
  ];
  
  const transmissionTypes = [
    { name: 'Automatic', value: 'automatic' },
    { name: 'Manual', value: 'manual' }
  ];

  const toggleBrand = (value: string) => {
    if (brands.includes(value)) {
      setBrands(brands.filter(brand => brand !== value));
    } else {
      setBrands([...brands, value]);
    }
  };

  const handleFilter = () => {
    onFilter({
      priceRange: price,
      brands,
      location,
      transmission
    });
  };

  const handleReset = () => {
    setPrice([0, 500]);
    setBrands([]);
    setLocation('');
    setTransmission('');
    onFilter({});
  };

  return (
    <div className={`bg-white rounded-lg border shadow-soft p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="md:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={price}
              min={0}
              max={1000}
              step={10}
              onValueChange={setPrice}
            />
            <div className="flex justify-between items-center text-sm">
              <span>${price[0]}</span>
              <span>to</span>
              <span>${price[1]}</span>
            </div>
          </div>
        </div>
        
        {/* Brand */}
        <div>
          <h3 className="text-sm font-medium mb-3">Brand</h3>
          <div className="grid grid-cols-2 gap-2">
            {allBrands.map((brand) => (
              <div key={brand.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={brand.value} 
                  checked={brands.includes(brand.value)}
                  onCheckedChange={() => toggleBrand(brand.value)}
                />
                <Label htmlFor={brand.value} className="text-sm cursor-pointer">
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Location */}
        <div>
          <h3 className="text-sm font-medium mb-3">Location</h3>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Transmission */}
        <div>
          <h3 className="text-sm font-medium mb-3">Transmission</h3>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger>
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              {transmissionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-3 pt-2">
          <Button onClick={handleFilter} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
