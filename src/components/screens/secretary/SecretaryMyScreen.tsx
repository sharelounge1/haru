import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Image,
  Award,
  BarChart3,
  Wallet,
  Settings,
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react'

export default function SecretaryMyScreen() {
  // Mock user data
  const user = {
    name: '김영희',
    email: 'secretary@example.com',
    phone: '010-9876-5432',
    categories: ['업무비서', '개인비서'],
    badges: ['영어', '운전', 'MBA'],
    rating: 4.8,
    reviewCount: 24,
    photoCount: 3,
    profileCompletion: 85
  }

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: '프로필 수정',
      path: '/secretary/profile/edit',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <Image className="w-5 h-5" />,
      label: '프로필 사진 관리',
      path: '/secretary/my/photos',
      badge: `${user.photoCount}/5`,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: '배지 관리',
      path: '/secretary/my/badges',
      badge: `${user.badges.length}`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: '활동 통계',
      path: '/secretary/my/stats',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: '정산 관리',
      path: '/secretary/my/settlements',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: '설정',
      path: '/secretary/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ]

  return (
    <MobileLayout type="secretary">
      <div className="bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">MY</h1>
        </div>
      </div>

      <div className="bg-gray-50">
        {/* Profile Card */}
        <div className="px-4 pt-6 pb-4">
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">
                  {user.name[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{user.rating}</span>
                    <span className="text-xs text-gray-500">({user.reviewCount})</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  프로필 완성도
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {user.profileCompletion}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${user.profileCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">
                비서 유형
              </span>
              <div className="flex flex-wrap gap-2">
                {user.categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">보유 배지</span>
                <span className="text-xs text-gray-500">{user.badges.length}개</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.badges.map((badge) => (
                  <Badge key={badge} variant="outline" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Menu List */}
        <div className="px-4 pb-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <Card className="p-4 hover:shadow-md transition-shadow active:scale-98 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <div className={item.color}>
                        {item.icon}
                      </div>
                    </div>
                    <span className="flex-1 font-medium text-gray-900">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Profile Completion CTA */}
        {user.profileCompletion < 100 && (
          <div className="px-4 pb-6">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">
                    프로필을 완성하세요!
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    프로필이 완성되면 더 많은 경영자에게 노출되어 기회가 늘어납니다
                  </p>
                  <Link to="/secretary/profile/edit">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      프로필 완성하기 →
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Logout Button */}
        <div className="px-4 pb-8">
          <Link to="/login">
            <Card className="p-4 hover:bg-gray-50 transition-colors active:scale-98 transition-transform">
              <div className="flex items-center gap-3 justify-center">
                <LogOut className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">로그아웃</span>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}
