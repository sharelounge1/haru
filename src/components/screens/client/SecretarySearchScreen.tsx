import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, MapPin, Award, Star } from 'lucide-react'

interface SecretarySearchFilters {
  keyword: string
  ageMin: string
  ageMax: string
  gender: string
  region: string
  categories: string[]
  badges: string[]
}

export default function SecretarySearchScreen() {
  const [filters, setFilters] = useState<SecretarySearchFilters>({
    keyword: '',
    ageMin: '',
    ageMax: '',
    gender: '',
    region: '',
    categories: [],
    badges: []
  })

  // Mock secretary data
  const secretaries = [
    {
      id: '1',
      name: '김영희',
      age: 32,
      gender: 'female',
      region: '서울 강남구',
      categories: ['business_secretary', 'personal_secretary'],
      badges: ['english', 'driving', 'mba'],
      rating: 4.8,
      reviewCount: 24,
      experience: '5년',
      photo: null,
      introduction: '업무 효율성과 섬세한 케어를 중시하는 비서입니다.',
    },
    {
      id: '2',
      name: '박지수',
      age: 28,
      gender: 'female',
      region: '서울 서초구',
      categories: ['travel_secretary'],
      badges: ['english', 'japanese'],
      rating: 4.9,
      reviewCount: 18,
      experience: '3년',
      photo: null,
      introduction: '해외 출장 동행 전문 비서입니다.',
    }
  ]

  const categoryLabels: Record<string, string> = {
    personal_secretary: '개인비서',
    business_secretary: '업무비서',
    travel_secretary: '출장비서',
    yoga_secretary: '요가비서'
  }

  const badgeLabels: Record<string, string> = {
    english: '영어',
    japanese: '일본어',
    chinese: '중국어',
    driving: '운전',
    mba: 'MBA'
  }

  const handleFilterChange = (field: keyof SecretarySearchFilters, value: string | string[]) => {
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
            <Link to="/client">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">비서 검색</h1>
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

                {/* Age Range */}
                <div className="space-y-2">
                  <Label>나이</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="최소"
                      value={filters.ageMin}
                      onChange={(e) => handleFilterChange('ageMin', e.target.value)}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="최대"
                      value={filters.ageMax}
                      onChange={(e) => handleFilterChange('ageMax', e.target.value)}
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label>성별</Label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">전체</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
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

                {/* Badges */}
                <div className="space-y-2">
                  <Label>역량 배지</Label>
                  <div className="space-y-2">
                    {Object.entries(badgeLabels).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.badges.includes(key)}
                          onChange={(e) => {
                            const newBadges = e.target.checked
                              ? [...filters.badges, key]
                              : filters.badges.filter(b => b !== key)
                            handleFilterChange('badges', newBadges)
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
              <p className="text-sm text-gray-600">총 {secretaries.length}명의 비서</p>
            </div>

            <div className="space-y-4">
              {secretaries.map((secretary) => (
                <Card key={secretary.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      {/* Profile Image Placeholder */}
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 text-sm">사진</span>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{secretary.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <span>{secretary.age}세</span>
                              <span>•</span>
                              <span>{secretary.gender === 'female' ? '여성' : '남성'}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {secretary.region}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{secretary.rating}</span>
                            <span className="text-sm text-gray-500">({secretary.reviewCount})</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{secretary.introduction}</p>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {secretary.categories.map((cat) => (
                            <Badge key={cat} variant="secondary">
                              {categoryLabels[cat]}
                            </Badge>
                          ))}
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {secretary.badges.map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {badgeLabels[badge]}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link to={`/client/secretary/${secretary.id}/preview`}>
                            <Button size="sm" variant="outline">
                              미리보기
                            </Button>
                          </Link>
                          <Link to={`/client/secretary/${secretary.id}/payment`}>
                            <Button size="sm">
                              프로필 보기 (결제)
                            </Button>
                          </Link>
                        </div>
                      </div>
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
