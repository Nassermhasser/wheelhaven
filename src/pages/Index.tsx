
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CarCard, { CarProps } from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, Shield, Calendar, Clock } from 'lucide-react';

const Index = () => {
  const [featuredCars, setFeaturedCars] = useState<CarProps[]>([]);
  const featuredRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Mock data for featured cars
  const mockFeaturedCars: CarProps[] = [
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
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animateElements = (ref: React.RefObject<HTMLDivElement>) => {
      const elements = ref.current?.querySelectorAll('.animate-on-scroll');
      elements?.forEach(el => observer.observe(el));
      return () => elements?.forEach(el => observer.unobserve(el));
    };
    
    const cleanupFeatured = animateElements(featuredRef);
    const cleanupHowItWorks = animateElements(howItWorksRef);
    const cleanupTestimonials = animateElements(testimonialsRef);
    
    return () => {
      cleanupFeatured();
      cleanupHowItWorks();
      cleanupTestimonials();
    };
  }, []);
  
  // Load featured cars (simulated API call)
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setFeaturedCars(mockFeaturedCars);
    }, 500);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Cars Section */}
      <section ref={featuredRef} className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Featured Vehicles
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[200ms]">
              Discover Our Top Picks
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[400ms]">
              Explore our collection of premium vehicles, carefully selected for their exceptional performance, style, and comfort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <div 
                key={car.id} 
                className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[1200ms]">
            <Link to="/cars">
              <Button variant="outline" size="lg">
                View All Cars
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section ref={howItWorksRef} className="py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Easy Process
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[200ms]">
              How It Works
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[400ms]">
              We've simplified the car rental process to make your experience as seamless as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[600ms]">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-xl font-semibold mb-3">1. Choose Your Dates</h4>
              <p className="text-gray-600">
                Select your pickup and return dates to see which vehicles are available during your timeframe.
              </p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[800ms]">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-xl font-semibold mb-3">2. Book Your Car</h4>
              <p className="text-gray-600">
                Browse our selection of vehicles and choose the one that best suits your needs and preferences.
              </p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[1000ms]">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-gray-700" />
              </div>
              <h4 className="text-xl font-semibold mb-3">3. Enjoy Your Ride</h4>
              <p className="text-gray-600">
                Pick up your car at the designated location and enjoy your journey with our premium service.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[1200ms]">
            <Link to="/how-it-works">
              <Button>
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Testimonials
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[200ms]">
              What Our Customers Say
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[400ms]">
              Don't just take our word for it. Hear what our satisfied customers have to say about their experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-soft border animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[600ms]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The rental process was incredibly smooth. The car was in pristine condition, and the customer service was exceptional. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                  <img 
                    src="https://i.pravatar.cc/150?img=11" 
                    alt="Emily Johnson" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Emily Johnson</h4>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-soft border animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[800ms]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "I was amazed by the selection of luxury vehicles available. The Tesla Model 3 I rented was perfect for my weekend getaway!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                  <img 
                    src="https://i.pravatar.cc/150?img=4" 
                    alt="Michael Chen" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-gray-500">San Francisco, CA</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-soft border animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-[1000ms]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The Range Rover was exactly what I needed for my family vacation. Spacious, comfortable, and a joy to drive. Will definitely rent again!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                  <img 
                    src="https://i.pravatar.cc/150?img=8" 
                    alt="Sarah Williams" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Williams</h4>
                  <p className="text-sm text-gray-500">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 bg-black text-white">
        <div className="container max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Experience Premium Car Rental?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">
            Join thousands of satisfied customers who have chosen WheelHaven for their car rental needs.
          </p>
          <Link to="/cars">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Explore Cars
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
