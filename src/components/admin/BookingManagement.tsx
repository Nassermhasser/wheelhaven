
import { useState, useEffect } from 'react';
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

interface Booking {
  id: string;
  carId: string;
  carName: string;
  userId: string;
  userName: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Booking['status']>('pending');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      // In a real application, this would be a call to your Supabase table
      // For now, we'll use mock data for demonstration

      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: '1',
          carId: '1',
          carName: 'Tesla Model 3',
          userId: 'user1',
          userName: 'John Doe',
          startDate: '2023-11-10T10:00:00Z',
          endDate: '2023-11-15T10:00:00Z',
          pickupLocation: 'New York Downtown',
          dropoffLocation: 'New York Airport (JFK)',
          totalPrice: 600,
          status: 'confirmed'
        },
        {
          id: '2',
          carId: '2',
          carName: 'Porsche 911 Carrera',
          userId: 'user2',
          userName: 'Jane Smith',
          startDate: '2023-11-20T08:00:00Z',
          endDate: '2023-11-25T18:00:00Z',
          pickupLocation: 'Los Angeles Downtown',
          dropoffLocation: 'Los Angeles Airport (LAX)',
          totalPrice: 1750,
          status: 'pending'
        },
        {
          id: '3',
          carId: '3',
          carName: 'Range Rover Sport',
          userId: 'user3',
          userName: 'Mike Johnson',
          startDate: '2023-11-05T09:00:00Z',
          endDate: '2023-11-07T17:00:00Z',
          pickupLocation: 'Chicago Downtown',
          dropoffLocation: 'Chicago Downtown',
          totalPrice: 500,
          status: 'completed'
        },
        {
          id: '4',
          carId: '1',
          carName: 'Tesla Model 3',
          userId: 'user4',
          userName: 'Sarah Williams',
          startDate: '2023-11-18T14:00:00Z',
          endDate: '2023-11-21T14:00:00Z',
          pickupLocation: 'Miami Beach',
          dropoffLocation: 'Miami Airport (MIA)',
          totalPrice: 360,
          status: 'cancelled'
        }
      ];
      
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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

    try {
      // In a real application, this would update your Supabase table
      setBookings(bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: newStatus } 
          : booking
      ));
      
      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    } finally {
      setIsStatusDialogOpen(false);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookings.length > 0 ? (
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
                <TableCell className="font-medium">#{booking.id}</TableCell>
                <TableCell>{booking.userName}</TableCell>
                <TableCell>{booking.carName}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>From: {formatDate(booking.startDate)}</div>
                    <div>To: {formatDate(booking.endDate)}</div>
                  </div>
                </TableCell>
                <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
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
                  <p className="font-medium">#{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div>{getStatusBadge(selectedBooking.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{selectedBooking.userName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Car</p>
                <p className="font-medium">{selectedBooking.carName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.endDate)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Pickup Location</p>
                <p className="font-medium">{selectedBooking.pickupLocation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Dropoff Location</p>
                <p className="font-medium">{selectedBooking.dropoffLocation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="font-medium text-lg">${selectedBooking.totalPrice.toFixed(2)}</p>
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
              Change the status of booking #{selectedBooking?.id}
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
            <Button onClick={saveStatusChange}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
