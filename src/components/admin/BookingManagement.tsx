
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, X, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Booking {
  id: string;
  car_id: string;
  car_name?: string;
  user_id: string;
  user_name?: string;
  start_date: string;
  end_date: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string;
  dropoff_time: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  user_email?: string;
  car?: {
    brand: string;
    name: string;
  };
}

export const BookingManagement = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Booking['status']>('pending');
  
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
      setIsStatusDialogOpen(false);
      toast.success(`Booking status updated to ${newStatus}`);
    },
    onError: (error) => {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  });

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleStatusChange = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setIsStatusDialogOpen(true);
  };

  const saveStatusChange = () => {
    if (!selectedBooking) return;
    updateStatusMutation.mutate({ id: selectedBooking.id, status: newStatus });
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  if (error) {
    console.error('Error in bookings query:', error);
    return (
      <div className="text-center py-8">
        <p className="text-lg text-red-500">Error loading bookings: {error.message || 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <Table>
          <TableCaption>List of all bookings in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">#{booking.id.slice(0, 8)}</TableCell>
                <TableCell>{booking.user_name || booking.user_id.slice(0, 8)}</TableCell>
                <TableCell>{booking.car_name}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>From: {formatDate(booking.start_date)}</div>
                    <div>To: {formatDate(booking.end_date)}</div>
                  </div>
                </TableCell>
                <TableCell>${booking.total_price.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewBooking(booking)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(booking)}>
                      {booking.status === 'pending' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No bookings found</p>
        </div>
      )}

      {/* View Booking Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about the booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-medium">#{selectedBooking.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div>{getStatusBadge(selectedBooking.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{selectedBooking.user_name || selectedBooking.user_id.slice(0, 8)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Car</p>
                <p className="font-medium">{selectedBooking.car_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.start_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.end_date)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Pickup Location</p>
                <p className="font-medium">{selectedBooking.pickup_location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Dropoff Location</p>
                <p className="font-medium">{selectedBooking.dropoff_location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-medium text-lg">${selectedBooking.total_price.toFixed(2)}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Change the status of booking #{selectedBooking?.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select New Status</label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant={newStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setNewStatus('pending')}
                  className="justify-start"
                >
                  Pending
                </Button>
                <Button 
                  type="button" 
                  variant={newStatus === 'confirmed' ? 'default' : 'outline'}
                  onClick={() => setNewStatus('confirmed')}
                  className="justify-start"
                >
                  Confirmed
                </Button>
                <Button 
                  type="button" 
                  variant={newStatus === 'cancelled' ? 'default' : 'outline'}
                  onClick={() => setNewStatus('cancelled')}
                  className="justify-start"
                >
                  Cancelled
                </Button>
                <Button 
                  type="button" 
                  variant={newStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setNewStatus('completed')}
                  className="justify-start"
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={saveStatusChange}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
