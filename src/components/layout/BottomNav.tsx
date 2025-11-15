import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Briefcase, MessageSquare, User, TrendingUp } from 'lucide-react'

interface NavItem {
  path: string
  icon: React.ReactNode
  label: string
  activePattern: RegExp
}

interface BottomNavProps {
  type: 'client' | 'secretary'
}

export default function BottomNav({ type }: BottomNavProps) {
  const location = useLocation()

  const clientNav: NavItem[] = [
    {
      path: '/client',
      icon: <Home className="w-6 h-6" />,
      label: '홈',
      activePattern: /^\/client$/
    },
    {
      path: '/client/search',
      icon: <Search className="w-6 h-6" />,
      label: '검색',
      activePattern: /^\/client\/search/
    },
    {
      path: '/client/jobs',
      icon: <Briefcase className="w-6 h-6" />,
      label: '공고',
      activePattern: /^\/client\/jobs/
    },
    {
      path: '/client/messages',
      icon: <MessageSquare className="w-6 h-6" />,
      label: '메시지',
      activePattern: /^\/client\/messages/
    },
    {
      path: '/client/my',
      icon: <User className="w-6 h-6" />,
      label: 'MY',
      activePattern: /^\/client\/my/
    }
  ]

  const secretaryNav: NavItem[] = [
    {
      path: '/secretary',
      icon: <Home className="w-6 h-6" />,
      label: '홈',
      activePattern: /^\/secretary$/
    },
    {
      path: '/secretary/explore',
      icon: <Search className="w-6 h-6" />,
      label: '탐색',
      activePattern: /^\/secretary\/explore/
    },
    {
      path: '/secretary/activity',
      icon: <TrendingUp className="w-6 h-6" />,
      label: '활동',
      activePattern: /^\/secretary\/activity/
    },
    {
      path: '/secretary/messages',
      icon: <MessageSquare className="w-6 h-6" />,
      label: '메시지',
      activePattern: /^\/secretary\/messages/
    },
    {
      path: '/secretary/my',
      icon: <User className="w-6 h-6" />,
      label: 'MY',
      activePattern: /^\/secretary\/my/
    }
  ]

  const navItems = type === 'client' ? clientNav : secretaryNav

  const isActive = (item: NavItem) => {
    return item.activePattern.test(location.pathname)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="max-w-[480px] mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className="mb-1">{item.icon}</div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
