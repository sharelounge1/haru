import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Check, X, FileText, Building2, TrendingUp, DollarSign } from 'lucide-react'

interface VerificationRequest {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  type: 'business' | 'revenue' | 'salary'
  submittedAt: string
  method: 'api' | 'document'
  data?: {
    businessNumber?: string
    companyName?: string
    revenue?: number
    salary?: number
    documentUrl?: string
  }
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminClientVerificationScreen() {
  const [requests, setRequests] = useState<VerificationRequest[]>([
    {
      id: '1',
      clientId: 'c1',
      clientName: '김철수',
      clientEmail: 'kim@example.com',
      type: 'business',
      submittedAt: '2024-01-20 10:30',
      method: 'document',
      data: {
        businessNumber: '123-45-67890',
        companyName: '주식회사 하루',
        documentUrl: '/uploads/business-cert-1.pdf'
      },
      status: 'pending'
    },
    {
      id: '2',
      clientId: 'c2',
      clientName: '이영희',
      clientEmail: 'lee@example.com',
      type: 'revenue',
      submittedAt: '2024-01-20 11:45',
      method: 'document',
      data: {
        revenue: 500000000,
        documentUrl: '/uploads/revenue-cert-1.pdf'
      },
      status: 'pending'
    },
    {
      id: '3',
      clientId: 'c3',
      clientName: '박민수',
      clientEmail: 'park@example.com',
      type: 'salary',
      submittedAt: '2024-01-20 14:20',
      method: 'document',
      data: {
        salary: 120000000,
        documentUrl: '/uploads/salary-cert-1.pdf'
      },
      status: 'pending'
    }
  ])

  const typeLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    business: { label: '사업자 인증', icon: <Building2 className="w-4 h-4" /> },
    revenue: { label: '매출 인증', icon: <TrendingUp className="w-4 h-4" /> },
    salary: { label: '연봉 인증', icon: <DollarSign className="w-4 h-4" /> }
  }

  const handleApprove = (requestId: string) => {
    if (confirm('이 인증을 승인하시겠습니까?')) {
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'approved' as const } : req
        )
      )
      // TODO: Call API to approve
    }
  }

  const handleReject = (requestId: string) => {
    const reason = prompt('반려 사유를 입력하세요:')
    if (reason) {
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'rejected' as const } : req
        )
      )
      // TODO: Call API to reject with reason
    }
  }

  const pendingRequests = requests.filter(r => r.status === 'pending')
  const processedRequests = requests.filter(r => r.status !== 'pending')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                대시보드
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">경영자 인증 승인 관리</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Pending Requests */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              승인 대기 중 ({pendingRequests.length})
            </h2>

            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="pt-8 pb-8 text-center text-gray-500">
                  승인 대기 중인 인증이 없습니다
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {typeLabels[request.type].icon}
                            <CardTitle>{typeLabels[request.type].label}</CardTitle>
                            <Badge variant="outline">
                              {request.method === 'api' ? 'API 인증' : '서류 제출'}
                            </Badge>
                          </div>
                          <CardDescription>
                            신청자: {request.clientName} ({request.clientEmail})<br />
                            신청일시: {request.submittedAt}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Details */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-3">제출 정보</h4>
                        <div className="space-y-2 text-sm">
                          {request.data?.businessNumber && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">사업자등록번호:</span>
                              <span className="font-medium">{request.data.businessNumber}</span>
                            </div>
                          )}
                          {request.data?.companyName && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">회사명:</span>
                              <span className="font-medium">{request.data.companyName}</span>
                            </div>
                          )}
                          {request.data?.revenue && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">연매출:</span>
                              <span className="font-medium">
                                {request.data.revenue.toLocaleString()}원
                              </span>
                            </div>
                          )}
                          {request.data?.salary && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">연봉:</span>
                              <span className="font-medium">
                                {request.data.salary.toLocaleString()}원
                              </span>
                            </div>
                          )}
                          {request.data?.documentUrl && (
                            <div className="flex justify-between items-center pt-2 border-t">
                              <span className="text-gray-600">제출 서류:</span>
                              <Button variant="outline" size="sm">
                                <FileText className="w-3 h-3 mr-2" />
                                서류 확인
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => handleApprove(request.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          승인
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          반려
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Processed Requests */}
          {processedRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                처리 완료 ({processedRequests.length})
              </h2>
              <div className="space-y-4">
                {processedRequests.map((request) => (
                  <Card key={request.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {typeLabels[request.type].icon}
                            <CardTitle className="text-base">
                              {typeLabels[request.type].label}
                            </CardTitle>
                          </div>
                          <CardDescription>
                            {request.clientName} • {request.submittedAt}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={request.status === 'approved' ? 'default' : 'destructive'}
                        >
                          {request.status === 'approved' ? '승인됨' : '반려됨'}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
