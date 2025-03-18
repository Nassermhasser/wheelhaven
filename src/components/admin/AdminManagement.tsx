
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreateAdminForm } from './CreateAdminForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';

interface AdminProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  created_at: string;
}

export const AdminManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger refresh after creating a new admin
  const handleAdminCreated = () => {
    setRefreshTrigger(prev => prev + 1);
    toast.success("Admin list has been refreshed");
  };

  // Fetch all admin users
  const { data: admins, isLoading } = useQuery({
    queryKey: ['admins', refreshTrigger],
    queryFn: async () => {
      // First get the profiles with is_admin=true
      const { data: adminProfiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, created_at')
        .eq('is_admin', true);

      if (profileError) {
        throw profileError;
      }

      // For each admin profile, get the email from auth.users via API
      // (This is a simplified version - in a real app, you'd use a server function)
      const adminProfilesWithEmail: AdminProfile[] = [];
      
      for (const profile of adminProfiles) {
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profile.id);
        
        if (!userError && userData.user) {
          adminProfilesWithEmail.push({
            ...profile,
            email: userData.user.email || 'No email',
          });
        }
      }

      return adminProfilesWithEmail;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Tabs defaultValue="create" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="create">Create Admin</TabsTrigger>
        <TabsTrigger value="list">Admin List</TabsTrigger>
      </TabsList>
      
      <TabsContent value="create">
        <div className="max-w-md mx-auto">
          <CreateAdminForm onAdminCreated={handleAdminCreated} />
        </div>
      </TabsContent>
      
      <TabsContent value="list">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Administrator Accounts
            </CardTitle>
            <CardDescription>
              View all administrators who have access to the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : admins && admins.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">
                        {admin.first_name} {admin.last_name}
                      </TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        {new Date(admin.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No administrators found
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
