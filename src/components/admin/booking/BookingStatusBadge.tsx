
import { Badge } from "@/components/ui/badge";

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
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
