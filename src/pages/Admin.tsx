
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CarManagement } from '@/components/admin/CarManagement';
import { BookingManagement } from '@/components/admin/BookingManagement';
import { CreateAdminForm } from '@/components/admin/CreateAdminForm';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { profile, session } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      
      try {
        if (!session) {
          toast.error('Please sign in to access admin features');
          navigate('/auth?mode=login&admin=true');
          return;
        }

        // Strict check that profile exists and is admin
        if (profile && profile.is_admin === true) {
          // User is admin, allow access
          setIsLoading(false);
        } else {
          // User is not admin, redirect to home
          toast.error('You do not have admin privileges');
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Unable to verify admin status');
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [navigate, profile, session]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="cars" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cars">Car Management</TabsTrigger>
              <TabsTrigger value="bookings">Booking Management</TabsTrigger>
              <TabsTrigger value="admins">Admin Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cars">
              <CarManagement />
            </TabsContent>
            
            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>

            <TabsContent value="admins">
              <div className="max-w-md mx-auto">
                <CreateAdminForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
