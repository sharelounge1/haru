import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, MapPin, Calendar, DollarSign, Award, Briefcase } from 'lucide-react'

interface Job {
  id: string
  title: string
  clientName: string
  clientBadges: string[]
  region: string
  categories: string[]
  startDate: string
  endDate?: string
  budget: string
  postedAt: string
  isFlexible: boolean
}

export default function SecretaryExploreScreen() {
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock job data
  const jobs: Job[] = [
    {
      id: '1',
      title: '업무 보조 비서 구합니다',
      clientName: '김철수',
      clientBadges: ['본인인증', '사업자'],
      region: '서울 강남구',
      categories: ['업무비서'],
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      budget: '300만원/월',
      postedAt: '2일 전',
      isFlexible: false
    },
    {
      id: '2',
      title: '해외 출장 동행 비서',
      clientName: '박영희',
      clientBadges: ['본인인증', '사업자', '매출'],
      region: '전국',
      categories: ['출장비서'],
      startDate: '2024-03-10',
      endDate: '2024-03-20',
      budget: '500만원',
      postedAt: '5일 전',
      isFlexible: false
    },
    {
      id: '3',
      title: '개인 일정 관리 비서',
      clientName: '이민수',
      clientBadges: ['본인인증', '사업자', '매출', '연봉'],
      region: '서울 서초구',
      categories: ['개인비서'],
      startDate: '2024-02-15',
      budget: '250만원/월',
      postedAt: '1주일 전',
      isFlexible: true
    },
    {
      id: '4',
      title: '회의 및 문서 작성 지원',
      clientName: '최수현',
      clientBadges: ['본인인증'],
      region: '서울 마포구',
      categories: ['업무비서'],
      startDate: '2024-02-20',
      budget: '280만원/월',
      postedAt: '3일 전',
      isFlexible: false
    }
  ]

  return (
    <MobileLayout type="secretary">
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">공고 탐색</h1>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="지역, 키워드로 검색"
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
                  {/* Region */}
                  <div>
                    <h3 className="font-semibold mb-3">지역</h3>
                    <Input placeholder="서울 강남구" className="h-10" />
                  </div>

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

                  {/* Budget Range */}
                  <div>
                    <h3 className="font-semibold mb-3">금액 범위</h3>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="최소" className="h-10" />
                      <span className="flex items-center">~</span>
                      <Input type="number" placeholder="최대" className="h-10" />
                    </div>
                  </div>

                  {/* Client Badges */}
                  <div>
                    <h3 className="font-semibold mb-3">경영자 인증 배지</h3>
                    <div className="flex flex-wrap gap-2">
                      {['본인인증', '사업자', '매출', '연봉'].map((badge) => (
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

      {/* Jobs List */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">
            공고 {jobs.length}개
          </h2>
          <select className="text-sm border-0 bg-transparent text-gray-600 pr-8">
            <option>최신순</option>
            <option>마감임박순</option>
            <option>금액높은순</option>
          </select>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <Link key={job.id} to={`/secretary/explore/${job.id}`}>
              <Card className="p-4 hover:shadow-md transition-shadow active:scale-98 transition-transform">
                {/* Header */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1 pr-2">
                      {job.title}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {job.postedAt}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">
                        {job.clientName[0]}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {job.clientName}
                    </span>
                    {job.clientBadges.length > 0 && (
                      <Award className="w-4 h-4 text-blue-600" />
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex gap-1 flex-wrap mb-2">
                    {job.categories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                    {job.clientBadges.slice(0, 2).map((badge) => (
                      <Badge key={badge} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{job.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {job.startDate} {job.endDate && `~ ${job.endDate}`}
                      {job.isFlexible && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          일정 유동적
                        </Badge>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{job.budget}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-3 pt-3 border-t">
                  <Button variant="outline" className="w-full h-10" size="sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    상세보기 및 지원하기
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">지원 팁</p>
            <ul className="text-xs space-y-1 text-blue-800">
              <li>• 인증 배지가 많은 경영자는 신뢰도가 높아요</li>
              <li>• 상세한 자기소개로 차별화하세요</li>
              <li>• 빠른 지원이 채용 확률을 높여요</li>
            </ul>
          </div>
        </Card>
      </div>
    </MobileLayout>
  )
}
