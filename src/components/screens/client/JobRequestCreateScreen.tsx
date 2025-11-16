import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import * as jobsApi from '@/lib/api/jobs'
import * as usersApi from '@/lib/api/users'

interface JobRequestForm {
  title: string
  description: string
  categories: string[]
  region: string
  workType: string
  startDate: string
  endDate: string
  isFlexible: boolean
  salaryAmount: string
  salaryType: string
}

export default function JobRequestCreateScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState<JobRequestForm>({
    title: '',
    description: '',
    categories: [],
    region: '',
    workType: 'full_time',
    startDate: '',
    endDate: '',
    isFlexible: false,
    salaryAmount: '',
    salaryType: 'monthly'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categoryOptions = [
    { value: 'personal_secretary', label: '개인비서' },
    { value: 'business_secretary', label: '업무비서' },
    { value: 'travel_secretary', label: '출장비서' },
    { value: 'yoga_secretary', label: '요가비서' }
  ]

  const handleChange = (field: keyof JobRequestForm, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category]
    handleChange('categories', newCategories)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!user) {
      setError('로그인이 필요합니다.')
      return
    }

    if (formData.categories.length === 0) {
      setError('선호 비서 유형을 최소 1개 이상 선택해주세요.')
      return
    }

    setLoading(true)

    try {
      // Get current user profile
      const userProfile = await usersApi.getCurrentUserProfile()
      if (!userProfile) {
        throw new Error('프로필을 찾을 수 없습니다.')
      }

      // Get client profile ID
      const clientProfile = await usersApi.getClientProfile(userProfile.id)
      if (!clientProfile) {
        throw new Error('경영자 프로필을 찾을 수 없습니다.')
      }

      // Create job posting
      await jobsApi.createJob(clientProfile.id, {
        title: formData.title,
        description: formData.description,
        region: formData.region,
        work_type: formData.workType as any,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        salary_amount: formData.salaryAmount ? Number(formData.salaryAmount) : null,
        salary_type: formData.salaryType as any,
        categories: formData.categories,
        status: 'recruiting'
      })

      alert('공고가 성공적으로 등록되었습니다!')
      navigate('/client/jobs')
    } catch (err: any) {
      console.error('Failed to create job:', err)
      setError(err.message || '공고 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/client/job-requests">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">구인 공고 등록</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>구인 공고 작성</CardTitle>
              <CardDescription>
                원하는 비서를 찾기 위한 구인 공고를 작성하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">공고 제목 *</Label>
                  <Input
                    id="title"
                    placeholder="예: 해외 출장 동행 비서 구합니다"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">공고 내용 *</Label>
                  <textarea
                    id="description"
                    placeholder="업무 내용, 요구사항 등을 자세히 작성해주세요"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    disabled={loading}
                  />
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>선호 비서 유형 * (복수 선택 가능)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(option.value)}
                          onChange={() => handleCategoryToggle(option.value)}
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region">근무 지역 *</Label>
                  <Input
                    id="region"
                    placeholder="예: 서울 강남구"
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Work Type */}
                <div className="space-y-2">
                  <Label htmlFor="workType">근무 형태</Label>
                  <select
                    id="workType"
                    value={formData.workType}
                    onChange={(e) => handleChange('workType', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    disabled={loading}
                  >
                    <option value="full_time">정규직</option>
                    <option value="part_time">파트타임</option>
                    <option value="contract">계약직</option>
                    <option value="temporary">임시직</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="space-y-3">
                  <Label>근무 기간</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-sm text-gray-600">
                        시작일
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-sm text-gray-600">
                        종료일 (선택)
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        disabled={formData.isFlexible || loading}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isFlexible}
                      onChange={(e) => handleChange('isFlexible', e.target.checked)}
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-600">
                      일정이 유동적입니다
                    </span>
                  </label>
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <Label htmlFor="salaryAmount">급여</Label>
                  <div className="flex gap-2">
                    <select
                      value={formData.salaryType}
                      onChange={(e) => handleChange('salaryType', e.target.value)}
                      className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      disabled={loading}
                    >
                      <option value="hourly">시급</option>
                      <option value="daily">일급</option>
                      <option value="monthly">월급</option>
                      <option value="yearly">연봉</option>
                    </select>
                    <Input
                      id="salaryAmount"
                      type="number"
                      placeholder="0"
                      value={formData.salaryAmount}
                      onChange={(e) => handleChange('salaryAmount', e.target.value)}
                      disabled={loading}
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-gray-600">원</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        등록 중...
                      </>
                    ) : (
                      '공고 등록'
                    )}
                  </Button>
                  <Link to="/client/jobs" className="flex-1">
                    <Button type="button" variant="outline" className="w-full" disabled={loading}>
                      취소
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
