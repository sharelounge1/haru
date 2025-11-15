import { Link } from 'react-router-dom'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Shield,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Award
} from 'lucide-react'

export default function ClientMyScreen() {
  // Mock user data
  const user = {
    name: '김철수',
    email: 'client@example.com',
    phone: '010-1234-5678',
    verifications: {
      identity: true,
      business: true,
      revenue: false,
      salary: false,
    }
  }

  const verificationBadges = [
    { key: 'identity', label: '본인인증', verified: user.verifications.identity },
    { key: 'business', label: '사업자', verified: user.verifications.business },
    { key: 'revenue', label: '매출', verified: user.verifications.revenue },
    { key: 'salary', label: '연봉', verified: user.verifications.salary },
  ]

  const verifiedCount = Object.values(user.verifications).filter(v => v).length

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: '내 프로필 수정',
      path: '/client/profile/edit',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: '인증 관리',
      path: '/client/my/verifications',
      badge: `${verifiedCount}/4`,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: '계약 관리',
      path: '/client/contracts',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: '결제 내역',
      path: '/client/payments',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: '설정',
      path: '/client/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ]

  return (
    <MobileLayout type="client">
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
                <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">인증 배지</span>
                <span className="text-xs text-gray-500">{verifiedCount}/4 완료</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {verificationBadges.map((badge) => (
                  <Badge
                    key={badge.key}
                    variant={badge.verified ? 'default' : 'outline'}
                    className={badge.verified ? 'bg-blue-600' : 'text-gray-400'}
                  >
                    {badge.verified && <Shield className="w-3 h-3 mr-1" />}
                    {badge.label}
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

        {/* Verification CTA */}
        {verifiedCount < 4 && (
          <div className="px-4 pb-6">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">
                    추가 인증으로 신뢰도 UP!
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    인증을 완료하면 더 많은 전문 비서에게 노출됩니다
                  </p>
                  <Link to="/client/my/verifications">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      인증하러 가기 →
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
