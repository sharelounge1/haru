import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import * as authApi from '@/lib/supabase/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 세션 확인
    authApi.getCurrentUser().then(setUser).finally(() => setLoading(false))

    // 인증 상태 변경 리스너
    const { data: { subscription } } = authApi.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    loading,
    signUp: authApi.signUp,
    signIn: authApi.signIn,
    signOut: authApi.signOut,
    resetPassword: authApi.resetPassword,
    updatePassword: authApi.updatePassword
  }
}
