import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'

type ActivityTab = 'applications' | 'in_progress' | 'completed'
type ApplicationStatus = 'pending' | 'accepted' | 'rejected'

interface Application {
  id: string
  jobId: string
  jobTitle: string
  clientName: string
  region: string
  budget: string
  appliedAt: string
  status: ApplicationStatus
}

interface Contract {
  id: string
  jobTitle: string
  clientName: string
  region: string
  startDate: string
  endDate?: string
  budget: string
  status: 'active' | 'completed'
}

export default function SecretaryActivityScreen() {
  const [activeTab, setActiveTab] = useState<ActivityTab>('applications')

  // Mock applications
  const applications: Application[] = [
    {
      id: '1',
      jobId: '1',
      jobTitle: '업무 보조 비서 구합니다',
      clientName: '김철수',
      region: '서울 강남구',
      budget: '300만원/월',
      appliedAt: '2024-01-20',
      status: 'pending'
    },
    {
      id: '2',
      jobId: '2',
      jobTitle: '해외 출장 동행 비서',
      clientName: '박영희',
      region: '전국',
      budget: '500만원',
      appliedAt: '2024-01-18',
      status: 'accepted'
    },
    {
      id: '3',
      jobId: '3',
      jobTitle: '개인 일정 관리 비서',
      clientName: '이민수',
      region: '서울 서초구',
      budget: '250만원/월',
      appliedAt: '2024-01-15',
      status: 'rejected'
    }
  ]

  // Mock contracts
  const contracts: Contract[] = [
    {
      id: '1',
      jobTitle: '업무 보조 비서',
      clientName: '최수현',
      region: '서울 마포구',
      startDate: '2024-01-10',
      budget: '280만원/월',
      status: 'active'
    },
    {
      id: '2',
      jobTitle: '출장 동행 비서',
      clientName: '정민아',
      region: '서울 강남구',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      budget: '450만원',
      status: 'completed'
    }
  ]

  const tabs: { key: ActivityTab; label: string }[] = [
    { key: 'applications', label: '지원 내역' },
    { key: 'in_progress', label: '진행중' },
    { key: 'completed', label: '완료' }
  ]

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            검토중
          </Badge>
        )
      case 'accepted':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            수락됨
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="outline" className="text-gray-600">
            <XCircle className="w-3 h-3 mr-1" />
            거절됨
          </Badge>
        )
    }
  }

  const activeContracts = contracts.filter(c => c.status === 'active')
  const completedContracts = contracts.filter(c => c.status === 'completed')

  return (
    <MobileLayout type="secretary">
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">활동</h1>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 bg-gray-50">
        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-3">
            {applications.length === 0 ? (
              <Card className="p-8">
                <div className="text-center text-gray-500">
                  <p className="text-sm mb-4">지원 내역이 없습니다</p>
                  <Link to="/secretary/explore">
                    <Button className="h-10">공고 탐색하기</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              applications.map((app) => (
                <Card key={app.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {app.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600">
                            {app.clientName[0]}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{app.clientName}</span>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{app.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>지원일: {app.appliedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{app.budget}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <Link to={`/secretary/explore/${app.jobId}`}>
                      <Button variant="outline" className="w-full h-10" size="sm">
                        공고 상세보기
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* In Progress Tab */}
        {activeTab === 'in_progress' && (
          <div className="space-y-3">
            {activeContracts.length === 0 ? (
              <Card className="p-8">
                <div className="text-center text-gray-500">
                  <p className="text-sm">진행중인 계약이 없습니다</p>
                </div>
              </Card>
            ) : (
              activeContracts.map((contract) => (
                <Card key={contract.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {contract.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600">
                            {contract.clientName[0]}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{contract.clientName}</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      진행중
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{contract.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>시작일: {contract.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{contract.budget}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <Button variant="outline" className="w-full h-10" size="sm">
                      계약 상세보기
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Completed Tab */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            {completedContracts.length === 0 ? (
              <Card className="p-8">
                <div className="text-center text-gray-500">
                  <p className="text-sm">완료된 계약이 없습니다</p>
                </div>
              </Card>
            ) : (
              completedContracts.map((contract) => (
                <Card key={contract.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {contract.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600">
                            {contract.clientName[0]}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{contract.clientName}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-gray-600">
                      완료
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{contract.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {contract.startDate} ~ {contract.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{contract.budget}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <Button variant="outline" className="w-full h-10" size="sm">
                      계약 상세보기
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  )
}
