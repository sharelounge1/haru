import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Search, FileText, Shield, Star, MapPin, Award } from 'lucide-react'

export default function ClientHomeScreen() {
  // Mock user data
  const user = {
    name: '김철수',
    verifications: {
      identity: true,
      business: true,
      revenue: false,
      salary: false,
    }
  }

  // Mock recommended secretaries
  const recommendedSecretaries = [
    {
      id: '1',
      name: '김영희',
      age: 32,
      region: '서울 강남구',
      categories: ['업무비서'],
      rating: 4.8,
      reviewCount: 24,
    },
    {
      id: '2',
      name: '박지수',
      age: 28,
      region: '서울 서초구',
      categories: ['출장비서'],
      rating: 4.9,
      reviewCount: 18,
    },
    {
      id: '3',
      name: '이민지',
      age: 30,
      region: '서울 송파구',
      categories: ['개인비서'],
      rating: 4.7,
      reviewCount: 31,
    }
  ]

  const verificationCount = Object.values(user.verifications).filter(v => v).length

  return (
    <MobileLayout type="client">
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

          {/* Verification Badges */}
          <div className="flex gap-2 flex-wrap">
            {user.verifications.identity && (
              <Badge variant="secondary" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                본인인증
              </Badge>
            )}
            {user.verifications.business && (
              <Badge variant="secondary" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                사업자
              </Badge>
            )}
            {verificationCount < 4 && (
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-600">
                +{4 - verificationCount}개 더 인증하기
              </Badge>
            )}
          </div>
        </div>

        {/* Alert for incomplete verification */}
        {verificationCount < 4 && (
          <div className="mx-4 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">인증으로 신뢰도 UP!</h3>
                <p className="text-sm text-blue-800 mb-3">
                  추가 인증 완료 시 더 많은 전문 비서에게 노출됩니다
                </p>
                <Link to="/client/my/verifications">
                  <Button size="sm" variant="outline" className="bg-white border-blue-600 text-blue-600 h-8">
                    인증하러 가기
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
          <Link to="/client/search">
            <Card className="p-4 hover:shadow-md transition-shadow active:scale-95 transition-transform">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">비서 검색</h3>
              <p className="text-sm text-gray-500 mt-1">조건에 맞는 비서 찾기</p>
            </Card>
          </Link>

          <Link to="/client/jobs/create">
            <Card className="p-4 hover:shadow-md transition-shadow active:scale-95 transition-transform">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">공고 등록</h3>
              <p className="text-sm text-gray-500 mt-1">구인 공고 작성하기</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recommended Secretaries */}
      <div className="px-4 py-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">추천 비서</h2>
          <Link to="/client/search" className="text-sm text-blue-600 font-medium">
            더보기
          </Link>
        </div>

        <div className="space-y-3">
          {recommendedSecretaries.map((secretary) => (
            <Link key={secretary.id} to={`/client/search/${secretary.id}/preview`}>
              <Card className="p-4 hover:shadow-md transition-shadow active:scale-98 transition-transform">
                <div className="flex gap-3">
                  {/* Profile Image Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {secretary.name[0]}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{secretary.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{secretary.rating}</span>
                        <span className="text-sm text-gray-400">({secretary.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{secretary.age}세</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {secretary.region}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {secretary.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900 mb-4">최근 활동</h2>
        <Card className="p-4">
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">아직 활동 내역이 없습니다</p>
            <p className="text-xs mt-1">비서를 검색하거나 공고를 등록해보세요</p>
          </div>
        </Card>
      </div>
    </MobileLayout>
  )
}
