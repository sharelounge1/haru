import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Star, Shield } from 'lucide-react'

export default function LandingScreen() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            하루비서
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            신뢰할 수 있는 전문 비서와 경영자를 연결하는 플랫폼
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                로그인
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>전문 비서 매칭</CardTitle>
                <CardDescription>
                  업무, 개인, 출장 등 다양한 분야의 전문 비서를 찾아보세요
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>신뢰 인증 시스템</CardTitle>
                <CardDescription>
                  본인인증, 사업자 인증, 매출/연봉 인증으로 신뢰를 확보하세요
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>상호 평가 시스템</CardTitle>
                <CardDescription>
                  리뷰와 평점으로 더 나은 매칭을 경험하세요
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-lg mb-8">
            경영자와 비서 모두 환영합니다
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup/client">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                경영자로 시작하기
              </Button>
            </Link>
            <Link to="/signup/secretary">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10">
                비서로 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
