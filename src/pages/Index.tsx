
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();

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
        {/* Additional homepage content would go here */}
      </main>
      
      {/* Sign In Section with Admin Option */}
      <section className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
            <Button 
              className="flex-1" 
              onClick={handleRegularSignIn}
            >
              Sign In
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-2">Admin? Sign in here</span>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={handleAdminLogin}
              >
                Admin Login
              </Button>
              <div className="mt-2 text-xs text-gray-400">
                <p>Email: admin@example.com</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
