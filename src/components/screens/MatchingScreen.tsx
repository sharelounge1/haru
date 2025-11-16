import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, MapPin, Briefcase, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import * as matchesApi from '@/lib/api/matches'
import * as usersApi from '@/lib/api/users'
import type { MatchWithDetails } from '@/lib/api/matches'

export default function MatchingScreen() {
  const { user, userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('received')
  const [receivedMatches, setReceivedMatches] = useState<MatchWithDetails[]>([])
  const [sentMatches, setSentMatches] = useState<MatchWithDetails[]>([])
  const [historyMatches, setHistoryMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Load matches on mount
  useEffect(() => {
    if (user && userProfile) {
      loadMatches()
    }
  }, [user, userProfile])

  const loadMatches = async () => {
    if (!user || !userProfile) return

    setLoading(true)
    setError('')

    try {
      // Get client profile
      const clientProfile = await usersApi.getClientProfile(user.id)
      if (!clientProfile) {
        throw new Error('경영자 프로필을 찾을 수 없습니다.')
      }

      // Load received matches (secretaries applying to jobs)
      const received = await matchesApi.getReceivedMatches(clientProfile.id)
      setReceivedMatches(received)

      // Load sent matches (CEO directly contacting secretaries)
      const sent = await matchesApi.getSentMatches(clientProfile.id)
      setSentMatches(sent)

      // Load completed matches (history)
      const completed = await matchesApi.getCompletedMatches(clientProfile.id, 'client')
      setHistoryMatches(completed)
    } catch (err: any) {
      console.error('Failed to load matches:', err)
      setError(err.message || '매칭 내역을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptMatch = async (matchId: string) => {
    try {
      await matchesApi.updateMatchStatus(matchId, 'accepted')
      await loadMatches() // Reload data
      alert('매칭이 승인되었습니다!')
    } catch (err: any) {
      console.error('Failed to accept match:', err)
      alert(err.message || '매칭 승인에 실패했습니다.')
    }
  }

  const handleRejectMatch = async (matchId: string) => {
    try {
      await matchesApi.updateMatchStatus(matchId, 'rejected')
      await loadMatches() // Reload data
      alert('매칭이 거절되었습니다.')
    } catch (err: any) {
      console.error('Failed to reject match:', err)
      alert(err.message || '매칭 거절에 실패했습니다.')
    }
  }

  // 7일 이상 응답 없는 건 필터링
  const filteredSentMatches = sentMatches.filter(match => {
    if (match.status === 'pending') {
      const appliedDate = new Date(match.applied_date)
      return appliedDate > sevenDaysAgo
    }
    return true
  })

  // 정렬: 승인된 건 상단, 응답한 건(7일 이내) 상단
  const sortMatches = (matches: MatchWithDetails[]) => {
    return [...matches].sort((a, b) => {
      // 1. 승인된 건 최상단
      if (a.status === 'accepted' && b.status !== 'accepted') return -1
      if (a.status !== 'accepted' && b.status === 'accepted') return 1

      // 2. 응답한 건(7일 이내) 상단
      const aHasRecentResponse = a.response_date && new Date(a.response_date) > sevenDaysAgo
      const bHasRecentResponse = b.response_date && new Date(b.response_date) > sevenDaysAgo
      if (aHasRecentResponse && !bHasRecentResponse) return -1
      if (!aHasRecentResponse && bHasRecentResponse) return 1

      // 3. 최신 순
      return new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
    })
  }

  const getStatusBadge = (match: MatchWithDetails) => {
    if (match.status === 'accepted') {
      return (
        <Badge className="bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          승인됨
        </Badge>
      )
    }
    if (match.status === 'rejected') {
      return (
        <Badge className="bg-gray-500/20 text-gray-500 border border-gray-500/30">
          <XCircle className="w-3 h-3 mr-1" />
          거절됨
        </Badge>
      )
    }
    if (match.response_date && new Date(match.response_date) > sevenDaysAgo) {
      return (
        <Badge className="bg-green-500/20 text-green-500 border border-green-500/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          응답함
        </Badge>
      )
    }
    return (
      <Badge className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
        <Clock className="w-3 h-3 mr-1" />
        대기중
      </Badge>
    )
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return '오늘'
    if (days === 1) return '어제'
    return `${days}일 전`
  }

  const renderMatchCard = (match: MatchWithDetails) => (
    <Link key={match.id} to={`/secretary/${match.secretary_profiles.id}`}>
      <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 hover:shadow-lg hover:shadow-[#FF783B]/10 transition-all active:scale-98">
        <div className="flex gap-3">
          {/* Profile Image */}
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-[#FF783B]/30">
            <span className="text-xl font-bold text-white">
              {match.secretary_profiles.users.name[0]}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold text-white">{match.secretary_profiles.users.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <span>{match.secretary_profiles.experience_years}년 경력</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {match.secretary_profiles.specialty || '전문 분야 미설정'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#FF783B]/20 px-2 py-1 rounded-full border border-[#FF783B]/30 flex-shrink-0">
                <Star className="w-3 h-3 fill-[#FF783B] text-[#FF783B]" />
                <span className="text-xs font-bold text-white">{match.secretary_profiles.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Job Title */}
            {match.job_postings && (
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                <Briefcase className="w-3 h-3" />
                <span>{match.job_postings.title}</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {getDaysAgo(match.applied_date)} 신청
              </span>
              {getStatusBadge(match)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {match.status === 'pending' && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#2A2A2A]">
            <Button
              size="sm"
              className="flex-1 h-9 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white"
              onClick={(e) => {
                e.preventDefault()
                handleAcceptMatch(match.id)
              }}
            >
              승인
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-9 bg-transparent border-[#2A2A2A] text-gray-300 hover:bg-[#0F0F0F]"
              onClick={(e) => {
                e.preventDefault()
                handleRejectMatch(match.id)
              }}
            >
              거절
            </Button>
          </div>
        )}
      </Card>
    </Link>
  )

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white">로그인이 필요합니다.</div>
      </div>
    )
  }

  const userType = userProfile.user_type as 'client' | 'secretary'

  return (
    <MobileLayout type={userType}>
      <div className="bg-[#0F0F0F] min-h-screen">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-white mb-4">매칭 내역</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 mb-4">
            <TabsList className="w-full bg-[#1A1A1A] border border-[#2A2A2A] p-1">
              <TabsTrigger value="received" className="flex-1 data-[state=active]:bg-[#FF783B] data-[state=active]:text-white">
                받은 제안
                {receivedMatches.length > 0 && (
                  <Badge className="ml-2 bg-[#FF783B] text-white text-xs">{receivedMatches.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex-1 data-[state=active]:bg-[#FF783B] data-[state=active]:text-white">
                보낸 제안
                {filteredSentMatches.length > 0 && (
                  <Badge className="ml-2 bg-[#FF783B] text-white text-xs">{filteredSentMatches.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-[#FF783B] data-[state=active]:text-white">
                지난 이력
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 받은 제안 */}
          <TabsContent value="received" className="px-4 space-y-3 mt-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : receivedMatches.length === 0 ? (
              <Card className="p-12 bg-[#1A1A1A] border-[#2A2A2A]">
                <div className="text-center">
                  <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">받은 제안이 없습니다</p>
                  <p className="text-sm text-gray-500 mt-2">공고를 등록하고 비서의 지원을 기다려보세요</p>
                </div>
              </Card>
            ) : (
              sortMatches(receivedMatches).map(renderMatchCard)
            )}
          </TabsContent>

          {/* 보낸 제안 */}
          <TabsContent value="sent" className="px-4 space-y-3 mt-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : filteredSentMatches.length === 0 ? (
              <Card className="p-12 bg-[#1A1A1A] border-[#2A2A2A]">
                <div className="text-center">
                  <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">보낸 제안이 없습니다</p>
                  <p className="text-sm text-gray-500 mt-2">마음에 드는 비서에게 제안을 보내보세요</p>
                </div>
              </Card>
            ) : (
              <>
                {sortMatches(filteredSentMatches).map(renderMatchCard)}
                {sentMatches.length > filteredSentMatches.length && (
                  <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A]">
                    <p className="text-sm text-gray-400 text-center">
                      7일 이상 응답이 없는 제안 {sentMatches.length - filteredSentMatches.length}건이 자동으로 삭제되었습니다
                    </p>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* 지난 이력 */}
          <TabsContent value="history" className="px-4 space-y-3 mt-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : historyMatches.length === 0 ? (
              <Card className="p-12 bg-[#1A1A1A] border-[#2A2A2A]">
                <div className="text-center">
                  <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">매칭 이력이 없습니다</p>
                </div>
              </Card>
            ) : (
              historyMatches.map(renderMatchCard)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}
