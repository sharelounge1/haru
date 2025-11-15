import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, MapPin, Calendar, Users, DollarSign } from 'lucide-react'

type JobStatus = 'all' | 'recruiting' | 'in_progress' | 'closed'

interface Job {
  id: string
  title: string
  region: string
  categories: string[]
  startDate: string
  endDate?: string
  budget: string
  applicants: number
  status: 'recruiting' | 'in_progress' | 'closed'
  createdAt: string
}

export default function ClientJobsScreen() {
  const [activeTab, setActiveTab] = useState<JobStatus>('all')

  // Mock job data
  const allJobs: Job[] = [
    {
      id: '1',
      title: '업무 보조 비서 구합니다',
      region: '서울 강남구',
      categories: ['업무비서'],
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      budget: '300만원/월',
      applicants: 12,
      status: 'recruiting',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: '해외 출장 동행 비서',
      region: '전국',
      categories: ['출장비서'],
      startDate: '2024-03-10',
      endDate: '2024-03-20',
      budget: '500만원',
      applicants: 8,
      status: 'recruiting',
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      title: '개인 일정 관리 비서',
      region: '서울 서초구',
      categories: ['개인비서'],
      startDate: '2024-01-20',
      budget: '250만원/월',
      applicants: 15,
      status: 'in_progress',
      createdAt: '2024-01-05'
    },
    {
      id: '4',
      title: '회의 및 문서 작성 지원',
      region: '서울 마포구',
      categories: ['업무비서'],
      startDate: '2023-12-01',
      endDate: '2024-01-15',
      budget: '280만원/월',
      applicants: 20,
      status: 'closed',
      createdAt: '2023-11-20'
    }
  ]

  const tabs: { key: JobStatus; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'recruiting', label: '모집중' },
    { key: 'in_progress', label: '진행중' },
    { key: 'closed', label: '마감' }
  ]

  const filteredJobs = activeTab === 'all'
    ? allJobs
    : allJobs.filter(job => job.status === activeTab)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recruiting':
        return <Badge className="bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">모집중</Badge>
      case 'in_progress':
        return <Badge className="bg-green-500/20 text-green-500 border border-green-500/30">진행중</Badge>
      case 'closed':
        return <Badge variant="outline" className="border-[#2A2A2A] text-gray-500">마감</Badge>
      default:
        return null
    }
  }

  return (
    <MobileLayout type="client">
      <div className="bg-[#0F0F0F] min-h-screen">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">내 공고</h1>
            <Link to="/client/jobs/create">
              <Button size="sm" className="h-10 rounded-xl bg-[#FF783B] hover:bg-[#FF783B]/90 text-white">
                <Plus className="w-4 h-4 mr-1" />
                공고 등록
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#FF783B] text-white'
                    : 'bg-[#1A1A1A] text-gray-400 border border-[#2A2A2A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="px-4 py-6">
          {filteredJobs.length === 0 ? (
            <Card className="p-8 bg-[#1A1A1A] border-[#2A2A2A]">
              <div className="text-center">
                <p className="text-gray-400 mb-4">등록된 공고가 없습니다</p>
                <Link to="/client/jobs/create">
                  <Button className="h-10 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    첫 공고 등록하기
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <Link key={job.id} to={`/job/${job.id}`}>
                  <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 hover:shadow-lg hover:shadow-[#FF783B]/10 transition-all active:scale-98">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{job.title}</h3>
                        <div className="flex gap-1 mb-2">
                          {job.categories.map((cat) => (
                            <Badge key={cat} className="text-xs bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{job.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>
                          {job.startDate} {job.endDate && `~ ${job.endDate}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 flex-shrink-0 text-[#FF783B]" />
                        <span className="font-semibold text-white">{job.budget}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    {job.status === 'recruiting' && (
                      <div className="mt-3 pt-3 border-t border-[#2A2A2A]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-[#FF783B]" />
                            <span className="text-[#FF783B] font-medium">
                              지원자 {job.applicants}명
                            </span>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 bg-transparent border-[#FF783B] text-[#FF783B] hover:bg-[#FF783B]/10">
                            지원자 보기
                          </Button>
                        </div>
                      </div>
                    )}

                    {job.status === 'in_progress' && (
                      <div className="mt-3 pt-3 border-t border-[#2A2A2A]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">진행중인 계약</span>
                          <Button variant="outline" size="sm" className="h-8 bg-transparent border-[#2A2A2A] text-gray-300 hover:bg-[#0F0F0F]">
                            상세보기
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Info Card */}
          {filteredJobs.length > 0 && (
            <Card className="mt-6 p-4 bg-gradient-to-br from-[#FF783B]/10 to-[#FF5722]/10 border-[#FF783B]/30">
              <div className="text-sm">
                <p className="font-semibold mb-2 text-white">공고 등록 팁</p>
                <ul className="text-xs space-y-1 text-gray-400">
                  <li>• 상세한 업무 내용과 조건을 명시하면 더 많은 지원자를 받을 수 있어요</li>
                  <li>• 예산을 명확히 제시하면 매칭 확률이 높아져요</li>
                  <li>• 인증 배지가 많을수록 신뢰도가 올라가요</li>
                </ul>
              </div>
            </Card>
          )}
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </MobileLayout>
  )
}
