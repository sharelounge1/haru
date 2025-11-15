import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Bell,
  Search,
  Briefcase,
  Award,
  Star,
  MapPin,
  DollarSign,
  Eye,
  MessageSquare,
  FileCheck
} from 'lucide-react'

export default function SecretaryHomeScreen() {
  // Mock user data
  const user = {
    name: '김영희',
    profileCompletion: 85,
    rating: 4.8,
    reviewCount: 24,
    categories: ['업무비서', '개인비서'],
    badges: ['영어', '운전']
  }

  // Mock recommended jobs
  const recommendedJobs = [
    {
      id: '1',
      title: '업무 보조 비서 구합니다',
      clientName: '김철수',
      clientBadges: ['본인인증', '사업자'],
      region: '서울 강남구',
      budget: '300만원/월',
      postedAt: '2일 전'
    },
    {
      id: '2',
      title: '해외 출장 동행 비서',
      clientName: '박영희',
      clientBadges: ['본인인증', '사업자', '매출'],
      region: '전국',
      budget: '500만원',
      postedAt: '5일 전'
    },
    {
      id: '3',
      title: '개인 일정 관리 비서',
      clientName: '이민수',
      clientBadges: ['본인인증', '사업자', '매출', '연봉'],
      region: '서울 서초구',
      budget: '250만원/월',
      postedAt: '1주일 전'
    }
  ]

  // Mock stats
  const stats = {
    views: 142,
    offers: 8,
    contracts: 3
  }

  return (
    <MobileLayout type="secretary">
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user.name}님,
              </h1>
              <p className="text-gray-600">안녕하세요!</p>
            </div>
            <button className="relative p-2">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Rating & Completion */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{user.rating}</span>
              <span className="text-sm text-gray-500">({user.reviewCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">프로필 완성도</span>
              <span className="text-sm font-bold text-blue-600">
                {user.profileCompletion}%
              </span>
            </div>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {user.profileCompletion < 100 && (
          <div className="mx-4 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">프로필을 완성하세요</h3>
                <p className="text-sm text-blue-800 mb-3">
                  프로필 완성 시 더 많은 경영자에게 노출됩니다
                </p>
                <Link to="/secretary/profile/edit">
                  <Button size="sm" variant="outline" className="bg-white border-blue-600 text-blue-600 h-8">
                    프로필 완성하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900 mb-4">빠른 액션</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/secretary/profile/edit">
            <Card className="p-4 hover:shadow-md transition-shadow active:scale-95 transition-transform">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">프로필 완성</h3>
              <p className="text-sm text-gray-500 mt-1">
                {user.profileCompletion}% 완성
              </p>
            </Card>
          </Link>

          <Link to="/secretary/explore">
            <Card className="p-4 hover:shadow-md transition-shadow active:scale-95 transition-transform">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">공고 탐색</h3>
              <p className="text-sm text-gray-500 mt-1">일자리 찾기</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6 bg-white">
        <h2 className="text-lg font-bold text-gray-900 mb-4">내 통계</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4">
            <div className="flex flex-col items-center">
              <Eye className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.views}</span>
              <span className="text-xs text-gray-600 mt-1">프로필 조회</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center">
              <MessageSquare className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.offers}</span>
              <span className="text-xs text-gray-600 mt-1">받은 제안</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-col items-center">
              <FileCheck className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-2xl font-bold text-gray-900">{stats.contracts}</span>
              <span className="text-xs text-gray-600 mt-1">진행 계약</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">추천 공고</h2>
          <Link to="/secretary/explore" className="text-sm text-blue-600 font-medium">
            더보기
          </Link>
        </div>

        <div className="space-y-3">
          {recommendedJobs.map((job) => (
            <Link key={job.id} to={`/secretary/explore/${job.id}`}>
              <Card className="p-4 hover:shadow-md transition-shadow active:scale-98 transition-transform">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 flex-1 pr-2">
                    {job.title}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {job.postedAt}
                  </span>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-purple-600">
                      {job.clientName[0]}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700">{job.clientName}</span>
                  {job.clientBadges.length > 0 && (
                    <Award className="w-4 h-4 text-blue-600" />
                  )}
                </div>

                {/* Badges */}
                <div className="flex gap-1 mb-3 flex-wrap">
                  {job.clientBadges.slice(0, 2).map((badge) => (
                    <Badge key={badge} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-900">{job.budget}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-3 pt-3 border-t">
                  <Button variant="outline" className="w-full h-9" size="sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    자세히 보기
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}
