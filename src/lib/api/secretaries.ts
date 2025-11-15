import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type SecretaryProfile = Database['public']['Tables']['secretary_profiles']['Row']
type SecretaryInsert = Database['public']['Tables']['secretary_profiles']['Insert']
type SecretaryUpdate = Database['public']['Tables']['secretary_profiles']['Update']

export interface SecretaryWithUser extends SecretaryProfile {
  users: {
    name: string
    email: string
    phone: string | null
  }
}

export interface SearchParams {
  region?: string
  minRating?: number
  minExperience?: number
  specialty?: string
  sortBy?: 'rating' | 'experience' | 'recent'
  limit?: number
  offset?: number
}

/**
 * 비서 목록 조회 (검색/필터링)
 */
export async function searchSecretaries(params: SearchParams = {}) {
  let query = supabase
    .from('secretary_profiles')
    .select(`
      *,
      users (
        name,
        email,
        phone
      )
    `)

  // 필터링
  if (params.region) {
    query = query.eq('region', params.region)
  }

  if (params.minRating) {
    query = query.gte('rating', params.minRating)
  }

  if (params.minExperience) {
    query = query.gte('experience_years', params.minExperience)
  }

  if (params.specialty) {
    query = query.ilike('specialty', `%${params.specialty}%`)
  }

  // 정렬
  switch (params.sortBy) {
    case 'rating':
      query = query.order('rating', { ascending: false })
      break
    case 'experience':
      query = query.order('experience_years', { ascending: false })
      break
    case 'recent':
      query = query.order('created_at', { ascending: false })
      break
    default:
      query = query.order('rating', { ascending: false })
  }

  // 페이지네이션
  if (params.limit) {
    query = query.limit(params.limit)
  }

  if (params.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) throw error
  return data as SecretaryWithUser[]
}

/**
 * 비서 상세 정보 조회
 */
export async function getSecretaryById(id: string) {
  const { data, error } = await supabase
    .from('secretary_profiles')
    .select(`
      *,
      users (
        name,
        email,
        phone
      ),
      certifications (*),
      work_history (*),
      reviews (
        id,
        rating,
        comment,
        created_at,
        reviewer:reviewer_id (
          name
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * 비서 프로필 업데이트
 */
export async function updateSecretaryProfile(id: string, updates: SecretaryUpdate) {
  const { data, error } = await supabase
    .from('secretary_profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 자격증 추가
 */
export async function addCertification(secretaryId: string, certification: {
  name: string
  issuer?: string
  issue_date?: string
  certificate_url?: string
}) {
  const { data, error } = await supabase
    .from('certifications')
    .insert({
      secretary_id: secretaryId,
      ...certification
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 경력 추가
 */
export async function addWorkHistory(secretaryId: string, workHistory: {
  company_name: string
  position?: string
  start_date: string
  end_date?: string
  description?: string
}) {
  const { data, error } = await supabase
    .from('work_history')
    .insert({
      secretary_id: secretaryId,
      ...workHistory
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 비서의 리뷰 목록 조회
 */
export async function getSecretaryReviews(secretaryId: string) {
  // secretaryId로 user_id를 먼저 가져옴
  const { data: profile } = await supabase
    .from('secretary_profiles')
    .select('user_id')
    .eq('id', secretaryId)
    .single()

  if (!profile) return []

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewer:reviewer_id (
        name
      ),
      contract:contract_id (
        title
      )
    `)
    .eq('reviewee_id', profile.user_id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 인기 비서 목록 (평점 높은 순)
 */
export async function getPopularSecretaries(limit = 10) {
  const { data, error } = await supabase
    .from('secretary_profiles')
    .select(`
      *,
      users (
        name
      )
    `)
    .gte('review_count', 3) // 최소 3개 이상 리뷰
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}
