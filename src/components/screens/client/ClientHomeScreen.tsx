import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Briefcase, User, Shield, FileText, MessageSquare } from 'lucide-react'

export default function ClientHomeScreen() {
  // Mock user data
  const user = {
    name: '김철수',
    email: 'client@example.com',
    verifications: {
      identity: true,
      business: true,
      revenue: false,
      salary: false,
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">하루비서</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name}님</span>
              <Link to="/login">
                <Button variant="outline" size="sm">로그아웃</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            안녕하세요, {user.name}님!
          </h2>
          <p className="text-gray-600">원하시는 전문 비서를 찾아보세요</p>
        </div>

        {/* Verification Status Alert */}
        {(!user.verifications.revenue && !user.verifications.salary) && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">인증으로 신뢰도를 높이세요</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    추가 인증을 완료하면 더 많은 전문 비서에게 노출됩니다
                  </p>
                  <Link to="/client/verifications">
                    <Button size="sm" variant="outline" className="bg-white">
                      인증 관리로 이동
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Secretary Search */}
          <Link to="/client/secretary-search">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>비서 검색</CardTitle>
                <CardDescription>
                  조건에 맞는 전문 비서를 검색하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Job Requests */}
          <Link to="/client/job-requests">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>구인 공고</CardTitle>
                <CardDescription>
                  등록한 구인 공고를 관리하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* My Profile */}
          <Link to="/client/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>내 프로필</CardTitle>
                <CardDescription>
                  프로필 정보를 관리하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Verifications */}
          <Link to="/client/verifications">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  인증 관리
                  <div className="flex gap-1">
                    {user.verifications.identity && (
                      <Badge variant="secondary" className="text-xs">본인</Badge>
                    )}
                    {user.verifications.business && (
                      <Badge variant="secondary" className="text-xs">사업자</Badge>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>
                  본인, 사업자, 매출, 연봉 인증
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Contracts */}
          <Link to="/client/contracts">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>계약 관리</CardTitle>
                <CardDescription>
                  진행 중인 계약을 확인하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Messages */}
          <Link to="/client/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>메시지</CardTitle>
                <CardDescription>
                  비서와 소통하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
