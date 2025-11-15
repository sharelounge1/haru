import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, MapPin, Calendar, DollarSign, Award } from 'lucide-react'

interface JobSearchFilters {
  keyword: string
  region: string
  categories: string[]
  clientBadges: string[]
  amountMin: string
  amountMax: string
}

export default function SecretaryJobSearchScreen() {
  const [filters, setFilters] = useState<JobSearchFilters>({
    keyword: '',
    region: '',
    categories: [],
    clientBadges: [],
    amountMin: '',
    amountMax: ''
  })

  // Mock job data
  const jobs = [
    {
      id: '1',
      title: '해외 출장 동행 비서 구합니다',
      content: '미국 출장 2주간 동행할 전문 비서를 찾습니다. 영어 능통자 우대.',
      clientName: '김철수',
      clientBadges: ['identity', 'business', 'revenue'],
      categories: ['travel_secretary'],
      region: '해외 (미국)',
      startDate: '2024-03-01',
      endDate: '2024-03-14',
      isFlexible: false,
      amount: 5000000,
      applicantCount: 12,
      postedAt: '3일 전'
    },
    {
      id: '2',
      title: '업무 비서 채용',
      content: '일정 관리, 문서 작성 등 업무 전반을 담당할 비서 채용',
      clientName: '이영희',
      clientBadges: ['identity', 'business'],
      categories: ['business_secretary'],
      region: '서울 강남구',
      startDate: '2024-02-01',
      endDate: '',
      isFlexible: true,
      amount: 3500000,
      applicantCount: 8,
      postedAt: '5일 전'
    }
  ]

  const categoryLabels: Record<string, string> = {
    personal_secretary: '개인비서',
    business_secretary: '업무비서',
    travel_secretary: '출장비서',
    yoga_secretary: '요가비서'
  }

  const badgeLabels: Record<string, string> = {
    identity: '본인인증',
    business: '사업자',
    revenue: '매출',
    salary: '연봉'
  }

  const handleFilterChange = (field: keyof JobSearchFilters, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    console.log('Search with filters:', filters)
    // TODO: Implement actual search
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/secretary">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">구인 공고 검색</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>검색 필터</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Keyword */}
                <div className="space-y-2">
                  <Label>키워드</Label>
                  <Input
                    placeholder="검색어 입력"
                    value={filters.keyword}
                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  />
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label>지역</Label>
                  <Input
                    placeholder="예: 서울 강남구"
                    value={filters.region}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                  />
                </div>

                {/* Amount Range */}
                <div className="space-y-2">
                  <Label>제안 금액 (만원)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="최소"
                      value={filters.amountMin}
                      onChange={(e) => handleFilterChange('amountMin', e.target.value)}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="최대"
                      value={filters.amountMax}
                      onChange={(e) => handleFilterChange('amountMax', e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>비서 유형</Label>
                  <div className="space-y-2">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(key)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...filters.categories, key]
                              : filters.categories.filter(c => c !== key)
                            handleFilterChange('categories', newCategories)
                          }}
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Client Badges */}
                <div className="space-y-2">
                  <Label>경영자 인증</Label>
                  <div className="space-y-2">
                    {Object.entries(badgeLabels).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.clientBadges.includes(key)}
                          onChange={(e) => {
                            const newBadges = e.target.checked
                              ? [...filters.clientBadges, key]
                              : filters.clientBadges.filter(b => b !== key)
                            handleFilterChange('clientBadges', newBadges)
                          }}
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleSearch}>
                  <Search className="w-4 h-4 mr-2" />
                  검색
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">총 {jobs.length}개의 공고</p>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                        <CardDescription className="text-base">
                          {job.content}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm text-gray-600">경영자: {job.clientName}</span>
                      <div className="flex gap-1">
                        {job.clientBadges.map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {badgeLabels[badge]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.categories.map((cat) => (
                        <Badge key={cat} variant="secondary">
                          {categoryLabels[cat]}
                        </Badge>
                      ))}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{job.region}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.amount.toLocaleString()}원</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {job.startDate}
                          {job.endDate ? ` ~ ${job.endDate}` : ''}
                          {job.isFlexible && ' (유동적)'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.postedAt} • 지원 {job.applicantCount}명
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Link to={`/secretary/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          상세보기
                        </Button>
                      </Link>
                      <Link to={`/secretary/jobs/${job.id}/apply`}>
                        <Button size="sm">
                          지원하기
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
