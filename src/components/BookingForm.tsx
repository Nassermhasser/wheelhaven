
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  carId: string;
  carName: string;
  pricePerDay: number;
}

const BookingForm = ({ carId, carName, pricePerDay }: BookingFormProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffTime, setDropoffTime] = useState('10:00');
  
  const locations = [
    { name: 'New York Downtown', value: 'new-york-downtown' },
    { name: 'New York Airport (JFK)', value: 'new-york-jfk' },
    { name: 'Los Angeles Downtown', value: 'la-downtown' },
    { name: 'Los Angeles Airport (LAX)', value: 'la-lax' },
    { name: 'Chicago Downtown', value: 'chicago-downtown' },
    { name: 'Chicago Airport (ORD)', value: 'chicago-ord' },
    { name: 'Miami Beach', value: 'miami-beach' },
    { name: 'Miami Airport (MIA)', value: 'miami-mia' }
  ];
  
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];
  
  const calculateTotalDays = (): number => {
    if (!startDate || !endDate) return 0;
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Minimum 1 day
  };
  
  const calculateTotalPrice = (): number => {
    const days = calculateTotalDays();
    return days * pricePerDay;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error('Please select pickup and drop-off dates');
      return;
    }
    
    if (!pickupLocation || !dropoffLocation) {
      toast.error('Please select pickup and drop-off locations');
      return;
    }
    
    // Here you would normally submit the booking data to the backend
    toast.success(`Booking request for ${carName} submitted successfully!`);
    
    // Log the booking data to the console
    console.log({
      carId,
      carName,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      dropoffTime,
      totalDays: calculateTotalDays(),
      totalPrice: calculateTotalPrice()
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border shadow-soft">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-6">Book this car</h3>
        
        <div className="space-y-4">
          {/* Pickup Date */}
          <div className="space-y-2">
            <Label htmlFor="pickup-date">Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="pickup-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => 
                    date < new Date() || (endDate ? date > endDate : false)
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Dropoff Date */}
          <div className="space-y-2">
            <Label htmlFor="dropoff-date">Drop-off Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="dropoff-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => 
                    date < new Date() || (startDate ? date < startDate : false)
                  }
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Pickup Time */}
          <div className="space-y-2">
            <Label htmlFor="pickup-time">Pickup Time</Label>
            <div className="flex">
              <Clock className="h-5 w-5 mr-2 text-gray-400 self-center" />
              <Select value={pickupTime} onValueChange={setPickupTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={`pickup-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Dropoff Time */}
          <div className="space-y-2">
            <Label htmlFor="dropoff-time">Drop-off Time</Label>
            <div className="flex">
              <Clock className="h-5 w-5 mr-2 text-gray-400 self-center" />
              <Select value={dropoffTime} onValueChange={setDropoffTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={`dropoff-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Pickup Location */}
          <div className="space-y-2">
            <Label htmlFor="pickup-location">Pickup Location</Label>
            <div className="flex">
              <MapPin className="h-5 w-5 mr-2 text-gray-400 self-center" />
              <Select value={pickupLocation} onValueChange={setPickupLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={`pickup-${location.value}`} value={location.value}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Dropoff Location */}
          <div className="space-y-2">
            <Label htmlFor="dropoff-location">Drop-off Location</Label>
            <div className="flex">
              <MapPin className="h-5 w-5 mr-2 text-gray-400 self-center" />
              <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={`dropoff-${location.value}`} value={location.value}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Rate</span>
            <span>${pricePerDay.toFixed(2)} / day</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span>{calculateTotalDays()} days</span>
          </div>
          
          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total</span>
            <span>${calculateTotalPrice().toFixed(2)}</span>
          </div>
          
          <Button type="submit" className="w-full">
            Request Booking
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            You won't be charged yet. We'll confirm availability first.
          </p>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
