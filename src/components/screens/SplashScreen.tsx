import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: '전문 비서 매칭',
      description: '검증된 전문 비서와\n바로 연결됩니다',
      icon: '👔',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: '맞춤형 검색',
      description: '경력, 전문분야, 지역별로\n원하는 비서를 찾으세요',
      icon: '🔍',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: '안전한 거래',
      description: '계약부터 결제까지\n안전하게 관리됩니다',
      icon: '🛡️',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleGuestMode = () => {
    // 게스트 모드로 앱 접속
    localStorage.setItem('guestMode', 'true')
    navigate('/guest/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] flex flex-col">
      {/* Slides Container */}
      <div className="flex-1 flex items-center justify-center px-8 relative">
        {/* Navigation Arrows */}
        {currentSlide > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Slides */}
        <div className="w-full max-w-md">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full absolute'
                  : 'opacity-0 translate-x-full absolute'
              }`}
            >
              <div className="text-center space-y-8">
                {/* Icon with gradient background */}
                <div className="relative mx-auto w-32 h-32">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${slide.gradient} opacity-20 blur-2xl`} />
                  <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-2xl shadow-[#FF783B]/50`}>
                    <span className="text-6xl">{slide.icon}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 py-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-[#FF783B]'
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-8 pb-12 space-y-4">
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button className="w-full h-14 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] font-semibold rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 3c5 0 9 3.6 9 8s-4 8-9 8c-.5 0-1-.1-1.5-.2-1.3 1-3.5 2.2-5.5 2.2-.1 0-.2 0-.2-.2 0-.1.1-.2.2-.3.8-.7 1.5-1.6 1.7-2.5C4 16.8 3 14.5 3 12c0-4.4 4-8 9-8z"/>
            </svg>
            카카오로 시작하기
          </button>

          <button className="w-full h-14 bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43-.14 0-.3-.01-.47-.01z"/>
            </svg>
            네이버로 시작하기
          </button>

          <button className="w-full h-14 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            구글로 시작하기
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">또는</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Email Login/Signup */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/login')}
            className="w-full h-14 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-semibold rounded-xl shadow-lg shadow-[#FF783B]/30 transition-all"
          >
            이메일로 로그인
          </Button>

          <Button
            onClick={() => navigate('/signup')}
            variant="outline"
            className="w-full h-14 bg-transparent border-2 border-gray-600 hover:border-[#FF783B] text-white font-semibold rounded-xl transition-all"
          >
            회원가입
          </Button>

          <Button
            onClick={handleGuestMode}
            variant="ghost"
            className="w-full h-14 text-gray-400 hover:text-white font-medium rounded-xl"
          >
            로그인 없이 둘러보기
          </Button>
        </div>
      </div>
    </div>
  )
}
