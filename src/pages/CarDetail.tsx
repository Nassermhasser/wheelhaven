
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, Users, Gauge, Fuel, Sparkles, Car as CarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import BookingForm from '@/components/BookingForm';
import type { CarProps } from '@/components/CarCard';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate API call to fetch car details
    setIsLoading(true);
    
    // Mock data - in a real app, this would be an API call to fetch the car by ID
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
      }
    ];
    
    setTimeout(() => {
      const foundCar = mockCars.find(c => c.id === id);
      setCar(foundCar || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleAddToFavorites = () => {
    toast({
      title: "Added to favorites",
      description: `${car?.brand} ${car?.name} has been added to your favorites.`,
    });
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-80 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-60 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render 404 state if car not found
  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
            <p className="text-gray-600 mb-8">
              The car you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/cars">
              <Button>Browse All Cars</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/cars" className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Cars
            </Link>
          </div>
          
          {/* Car Images */}
          <div className="rounded-xl overflow-hidden h-80 md:h-[30rem] mb-10">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Car Details */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold">{car.brand} {car.name}</h1>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">{car.year}</Badge>
                    {car.featured && (
                      <Badge className="bg-primary">Featured</Badge>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-3xl font-semibold">${car.price}</div>
                  <div className="text-gray-500 text-sm">{car.priceUnit}</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Experience the thrill of driving the {car.year} {car.brand} {car.name}. This premium vehicle offers a perfect blend of style, comfort, and performance for your journey.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-600">Seats</span>
                  <span className="font-medium">{car.passengers} Passengers</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Fuel className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-600">Fuel Type</span>
                  <span className="font-medium">{car.fuelType}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <CarIcon className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-600">Transmission</span>
                  <span className="font-medium">{car.transmission}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-600">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Car Description</h2>
                <p className="text-gray-600 mb-4">
                  The {car.brand} {car.name} is designed to provide an exceptional driving experience. With its sleek design and powerful performance, this vehicle is perfect for both city driving and long journeys.
                </p>
                <p className="text-gray-600 mb-4">
                  This model comes equipped with advanced features including a premium sound system, navigation, bluetooth connectivity, and climate control to ensure your comfort throughout your trip.
                </p>
                <p className="text-gray-600">
                  Whether you're planning a business trip, family vacation, or just need a reliable car for everyday use, the {car.brand} {car.name} is an excellent choice that combines luxury, comfort, and performance.
                </p>
              </div>
              
              <Separator className="my-8" />
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Air Conditioning",
                    "Bluetooth Connectivity",
                    "GPS Navigation",
                    "Premium Sound System",
                    "Cruise Control",
                    "Leather Seats",
                    "Keyless Entry",
                    "Parking Sensors",
                    "Backup Camera",
                    "Touch Screen Display"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Sparkles className="h-4 w-4 text-primary mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleAddToFavorites}
                >
                  Add to Favorites
                </Button>
              </div>
            </div>
            
            {/* Booking Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Book This Car</h3>
                  <BookingForm car={car} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
