
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Booking } from './types';

export const useBookings = () => {
  const queryClient = useQueryClient();

  // Fetch bookings with user and car details
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['adminBookings'],
    queryFn: async () => {
      console.log('Fetching admin bookings...');
      
      // First get bookings with car details
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          car:cars(brand, name)
        `)
        .order('created_at', { ascending: false });
      
      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        throw bookingsError;
      }
      
      console.log('Bookings data fetched:', bookingsData);
      
      // Process the joined data
      const processedBookings = bookingsData.map((booking: any) => {
        return {
          ...booking,
          car_name: booking.car ? `${booking.car.brand} ${booking.car.name}` : 'Unknown Car'
        };
      });
      
      return processedBookings as Booking[];
    }
  });

  // Update booking status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Booking['status'] }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBookings'] });
      toast.success(`Booking status updated successfully`);
    },
    onError: (error) => {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  });

  return {
    bookings,
    isLoading,
    error,
    updateStatusMutation
  };
};
