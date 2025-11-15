import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type JobPosting = Database['public']['Tables']['job_postings']['Row']
type JobInsert = Database['public']['Tables']['job_postings']['Insert']
type JobUpdate = Database['public']['Tables']['job_postings']['Update']
type JobStatus = Database['public']['Enums']['job_status']

export interface JobWithClient extends JobPosting {
  client_profiles: {
    company_name: string | null
    region: string | null
    users: {
      name: string
    }
  }
}

export interface JobSearchParams {
  region?: string
  workType?: string
  salaryMin?: number
  status?: JobStatus
  categories?: string[]
  sortBy?: 'recent' | 'salary' | 'applicants'
  limit?: number
  offset?: number
}

/**
 * 공고 목록 조회 (검색/필터링)
 */
export async function searchJobs(params: JobSearchParams = {}) {
  let query = supabase
    .from('job_postings')
    .select(`
      *,
      client_profiles (
        company_name,
        region,
        users (
          name
        )
      )
    `)

  // 필터링
  if (params.region) {
    query = query.eq('region', params.region)
  }

  if (params.workType) {
    query = query.eq('work_type', params.workType)
  }

  if (params.salaryMin) {
    query = query.gte('salary_amount', params.salaryMin)
  }

  if (params.status) {
    query = query.eq('status', params.status)
  }

  if (params.categories && params.categories.length > 0) {
    query = query.contains('categories', params.categories)
  }

  // 정렬
  switch (params.sortBy) {
    case 'recent':
      query = query.order('created_at', { ascending: false })
      break
    case 'salary':
      query = query.order('salary_amount', { ascending: false, nullsFirst: false })
      break
    case 'applicants':
      query = query.order('applicant_count', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
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
  return data as JobWithClient[]
}

/**
 * 공고 상세 정보 조회
 */
export async function getJobById(id: string) {
  const { data, error } = await supabase
    .from('job_postings')
    .select(`
      *,
      client_profiles (
        company_name,
        region,
        bio,
        users (
          name,
          phone,
          email
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * 공고 생성
 */
export async function createJob(clientId: string, jobData: Omit<JobInsert, 'client_id'>) {
  const { data, error } = await supabase
    .from('job_postings')
    .insert({
      client_id: clientId,
      ...jobData
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 공고 수정
 */
export async function updateJob(jobId: string, updates: JobUpdate) {
  const { data, error } = await supabase
    .from('job_postings')
    .update(updates)
    .eq('id', jobId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 공고 삭제
 */
export async function deleteJob(jobId: string) {
  const { error } = await supabase
    .from('job_postings')
    .delete()
    .eq('id', jobId)

  if (error) throw error
}

/**
 * 공고 상태 변경
 */
export async function updateJobStatus(jobId: string, status: JobStatus) {
  const { data, error } = await supabase
    .from('job_postings')
    .update({ status })
    .eq('id', jobId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 내 공고 목록 조회
 */
export async function getMyJobs(clientId: string, status?: JobStatus) {
  let query = supabase
    .from('job_postings')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

/**
 * 공고의 지원자 목록 조회
 */
export async function getJobApplicants(jobId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      secretary_profiles (
        *,
        users (
          name,
          email,
          phone
        )
      )
    `)
    .eq('job_posting_id', jobId)
    .eq('match_type', 'job_application')
    .order('applied_date', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 추천 공고 (비서용)
 */
export async function getRecommendedJobs(secretaryId: string, limit = 10) {
  // 비서 프로필 정보 가져오기
  const { data: profile } = await supabase
    .from('secretary_profiles')
    .select('region, specialty')
    .eq('id', secretaryId)
    .single()

  if (!profile) return []

  // 같은 지역, 유사한 specialty 공고 추천
  const { data, error } = await supabase
    .from('job_postings')
    .select(`
      *,
      client_profiles (
        company_name,
        users (
          name
        )
      )
    `)
    .eq('status', 'recruiting')
    .eq('region', profile.region)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}
