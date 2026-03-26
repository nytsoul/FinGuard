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
      setUserProfile(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      await loadProfile(data.session?.user ?? null);
      if (mounted) setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      await loadProfile(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
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
}
