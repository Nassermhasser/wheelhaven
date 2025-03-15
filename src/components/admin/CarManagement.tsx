
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
import { Edit, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CarForm } from './CarForm';
import { type CarProps } from '@/components/CarCard';

export interface Car extends CarProps {}

export const CarManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch cars using React Query
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['adminCars'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('brand');
      
      if (error) throw error;
      return data as Car[];
    }
  });

  // Create mutation for adding/updating cars
  const saveMutation = useMutation({
    mutationFn: async (car: Car) => {
      if (car.id) {
        // Update existing car
        const { data, error } = await supabase
          .from('cars')
          .update({
            name: car.name,
            brand: car.brand,
            image: car.image,
            price: car.price,
            price_unit: car.priceUnit,
            year: car.year,
            passengers: car.passengers,
            fuel_type: car.fuelType,
            transmission: car.transmission,
            featured: car.featured
          })
          .eq('id', car.id)
          .select();
          
        if (error) throw error;
        return data;
      } else {
        // Add new car
        const { data, error } = await supabase
          .from('cars')
          .insert({
            name: car.name,
            brand: car.brand,
            image: car.image,
            price: car.price,
            price_unit: car.priceUnit,
            year: car.year,
            passengers: car.passengers,
            fuel_type: car.fuelType,
            transmission: car.transmission,
            featured: car.featured
          })
          .select();
          
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCars'] });
      queryClient.invalidateQueries({ queryKey: ['allCars'] });
      queryClient.invalidateQueries({ queryKey: ['popularCars'] });
      queryClient.invalidateQueries({ queryKey: ['carDetail'] });
      setIsFormOpen(false);
    },
    onError: (error) => {
      console.error('Error saving car:', error);
      toast.error('Failed to save car');
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCars'] });
      queryClient.invalidateQueries({ queryKey: ['allCars'] });
      queryClient.invalidateQueries({ queryKey: ['popularCars'] });
      setIsDeleteDialogOpen(false);
      setCarToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting car:', error);
      toast.error('Failed to delete car');
    }
  });

  // Show error toast if query fails
  useEffect(() => {
    if (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to load cars');
    }
  }, [error]);

  const handleAddNew = () => {
    setEditingCar(null);
    setIsFormOpen(true);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setIsFormOpen(true);
  };

  const handleDelete = (car: Car) => {
    setCarToDelete(car);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;
    deleteMutation.mutate(carToDelete.id);
  };

  const handleFormSubmit = (car: Car) => {
    saveMutation.mutate(car);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Car Inventory</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2" />
          Add New Car
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : cars && cars.length > 0 ? (
        <Table>
          <TableCaption>List of available cars in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.name}`} 
                    className="h-16 w-24 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>{car.brand} {car.name}</div>
                  {car.featured && (
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full mt-1">Featured</span>
                  )}
                </TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>${car.price} {car.price_unit || car.priceUnit}</TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div>{car.passengers} Passengers</div>
                    <div>{car.fuel_type || car.fuelType}</div>
                    <div>{car.transmission}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(car)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(car)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No cars found</p>
          <Button onClick={handleAddNew} className="mt-4">
            Add Your First Car
          </Button>
        </div>
      )}

      {/* Car Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
            <DialogDescription>
              {editingCar 
                ? 'Update the details of the selected car' 
                : 'Fill in the details to add a new car to the inventory'
              }
            </DialogDescription>
          </DialogHeader>
          <CarForm 
            car={editingCar || undefined} 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {carToDelete?.brand} {carToDelete?.name}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
