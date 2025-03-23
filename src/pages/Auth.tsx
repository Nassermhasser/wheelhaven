
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, Mail, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isAdmin = searchParams.get('admin') === 'true';
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const { user, profile, refreshProfile, isAdmin: userIsAdmin } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      agreeTerms: false,
    },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    // Check for email confirmation token in URL
    const hash = window.location.hash;
    if (hash && hash.includes('type=signup') && hash.includes('access_token')) {
      setVerifyingEmail(true);
      // The token is automatically processed by Supabase
      // We just need to check if the user is logged in now
      setTimeout(() => {
        if (user) {
          toast.success("Email verified successfully!");
          navigate('/');
        }
      }, 1000);
    }

    // Check for password reset token in URL
    if (hash && hash.includes('type=recovery') && hash.includes('access_token')) {
      // Handle password reset flow
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      if (token) {
        navigate('/auth?mode=reset-password&token=' + token);
      }
    }
  }, [navigate, user]);

  useEffect(() => {
    // If user is logged in and verified, redirect to appropriate page
    if (user && profile) {
      console.log("Auth page - User logged in, profile:", profile);
      console.log("isAdmin param:", isAdmin, "userIsAdmin:", userIsAdmin, "profile.is_admin:", profile.is_admin);
      
      // If admin login was requested and user is admin, redirect to admin page
      if (isAdmin && profile.is_admin === true) {
        console.log("Redirecting to admin page from Auth");
        navigate('/admin');
        return;
      }
      
      // Otherwise redirect to home
      if (!isAdmin) {
        console.log("Redirecting to home page from Auth");
        navigate('/');
        return;
      }
      
      // If admin login was requested but user is not admin, show error
      if (isAdmin && !profile.is_admin) {
        toast.error("You do not have admin privileges");
        navigate('/');
        return;
      }
    }
  }, [user, profile, navigate, isAdmin, userIsAdmin]);

  const handleLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    setIsConnectionError(false);

    try {
      console.log("Attempting login with:", data.email);
      const { error, data: authData } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login error:", error.message);
        
        // Check if it's a network error
        if (error.message.includes('NetworkError') || error.message.includes('network') || error.status === 0) {
          setIsConnectionError(true);
          setAuthError("Unable to connect to the authentication server. Please check your internet connection and try again.");
        } else {
          setAuthError(error.message);
        }
        
        setIsLoading(false);
        return;
      }

      // Refresh profile to get updated admin status
      await refreshProfile();
      console.log("Login successful, refreshed profile");
      
      // Toast will show, but navigation happens in the useEffect
      toast.success("Login successful!");
    } catch (error) {
      console.error('Login error:', error);
      
      // Check if it's a network error
      if (error instanceof Error && 
          (error.message.includes('NetworkError') || 
           error.message.includes('network') || 
           error.name === 'TypeError')) {
        setIsConnectionError(true);
        setAuthError("Unable to connect to the authentication server. Please check your internet connection and try again.");
      } else {
        setAuthError('An unexpected error occurred');
      }
      
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    setIsConnectionError(false);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth?mode=login`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('NetworkError') || signUpError.message.includes('network') || signUpError.status === 0) {
          setIsConnectionError(true);
          setAuthError("Unable to connect to the authentication server. Please check your internet connection and try again.");
        } else {
          setAuthError(signUpError.message);
        }
        setIsLoading(false);
        return;
      }

      setEmailSent(true);
      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error instanceof Error && 
          (error.message.includes('NetworkError') || 
           error.message.includes('network') || 
           error.name === 'TypeError')) {
        setIsConnectionError(true);
        setAuthError("Unable to connect to the authentication server. Please check your internet connection and try again.");
      } else {
        setAuthError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    setIsConnectionError(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth?mode=reset-password`,
      });

      if (error) {
        if (error.message.includes('NetworkError') || error.message.includes('network') || error.status === 0) {
          setIsConnectionError(true);
          setAuthError("Unable to connect to the authentication server. Please check your internet connection and try again.");
        } else {
          setAuthError(error.message);
        }
        setIsLoading(false);
        return;
      }

      setResetEmailSent(true);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (error instanceof Error && 
          (error.message.includes('NetworkError') || 
           error.message.includes('network') || 
           error.name === 'TypeError')) {
        setIsConnectionError(true);
        setAuthError("Unable to connect to the authentication server. Please check your internet connection and try again.");
      } else {
        setAuthError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    loginForm.setValue('email', 'admin@carrental.com');
    loginForm.setValue('password', 'admin123');
    toast.info("Default admin credentials filled in. Click Sign in to continue.");
  };
  
  const handleRetryConnection = () => {
    setIsConnectionError(false);
    setAuthError(null);
    // No need to do anything else, just clear the errors
    toast.info("Retrying connection...");
  };

  // If email verification is in progress
  if (verifyingEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Verifying Your Email</CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If signup was successful and we're waiting for email verification
  if (emailSent && mode === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent you a verification link to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              Please check your email inbox and click the verification link to activate your account.
            </p>
            <p className="text-sm text-muted-foreground">
              If you don't see the email, check your spam folder or try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setEmailSent(false)}
            >
              Back to Sign Up
            </Button>
            <div className="text-center text-sm">
              Already verified?{' '}
              <a href="/auth?mode=login" className="text-primary hover:underline">
                Sign in
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If password reset email was sent
  if (resetEmailSent && forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              Please check your email inbox and click the link to reset your password.
            </p>
            <p className="text-sm text-muted-foreground">
              If you don't see the email, check your spam folder or try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setResetEmailSent(false);
                setForgotPassword(false);
              }}
            >
              Back to Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Forgot password form
  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isConnectionError && (
              <Alert variant="destructive" className="mb-4">
                <WifiOff className="h-4 w-4" />
                <AlertTitle>Connection Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-2">
                  <p>{authError}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 self-start"
                    onClick={handleRetryConnection}
                  >
                    <Wifi className="h-4 w-4 mr-2" />
                    Retry Connection
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            {authError && !isConnectionError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Form {...forgotPasswordForm}>
              <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)} className="space-y-4">
                <FormField
                  control={forgotPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email" 
                          autoComplete="email"
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
                  disabled={isLoading || isConnectionError}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <div className="text-center text-sm">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPassword(false);
                }} 
                className="text-primary hover:underline"
              >
                Back to Sign In
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
            {isAdmin && mode === 'login' && ' (Admin)'}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Fill in the details below to create your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnectionError && (
            <Alert variant="destructive" className="mb-4">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>{authError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 self-start"
                  onClick={handleRetryConnection}
                >
                  <Wifi className="h-4 w-4 mr-2" />
                  Retry Connection
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {authError && !isConnectionError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {isAdmin && !userIsAdmin && user && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Admin Access Required</AlertTitle>
              <AlertDescription>This account does not have administrator privileges.</AlertDescription>
            </Alert>
          )}

          {mode === 'login' ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email" 
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password"
                          autoComplete="current-password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Remember me</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div>
                    <a 
                      href="#" 
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setForgotPassword(true);
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || isConnectionError}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
                
                {mode === 'login' && (
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 flex items-center gap-2"
                      onClick={handleAdminLogin}
                    >
                      <ShieldAlert className="h-4 w-4" />
                      Admin Login
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={signupForm.control}
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
                    control={signupForm.control}
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
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email"
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1 (555) 000-0000" 
                          type="tel"
                          autoComplete="tel"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password"
                          autoComplete="new-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password"
                          autoComplete="new-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms and conditions
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || isConnectionError}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <div>
                Don't have an account?{' '}
                <a href="/auth?mode=register" className="text-primary hover:underline">
                  Sign up
                </a>
              </div>
            ) : (
              <div>
                Already have an account?{' '}
                <a href="/auth?mode=login" className="text-primary hover:underline">
                  Sign in
                </a>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
