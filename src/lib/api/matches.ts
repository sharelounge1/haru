import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type Match = Database['public']['Tables']['matches']['Row']
type MatchInsert = Database['public']['Tables']['matches']['Insert']
type MatchUpdate = Database['public']['Tables']['matches']['Update']
type MatchStatus = Database['public']['Enums']['match_status']
type MatchType = Database['public']['Enums']['match_type']

export interface MatchWithDetails extends Match {
  secretary_profiles: {
    id: string
    rating: number
    experience_years: number
    specialty: string | null
    users: {
      name: string
      email: string
      phone: string | null
    }
  }
  job_postings?: {
    title: string
    region: string | null
  } | null
}

/**
 * 매칭 생성 (공고 지원 또는 직접 연락)
 */
export async function createMatch(matchData: {
  clientId: string
  secretaryId: string
  matchType: MatchType
  jobPostingId?: string
  message?: string
}) {
  const { data, error } = await supabase
    .from('matches')
    .insert({
      client_id: matchData.clientId,
      secretary_id: matchData.secretaryId,
      match_type: matchData.matchType,
      job_posting_id: matchData.jobPostingId || null,
      message: matchData.message || null,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 매칭 상태 업데이트 (승인/거부)
 */
export async function updateMatchStatus(
  matchId: string,
  status: MatchStatus,
  message?: string
) {
  const updates: MatchUpdate = {
    status,
    response_date: status !== 'pending' ? new Date().toISOString() : null
  }

  if (message) {
    updates.message = message
  }

  const { data, error } = await supabase
    .from('matches')
    .update(updates)
    .eq('id', matchId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 내가 받은 제안 목록 (CEO용 - 비서들이 공고에 지원)
 */
export async function getReceivedMatches(clientId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      secretary_profiles (
        id,
        rating,
        experience_years,
        specialty,
        users (
          name,
          email,
          phone
        )
      ),
      job_postings (
        title,
        region
      )
    `)
    .eq('client_id', clientId)
    .order('applied_date', { ascending: false })

  if (error) throw error
  return data as MatchWithDetails[]
}

/**
 * 내가 보낸 제안 목록 (CEO용 - CEO가 직접 비서에게 연락)
 */
export async function getSentMatches(clientId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      secretary_profiles (
        id,
        rating,
        experience_years,
        specialty,
        users (
          name,
          email,
          phone
        )
      ),
      job_postings (
        title,
        region
      )
    `)
    .eq('client_id', clientId)
    .eq('match_type', 'direct_contact')
    .order('applied_date', { ascending: false })

  if (error) throw error
  return data as MatchWithDetails[]
}

/**
 * 비서가 지원한 공고 목록
 */
export async function getSecretaryApplications(secretaryId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      job_postings (
        id,
        title,
        region,
        salary_amount,
        salary_type,
        work_type,
        status
      ),
      client_profiles (
        company_name,
        users (
          name
        )
      )
    `)
    .eq('secretary_id', secretaryId)
    .order('applied_date', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 7일 이상 응답 없는 매칭 필터링
 */
export function filterOldPendingMatches(matches: Match[]) {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  return matches.filter(match => {
    if (match.status === 'pending') {
      const appliedDate = new Date(match.applied_date)
      return appliedDate > sevenDaysAgo
    }
    return true
  })
}

/**
 * 최근 응답한 매칭 정렬 (7일 이내)
 */
export function sortByRecentResponse(matches: Match[]) {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  return [...matches].sort((a, b) => {
    // 승인된 매칭이 최상단
    if (a.status === 'accepted' && b.status !== 'accepted') return -1
    if (a.status !== 'accepted' && b.status === 'accepted') return 1

    // 7일 이내 응답한 매칭이 그 다음
    const aHasRecentResponse = a.response_date && new Date(a.response_date) > sevenDaysAgo
    const bHasRecentResponse = b.response_date && new Date(b.response_date) > sevenDaysAgo

    if (aHasRecentResponse && !bHasRecentResponse) return -1
    if (!aHasRecentResponse && bHasRecentResponse) return 1

    // 나머지는 지원 날짜 기준
    return new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
  })
}

/**
 * 완료된 매칭 목록 (양측 승인)
 */
export async function getCompletedMatches(userId: string, userType: 'client' | 'secretary') {
  const column = userType === 'client' ? 'client_id' : 'secretary_id'

  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      secretary_profiles (
        id,
        users (
          name
        )
      ),
      client_profiles (
        company_name,
        users (
          name
        )
      ),
      job_postings (
        title
      )
    `)
    .eq(column, userId)
    .eq('status', 'completed')
    .order('applied_date', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 매칭 삭제
 */
export async function deleteMatch(matchId: string) {
  const { error } = await supabase
    .from('matches')
    .delete()
    .eq('id', matchId)

  if (error) throw error
}
