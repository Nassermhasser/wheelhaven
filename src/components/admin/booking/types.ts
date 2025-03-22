
export interface Booking {
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
