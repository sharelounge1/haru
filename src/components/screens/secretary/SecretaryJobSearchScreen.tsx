import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, MapPin, Calendar, DollarSign, Award, Loader2 } from 'lucide-react'
import * as jobsApi from '@/lib/api/jobs'
import type { JobWithClient } from '@/lib/api/jobs'

interface JobSearchFilters {
  region: string
  workType: string
  salaryMin: number
  categories: string[]
  sortBy: 'recent' | 'salary' | 'applicants'
}

export default function SecretaryJobSearchScreen() {
  const [filters, setFilters] = useState<JobSearchFilters>({
    region: '',
    workType: '',
    salaryMin: 0,
    categories: [],
    sortBy: 'recent'
  })
  const [jobs, setJobs] = useState<JobWithClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load jobs on mount
  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await jobsApi.searchJobs({
        region: filters.region || undefined,
        workType: filters.workType || undefined,
        salaryMin: filters.salaryMin || undefined,
        categories: filters.categories.length > 0 ? filters.categories : undefined,
        sortBy: filters.sortBy,
        status: 'recruiting',
        limit: 50
      })
      setJobs(data)
    } catch (err: any) {
      console.error('Failed to load jobs:', err)
      setError(err.message || '공고 목록을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const categoryLabels: Record<string, string> = {
    personal_secretary: '개인비서',
    business_secretary: '업무비서',
    travel_secretary: '출장비서',
    yoga_secretary: '요가비서'
  }

  const workTypeLabels: Record<string, string> = {
    full_time: '정규직',
    part_time: '파트타임',
    contract: '계약직',
    temporary: '임시직'
  }

  const handleFilterChange = (field: keyof JobSearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    loadJobs()
  }

  const formatSalary = (amount: number | null, type: string | null) => {
    if (!amount) return '협의'
    const typeLabel = type === 'monthly' ? '월' :
                      type === 'yearly' ? '연' :
                      type === 'hourly' ? '시간당' :
                      type === 'daily' ? '일' : ''
    return `${typeLabel} ${amount.toLocaleString()}원`
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return '오늘'
    if (days === 1) return '어제'
    return `${days}일 전`
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
                {/* Region */}
                <div className="space-y-2">
                  <Label>지역</Label>
                  <Input
                    placeholder="예: 서울 강남구"
                    value={filters.region}
                    onChange={(e) => handleFilterChange('region', e.target.value)}
                  />
                </div>

                {/* Work Type */}
                <div className="space-y-2">
                  <Label>근무 형태</Label>
                  <select
                    value={filters.workType}
                    onChange={(e) => handleFilterChange('workType', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">전체</option>
                    {Object.entries(workTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Min Salary */}
                <div className="space-y-2">
                  <Label>최소 급여 (만원)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={filters.salaryMin || ''}
                    onChange={(e) => handleFilterChange('salaryMin', Number(e.target.value) || 0)}
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

                {/* Sort By */}
                <div className="space-y-2">
                  <Label>정렬</Label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="recent">최신순</option>
                    <option value="salary">급여높은순</option>
                    <option value="applicants">지원자많은순</option>
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
                {loading ? '검색 중...' : `총 ${jobs.length}개의 공고`}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : jobs.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">검색 결과가 없습니다</p>
                  <p className="text-sm text-gray-500 mt-2">다른 검색 조건으로 시도해보세요</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                          <CardDescription className="text-base">
                            {job.description || '상세 설명이 없습니다.'}
                          </CardDescription>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-sm text-gray-600">
                          경영자: {job.client_profiles?.users?.name || '이름 미설정'}
                        </span>
                        {job.client_profiles?.company_name && (
                          <Badge variant="outline" className="text-xs">
                            {job.client_profiles.company_name}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Categories */}
                      {job.categories && job.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.categories.map((cat: string) => (
                            <Badge key={cat} variant="secondary">
                              {categoryLabels[cat] || cat}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.region || '지역 미설정'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span>{formatSalary(job.salary_amount, job.salary_type)}</span>
                        </div>
                        {job.start_date && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {job.start_date}
                              {job.end_date && ` ~ ${job.end_date}`}
                            </span>
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          {getDaysAgo(job.created_at)} 등록
                          {job.applicant_count > 0 && ` • 지원 ${job.applicant_count}명`}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Link to={`/job/${job.id}`}>
                          <Button variant="outline" size="sm">
                            상세보기
                          </Button>
                        </Link>
                        <Button size="sm">
                          지원하기
                        </Button>
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
