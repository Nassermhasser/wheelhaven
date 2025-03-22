
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Booking } from "./types";

interface StatusUpdateDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newStatus: Booking['status'];
  onStatusChange: (status: Booking['status']) => void;
  onSave: () => void;
  isPending: boolean;
}

export const StatusUpdateDialog = ({ 
  booking, 
  open, 
  onOpenChange,
  newStatus,
  onStatusChange,
  onSave,
  isPending
}: StatusUpdateDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Booking Status</DialogTitle>
          <DialogDescription>
            Change the status of booking #{booking.id.slice(0, 8)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select New Status</label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                type="button" 
                variant={newStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => onStatusChange('pending')}
                className="justify-start"
              >
                Pending
              </Button>
              <Button 
                type="button" 
                variant={newStatus === 'confirmed' ? 'default' : 'outline'}
                onClick={() => onStatusChange('confirmed')}
                className="justify-start"
              >
                Confirmed
              </Button>
              <Button 
                type="button" 
                variant={newStatus === 'cancelled' ? 'default' : 'outline'}
                onClick={() => onStatusChange('cancelled')}
                className="justify-start"
              >
                Cancelled
              </Button>
              <Button 
                type="button" 
                variant={newStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => onStatusChange('completed')}
                className="justify-start"
              >
                Completed
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSave}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
