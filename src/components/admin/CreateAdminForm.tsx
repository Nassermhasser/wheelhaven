
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus } from 'lucide-react';

const adminSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface CreateAdminFormProps {
  onAdminCreated?: () => void;
}

export const CreateAdminForm = ({ onAdminCreated }: CreateAdminFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();

  // Validate current user is admin
  if (!profile?.is_admin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            You don't have permission to create admin users.
          </div>
        </CardContent>
      </Card>
    );
  }

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const handleSubmit = async (data: AdminFormValues) => {
    setIsLoading(true);
    
    try {
      // First create the user with supabase auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            is_admin: true,
          },
          emailRedirectTo: `${window.location.origin}/auth?mode=login&admin=true`
        },
      });

      if (signUpError) {
        toast.error(signUpError.message);
        return;
      }

      // Make sure user was created
      if (!authData.user) {
        toast.error("Failed to create admin user");
        return;
      }

      // Ensure the user has admin privileges by updating their profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', authData.user.id);
      
      if (updateError) {
        toast.error("Admin created but couldn't set privileges: " + updateError.message);
        return;
      }

      toast.success(`Admin user ${data.firstName} ${data.lastName} created successfully!`);
      toast.info("A confirmation email has been sent to the new admin");
      
      form.reset();
      
      // Notify parent component that an admin was created
      if (onAdminCreated) {
        onAdminCreated();
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('Failed to create admin user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create New Admin
        </CardTitle>
        <CardDescription>
          Create a new administrator account with full system access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="admin@example.com" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="••••••••" 
                      type="password"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Admin...' : 'Create Admin'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
