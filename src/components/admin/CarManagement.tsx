
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
import { CarForm } from './CarForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  priceUnit: string;
  year: number;
  passengers: number;
  fuelType: string;
  transmission: string;
  featured?: boolean;
}

export const CarManagement = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      // In a real application, this would be a call to your Supabase table
      // For now, we'll use the mock data for demonstration
      // Replace this with actual Supabase query when you have a cars table
      
      // Mock data for demonstration
      const mockCars: Car[] = [
        {
          id: '1',
          name: 'Model 3',
          brand: 'Tesla',
          image: 'https://images.unsplash.com/photo-1619767886558-efdc7b9af5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
          price: 120,
          priceUnit: 'per day',
          year: 2022,
          passengers: 5,
          fuelType: 'Electric',
          transmission: 'Automatic',
          featured: true
        },
        {
          id: '2',
          name: '911 Carrera',
          brand: 'Porsche',
          image: 'https://images.unsplash.com/photo-1550019479-9bff5c522de5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          price: 350,
          priceUnit: 'per day',
          year: 2021,
          passengers: 2,
          fuelType: 'Gasoline',
          transmission: 'Automatic',
          featured: true
        },
      ];
      
      setCars(mockCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to load cars');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

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

    try {
      // In a real application, this would delete from your Supabase table
      // For now, we'll just remove from local state
      setCars(cars.filter(car => car.id !== carToDelete.id));
      toast.success(`${carToDelete.brand} ${carToDelete.name} deleted successfully`);
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Failed to delete car');
    } finally {
      setIsDeleteDialogOpen(false);
      setCarToDelete(null);
    }
  };

  const handleFormSubmit = (car: Car) => {
    if (editingCar) {
      // Update existing car
      setCars(cars.map(c => c.id === car.id ? car : c));
      toast.success(`${car.brand} ${car.name} updated successfully`);
    } else {
      // Add new car with a temporary ID
      const newCar = {
        ...car,
        id: Date.now().toString(), // In a real app, this would be set by the database
      };
      setCars([...cars, newCar]);
      toast.success(`${car.brand} ${car.name} added successfully`);
    }
    setIsFormOpen(false);
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
      ) : cars.length > 0 ? (
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
                <TableCell>${car.price} {car.priceUnit}</TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div>{car.passengers} Passengers</div>
                    <div>{car.fuelType}</div>
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
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
