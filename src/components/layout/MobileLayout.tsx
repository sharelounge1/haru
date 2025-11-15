import { ReactNode } from 'react'
import BottomNav from './BottomNav'

interface MobileLayoutProps {
  children: ReactNode
  type?: 'client' | 'secretary'
  showBottomNav?: boolean
}

export default function MobileLayout({ children, type, showBottomNav = true }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* App Container - 최대 너비 제한 */}
      <div className="max-w-[480px] mx-auto w-full flex-1 flex flex-col relative">
        {/* Main Content */}
        <main className={`flex-1 ${showBottomNav ? 'pb-16' : ''}`}>
          {children}
        </main>

        {/* Bottom Navigation */}
        {showBottomNav && type && <BottomNav type={type} />}
      </div>
    </div>
  )
}
