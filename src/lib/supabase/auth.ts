import { supabase } from './client'
import type { User } from '@supabase/supabase-js'

export interface SignUpData {
  email: string
  password: string
  userType: 'client' | 'secretary'
  name: string
  phone?: string
}

export interface SignInData {
  email: string
  password: string
}

/**
 * 회원가입
 */
export async function signUp(data: SignUpData) {
  console.log('🔵 회원가입 시도:', {
    email: data.email,
    userType: data.userType,
    name: data.name,
    phone: data.phone
  })

  console.log('⏳ Supabase Auth API 호출 중...')

  // 직접 REST API 호출 (SDK 우회)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        data: {
          user_type: data.userType,
          name: data.name,
          phone: data.phone
        },
        // 이메일 확인 건너뛰기
        gotrue_meta_security: {}
      })
    })

    console.log('📦 API 응답 상태:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('🔴 API 오류:', errorData)
      throw new Error(errorData.message || '회원가입 실패')
    }

    const authData = await response.json()
    console.log('📦 Auth API 응답:', {
      hasUser: !!authData.user,
      hasSession: !!authData.session,
      userId: authData.user?.id
    })

    if (!authData.user) {
      throw new Error('User creation failed')
    }

    console.log('✅ Auth 사용자 생성 성공')

    // 트리거 대기
    console.log('⏳ 트리거 실행 대기 중 (500ms)...')
    await new Promise(resolve => setTimeout(resolve, 500))

    // 프로필 생성
    if (data.userType === 'client') {
      console.log('🔵 client_profiles 생성 시도...')
      const { error: profileError } = await supabase
        .from('client_profiles')
        .insert({ user_id: authData.user.id })

      if (profileError) {
        console.error('🔴 Client profile 생성 오류:', profileError)
        throw new Error('Failed to create client profile')
      }
      console.log('✅ Client profile 생성 성공')
    } else if (data.userType === 'secretary') {
      console.log('🔵 secretary_profiles 생성 시도...')
      const { error: profileError } = await supabase
        .from('secretary_profiles')
        .insert({ user_id: authData.user.id })

      if (profileError) {
        console.error('🔴 Secretary profile 생성 오류:', profileError)
        throw new Error('Failed to create secretary profile')
      }
      console.log('✅ Secretary profile 생성 성공')
    }

    console.log('✅ 회원가입 완료!')
    return { user: authData.user, session: authData.session }

  } catch (error: any) {
    console.error('🔴 회원가입 전체 오류:', error)
    throw error
  }
}

/**
 * 로그인
 */
export async function signIn(data: SignInData) {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  })

  if (error) throw error
  return authData
}

/**
 * 로그아웃
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * 현재 사용자 가져오기
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * 현재 세션 가져오기
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * 비밀번호 재설정 이메일 발송
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })

  if (error) throw error
}

/**
 * 비밀번호 업데이트
 */
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
}

/**
 * 인증 상태 변경 리스너
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback)
}
