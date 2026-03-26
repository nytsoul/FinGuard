import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  industry: string;
  role: string;
  avatar_url?: string;
  phone?: string;
  bank_name?: string;
  bank_account_number?: string;
  account_holder_name?: string;
  pan?: string;
  aadhar?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: any;
  userProfile: UserProfile | null;
  loading: boolean;
  isNewUser: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<any>;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  // Fetch user profile from Supabase
  const fetchUserProfile = async () => {
    try {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      // Error code 'PGRST116' means no rows found - this is expected for new users
      if (error) {
        if (error.code === 'PGRST116') {
          // No profile exists yet - user is new
          setIsNewUser(true);
          setUserProfile(null);
          return;
        } else {
          // Log actual errors
          console.warn('Error fetching profile:', error.message || error);
          setIsNewUser(true);
          return;
        }
      }

      if (data) {
        setUserProfile(data as UserProfile);
        // User is new if they don't have a full_name set
        setIsNewUser(!data.full_name);
      } else {
        // No profile record exists yet
        setIsNewUser(true);
        setUserProfile(null);
      }
    } catch (err: any) {
      console.warn('Error fetching user profile:', err?.message || err);
      // Don't throw - assume user is new
      setIsNewUser(true);
      setUserProfile(null);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile();
      }
      setLoading(false);
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile();
      } else {
        setUser(null);
        setUserProfile(null);
        setIsNewUser(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Sign up
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    });

    if (!error && data.user) {
      setUser(data.user);
      setIsNewUser(true);
    }

    return { data, error };
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data.session?.user) {
      setUser(data.session.user);
      await fetchUserProfile();
    }

    return { data, error };
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setIsNewUser(false);
  };

  // Update profile
  const updateProfile = async (profile: Partial<UserProfile>) => {
    try {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          ...profile,
          updated_at: new Date(),
        })
        .select()
        .single();

      if (!error && data) {
        setUserProfile(data as UserProfile);
        setIsNewUser(false);
      }

      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isNewUser,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        updateProfile,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
