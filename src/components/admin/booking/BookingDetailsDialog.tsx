
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { formatDate } from "./utils";
import { Booking } from "./types";

interface BookingDetailsDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDetailsDialog = ({ 
  booking, 
  open, 
  onOpenChange 
}: BookingDetailsDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Complete information about the booking
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-medium">#{booking.id.slice(0, 8)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div><BookingStatusBadge status={booking.status} /></div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{booking.user_name || booking.user_id.slice(0, 8)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Car</p>
            <p className="font-medium">{booking.car_name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{formatDate(booking.start_date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{formatDate(booking.end_date)}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Pickup Location</p>
            <p className="font-medium">{booking.pickup_location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Dropoff Location</p>
            <p className="font-medium">{booking.dropoff_location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="font-medium text-lg">${booking.total_price.toFixed(2)}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
