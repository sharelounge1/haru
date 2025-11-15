import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Star, MapPin, Award } from 'lucide-react'

export default function ClientSearchScreen() {
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock search results
  const searchResults = [
    {
      id: '1',
      name: '김영희',
      age: 32,
      gender: '여성',
      region: '서울 강남구',
      categories: ['업무비서'],
      badges: ['영어', '운전'],
      rating: 4.8,
      reviewCount: 24,
      verified: true
    },
    {
      id: '2',
      name: '박지수',
      age: 28,
      gender: '여성',
      region: '서울 서초구',
      categories: ['출장비서', '개인비서'],
      badges: ['MBA', '영어'],
      rating: 4.9,
      reviewCount: 18,
      verified: true
    },
    {
      id: '3',
      name: '이민지',
      age: 30,
      gender: '여성',
      region: '서울 송파구',
      categories: ['개인비서'],
      badges: ['영어', '요가'],
      rating: 4.7,
      reviewCount: 31,
      verified: true
    },
    {
      id: '4',
      name: '정수현',
      age: 35,
      gender: '여성',
      region: '서울 마포구',
      categories: ['업무비서', '출장비서'],
      badges: ['MBA', '운전', '영어'],
      rating: 4.9,
      reviewCount: 42,
      verified: true
    }
  ]

  return (
    <MobileLayout type="client">
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">비서 검색</h1>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="이름, 지역, 역량으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Active Filters */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              전체
            </Badge>
          </div>
        </div>

        {/* Filter Modal */}
        {showFilter && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilter(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-w-[480px] mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">필터</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilter(false)}>
                    닫기
                  </Button>
                </div>

                {/* Filter Options */}
                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <h3 className="font-semibold mb-3">비서 유형</h3>
                    <div className="flex flex-wrap gap-2">
                      {['개인비서', '업무비서', '출장비서', '요가비서'].map((cat) => (
                        <Badge key={cat} variant="outline" className="cursor-pointer">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <h3 className="font-semibold mb-3">나이 범위</h3>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="최소" className="h-10" />
                      <span className="flex items-center">~</span>
                      <Input type="number" placeholder="최대" className="h-10" />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <h3 className="font-semibold mb-3">성별</h3>
                    <div className="flex gap-2">
                      {['전체', '여성', '남성'].map((gender) => (
                        <Badge key={gender} variant="outline" className="cursor-pointer">
                          {gender}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Region */}
                  <div>
                    <h3 className="font-semibold mb-3">지역</h3>
                    <Input placeholder="서울 강남구" className="h-10" />
                  </div>

                  {/* Badges */}
                  <div>
                    <h3 className="font-semibold mb-3">역량 배지</h3>
                    <div className="flex flex-wrap gap-2">
                      {['영어', '운전', 'MBA', '요가', '간호'].map((badge) => (
                        <Badge key={badge} variant="outline" className="cursor-pointer">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="flex-1 h-12" onClick={() => setShowFilter(false)}>
                    초기화
                  </Button>
                  <Button className="flex-1 h-12" onClick={() => setShowFilter(false)}>
                    적용
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">
            검색 결과 {searchResults.length}명
          </h2>
          <select className="text-sm border-0 bg-transparent text-gray-600 pr-8">
            <option>추천순</option>
            <option>평점순</option>
            <option>리뷰많은순</option>
          </select>
        </div>

        <div className="space-y-3">
          {searchResults.map((secretary) => (
            <Link key={secretary.id} to={`/client/search/${secretary.id}/preview`}>
              <Card className="p-4 hover:shadow-md transition-shadow active:scale-98 transition-transform">
                <div className="flex gap-3">
                  {/* Profile Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">
                      {secretary.name[0]}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{secretary.name}</h3>
                        {secretary.verified && (
                          <Award className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{secretary.rating}</span>
                        <span className="text-xs text-gray-400">({secretary.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{secretary.age}세</span>
                      <span>•</span>
                      <span>{secretary.gender}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {secretary.region}
                      </span>
                    </div>

                    {/* Categories */}
                    <div className="flex gap-1 mb-2">
                      {secretary.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    {/* Badges */}
                    <div className="flex gap-1">
                      {secretary.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <div className="mt-3 pt-3 border-t">
                  <Button variant="outline" className="w-full h-10" size="sm">
                    프로필 미리보기
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
