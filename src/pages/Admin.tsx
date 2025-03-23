
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CarManagement } from '@/components/admin/CarManagement';
import { BookingManagement } from '@/components/admin/BookingManagement';
import { AdminManagement } from '@/components/admin/AdminManagement';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, UserCog } from 'lucide-react';

const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { profile, session, isLoading: authLoading, isAdmin } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;
      
      setIsLoading(true);
      
      try {
        console.log("Admin page - Checking admin status, session:", !!session, "profile:", profile, "isAdmin:", isAdmin);
        
        if (!session) {
          console.log("No session found, redirecting to admin login");
          toast.error('Please sign in to access admin features');
          navigate('/auth?mode=login&admin=true');
          return;
        }

        // Strict check that profile exists and is admin
        if (profile && profile.is_admin === true) {
          // User is admin, allow access
          console.log("User is admin, allowing access to admin page");
          setIsLoading(false);
        } else {
          // User is not admin, redirect to home
          console.log("User is not admin, redirecting to home from admin page");
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
  }, [navigate, profile, session, authLoading, isAdmin]);

  if (isLoading || authLoading) {
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
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-semibold">Admin Dashboard</h1>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg mb-8 flex items-center gap-3">
            <UserCog className="h-5 w-5 text-primary" />
            <p>Logged in as: <span className="font-medium">{profile?.first_name} {profile?.last_name}</span> (Administrator)</p>
          </div>
          
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
              <AdminManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
