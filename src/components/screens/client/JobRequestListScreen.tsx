import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Calendar, MapPin, Clock, DollarSign } from 'lucide-react'

interface JobRequest {
  id: string
  title: string
  content: string
  categories: string[]
  region: string
  startDate: string
  endDate: string
  isFlexible: boolean
  amount: number
  status: 'active' | 'closed' | 'in_progress'
  applicantCount: number
  createdAt: string
}

export default function JobRequestListScreen() {
  const jobRequests: JobRequest[] = [
    {
      id: '1',
      title: '해외 출장 동행 비서 구합니다',
      content: '미국 출장 2주간 동행할 전문 비서를 찾습니다. 영어 능통자 우대.',
      categories: ['travel_secretary'],
      region: '해외 (미국)',
      startDate: '2024-03-01',
      endDate: '2024-03-14',
      isFlexible: false,
      amount: 5000000,
      status: 'active',
      applicantCount: 12,
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: '업무 비서 채용',
      content: '일정 관리, 문서 작성 등 업무 전반을 담당할 비서 채용',
      categories: ['business_secretary'],
      region: '서울 강남구',
      startDate: '2024-02-01',
      endDate: '',
      isFlexible: true,
      amount: 3500000,
      status: 'active',
      applicantCount: 8,
      createdAt: '2024-01-18'
    }
  ]

  const categoryLabels: Record<string, string> = {
    personal_secretary: '개인비서',
    business_secretary: '업무비서',
    travel_secretary: '출장비서',
    yoga_secretary: '요가비서'
  }

  const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
    active: { label: '모집중', variant: 'default' },
    in_progress: { label: '진행중', variant: 'secondary' },
    closed: { label: '마감', variant: 'outline' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/client">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  홈으로
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">구인 공고</h1>
            </div>
            <Link to="/client/job-requests/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                공고 등록
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {jobRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-gray-500 mb-4">등록된 구인 공고가 없습니다</p>
                <Link to="/client/job-requests/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    첫 공고 등록하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {jobRequests.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <Badge variant={statusLabels[job.status].variant}>
                            {statusLabels[job.status].label}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {job.content}
                        </CardDescription>
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
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>지원자 {job.applicantCount}명</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Link to={`/client/job-requests/${job.id}`}>
                        <Button variant="outline" size="sm">
                          상세보기
                        </Button>
                      </Link>
                      <Link to={`/client/job-requests/${job.id}/applicants`}>
                        <Button size="sm">
                          지원자 보기 ({job.applicantCount})
                        </Button>
                      </Link>
                      <Link to={`/client/job-requests/${job.id}/edit`}>
                        <Button variant="outline" size="sm">
                          수정
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
