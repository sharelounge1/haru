import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Message {
  id: string
  clientId: string
  clientName: string
  clientAvatar?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
}

export default function SecretaryMessagesScreen() {
  // Mock message data
  const messages: Message[] = [
    {
      id: '1',
      clientId: '1',
      clientName: '김철수',
      lastMessage: '안녕하세요. 프로필 잘 봤습니다. 언제 시간 되실까요?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 10), // 10분 전
      unreadCount: 3,
      isOnline: true
    },
    {
      id: '2',
      clientId: '2',
      clientName: '박영희',
      lastMessage: '감사합니다. 다음주부터 시작 가능하신가요?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3시간 전
      unreadCount: 1,
      isOnline: false
    },
    {
      id: '3',
      clientId: '3',
      clientName: '이민수',
      lastMessage: '네, 알겠습니다.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2일 전
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '4',
      clientId: '4',
      clientName: '최수현',
      lastMessage: '프로필 전달 감사합니다.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5일 전
      unreadCount: 0,
      isOnline: false
    }
  ]

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko })
  }

  return (
    <MobileLayout type="secretary">
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
                <p className="text-xs">공고에 지원하면 경영자와 대화할 수 있어요</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <Link
                key={message.id}
                to={`/secretary/messages/${message.id}`}
                className="block bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="px-4 py-4">
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-600">
                          {message.clientName[0]}
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
                          {message.clientName}
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
                <li>• 신속하고 정중한 응답으로 좋은 인상을 남기세요</li>
                <li>• 궁금한 점은 미리 질문하여 명확히 하세요</li>
                <li>• 전문적인 태도로 신뢰를 쌓아보세요</li>
              </ul>
            </div>
          </Card>
        </div>
      )}
    </MobileLayout>
  )
}
