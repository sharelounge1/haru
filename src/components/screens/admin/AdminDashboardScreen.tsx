import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, UserCheck, Shield, Settings, TrendingUp, Clock, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import * as verificationsApi from '@/lib/api/verifications'

interface DashboardStats {
  totalClients: number
  totalSecretaries: number
  pendingVerifications: number
  activeContracts: number
  totalRevenue: number
}

export default function AdminDashboardScreen() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalSecretaries: 0,
    pendingVerifications: 0,
    activeContracts: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentVerifications, setRecentVerifications] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    setError('')

    try {
      // Get total clients
      const { count: clientCount } = await supabase
        .from('client_profiles')
        .select('*', { count: 'exact', head: true })

      // Get total secretaries
      const { count: secretaryCount } = await supabase
        .from('secretary_profiles')
        .select('*', { count: 'exact', head: true })

      // Get pending verifications
      const pendingVerifs = await verificationsApi.getPendingVerifications()

      // Get active contracts
      const { count: activeContractsCount } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      // Get total revenue from completed payments
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'completed')

      const totalRevenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0

      setStats({
        totalClients: clientCount || 0,
        totalSecretaries: secretaryCount || 0,
        pendingVerifications: pendingVerifs.length,
        activeContracts: activeContractsCount || 0,
        totalRevenue
      })

      // Set recent verifications for activity feed
      setRecentVerifications(pendingVerifs.slice(0, 5))
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err)
      setError(err.message || '대시보드 데이터를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return '방금 전'
    if (diffMins < 60) return `${diffMins}분 전`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}시간 전`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}일 전`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  const typeLabels: Record<string, string> = {
    identity: '본인 인증',
    business: '사업자 인증',
    revenue: '매출 인증',
    salary: '연봉 인증'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">하루비서 관리자</h1>
            <Link to="/login">
              <Button variant="outline" size="sm">로그아웃</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <Card className="mb-4 bg-red-50 border-red-200">
            <CardContent className="pt-4">
              <p className="text-sm text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h2>
          <p className="text-gray-600">전체 플랫폼 현황을 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                총 경영자
              </CardTitle>
              <Users className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-gray-500 mt-1">등록된 경영자</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                총 비서
              </CardTitle>
              <UserCheck className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSecretaries}</div>
              <p className="text-xs text-gray-500 mt-1">등록된 비서</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                활성 계약
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeContracts}</div>
              <p className="text-xs text-gray-500 mt-1">진행 중인 계약</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                총 수익
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₩{(stats.totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-gray-500 mt-1">완료된 결제 합계</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">
                인증 승인 대기
              </CardTitle>
              <Shield className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {stats.pendingVerifications}
              </div>
              <Link to="/admin/verifications">
                <Button size="sm" variant="outline" className="mt-2 bg-white">
                  처리하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/verifications">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  경영자 인증 승인 관리
                  {stats.pendingVerifications > 0 && (
                    <Badge className="ml-auto" variant="destructive">
                      {stats.pendingVerifications}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  시스템 설정 관리
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>승인이 필요한 항목들</CardDescription>
            </CardHeader>
            <CardContent>
              {recentVerifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  승인 대기 중인 항목이 없습니다
                </p>
              ) : (
                <div className="space-y-4">
                  {recentVerifications.map((verif) => (
                    <div key={verif.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">
                          {verif.users?.name || '사용자'}님의 {typeLabels[verif.verification_type] || verif.verification_type} 승인 대기
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{getTimeAgo(verif.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
