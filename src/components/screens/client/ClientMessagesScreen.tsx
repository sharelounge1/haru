import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Message {
  id: string
  secretaryId: string
  secretaryName: string
  secretaryAvatar?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
}

export default function ClientMessagesScreen() {
  // Mock message data
  const messages: Message[] = [
    {
      id: '1',
      secretaryId: '1',
      secretaryName: '김영희',
      lastMessage: '네, 그 시간에 가능합니다. 자세한 내용은 통화로 말씀드릴게요.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5분 전
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      secretaryId: '2',
      secretaryName: '박지수',
      lastMessage: '제안 주셔서 감사합니다. 일정 확인하고 연락드리겠습니다.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      secretaryId: '3',
      secretaryName: '이민지',
      lastMessage: '좋은 기회 주셔서 감사합니다. 궁금한 점이 몇 가지 있는데요.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
      unreadCount: 1,
      isOnline: false
    },
    {
      id: '4',
      secretaryId: '4',
      secretaryName: '정수현',
      lastMessage: '프로필 보내주셔서 감사합니다.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3일 전
      unreadCount: 0,
      isOnline: false
    }
  ]

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko })
  }

  return (
    <MobileLayout type="client">
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">메시지</h1>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-gray-50">
        {messages.length === 0 ? (
          <div className="px-4 py-8">
            <Card className="p-8">
              <div className="text-center text-gray-500">
                <p className="text-sm mb-2">메시지가 없습니다</p>
                <p className="text-xs">비서에게 먼저 연락해보세요</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <Link
                key={message.id}
                to={`/client/messages/${message.id}`}
                className="block bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="px-4 py-4">
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600">
                          {message.secretaryName[0]}
                        </span>
                      </div>
                      {message.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {message.secretaryName}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {getTimeAgo(message.lastMessageTime)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate pr-2 ${
                          message.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {message.lastMessage}
                        </p>
                        {message.unreadCount > 0 && (
                          <Badge className="bg-blue-600 hover:bg-blue-600 text-white flex-shrink-0">
                            {message.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      {messages.length > 0 && (
        <div className="px-4 py-6 bg-gray-50">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">메시지 이용 팁</p>
              <ul className="text-xs space-y-1 text-blue-800">
                <li>• 빠른 응답으로 좋은 인상을 남기세요</li>
                <li>• 구체적인 질문과 조건을 명확히 전달하세요</li>
                <li>• 예의 바른 대화로 신뢰를 쌓아보세요</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </MobileLayout>
  )
}
