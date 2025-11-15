import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type Payment = Database['public']['Tables']['payments']['Row']
type PaymentInsert = Database['public']['Tables']['payments']['Insert']
type PaymentUpdate = Database['public']['Tables']['payments']['Update']
type PaymentStatus = Database['public']['Enums']['payment_status']

/**
 * 결제 생성
 */
export async function createPayment(paymentData: Omit<PaymentInsert, 'id'>) {
  const { data, error } = await supabase
    .from('payments')
    .insert(paymentData)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 계약의 결제 내역 조회
 */
export async function getPaymentsByContract(contractId: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('contract_id', contractId)
    .order('payment_date', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 내 결제 내역 조회
 */
export async function getMyPayments(
  userId: string,
  userType: 'client' | 'secretary'
) {
  // 먼저 사용자의 계약 ID들을 가져옴
  const column = userType === 'client' ? 'client_id' : 'secretary_id'

  const { data: contracts } = await supabase
    .from('contracts')
    .select('id')
    .eq(column, userId)

  if (!contracts || contracts.length === 0) return []

  const contractIds = contracts.map(c => c.id)

  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      contracts (
        title,
        client_profiles (
          company_name
        ),
        secretary_profiles (
          users (
            name
          )
        )
      )
    `)
    .in('contract_id', contractIds)
    .order('payment_date', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 결제 상태 변경
 */
export async function updatePaymentStatus(id: string, status: PaymentStatus) {
  const { data, error } = await supabase
    .from('payments')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 결제 수정
 */
export async function updatePayment(id: string, updates: PaymentUpdate) {
  const { data, error } = await supabase
    .from('payments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 결제 통계
 */
export async function getPaymentStats(
  userId: string,
  userType: 'client' | 'secretary'
) {
  const payments = await getMyPayments(userId, userType)

  const completedPayments = payments.filter(p => p.status === 'completed')
  const totalAmount = completedPayments.reduce((sum, p) => sum + p.amount, 0)

  return {
    total: payments.length,
    completed: completedPayments.length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalAmount
  }
}
