import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CarCard, { CarProps } from '@/components/CarCard';

const Index = () => {
  const navigate = useNavigate();
  const [popularCars, setPopularCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCars = async () => {
      setIsLoading(true);
      try {
        setPopularCars([
          {
            id: '1',
            name: 'Model S',
            brand: 'Tesla',
            image: 'https://images.unsplash.com/photo-1619767886558-efdc146e8803?q=80&w=1200',
            price: 150,
            priceUnit: 'per day',
            year: 2023,
            passengers: 5,
            fuelType: 'Electric',
            transmission: 'Automatic',
            featured: true
          },
          {
            id: '2',
            name: 'F-150',
            brand: 'Ford',
            image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=1200',
            price: 120,
            priceUnit: 'per day',
            year: 2022,
            passengers: 5,
            fuelType: 'Hybrid',
            transmission: 'Automatic',
            featured: false
          },
          {
            id: '3',
            name: 'Civic',
            brand: 'Honda',
            image: 'https://images.unsplash.com/photo-1605515421156-69a924f1094c?q=80&w=1200',
            price: 90,
            priceUnit: 'per day',
            year: 2021,
            passengers: 5,
            fuelType: 'Gasoline',
            transmission: 'Automatic',
            featured: false
          }
        ]);
      } catch (error) {
        console.error('Error fetching popular cars:', error);
        toast.error('Failed to load popular cars');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularCars();
  }, []);

  const handleAdminLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@example.com',
        password: 'admin123',
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Admin login successful');
      navigate('/admin');
    } catch (error) {
      console.error('Error in admin login:', error);
      toast.error('Failed to login as admin');
    }
  };

  const handleRegularSignIn = () => {
    navigate('/auth?mode=login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <section className="bg-white py-16">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Most Popular Cars</h2>
              <Button variant="outline" onClick={() => navigate('/cars')}>
                View All Cars
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {popularCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
