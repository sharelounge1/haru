import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, MapPin, Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react'

type UserType = 'client' | 'secretary'
type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'expired'

interface Match {
  id: string
  secretaryId: string
  secretaryName: string
  secretaryAge: number
  secretaryRegion: string
  secretaryRating: number
  secretaryReviewCount: number
  jobTitle?: string // 어떤 공고에 신청했는지
  appliedDate: Date
  responseDate?: Date
  status: MatchStatus
  isFromSecretary: boolean // true: 비서가 공고에 신청, false: CEO가 비서에게 제안
}

export default function MatchingScreen() {
  const [userType] = useState<UserType>('client') // 실제로는 auth context에서 가져올 것
  const [activeTab, setActiveTab] = useState('received')

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Mock data - CEO의 매칭 내역
  const receivedMatches: Match[] = [
    {
      id: '1',
      secretaryId: '1',
      secretaryName: '김영희',
      secretaryAge: 32,
      secretaryRegion: '서울 강남구',
      secretaryRating: 4.8,
      secretaryReviewCount: 24,
      jobTitle: 'CEO 개인비서',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전
      status: 'pending',
      isFromSecretary: true
    },
    {
      id: '2',
      secretaryId: '2',
      secretaryName: '박지수',
      secretaryAge: 28,
      secretaryRegion: '서울 서초구',
      secretaryRating: 4.9,
      secretaryReviewCount: 18,
      jobTitle: '출장 동행 비서',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1일 전
      responseDate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12시간 전 응답
      status: 'accepted',
      isFromSecretary: true
    },
    {
      id: '3',
      secretaryId: '3',
      secretaryName: '이민지',
      secretaryAge: 30,
      secretaryRegion: '서울 송파구',
      secretaryRating: 4.7,
      secretaryReviewCount: 31,
      jobTitle: '업무비서',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5일 전
      status: 'pending',
      isFromSecretary: true
    }
  ]

  const sentMatches: Match[] = [
    {
      id: '4',
      secretaryId: '4',
      secretaryName: '정수현',
      secretaryAge: 35,
      secretaryRegion: '서울 마포구',
      secretaryRating: 4.9,
      secretaryReviewCount: 42,
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3일 전
      responseDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전 응답
      status: 'accepted',
      isFromSecretary: false
    },
    {
      id: '5',
      secretaryId: '5',
      secretaryName: '최유나',
      secretaryAge: 26,
      secretaryRegion: '서울 역삼동',
      secretaryRating: 4.9,
      secretaryReviewCount: 45,
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4일 전
      status: 'pending',
      isFromSecretary: false
    },
    {
      id: '6',
      secretaryId: '6',
      secretaryName: '강서연',
      secretaryAge: 29,
      secretaryRegion: '서울 삼성동',
      secretaryRating: 4.8,
      secretaryReviewCount: 38,
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8일 전 - 삭제 대상
      status: 'pending',
      isFromSecretary: false
    }
  ]

  const historyMatches: Match[] = [
    {
      id: '7',
      secretaryId: '7',
      secretaryName: '윤하은',
      secretaryAge: 31,
      secretaryRegion: '서울 청담동',
      secretaryRating: 5.0,
      secretaryReviewCount: 67,
      jobTitle: '장기 업무비서',
      appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30일 전
      responseDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28), // 28일 전 응답
      status: 'accepted',
      isFromSecretary: true
    }
  ]

  // 7일 이상 응답 없는 건 필터링
  const filteredSentMatches = sentMatches.filter(match => {
    if (match.status === 'pending') {
      return match.appliedDate > sevenDaysAgo
    }
    return true
  })

  // 정렬: 승인된 건 상단, 응답한 건(7일 이내) 상단
  const sortMatches = (matches: Match[]) => {
    return [...matches].sort((a, b) => {
      // 1. 승인된 건 최상단
      if (a.status === 'accepted' && b.status !== 'accepted') return -1
      if (a.status !== 'accepted' && b.status === 'accepted') return 1

      // 2. 응답한 건(7일 이내) 상단
      const aHasRecentResponse = a.responseDate && a.responseDate > sevenDaysAgo
      const bHasRecentResponse = b.responseDate && b.responseDate > sevenDaysAgo
      if (aHasRecentResponse && !bHasRecentResponse) return -1
      if (!aHasRecentResponse && bHasRecentResponse) return 1

      // 3. 최신 순
      return b.appliedDate.getTime() - a.appliedDate.getTime()
    })
  }

  const getStatusBadge = (match: Match) => {
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
    if (match.responseDate && match.responseDate > sevenDaysAgo) {
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

  const getDaysAgo = (date: Date) => {
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return '오늘'
    if (days === 1) return '어제'
    return `${days}일 전`
  }

  const renderMatchCard = (match: Match) => (
    <Link key={match.id} to={`/secretary/${match.secretaryId}`}>
      <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 hover:shadow-lg hover:shadow-[#FF783B]/10 transition-all active:scale-98">
        <div className="flex gap-3">
          {/* Profile Image */}
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-[#FF783B]/30">
            <span className="text-xl font-bold text-white">
              {match.secretaryName[0]}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold text-white">{match.secretaryName}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <span>{match.secretaryAge}세</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {match.secretaryRegion}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#FF783B]/20 px-2 py-1 rounded-full border border-[#FF783B]/30 flex-shrink-0">
                <Star className="w-3 h-3 fill-[#FF783B] text-[#FF783B]" />
                <span className="text-xs font-bold text-white">{match.secretaryRating}</span>
              </div>
            </div>

            {/* Job Title */}
            {match.jobTitle && (
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                <Briefcase className="w-3 h-3" />
                <span>{match.jobTitle}</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {getDaysAgo(match.appliedDate)} 신청
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
                // Handle accept
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
                // Handle reject
              }}
            >
              거절
            </Button>
          </div>
        )}
      </Card>
    </Link>
  )

  return (
    <MobileLayout type={userType}>
      <div className="bg-[#0F0F0F] min-h-screen">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-white mb-4">매칭 내역</h1>
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
            {receivedMatches.length === 0 ? (
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
            {filteredSentMatches.length === 0 ? (
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
            {historyMatches.length === 0 ? (
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
