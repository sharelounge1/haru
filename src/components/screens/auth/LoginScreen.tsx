import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual login logic
    // For now, mock redirect based on email
    if (email.includes('admin')) {
      navigate('/admin')
    } else if (email.includes('secretary')) {
      navigate('/home')
    } else {
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF783B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#FF783B]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-2xl mb-4 shadow-xl shadow-[#FF783B]/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
          <p className="text-gray-400">하루비서에 오신 것을 환영합니다</p>
        </div>

        <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-[#FF783B] h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white placeholder:text-gray-500 focus:border-[#FF783B] h-12"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-[#FF783B] hover:text-[#FF783B]/80">
                  비밀번호 찾기
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white text-base font-bold shadow-lg shadow-[#FF783B]/20"
              >
                로그인
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">계정이 없으신가요? </span>
              <Link to="/signup" className="text-[#FF783B] hover:text-[#FF783B]/80 font-medium">
                회원가입
              </Link>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/home')}
                className="text-gray-500 hover:text-gray-400 text-sm"
              >
                로그인 없이 둘러보기
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
