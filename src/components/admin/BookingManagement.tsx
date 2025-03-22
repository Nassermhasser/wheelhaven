
import { useState } from 'react';
import { BookingTable } from './booking/BookingTable';
import { BookingDetailsDialog } from './booking/BookingDetailsDialog';
import { StatusUpdateDialog } from './booking/StatusUpdateDialog';
import { useBookings } from './booking/useBookings';
import { Booking } from './booking/types';
import { toast } from 'sonner';

export const BookingManagement = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Booking['status']>('pending');
  
  const { bookings, isLoading, error, updateStatusMutation } = useBookings();

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
    updateStatusMutation.mutate(
      { id: selectedBooking.id, status: newStatus },
      {
        onSuccess: () => {
          setIsStatusDialogOpen(false);
          toast.success(`Booking status updated to ${newStatus}`);
        }
      }
    );
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
        <BookingTable 
          bookings={bookings} 
          onViewBooking={handleViewBooking} 
          onStatusChange={handleStatusChange} 
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No bookings found</p>
        </div>
      )}

      {/* View Booking Details Dialog */}
      <BookingDetailsDialog 
        booking={selectedBooking} 
        open={isViewDialogOpen} 
        onOpenChange={setIsViewDialogOpen} 
      />

      {/* Change Status Dialog */}
      <StatusUpdateDialog 
        booking={selectedBooking}
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        newStatus={newStatus}
        onStatusChange={setNewStatus}
        onSave={saveStatusChange}
        isPending={updateStatusMutation.isPending}
      />
    </div>
  );
};
