import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle, ChevronLeft, Shield } from 'lucide-react'

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
        return <Shield className="w-5 h-5 text-gray-400" />
    }
  }

  const verifiedCount = verifications.filter(v => v.status === 'verified').length

  return (
    <MobileLayout type="client" showBottomNav={false}>
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/client/my">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">인증 관리</h1>
          </div>

          {/* Progress */}
          <div className="bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(verifiedCount / verifications.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {verifiedCount}/{verifications.length} 인증 완료
          </p>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        {/* Info Card */}
        <div className="px-4 pt-6 pb-4">
          <Card className="p-4 border-blue-200 bg-blue-50">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  인증으로 신뢰도를 높이세요
                </h3>
                <p className="text-sm text-blue-800">
                  각 인증을 완료하면 프로필에 배지가 표시되어 전문 비서들에게 신뢰를 줄 수 있습니다.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Verifications List */}
        <div className="px-4 pb-6">
          <div className="space-y-3">
            {verifications.map((verification) => (
              <Card key={verification.id} className="p-4">
                <div className="flex items-start gap-3">
                  {getStatusIcon(verification.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {verification.title}
                      </h3>
                      {getStatusBadge(verification.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {verification.description}
                    </p>
                    {verification.verifiedAt && (
                      <p className="text-xs text-gray-500">
                        인증일: {verification.verifiedAt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                {verification.status === 'not_verified' && (
                  <div className="mt-3 pt-3 border-t">
                    <Link to={`/client/my/verifications/${verification.id}`}>
                      <Button className="w-full h-10">
                        인증하기
                      </Button>
                    </Link>
                  </div>
                )}
                {verification.status === 'rejected' && (
                  <div className="mt-3 pt-3 border-t">
                    <Link to={`/client/my/verifications/${verification.id}`}>
                      <Button variant="outline" className="w-full h-10">
                        재인증하기
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="px-4 pb-8">
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">인증 혜택</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>프로필에 인증 배지 표시</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>비서 검색 결과 상위 노출</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>전문 비서들의 신뢰도 향상</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>매칭 성공률 증가</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </MobileLayout>
  )
}
