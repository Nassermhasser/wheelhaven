import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* Additional homepage content would go here */}
      </main>
      
      {/* Admin Login Section */}
      <section className="bg-gray-50 py-10 border-t border-gray-200">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-center mb-4">Admin Access</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                For demo purposes only. Click below to login with default admin credentials.
              </p>
              <div className="flex flex-col space-y-2">
                <p className="text-xs text-gray-500">Email: admin@example.com</p>
                <p className="text-xs text-gray-500">Password: admin123</p>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={handleAdminLogin}
              >
                Login as Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
