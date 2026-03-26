<<<<<<< HEAD
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
=======
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  company_name: string | null;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  upsertProfile: (payload: Partial<Pick<UserProfile, 'full_name' | 'company_name'>>) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    // PGRST116 means no row found in PostgREST
    if ((error as any).code === 'PGRST116') return null;
    throw error;
  }
  return data as UserProfile;
}

async function ensureProfile(user: User): Promise<UserProfile | null> {
  const existing = await getProfile(user.id);
  if (existing) return existing;

  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      id: user.id,
      email: user.email ?? null,
      full_name: user.user_metadata?.full_name ?? null,
      company_name: null
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as UserProfile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (currentUser: User | null) => {
    if (!currentUser) {
      setUserProfile(null);
      return;
    }

    try {
      const profile = await ensureProfile(currentUser);
      setUserProfile(profile);
    } catch {
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
      setUserProfile(null);
    }
  };

<<<<<<< HEAD
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
=======
  useEffect(() => {
    let mounted = true;

    // Initialize session with timeout fallback
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!mounted) return;
        
        if (error) {
          console.error('Failed to get session:', error);
          setSession(null);
          setUser(null);
          setUserProfile(null);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          await loadProfile(data.session?.user ?? null);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (mounted) {
          setSession(null);
          setUser(null);
          setUserProfile(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // Set a timeout to force loading to false after 5 seconds
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn('Session loading timeout - forcing completion');
        setLoading(false);
      }
    }, 5000);

    initAuth();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!mounted) return;
      console.log('🔐 Auth state changed:', _event, !!nextSession?.user);
      
      // Explicitly handle logout event
      if (_event === 'SIGNED_OUT') {
        console.log('🔐 SIGNED_OUT detected - clearing auth state');
        setSession(null);
        setUser(null);
        setUserProfile(null);
      } else {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        await loadProfile(nextSession?.user ?? null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    session,
    userProfile,
    loading,
    signIn: async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? new Error(error.message) : null };
    },
    signUp: async (email: string, password: string) => {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error: error ? new Error(error.message) : null };
    },
    signInWithGoogle: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
      return { error: error ? new Error(error.message) : null };
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    },
    refreshProfile: async () => {
      if (!user) {
        setUserProfile(null);
        return;
      }
      const profile = await getProfile(user.id);
      setUserProfile(profile);
    },
    upsertProfile: async (payload) => {
      if (!user) return { error: new Error('Not authenticated') };
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: user.email ?? null,
          full_name: payload.full_name ?? null,
          company_name: payload.company_name ?? null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (!error) {
        const profile = await getProfile(user.id);
        setUserProfile(profile);
      }

      return { error: error ? new Error(error.message) : null };
    }
  }), [loading, session, user, userProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
}
