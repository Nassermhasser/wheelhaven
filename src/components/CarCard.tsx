
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader
} from "@/components/ui/card";
import { Fuel, Users, Calendar, ChevronRight } from 'lucide-react';

export interface CarProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  price_unit?: string;
  priceUnit?: string; // For backward compatibility
  year: number;
  passengers: number;
  fuel_type?: string;
  fuelType?: string; // For backward compatibility
  transmission: string;
  featured?: boolean;
  availability?: boolean;
}

const CarCard = ({ car }: { car: CarProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle both snake_case from DB and camelCase from legacy code
  const priceUnit = car.price_unit || car.priceUnit || 'per day';
  const fuelType = car.fuel_type || car.fuelType || '';
  const isAvailable = car.availability !== undefined ? car.availability : true;
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-soft-lg ${isHovered ? 'scale-[1.02]' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {car.featured && (
          <Badge className="absolute top-4 right-4 z-10 bg-white/90 text-black">
            Featured
          </Badge>
        )}
        {!isAvailable && (
          <Badge className="absolute top-4 left-4 z-10 bg-red-500/90 text-white">
            Unavailable
          </Badge>
        )}
        <div className="h-56 overflow-hidden">
          <img 
            src={car.image} 
            alt={car.name} 
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${!isAvailable ? 'opacity-70' : ''}`}
          />
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{car.brand}</p>
            <h3 className="text-xl font-semibold">{car.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold">${car.price}</p>
            <p className="text-sm text-gray-500">{priceUnit}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="flex flex-col items-center text-center">
            <Users className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-sm text-gray-600">{car.passengers} Seats</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Fuel className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-sm text-gray-600">{fuelType}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-sm text-gray-600">{car.year}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 border-t">
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-gray-500">{car.transmission}</span>
          <Link to={`/cars/${car.id}`}>
            <Button disabled={!isAvailable}>
              {isAvailable ? (
                <>
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : 'Not Available'}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
