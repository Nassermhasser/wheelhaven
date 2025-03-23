
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  email_confirmed: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        if (error.code !== 'PGRST116') { // Not found error is expected for new users
          throw error;
        }
        return null;
      }

      if (profileData) {
        console.log('Profile data loaded:', profileData);
        setProfile(profileData);
        console.log('Setting isAdmin to:', profileData.is_admin === true);
        setIsAdmin(profileData.is_admin === true);
        return profileData;
      }
      
      return null;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      // Don't throw the error to prevent breaking the auth flow
      return null;
    }
  };

  const refreshProfile = async () => {
    console.log("Refreshing profile, current user:", user?.id);
    if (user?.id) {
      const profileData = await fetchProfile(user.id);
      return profileData;
    }
    return null;
  };

  useEffect(() => {
    console.log("Setting up AuthContext");
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log('Auth state changed:', event, newSession?.user?.id);
            console.log('Event details:', { event, user: newSession?.user?.email });
            
            setSession(newSession);
            setUser(newSession?.user ?? null);
            
            if (event === 'SIGNED_IN' && newSession?.user) {
              const profileData = await fetchProfile(newSession.user.id);
              console.log('Profile after sign in:', profileData);
            }
            
            if (event === 'SIGNED_OUT') {
              setProfile(null);
              setIsAdmin(false);
              console.log('User signed out, cleared profile and admin status');
            }
            
            if (event === 'USER_UPDATED' && newSession?.user) {
              const profileData = await fetchProfile(newSession.user.id);
              console.log('Profile after user update:', profileData);
            }
          }
        );
        
        // THEN check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session check:', currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          const profileData = await fetchProfile(currentSession.user.id);
          console.log('Initial profile:', profileData);
        }
        
        return () => {
          console.log("Cleaning up auth subscription");
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth initialization:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const cleanup = initializeAuth();
    
    return () => {
      cleanup.then(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
    };
  }, []);

  const signOut = async () => {
    try {
      console.log("Signing out user");
      await supabase.auth.signOut();
      setProfile(null);
      setIsAdmin(false);
      toast.success("Successfully signed out");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Failed to sign out");
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signOut,
    refreshProfile,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
