import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, MapPin, Award, Star, Loader2 } from 'lucide-react'
import * as secretariesApi from '@/lib/api/secretaries'
import type { SecretaryWithUser } from '@/lib/api/secretaries'

interface SecretarySearchFilters {
  keyword: string
  minRating: number
  minExperience: number
  region: string
  specialty: string
  sortBy: 'rating' | 'experience' | 'recent'
}

export default function SecretarySearchScreen() {
  const [filters, setFilters] = useState<SecretarySearchFilters>({
    keyword: '',
    minRating: 0,
    minExperience: 0,
    region: '',
    specialty: '',
    sortBy: 'rating'
  })
  const [secretaries, setSecretaries] = useState<SecretaryWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load secretaries on mount
  useEffect(() => {
    loadSecretaries()
  }, [])

  const loadSecretaries = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await secretariesApi.searchSecretaries({
        region: filters.region || undefined,
        minRating: filters.minRating || undefined,
        minExperience: filters.minExperience || undefined,
        specialty: filters.specialty || undefined,
        sortBy: filters.sortBy,
        limit: 50
      })
      setSecretaries(data)
    } catch (err: any) {
      console.error('Failed to load secretaries:', err)
      setError(err.message || '비서 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (field: keyof SecretarySearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    loadSecretaries()
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
                {/* Region */}
                <div className="space-y-2">
                  <Label>지역</Label>
                  <Input
                    placeholder="예: 서울 강남구"
                    value={filters.region}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                  />
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                  <Label>전문 분야</Label>
                  <Input
                    placeholder="예: 영어, 운전, MBA"
                    value={filters.specialty}
                    onChange={(e) => handleFilterChange('specialty', e.target.value)}
                  />
                </div>

                {/* Min Rating */}
                <div className="space-y-2">
                  <Label>최소 평점</Label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value={0}>전체</option>
                    <option value={3}>3점 이상</option>
                    <option value={4}>4점 이상</option>
                    <option value={4.5}>4.5점 이상</option>
                  </select>
                </div>

                {/* Min Experience */}
                <div className="space-y-2">
                  <Label>최소 경력 (년)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={filters.minExperience || ''}
                    onChange={(e) => handleFilterChange('minExperience', Number(e.target.value) || 0)}
                  />
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>정렬</Label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="rating">평점 높은 순</option>
                    <option value="experience">경력 많은 순</option>
                    <option value="recent">최근 가입 순</option>
                  </select>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      검색 중...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      검색
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {error && (
              <Card className="mb-4 p-4 bg-red-50 border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </Card>
            )}

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {loading ? '검색 중...' : `총 ${secretaries.length}명의 비서`}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : secretaries.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">검색 결과가 없습니다</p>
                  <p className="text-sm text-gray-500 mt-2">다른 검색 조건으로 시도해보세요</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {secretaries.map((secretary) => (
                  <Card key={secretary.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {/* Profile Image Placeholder */}
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-gray-400">
                            {secretary.users.name[0]}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{secretary.users.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <span>{secretary.experience_years}년 경력</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {secretary.region || '지역 미설정'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{secretary.rating.toFixed(1)}</span>
                              <span className="text-sm text-gray-500">({secretary.review_count})</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{secretary.bio || '자기소개가 없습니다.'}</p>

                          {/* Specialty */}
                          {secretary.specialty && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {secretary.specialty}
                              </Badge>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Link to={`/secretary/${secretary.id}`}>
                              <Button size="sm">
                                프로필 보기
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              제안하기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
