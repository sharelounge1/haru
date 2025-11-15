import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Bell,
  Lock,
  Globe,
  HelpCircle,
  FileText,
  Shield,
  ChevronRight
} from 'lucide-react'

export default function SettingsScreen() {
  const navigate = useNavigate()

  const settingsGroups = [
    {
      title: '계정',
      items: [
        {
          icon: <Lock className="w-5 h-5" />,
          label: '비밀번호 변경',
          path: '/settings/password'
        },
        {
          icon: <Shield className="w-5 h-5" />,
          label: '개인정보 보호',
          path: '/settings/privacy'
        }
      ]
    },
    {
      title: '알림',
      items: [
        {
          icon: <Bell className="w-5 h-5" />,
          label: '푸시 알림 설정',
          path: '/settings/notifications'
        }
      ]
    },
    {
      title: '기타',
      items: [
        {
          icon: <Globe className="w-5 h-5" />,
          label: '언어 설정',
          path: '/settings/language'
        },
        {
          icon: <FileText className="w-5 h-5" />,
          label: '이용약관',
          path: '/settings/terms'
        },
        {
          icon: <HelpCircle className="w-5 h-5" />,
          label: '고객센터',
          path: '/settings/support'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0F0F0F]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white ml-2">설정</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">{group.title}</h3>
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => navigate(item.path)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-[#0F0F0F] transition-colors border-b border-[#2A2A2A] last:border-0"
                >
                  <div className="w-10 h-10 bg-[#FF783B]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#FF783B]/30">
                    <div className="text-[#FF783B]">
                      {item.icon}
                    </div>
                  </div>
                  <span className="flex-1 text-left font-medium text-white">
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </button>
              ))}
            </Card>
          </div>
        ))}

        {/* App Info */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">하루비서</p>
            <p className="text-xs text-gray-500">버전 1.0.0</p>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full h-12 bg-transparent border-2 border-red-500/30 text-red-500 hover:bg-red-500/10"
          onClick={() => navigate('/login')}
        >
          로그아웃
        </Button>
      </div>
    </div>
  )
}
