import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { supabase } from '~/utils/supabase';

interface Profile {
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
    }),
  setProfile: (profile) => set({ profile }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null });
  },
}));
