import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, UserCheck, Shield, Settings, TrendingUp, Clock } from 'lucide-react'

export default function AdminDashboardScreen() {
  // Mock statistics
  const stats = {
    totalClients: 245,
    totalSecretaries: 189,
    pendingVerifications: 12,
    pendingSecretaryApprovals: 8,
    activeContracts: 34,
    totalRevenue: 125000000
  }

  const recentActivities = [
    { id: '1', type: 'verification', message: '김철수님의 사업자 인증 승인 대기', time: '10분 전' },
    { id: '2', type: 'secretary', message: '박지수님의 비서 프로필 승인 대기', time: '1시간 전' },
    { id: '3', type: 'verification', message: '이영희님의 매출 인증 승인 대기', time: '2시간 전' },
  ]

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
              <p className="text-xs text-gray-500 mt-1">전월 대비 +12</p>
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
              <p className="text-xs text-gray-500 mt-1">전월 대비 +8</p>
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
              <p className="text-xs text-gray-500 mt-1">전월 대비 +5</p>
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
                {(stats.totalRevenue / 1000000).toFixed(0)}M
              </div>
              <p className="text-xs text-gray-500 mt-1">이번 달 누적</p>
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

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                비서 승인 대기
              </CardTitle>
              <UserCheck className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {stats.pendingSecretaryApprovals}
              </div>
              <Link to="/admin/secretary-approvals">
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
              <Link to="/admin/secretary-approvals">
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="w-4 h-4 mr-2" />
                  비서 프로필 승인 관리
                  {stats.pendingSecretaryApprovals > 0 && (
                    <Badge className="ml-auto" variant="destructive">
                      {stats.pendingSecretaryApprovals}
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
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
