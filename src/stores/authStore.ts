import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import * as authApi from '@/lib/supabase/auth'
import * as usersApi from '@/lib/api/users'

interface AuthState {
  user: User | null
  userProfile: any | null
  loading: boolean
  setUser: (user: User | null) => void
  setUserProfile: (profile: any) => void
  loadUserProfile: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  loading: true,

  setUser: (user) => set({ user }),

  setUserProfile: (profile) => set({ userProfile: profile }),

  loadUserProfile: async () => {
    try {
      const profile = await usersApi.getCurrentUserProfile()
      set({ userProfile: profile })
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  },

  signOut: async () => {
    await authApi.signOut()
    set({ user: null, userProfile: null })
  }
}))
