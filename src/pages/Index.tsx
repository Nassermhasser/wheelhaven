
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CarCard, { CarProps } from '@/components/CarCard';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const navigate = useNavigate();

  // Fetch featured cars using React Query
  const { data: popularCars, isLoading, error } = useQuery({
    queryKey: ['popularCars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('featured', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as CarProps[];
    }
  });

  // Show error toast if query fails
  useEffect(() => {
    if (error) {
      console.error('Error fetching popular cars:', error);
      toast.error('Failed to load popular cars');
    }
  }, [error]);

  const handleAdminLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@example-domain.com',
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
                {popularCars && popularCars.map((car) => (
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
