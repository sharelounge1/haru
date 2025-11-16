import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type Verification = Database['public']['Tables']['verifications']['Row']
type VerificationInsert = Database['public']['Tables']['verifications']['Insert']
type VerificationUpdate = Database['public']['Tables']['verifications']['Update']
type VerificationType = Database['public']['Enums']['verification_type']
type VerificationStatus = Database['public']['Enums']['verification_status']

export interface VerificationWithUser extends Verification {
  users?: {
    name: string
    email: string
  }
}

/**
 * 관리자: 모든 검증 요청 조회
 */
export async function getAllVerifications(
  status?: VerificationStatus
): Promise<VerificationWithUser[]> {
  let query = supabase
    .from('verifications')
    .select(`
      *,
      users (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

/**
 * 관리자: 대기 중인 검증 요청만 조회
 */
export async function getPendingVerifications(): Promise<VerificationWithUser[]> {
  return getAllVerifications('pending')
}

/**
 * 관리자: 검증 승인
 */
export async function approveVerification(verificationId: string) {
  const { data, error } = await supabase
    .from('verifications')
    .update({
      status: 'approved',
      verified_at: new Date().toISOString()
    })
    .eq('id', verificationId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 관리자: 검증 반려
 */
export async function rejectVerification(verificationId: string, reason?: string) {
  const updates: VerificationUpdate = {
    status: 'rejected',
    verified_at: new Date().toISOString()
  }

  // Note: 현재 스키마에 rejection_reason 필드가 없음
  // 필요시 데이터베이스에 컬럼 추가 필요

  const { data, error } = await supabase
    .from('verifications')
    .update(updates)
    .eq('id', verificationId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 사용자: 자신의 검증 요청 조회
 */
export async function getMyVerifications(userId: string): Promise<Verification[]> {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * 사용자: 특정 타입의 검증 상태 조회
 */
export async function getVerificationStatus(
  userId: string,
  verificationType: VerificationType
): Promise<Verification | null> {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('user_id', userId)
    .eq('verification_type', verificationType)
    .maybeSingle()

  if (error) throw error
  return data
}

/**
 * 사용자: 검증 요청 생성
 */
export async function createVerification(
  userId: string,
  verificationType: VerificationType,
  documentUrl?: string
): Promise<Verification> {
  const { data, error } = await supabase
    .from('verifications')
    .insert({
      user_id: userId,
      verification_type: verificationType,
      document_url: documentUrl,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 사용자: 검증 문서 업로드
 */
export async function uploadVerificationDocument(
  userId: string,
  verificationType: VerificationType,
  file: File
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${verificationType}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('verifications')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error

  // Public URL 가져오기
  const { data: { publicUrl } } = supabase.storage
    .from('verifications')
    .getPublicUrl(fileName)

  return publicUrl
}
