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
  // 1. Supabase Auth에 사용자 생성
  // users 테이블은 데이터베이스 트리거에서 자동으로 생성됨
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_type: data.userType,
        name: data.name,
        phone: data.phone
      }
    }
  })

  if (error) throw error
  if (!authData.user) throw new Error('User creation failed')

  // 2. user_type에 따라 client_profiles 또는 secretary_profiles 생성
  // 트리거에서 users 테이블이 생성된 후 실행되므로 짧은 지연 추가
  await new Promise(resolve => setTimeout(resolve, 500))

  if (data.userType === 'client') {
    const { error: profileError } = await supabase
      .from('client_profiles')
      .insert({
        user_id: authData.user.id
      })

    if (profileError) {
      console.error('Client profile creation error:', profileError)
      throw new Error('Failed to create client profile')
    }
  } else if (data.userType === 'secretary') {
    const { error: profileError } = await supabase
      .from('secretary_profiles')
      .insert({
        user_id: authData.user.id
      })

    if (profileError) {
      console.error('Secretary profile creation error:', profileError)
      throw new Error('Failed to create secretary profile')
    }
  }

  return authData
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
