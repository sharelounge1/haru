import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type User = Database['public']['Tables']['users']['Row']
type UserUpdate = Database['public']['Tables']['users']['Update']
type ClientProfile = Database['public']['Tables']['client_profiles']['Row']
type SecretaryProfile = Database['public']['Tables']['secretary_profiles']['Row']

/**
 * 현재 사용자 프로필 조회
 */
export async function getCurrentUserProfile() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}

/**
 * 사용자 기본 정보 업데이트
 */
export async function updateUser(id: string, updates: UserUpdate) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 경영자 프로필 조회
 */
export async function getClientProfile(userId: string) {
  const { data, error } = await supabase
    .from('client_profiles')
    .select(`
      *,
      users (
        name,
        email,
        phone
      )
    `)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

/**
 * 경영자 프로필 업데이트
 */
export async function updateClientProfile(
  userId: string,
  updates: Partial<ClientProfile>
) {
  const { data, error } = await supabase
    .from('client_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 비서 프로필 조회
 */
export async function getSecretaryProfile(userId: string) {
  const { data, error } = await supabase
    .from('secretary_profiles')
    .select(`
      *,
      users (
        name,
        email,
        phone
      )
    `)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

/**
 * 비서 프로필 업데이트
 */
export async function updateSecretaryProfile(
  userId: string,
  updates: Partial<SecretaryProfile>
) {
  const { data, error } = await supabase
    .from('secretary_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 프로필 사진 업로드
 */
export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error

  // Public URL 가져오기
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName)

  return publicUrl
}

/**
 * 사용자 삭제 (탈퇴)
 */
export async function deleteUser(userId: string) {
  // Supabase Auth에서 사용자 삭제
  // 실제로는 관리자 권한이 필요하므로 서버 함수로 구현해야 함
  // 여기서는 soft delete로 처리
  const { error } = await supabase
    .from('users')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) throw error
}
