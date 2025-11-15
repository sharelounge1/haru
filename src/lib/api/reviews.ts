import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type Review = Database['public']['Tables']['reviews']['Row']
type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

/**
 * 리뷰 작성
 */
export async function createReview(reviewData: Omit<ReviewInsert, 'id'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(reviewData)
    .select()
    .single()

  if (error) throw error

  // 리뷰 작성 후 비서 평점 자동 업데이트 (트리거에서 처리됨)
  return data
}

/**
 * 계약의 리뷰 조회
 */
export async function getReviewByContract(contractId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewer:reviewer_id (
        name
      ),
      reviewee:reviewee_id (
        name
      )
    `)
    .eq('contract_id', contractId)

  if (error) throw error
  return data
}

/**
 * 사용자가 받은 리뷰 조회
 */
export async function getReceivedReviews(userId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewer:reviewer_id (
        name
      ),
      contracts (
        title
      )
    `)
    .eq('reviewee_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 사용자가 작성한 리뷰 조회
 */
export async function getWrittenReviews(userId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      reviewee:reviewee_id (
        name
      ),
      contracts (
        title
      )
    `)
    .eq('reviewer_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 리뷰 작성 가능 여부 확인
 */
export async function canWriteReview(contractId: string, userId: string) {
  // 이미 작성한 리뷰가 있는지 확인
  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id')
    .eq('contract_id', contractId)
    .eq('reviewer_id', userId)
    .single()

  if (existingReview) return false

  // 계약이 완료 상태인지 확인
  const { data: contract } = await supabase
    .from('contracts')
    .select('status')
    .eq('id', contractId)
    .single()

  return contract?.status === 'completed'
}
