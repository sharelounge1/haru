import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle, ArrowLeft } from 'lucide-react'

type VerificationStatus = 'verified' | 'pending' | 'not_verified' | 'rejected'

interface Verification {
  id: string
  title: string
  description: string
  status: VerificationStatus
  verifiedAt?: string
}

export default function ClientVerificationsScreen() {
  const verifications: Verification[] = [
    {
      id: 'identity',
      title: '본인인증',
      description: 'NICE 본인인증으로 신원 확인',
      status: 'verified',
      verifiedAt: '2024-01-15'
    },
    {
      id: 'business',
      title: '사업자 인증',
      description: '사업자등록증으로 사업자 신원 확인',
      status: 'verified',
      verifiedAt: '2024-01-16'
    },
    {
      id: 'revenue',
      title: '매출 인증',
      description: '연매출 확인으로 사업 규모 증명',
      status: 'pending'
    },
    {
      id: 'salary',
      title: '연봉 인증',
      description: '재직증명 및 소득 확인',
      status: 'not_verified'
    }
  ]

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">인증 완료</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">승인 대기</Badge>
      case 'rejected':
        return <Badge variant="destructive">반려됨</Badge>
      default:
        return <Badge variant="outline">미인증</Badge>
    }
  }

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
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
            <h1 className="text-2xl font-bold text-gray-900">인증 관리</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl">
          {/* Info Card */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-blue-900 mb-2">인증으로 신뢰도를 높이세요</h3>
              <p className="text-sm text-blue-800">
                각 인증을 완료하면 프로필에 배지가 표시되어 전문 비서들에게 신뢰를 줄 수 있습니다.
                API 간편인증 또는 서류 제출로 인증을 진행할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          {/* Verifications List */}
          <div className="space-y-4">
            {verifications.map((verification) => (
              <Card key={verification.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(verification.status)}
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {verification.title}
                        </CardTitle>
                        <CardDescription>
                          {verification.description}
                        </CardDescription>
                        {verification.verifiedAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            인증일: {verification.verifiedAt}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      {getStatusBadge(verification.status)}
                      {verification.status === 'not_verified' && (
                        <Link to={`/client/verifications/${verification.id}`}>
                          <Button size="sm">인증하기</Button>
                        </Link>
                      )}
                      {verification.status === 'rejected' && (
                        <Link to={`/client/verifications/${verification.id}`}>
                          <Button size="sm" variant="outline">재인증</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>인증 혜택</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>프로필에 인증 배지 표시</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>비서 검색 결과 상위 노출</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>전문 비서들의 신뢰도 향상</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>매칭 성공률 증가</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
