import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, UserCheck, ArrowLeft, Sparkles } from 'lucide-react'

export default function SignupTypeScreen() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FF783B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF783B]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-2xl mb-4 shadow-xl shadow-[#FF783B]/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">회원가입</h1>
          <p className="text-gray-400 text-lg">가입 유형을 선택해주세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* CEO Card */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 transition-all hover:shadow-2xl hover:shadow-[#FF783B]/10">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF783B]/20 to-[#FF5722]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#FF783B]/30">
                <Briefcase className="w-10 h-10 text-[#FF783B]" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">경영자로 가입</h2>
              <p className="text-gray-400 text-center mb-6">
                전문 비서를 찾고 계신가요?
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>다양한 전문 비서 검색</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>구인 공고 등록</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>사업자/매출/연봉 인증으로 신뢰도 향상</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>비서 프로필 열람 및 매칭</span>
                </li>
              </ul>
              <Link to="/signup/client">
                <Button className="w-full h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-bold shadow-lg shadow-[#FF783B]/20">
                  경영자로 시작하기
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Secretary Card */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#FF783B]/50 transition-all hover:shadow-2xl hover:shadow-[#FF783B]/10">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF783B]/20 to-[#FF5722]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#FF783B]/30">
                <UserCheck className="w-10 h-10 text-[#FF783B]" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">비서로 가입</h2>
              <p className="text-gray-400 text-center mb-6">
                전문 비서로 활동하고 싶으신가요?
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>프로필 등록 및 포트폴리오 관리</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>구인 공고 검색 및 지원</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>전문 분야 배지 획득</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>경영자와 매칭 기회</span>
                </li>
              </ul>
              <Link to="/signup/secretary">
                <Button variant="outline" className="w-full h-12 bg-transparent border-2 border-[#FF783B] text-[#FF783B] font-bold hover:bg-[#FF783B]/10">
                  비서로 시작하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-400">이미 계정이 있으신가요? </span>
          <Link to="/login" className="text-[#FF783B] hover:text-[#FF783B]/80 font-medium">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
