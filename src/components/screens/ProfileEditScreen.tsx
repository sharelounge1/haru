import { useState } from 'react'
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
  Briefcase
} from 'lucide-react'

export default function ProfileEditScreen() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '김철수',
    email: 'user@example.com',
    phone: '010-1234-5678',
    region: '서울 강남구',
    bio: '안녕하세요. 전문 비서로 5년간 근무한 경험이 있습니다.',
    specialty: '일정관리, 문서작성, 통역',
    education: '서울대학교 경영학과',
    experience: '5년'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // TODO: Implement save logic
    alert('프로필이 저장되었습니다.')
    navigate(-1)
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
            전문 정보
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="experience" className="text-gray-300 mb-2">경력</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                placeholder="예: 5년"
              />
            </div>

            <div>
              <Label htmlFor="specialty" className="text-gray-300 mb-2">전문 분야</Label>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                placeholder="예: 일정관리, 문서작성, 통역"
              />
            </div>

            <div>
              <Label htmlFor="education" className="text-gray-300 mb-2">학력</Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white h-12 focus:border-[#FF783B]"
                placeholder="예: 서울대학교 경영학과"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-gray-300 mb-2">자기소개</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="bg-[#0F0F0F] border-[#2A2A2A] text-white focus:border-[#FF783B] resize-none"
                placeholder="자기소개를 작성해주세요..."
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#2A2A2A] p-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 h-12 bg-transparent border-2 border-[#2A2A2A] text-gray-300 hover:bg-[#1A1A1A]"
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-bold shadow-lg shadow-[#FF783B]/20"
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
