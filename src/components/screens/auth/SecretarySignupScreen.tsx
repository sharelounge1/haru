import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function SecretarySignupScreen() {
  const navigate = useNavigate()
  const { signUp, signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        userType: 'secretary',
        name: formData.name,
        phone: formData.phone,
      })

      // 회원가입 성공
      setSuccess(true)
      setLoading(false)
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || '회원가입에 실패했습니다. 다시 시도해주세요.')
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStartService = async () => {
    setLoading(true)
    try {
      // 자동 로그인
      await signIn({
        email: formData.email,
        password: formData.password,
      })

      // 게스트 모드 해제
      localStorage.removeItem('guestMode')

      // 메인 화면으로 이동
      navigate('/home')
    } catch (err: any) {
      console.error('Auto login error:', err)
      // 로그인 실패 시 로그인 페이지로
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  // 성공 화면 표시
  if (success) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF783B]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#FF783B]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-full mb-6 shadow-2xl shadow-[#FF783B]/50 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">가입이 완료되었습니다!</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              이제 전문 비서로서<br />
              프리미엄 매칭 서비스를<br />
              이용해보세요!
            </p>
          </div>

          <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-[#0F0F0F] rounded-lg border border-[#2A2A2A]">
                  <div className="w-10 h-10 bg-[#FF783B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF783B] text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">우수한 경영자와 매칭</p>
                    <p className="text-gray-400 text-sm">검증된 기업과 안전한 연결</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#0F0F0F] rounded-lg border border-[#2A2A2A]">
                  <div className="w-10 h-10 bg-[#FF783B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF783B] text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">투명한 급여 시스템</p>
                    <p className="text-gray-400 text-sm">안전하고 신속한 급여 지급</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#0F0F0F] rounded-lg border border-[#2A2A2A]">
                  <div className="w-10 h-10 bg-[#FF783B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF783B] text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">커리어 성장 지원</p>
                    <p className="text-gray-400 text-sm">전문성 향상 기회 제공</p>
                  </div>
                </div>

                <Button
                  onClick={handleStartService}
                  className="w-full h-14 bg-gradient-to-r from-[#FF783B] to-[#FF5722] hover:from-[#FF783B]/90 hover:to-[#FF5722]/90 text-white font-bold text-lg shadow-xl shadow-[#FF783B]/30 mt-6"
                  disabled={loading}
                >
                  {loading ? '로그인 중...' : '서비스 이용하기'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF783B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#FF783B]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Back button */}
      <Link
        to="/signup"
        className="absolute top-6 left-6 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-2xl mb-3 shadow-xl shadow-[#FF783B]/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">비서 회원가입</h1>
          <p className="text-gray-400 text-sm">전문 비서로 활동하기 위한 계정을 만드세요</p>
        </div>

        <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">이름 *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-11 focus:border-[#FF783B]"
                  required
                  disabled={loading}
                  placeholder="홍길동"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">이메일 *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-11 focus:border-[#FF783B]"
                  required
                  disabled={loading}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">연락처</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-11 focus:border-[#FF783B]"
                  disabled={loading}
                  placeholder="010-0000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">비밀번호 *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-11 focus:border-[#FF783B]"
                  required
                  disabled={loading}
                  placeholder="최소 6자 이상"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">비밀번호 확인 *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-11 focus:border-[#FF783B]"
                  required
                  disabled={loading}
                  placeholder="비밀번호 재입력"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-semibold shadow-lg shadow-[#FF783B]/20 mt-6"
                disabled={loading}
              >
                {loading ? '가입 중...' : '회원가입'}
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-400 hover:text-[#FF783B] transition-colors"
                >
                  이미 계정이 있으신가요? <span className="text-[#FF783B] font-medium">로그인</span>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
