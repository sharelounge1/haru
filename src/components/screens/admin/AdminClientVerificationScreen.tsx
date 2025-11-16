import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Check, X, FileText, Building2, TrendingUp, DollarSign, Loader2, User as UserIcon } from 'lucide-react'
import * as verificationsApi from '@/lib/api/verifications'
import type { VerificationWithUser } from '@/lib/api/verifications'

export default function AdminClientVerificationScreen() {
  const [pendingRequests, setPendingRequests] = useState<VerificationWithUser[]>([])
  const [processedRequests, setProcessedRequests] = useState<VerificationWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Load verifications on mount
  useEffect(() => {
    loadVerifications()
  }, [])

  const loadVerifications = async () => {
    setLoading(true)
    setError('')

    try {
      const [pending, processed] = await Promise.all([
        verificationsApi.getPendingVerifications(),
        verificationsApi.getAllVerifications()
      ])

      setPendingRequests(pending)
      setProcessedRequests(processed.filter(v => v.status !== 'pending'))
    } catch (err: any) {
      console.error('Failed to load verifications:', err)
      setError(err.message || '검증 요청을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const typeLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    identity: { label: '본인 인증', icon: <UserIcon className="w-4 h-4" /> },
    business: { label: '사업자 인증', icon: <Building2 className="w-4 h-4" /> },
    revenue: { label: '매출 인증', icon: <TrendingUp className="w-4 h-4" /> },
    salary: { label: '연봉 인증', icon: <DollarSign className="w-4 h-4" /> }
  }

  const handleApprove = async (requestId: string) => {
    if (!confirm('이 인증을 승인하시겠습니까?')) {
      return
    }

    setActionLoading(requestId)
    try {
      await verificationsApi.approveVerification(requestId)
      await loadVerifications() // Reload data
      alert('인증이 승인되었습니다.')
    } catch (err: any) {
      console.error('Failed to approve verification:', err)
      alert(err.message || '승인에 실패했습니다.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (requestId: string) => {
    const reason = prompt('반려 사유를 입력하세요:')
    if (!reason) {
      return
    }

    setActionLoading(requestId)
    try {
      await verificationsApi.rejectVerification(requestId, reason)
      await loadVerifications() // Reload data
      alert('인증이 반려되었습니다.')
    } catch (err: any) {
      console.error('Failed to reject verification:', err)
      alert(err.message || '반려에 실패했습니다.')
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

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
          {/* Error Message */}
          {error && (
            <Card className="mb-4 bg-red-50 border-red-200">
              <CardContent className="pt-4">
                <p className="text-sm text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}
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
                            {typeLabels[request.verification_type]?.icon}
                            <CardTitle>{typeLabels[request.verification_type]?.label || request.verification_type}</CardTitle>
                            <Badge variant="outline">
                              {request.document_url ? '서류 제출' : '요청'}
                            </Badge>
                          </div>
                          <CardDescription>
                            신청자: {request.users?.name || '이름 미설정'} ({request.users?.email || '이메일 미설정'})<br />
                            신청일시: {formatDate(request.created_at)}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Details */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-3">제출 정보</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">인증 유형:</span>
                            <span className="font-medium">{typeLabels[request.verification_type]?.label || request.verification_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">상태:</span>
                            <span className="font-medium">{request.status === 'pending' ? '대기중' : request.status === 'approved' ? '승인됨' : '반려됨'}</span>
                          </div>
                          {request.document_url && (
                            <div className="flex justify-between items-center pt-2 border-t">
                              <span className="text-gray-600">제출 서류:</span>
                              <a href={request.document_url} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                  <FileText className="w-3 h-3 mr-2" />
                                  서류 확인
                                </Button>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => handleApprove(request.id)}
                          disabled={actionLoading === request.id}
                        >
                          {actionLoading === request.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4 mr-2" />
                          )}
                          승인
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleReject(request.id)}
                          disabled={actionLoading === request.id}
                        >
                          {actionLoading === request.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <X className="w-4 h-4 mr-2" />
                          )}
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
                            {typeLabels[request.verification_type]?.icon}
                            <CardTitle className="text-base">
                              {typeLabels[request.verification_type]?.label || request.verification_type}
                            </CardTitle>
                          </div>
                          <CardDescription>
                            {request.users?.name || '이름 미설정'} • {formatDate(request.created_at)}
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
