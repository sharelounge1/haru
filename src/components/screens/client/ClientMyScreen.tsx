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
      path: '/my/profile/edit',
      color: 'text-[#FF783B]',
      bgColor: 'bg-[#FF783B]/10'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: '인증 관리',
      path: '/client/my/verifications',
      badge: `${verifiedCount}/4`,
      color: 'text-[#FF783B]',
      bgColor: 'bg-[#FF783B]/10'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: '계약 관리',
      path: '/my/contracts',
      color: 'text-[#FF783B]',
      bgColor: 'bg-[#FF783B]/10'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: '결제 내역',
      path: '/my/payments',
      color: 'text-[#FF783B]',
      bgColor: 'bg-[#FF783B]/10'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: '설정',
      path: '/my/settings',
      color: 'text-gray-400',
      bgColor: 'bg-[#1A1A1A]'
    }
  ]

  return (
    <MobileLayout type="client">
      <div className="bg-[#0F0F0F] min-h-screen">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-white">MY</h1>
        </div>

        {/* Profile Card */}
        <div className="px-4 pt-6 pb-4">
          <Card className="p-6 bg-[#1A1A1A] border-[#2A2A2A]">
            <div className="flex items-start gap-4 mb-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FF783B]/30">
                <span className="text-2xl font-bold text-white">
                  {user.name[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-400 mb-1">{user.email}</p>
                <p className="text-sm text-gray-400">{user.phone}</p>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="pt-4 border-t border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-300">인증 배지</span>
                <span className="text-xs text-gray-500">{verifiedCount}/4 완료</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {verificationBadges.map((badge) => (
                  <Badge
                    key={badge.key}
                    variant={badge.verified ? 'default' : 'outline'}
                    className={badge.verified ? 'bg-[#FF783B] text-white border-0' : 'text-gray-500 border-[#2A2A2A]'}
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
                <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 hover:shadow-lg hover:shadow-[#FF783B]/10 transition-all active:scale-98">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 border border-[#2A2A2A]`}>
                      <div className={item.color}>
                        {item.icon}
                      </div>
                    </div>
                    <span className="flex-1 font-medium text-white">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge className="text-xs bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Verification CTA */}
        {verifiedCount < 4 && (
          <div className="px-4 pb-6">
            <Card className="p-4 bg-gradient-to-br from-[#FF783B]/10 to-[#FF5722]/10 border-[#FF783B]/30">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    추가 인증으로 신뢰도 UP!
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    인증을 완료하면 더 많은 전문 비서에게 노출됩니다
                  </p>
                  <Link to="/client/my/verifications">
                    <button className="text-sm font-medium text-[#FF783B] hover:text-[#FF783B]/80">
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
            <Card className="p-4 bg-[#1A1A1A] border-[#2A2A2A] hover:bg-[#1A1A1A]/80 transition-colors active:scale-98">
              <div className="flex items-center gap-3 justify-center">
                <LogOut className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-300">로그아웃</span>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}
