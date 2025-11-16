import { useNavigate } from 'react-router-dom'
import { Button } from './button'
import { X } from 'lucide-react'

interface LoginRequiredDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginRequiredDialog({ isOpen, onClose }: LoginRequiredDialogProps) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleLoginClick = () => {
    onClose()
    navigate('/login')
  }

  const handleContinueBrowsing = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#1A1A1A] rounded-2xl shadow-2xl z-50 border border-[#2A2A2A]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FF783B] to-[#FF5722] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">
              로그인이 필요합니다
            </h2>
            <p className="text-gray-400 text-sm">
              이 기능을 사용하려면 로그인이 필요합니다.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleLoginClick}
              className="w-full h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-semibold rounded-xl shadow-lg shadow-[#FF783B]/30 transition-all"
            >
              로그인하러 가기
            </Button>

            <Button
              onClick={handleContinueBrowsing}
              variant="outline"
              className="w-full h-12 bg-transparent border-2 border-[#2A2A2A] hover:border-[#FF783B] text-gray-300 hover:text-white font-medium rounded-xl transition-all"
            >
              계속 둘러보기
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
