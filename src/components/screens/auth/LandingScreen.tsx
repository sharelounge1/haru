import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Briefcase, Star, Shield, Sparkles, Heart, Award } from 'lucide-react'

export default function LandingScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section - Splash Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF783B]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF783B]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-3xl mb-6 shadow-2xl shadow-[#FF783B]/30">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              하루비서
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              신뢰할 수 있는 전문 비서와 경영자를<br />
              연결하는 프리미엄 플랫폼
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <div className="w-14 h-14 bg-[#FF783B]/20 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-[#FF783B]/30">
                <Briefcase className="w-7 h-7 text-[#FF783B]" />
              </div>
              <h3 className="text-white font-bold mb-2">전문 매칭</h3>
              <p className="text-gray-400 text-sm">
                다양한 분야의 검증된 전문 비서
              </p>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <div className="w-14 h-14 bg-[#FF783B]/20 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-[#FF783B]/30">
                <Shield className="w-7 h-7 text-[#FF783B]" />
              </div>
              <h3 className="text-white font-bold mb-2">신뢰 인증</h3>
              <p className="text-gray-400 text-sm">
                체계적인 검증 시스템
              </p>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
              <div className="w-14 h-14 bg-[#FF783B]/20 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-[#FF783B]/30">
                <Star className="w-7 h-7 text-[#FF783B]" />
              </div>
              <h3 className="text-white font-bold mb-2">상호 평가</h3>
              <p className="text-gray-400 text-sm">
                투명한 리뷰 시스템
              </p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="max-w-md mx-auto space-y-4">
            <Link to="/login" className="block">
              <Button className="w-full h-14 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white text-lg font-bold shadow-2xl shadow-[#FF783B]/30 rounded-2xl">
                로그인
              </Button>
            </Link>

            <Link to="/signup" className="block">
              <Button variant="outline" className="w-full h-14 bg-transparent border-2 border-[#FF783B] text-[#FF783B] text-lg font-bold hover:bg-[#FF783B]/10 rounded-2xl">
                회원가입
              </Button>
            </Link>

            <button
              onClick={() => navigate('/home')}
              className="w-full text-gray-400 hover:text-[#FF783B] transition-colors py-4 text-base font-medium"
            >
              로그인 없이 둘러보기
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#FF783B]/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-[#FF783B] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-[#FF783B] fill-[#FF783B]" />
              왜 하루비서인가요?
            </h2>
            <p className="text-gray-400 text-lg">
              전문성과 신뢰를 기반으로 한 프리미엄 매칭 서비스
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-8 hover:border-[#FF783B]/50 transition-all">
              <Award className="w-12 h-12 text-[#FF783B] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">경영자를 위한</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2"></div>
                  <span>검증된 전문 비서 매칭</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2"></div>
                  <span>신뢰 인증으로 높은 매칭률</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2"></div>
                  <span>구인 공고로 능동적 채용</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-8 hover:border-[#FF783B]/50 transition-all">
              <Sparkles className="w-12 h-12 text-[#FF783B] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">비서를 위한</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2"></div>
                  <span>프리미엄 경영자와의 매칭</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2"></div>
                  <span>다양한 구인 공고 탐색</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2"></div>
                  <span>투명한 평가 시스템</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">지금 시작하세요</h2>
          <p className="text-lg text-gray-400 mb-12">
            당신의 완벽한 파트너를 만나보세요
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link to="/signup" className="flex-1">
              <Button className="w-full h-14 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white text-lg font-bold shadow-xl shadow-[#FF783B]/20 rounded-2xl">
                <Sparkles className="w-5 h-5 mr-2" />
                회원가입하고 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
