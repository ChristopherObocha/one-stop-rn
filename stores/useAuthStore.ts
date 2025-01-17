import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { supabase } from '~/utils/supabase';

interface Profile {
  username: string;
  website: string;
  avatar_url: string;
  updated_at?: string | Date;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  initialized: boolean;
  loading: boolean;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile) => void;
  getProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<() => void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  initialized: false,
  loading: false,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
    }),
  setProfile: (profile) => set({ profile }),
  getProfile: async () => {
    try {
      set({ loading: true });
      const { session } = get();
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, updated_at`)
        .eq('id', session.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        set({ profile: data });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error loading profile:', error.message);
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null });
  },
  initialize: async () => {
    // Get initial session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({
      session,
      user: session?.user ?? null,
      initialized: true,
    });

    // If we have a session, get the profile
    if (session?.user) {
      await get().getProfile().catch(console.error);
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      set({
        session,
        user: session?.user ?? null,
      });

      // Get profile when session changes
      if (session?.user) {
        await get().getProfile().catch(console.error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  },
}));
