import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function LoginScreen() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/home')
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
    } finally {
      setLoading(false)
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

        {/* Login Form */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                  required
                  disabled={loading}
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
                  className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-semibold shadow-lg shadow-[#FF783B]/20"
                disabled={loading}
              >
                {loading ? '로그인 중...' : '로그인'}
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/signup"
                  className="text-sm text-gray-400 hover:text-[#FF783B] transition-colors"
                >
                  계정이 없으신가요? <span className="text-[#FF783B] font-medium">회원가입</span>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Browse without login */}
        <div className="mt-6 text-center">
          <Link
            to="/home"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            로그인 없이 둘러보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}
