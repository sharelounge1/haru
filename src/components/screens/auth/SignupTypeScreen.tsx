import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, UserCheck } from 'lucide-react'

export default function SignupTypeScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">가입 유형을 선택해주세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-center">경영자로 가입</CardTitle>
              <CardDescription className="text-center">
                전문 비서를 찾고 계신가요?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>• 다양한 전문 비서 검색</li>
                <li>• 구인 공고 등록</li>
                <li>• 사업자/매출/연봉 인증으로 신뢰도 향상</li>
                <li>• 비서 프로필 열람 및 매칭</li>
              </ul>
              <Link to="/signup/client">
                <Button className="w-full" size="lg">
                  경영자로 시작하기
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-center">비서로 가입</CardTitle>
              <CardDescription className="text-center">
                전문 비서로 활동하고 싶으신가요?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li>• 프로필 등록 및 포트폴리오 관리</li>
                <li>• 구인 공고 검색 및 지원</li>
                <li>• 전문 분야 배지 획득</li>
                <li>• 경영자와 매칭 기회</li>
              </ul>
              <Link to="/signup/secretary">
                <Button className="w-full" size="lg" variant="outline">
                  비서로 시작하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
