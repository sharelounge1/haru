import { supabase } from '../supabase/client'
import type { Database } from '@/types/database.types'

type Contract = Database['public']['Tables']['contracts']['Row']
type ContractInsert = Database['public']['Tables']['contracts']['Insert']
type ContractUpdate = Database['public']['Tables']['contracts']['Update']
type ContractStatus = Database['public']['Enums']['contract_status']

/**
 * 계약 생성
 */
export async function createContract(contractData: Omit<ContractInsert, 'id'>) {
  const { data, error } = await supabase
    .from('contracts')
    .insert(contractData)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 계약 조회
 */
export async function getContractById(id: string) {
  const { data, error } = await supabase
    .from('contracts')
    .select(`
      *,
      client_profiles (
        company_name,
        users (
          name,
          email,
          phone
        )
      ),
      secretary_profiles (
        users (
          name,
          email,
          phone
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * 내 계약 목록 조회
 */
export async function getMyContracts(
  userId: string,
  userType: 'client' | 'secretary',
  status?: ContractStatus
) {
  const column = userType === 'client' ? 'client_id' : 'secretary_id'

  let query = supabase
    .from('contracts')
    .select(`
      *,
      client_profiles (
        company_name,
        users (
          name
        )
      ),
      secretary_profiles (
        users (
          name
        )
      )
    `)
    .eq(column, userId)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

/**
 * 계약 상태 변경
 */
export async function updateContractStatus(id: string, status: ContractStatus) {
  const { data, error } = await supabase
    .from('contracts')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 계약 수정
 */
export async function updateContract(id: string, updates: ContractUpdate) {
  const { data, error } = await supabase
    .from('contracts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * 계약 삭제
 */
export async function deleteContract(id: string) {
  const { error } = await supabase
    .from('contracts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * 계약 통계 (대시보드용)
 */
export async function getContractStats(
  userId: string,
  userType: 'client' | 'secretary'
) {
  const column = userType === 'client' ? 'client_id' : 'secretary_id'

  const { data, error } = await supabase
    .from('contracts')
    .select('status')
    .eq(column, userId)

  if (error) throw error

  const stats = {
    total: data.length,
    active: data.filter(c => c.status === 'active').length,
    pending: data.filter(c => c.status === 'pending').length,
    completed: data.filter(c => c.status === 'completed').length,
    cancelled: data.filter(c => c.status === 'cancelled').length
  }

  return stats
}
