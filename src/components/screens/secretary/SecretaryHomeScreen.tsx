import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, User, Image, Award, FileText, MessageSquare, Star } from 'lucide-react'

export default function SecretaryHomeScreen() {
  // Mock user data
  const user = {
    name: '김영희',
    email: 'secretary@example.com',
    isApproved: true,
    profileCompletion: 85,
    badges: ['english', 'driving'],
    categories: ['business_secretary', 'personal_secretary'],
    rating: 4.8,
    reviewCount: 24
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
          <div className="flex items-center gap-3">
            <p className="text-gray-600">프로필 완성도: {user.profileCompletion}%</p>
            {user.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{user.rating}</span>
                <span className="text-sm text-gray-500">({user.reviewCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Completion Alert */}
        {user.profileCompletion < 100 && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">프로필을 완성하세요</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    프로필이 완성되면 더 많은 경영자에게 노출됩니다
                  </p>
                  <Link to="/secretary/profile/edit">
                    <Button size="sm" variant="outline" className="bg-white">
                      프로필 완성하기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>내 프로필 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">비서 유형:</span>
                <div className="flex gap-2 mt-1">
                  {user.categories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat === 'business_secretary' ? '업무비서' :
                       cat === 'personal_secretary' ? '개인비서' :
                       cat === 'travel_secretary' ? '출장비서' : '요가비서'}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">보유 배지:</span>
                <div className="flex gap-2 mt-1">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="outline">
                      <Award className="w-3 h-3 mr-1" />
                      {badge === 'english' ? '영어' : badge === 'driving' ? '운전' : badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Job Search */}
          <Link to="/secretary/job-search">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>구인 공고 검색</CardTitle>
                <CardDescription>
                  조건에 맞는 구인 공고를 찾아보세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* My Profile */}
          <Link to="/secretary/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>내 프로필</CardTitle>
                <CardDescription>
                  프로필을 확인하고 관리하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Profile Images */}
          <Link to="/secretary/profile/images">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <Image className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>프로필 사진</CardTitle>
                <CardDescription>
                  프로필 사진을 관리하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Badges */}
          <Link to="/secretary/badges">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  배지 관리
                  <Badge variant="secondary" className="text-xs">{user.badges.length}</Badge>
                </CardTitle>
                <CardDescription>
                  역량 배지를 관리하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Contracts */}
          <Link to="/secretary/contracts">
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
          <Link to="/secretary/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>메시지</CardTitle>
                <CardDescription>
                  경영자와 소통하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
