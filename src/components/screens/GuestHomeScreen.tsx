import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Briefcase, Star, TrendingUp, ArrowRight, CheckCircle, Search, ShieldCheck } from 'lucide-react'

export default function GuestHomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F]">
      {/* Header */}
      <header className="bg-[#1A1A1A]/80 backdrop-blur-sm border-b border-[#2A2A2A] sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">하루비서</h1>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-white">
                로그인
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#FF783B] hover:bg-[#FF783B]/90 text-white">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Badge className="bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30 text-sm px-4 py-2">
            전문 비서 매칭 플랫폼
          </Badge>

          <h2 className="text-5xl font-bold text-white leading-tight">
            당신의 비즈니스를 위한
            <br />
            <span className="text-[#FF783B]">전문 비서</span>를 찾아보세요
          </h2>

          <p className="text-xl text-gray-400">
            검증된 전문 비서와 바로 연결되는 가장 쉬운 방법
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Link to="/signup?type=client">
              <Button size="lg" className="bg-[#FF783B] hover:bg-[#FF783B]/90 text-white h-14 px-8 text-lg">
                경영자로 시작하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/signup?type=secretary">
              <Button size="lg" variant="outline" className="border-2 border-gray-600 hover:border-[#FF783B] text-white h-14 px-8 text-lg">
                비서로 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] text-center">
            <CardContent className="pt-6 pb-6">
              <Users className="w-12 h-12 text-[#FF783B] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">전문 비서</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A] text-center">
            <CardContent className="pt-6 pb-6">
              <Briefcase className="w-12 h-12 text-[#FF783B] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">1,200+</div>
              <div className="text-gray-400">매칭 완료</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A] text-center">
            <CardContent className="pt-6 pb-6">
              <Star className="w-12 h-12 text-[#FF783B] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">4.9</div>
              <div className="text-gray-400">평균 평점</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A] text-center">
            <CardContent className="pt-6 pb-6">
              <TrendingUp className="w-12 h-12 text-[#FF783B] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">만족도</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          왜 하루비서를 선택해야 할까요?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-[#FF783B]/20 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#FF783B]" />
              </div>
              <CardTitle className="text-white">검증된 전문가</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                모든 비서는 철저한 검증 절차를 거쳐 등록됩니다. 경력, 자격증, 추천서를 확인하세요.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-[#FF783B]/20 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-[#FF783B]" />
              </div>
              <CardTitle className="text-white">맞춤형 매칭</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                AI 기반 매칭 시스템으로 당신의 니즈에 완벽하게 맞는 비서를 찾아드립니다.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-[#FF783B]/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-[#FF783B]" />
              </div>
              <CardTitle className="text-white">안전한 거래</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                계약부터 결제까지 플랫폼 내에서 안전하게 관리되며, 분쟁 해결 시스템을 제공합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-[#FF783B] to-[#FF5722] border-0">
          <CardContent className="py-16 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              지금 바로 시작하세요
            </h3>
            <p className="text-white/90 text-lg mb-8">
              3분이면 가입 완료! 전문 비서와의 매칭을 시작하세요
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-[#FF783B] hover:bg-gray-100 h-14 px-12 text-lg font-bold">
                무료로 시작하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] border-t border-[#2A2A2A] py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2024 하루비서. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
