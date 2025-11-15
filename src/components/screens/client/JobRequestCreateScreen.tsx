import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'

interface JobRequestForm {
  title: string
  content: string
  categories: string[]
  region: string
  startDate: string
  endDate: string
  isFlexible: boolean
  amount: string
}

export default function JobRequestCreateScreen() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<JobRequestForm>({
    title: '',
    content: '',
    categories: [],
    region: '',
    startDate: '',
    endDate: '',
    isFlexible: false,
    amount: ''
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.categories.length === 0) {
      alert('선호 비서 유형을 최소 1개 이상 선택해주세요.')
      return
    }

    // TODO: Implement actual API call
    console.log('Create job request:', formData)
    navigate('/client/job-requests')
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
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">공고 제목 *</Label>
                  <Input
                    id="title"
                    placeholder="예: 해외 출장 동행 비서 구합니다"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">공고 내용 *</Label>
                  <textarea
                    id="content"
                    placeholder="업무 내용, 요구사항 등을 자세히 작성해주세요"
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
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
                  />
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
                        disabled={formData.isFlexible}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isFlexible}
                      onChange={(e) => handleChange('isFlexible', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600">
                      일정이 유동적입니다
                    </span>
                  </label>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">제안 금액 *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={formData.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      required
                    />
                    <span className="text-sm text-gray-600">원</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    월급 또는 계약 금액을 입력해주세요
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6">
                  <Button type="submit" className="flex-1">
                    공고 등록
                  </Button>
                  <Link to="/client/job-requests" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
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
