
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CarManagement } from '@/components/admin/CarManagement';
import { BookingManagement } from '@/components/admin/BookingManagement';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error('Please sign in to access admin features');
          navigate('/auth?mode=login&admin=true');
          return;
        }

        // Check if the user is using the admin email
        if (session.user.email === 'admin@example.com') {
          setIsAdmin(true);
        } else {
          // Fallback to the existing check for other users
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile && profile.first_name && profile.last_name) {
            setIsAdmin(true);
          } else {
            toast.error('You do not have admin privileges');
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Unable to verify admin status');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // This shouldn't render as the user would be redirected
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="cars" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="cars">Car Management</TabsTrigger>
              <TabsTrigger value="bookings">Booking Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cars">
              <CarManagement />
            </TabsContent>
            
            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
