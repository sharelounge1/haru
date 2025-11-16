import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import * as authApi from '@/lib/supabase/auth'
import * as usersApi from '@/lib/api/users'
import type { Database } from '@/types/database.types'

type UserProfile = Database['public']['Tables']['users']['Row']

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: authApi.SignUpData) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 세션 확인
    authApi.getCurrentUser().then((currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        loadUserProfile()
      }
      setLoading(false)
    })

    // 인증 상태 변경 리스너
    const { data: { subscription } } = authApi.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadUserProfile()
        } else {
          setUserProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async () => {
    try {
      const profile = await usersApi.getCurrentUserProfile()
      setUserProfile(profile)
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { user: authUser } = await authApi.signIn({ email, password })
    setUser(authUser)
    if (authUser) {
      await loadUserProfile()
    }
  }

  const signUp = async (data: authApi.SignUpData) => {
    const { user: authUser } = await authApi.signUp(data)
    setUser(authUser)
    if (authUser) {
      await loadUserProfile()
    }
  }

  const signOut = async () => {
    await authApi.signOut()
    setUser(null)
    setUserProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Protected Route Component
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white">로딩 중...</div>
      </div>
    )
  }

  return user ? <>{children}</> : null
}
