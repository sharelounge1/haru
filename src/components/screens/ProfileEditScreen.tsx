import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import * as usersApi from '@/lib/api/users'

interface ProfileFormData {
  // User fields
  name: string
  email: string
  phone: string

  // Secretary fields
  region?: string
  bio?: string
  specialty?: string
  experience_years?: number

  // Client fields
  company_name?: string
  business_registration?: string
  industry?: string
  company_size?: string
}

export default function ProfileEditScreen() {
  const navigate = useNavigate()
  const { user, userProfile } = useAuth()
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
    region: '',
    bio: '',
    specialty: '',
    experience_years: 0,
    company_name: '',
    business_registration: '',
    industry: '',
    company_size: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const userType = userProfile?.user_type as 'secretary' | 'client' | undefined

  // Load current profile data
  useEffect(() => {
    if (user && userProfile) {
      loadProfile()
    }
  }, [user, userProfile])

  const loadProfile = async () => {
    if (!user || !userProfile) return

    setLoading(true)
    setError('')

    try {
      if (userType === 'secretary') {
        const profile = await usersApi.getSecretaryProfile(user.id)
        setFormData({
          name: profile.users?.name || '',
          email: profile.users?.email || '',
          phone: profile.users?.phone || '',
          region: profile.region || '',
          bio: profile.bio || '',
          specialty: profile.specialty || '',
          experience_years: profile.experience_years || 0
        })
      } else if (userType === 'client') {
        const profile = await usersApi.getClientProfile(user.id)
        setFormData({
          name: profile.users?.name || '',
          email: profile.users?.email || '',
          phone: profile.users?.phone || '',
          company_name: profile.company_name || '',
          business_registration: profile.business_registration || '',
          region: profile.region || '',
          industry: profile.industry || '',
          company_size: profile.company_size || '',
          bio: profile.bio || ''
        })
      }
    } catch (err: any) {
      console.error('Failed to load profile:', err)
      setError(err.message || '프로필을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience_years' ? Number(value) : value
    }))
  }

  const handleSave = async () => {
    if (!user) {
      setError('로그인이 필요합니다.')
      return
    }

    setSaving(true)
    setError('')

    try {
      // Update user basic info
      await usersApi.updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      })

      // Update profile-specific info
      if (userType === 'secretary') {
        await usersApi.updateSecretaryProfile(user.id, {
          region: formData.region,
          bio: formData.bio,
          specialty: formData.specialty,
          experience_years: formData.experience_years
        })
      } else if (userType === 'client') {
        await usersApi.updateClientProfile(user.id, {
          company_name: formData.company_name,
          business_registration: formData.business_registration,
          region: formData.region,
          industry: formData.industry,
          company_size: formData.company_size,
          bio: formData.bio
        })
      }

      alert('프로필이 저장되었습니다.')
      navigate(-1)
    } catch (err: any) {
      console.error('Failed to save profile:', err)
      setError(err.message || '프로필 저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white">로그인이 필요합니다.</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF783B]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0F0F0F]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">프로필 수정</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </Card>
        )}
        {/* Profile Photo */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF783B] to-[#FF5722] rounded-full flex items-center justify-center shadow-xl shadow-[#FF783B]/30">
                <span className="text-3xl font-bold text-white">
                  {formData.name[0]}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#FF783B] rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-3">프로필 사진 변경</p>
          </div>
        </Card>

        {/* Basic Info */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#FF783B]" />
            기본 정보
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300 mb-2">이름</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-300 mb-2">연락처</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
              />
            </div>

            <div>
              <Label htmlFor="region" className="text-gray-300 mb-2">지역</Label>
              <Input
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                placeholder="예: 서울 강남구"
              />
            </div>
          </div>
        </Card>

        {/* Professional Info */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#FF783B]" />
            {userType === 'secretary' ? '전문 정보' : '회사 정보'}
          </h3>

          <div className="space-y-4">
            {userType === 'secretary' ? (
              <>
                <div>
                  <Label htmlFor="experience_years" className="text-gray-300 mb-2">경력 (년)</Label>
                  <Input
                    id="experience_years"
                    name="experience_years"
                    type="number"
                    value={formData.experience_years || ''}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                    placeholder="예: 5"
                  />
                </div>

                <div>
                  <Label htmlFor="specialty" className="text-gray-300 mb-2">전문 분야</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={formData.specialty || ''}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                    placeholder="예: 일정관리, 문서작성, 통역"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-gray-300 mb-2">자기소개</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    rows={4}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#FF783B] resize-none"
                    placeholder="자기소개를 작성해주세요..."
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="company_name" className="text-gray-300 mb-2">회사명</Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={formData.company_name || ''}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                    placeholder="예: (주)테크스타트업"
                  />
                </div>

                <div>
                  <Label htmlFor="business_registration" className="text-gray-300 mb-2">사업자등록번호</Label>
                  <Input
                    id="business_registration"
                    name="business_registration"
                    value={formData.business_registration || ''}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                    placeholder="예: 123-45-67890"
                  />
                </div>

                <div>
                  <Label htmlFor="industry" className="text-gray-300 mb-2">업종</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry || ''}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                    placeholder="예: IT/소프트웨어"
                  />
                </div>

                <div>
                  <Label htmlFor="company_size" className="text-gray-300 mb-2">회사 규모</Label>
                  <select
                    id="company_size"
                    name="company_size"
                    value={formData.company_size || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, company_size: e.target.value }))}
                    className="flex h-12 w-full rounded-md border border-[#2A2A2A] bg-[#0F0F0F] px-3 py-2 text-white focus:border-[#FF783B] focus:outline-none"
                  >
                    <option value="">선택하세요</option>
                    <option value="1-10명">1-10명</option>
                    <option value="10-50명">10-50명</option>
                    <option value="50-100명">50-100명</option>
                    <option value="100-500명">100-500명</option>
                    <option value="500명 이상">500명 이상</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-gray-300 mb-2">회사 소개</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    rows={4}
                    className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#FF783B] resize-none"
                    placeholder="회사 소개를 작성해주세요..."
                  />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#2A2A2A] p-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={saving}
            className="flex-1 h-12 bg-transparent border-2 border-[#2A2A2A] text-gray-300 hover:bg-[#1A1A1A] disabled:opacity-50"
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-bold shadow-lg shadow-[#FF783B]/20 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                저장 중...
              </>
            ) : (
              '저장'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
