
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
import { Eye, Check, X } from 'lucide-react';
import { BookingStatusBadge } from "./BookingStatusBadge";
import { formatDate } from "./utils";
import { Booking } from "./types";

interface BookingTableProps {
  bookings: Booking[];
  onViewBooking: (booking: Booking) => void;
  onStatusChange: (booking: Booking) => void;
}

export const BookingTable = ({ 
  bookings, 
  onViewBooking, 
  onStatusChange 
}: BookingTableProps) => {
  return (
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
            <TableCell><BookingStatusBadge status={booking.status} /></TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onViewBooking(booking)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onStatusChange(booking)}>
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
  );
};
