import { useParams, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  Heart,
  MessageCircle,
  Shield,
  CheckCircle
} from 'lucide-react'

export default function SecretaryDetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock secretary data
  const secretary = {
    id: id || '1',
    name: '김소희',
    age: 32,
    gender: '여성',
    region: '서울 강남구',
    image: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=800&h=800&fit=crop',
    rating: 4.8,
    reviewCount: 24,
    completedJobs: 127,
    experience: '5년',
    categories: ['업무비서', '출장비서'],
    specialties: ['문서작성', '일정관리', '통역', '회의준비'],
    hourlyRate: '50,000원',
    introduction: '안녕하세요. 5년간 다양한 업종의 경영자분들과 함께 일해온 전문 비서입니다. 꼼꼼한 일정관리와 신속한 업무처리가 강점입니다.',
    education: '서울대학교 경영학과 졸업',
    languages: ['한국어(원어민)', '영어(상급)', '일본어(중급)'],
    certifications: ['비서자격증 1급', 'TOEIC 950점', 'MOS Master'],
    availability: {
      weekday: true,
      weekend: false,
      fulltime: true,
      parttime: true
    },
    verifications: {
      identity: true,
      background: true,
      education: true
    }
  }

  const reviews = [
    {
      id: '1',
      clientName: '박대표',
      rating: 5.0,
      date: '2024.01.15',
      comment: '매우 꼼꼼하고 프로페셔널한 업무처리에 감탄했습니다. 다시 함께 일하고 싶습니다.',
      period: '3개월'
    },
    {
      id: '2',
      clientName: '이사장',
      rating: 4.8,
      date: '2024.01.08',
      comment: '일정관리와 문서작성 능력이 뛰어납니다. 적극 추천합니다.',
      period: '2개월'
    },
    {
      id: '3',
      clientName: '최CEO',
      rating: 4.5,
      date: '2023.12.20',
      comment: '성실하고 책임감 있게 업무를 처리해주셨습니다.',
      period: '1개월'
    }
  ]

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
          <h1 className="text-lg font-bold text-white">비서 프로필</h1>
          <button className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors">
            <Heart className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="pb-24">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-80 overflow-hidden">
            <img
              src={secretary.image}
              alt={secretary.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{secretary.name}</h2>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <span>{secretary.age}세</span>
                  <span>•</span>
                  <span>{secretary.gender}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {secretary.region}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#FF783B]/20 px-3 py-1 rounded-full border border-[#FF783B]/30">
                    <Star className="w-4 h-4 fill-[#FF783B] text-[#FF783B]" />
                    <span className="text-sm font-bold text-white">{secretary.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">리뷰 {secretary.reviewCount}개</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 space-y-4">
          {/* Categories */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#FF783B]" />
              전문분야
            </h3>
            <div className="flex flex-wrap gap-2">
              {secretary.categories.map((cat) => (
                <Badge key={cat} className="bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
                  {cat}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FF783B]">{secretary.experience}</p>
                <p className="text-sm text-gray-400 mt-1">경력</p>
              </div>
              <div className="text-center border-x border-[#2A2A2A]">
                <p className="text-2xl font-bold text-[#FF783B]">{secretary.completedJobs}</p>
                <p className="text-sm text-gray-400 mt-1">완료업무</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FF783B]">{secretary.hourlyRate}</p>
                <p className="text-sm text-gray-400 mt-1">시급</p>
              </div>
            </div>
          </Card>

          {/* Verifications */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#FF783B]" />
              인증 배지
            </h3>
            <div className="space-y-2">
              {secretary.verifications.identity && (
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#FF783B]" />
                  <span>본인인증 완료</span>
                </div>
              )}
              {secretary.verifications.background && (
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#FF783B]" />
                  <span>신원조회 완료</span>
                </div>
              )}
              {secretary.verifications.education && (
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#FF783B]" />
                  <span>학력인증 완료</span>
                </div>
              )}
            </div>
          </Card>

          {/* Introduction */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">자기소개</h3>
            <p className="text-gray-300 leading-relaxed">{secretary.introduction}</p>
          </Card>

          {/* Specialties */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">전문기술</h3>
            <div className="flex flex-wrap gap-2">
              {secretary.specialties.map((skill) => (
                <Badge key={skill} variant="outline" className="border-[#2A2A2A] text-gray-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Education & Languages */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">학력 및 언어</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-1">학력</p>
                <p className="text-gray-300">{secretary.education}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">언어</p>
                <div className="flex flex-wrap gap-2">
                  {secretary.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="border-[#2A2A2A] text-gray-300">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Certifications */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF783B]" />
              자격증
            </h3>
            <ul className="space-y-2">
              {secretary.certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full"></div>
                  {cert}
                </li>
              ))}
            </ul>
          </Card>

          {/* Availability */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FF783B]" />
              근무 가능 시간
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${secretary.availability.weekday ? 'bg-[#FF783B]/10 border-[#FF783B]/30' : 'bg-[#0F0F0F] border-[#2A2A2A]'}`}>
                <p className={`text-sm font-medium ${secretary.availability.weekday ? 'text-[#FF783B]' : 'text-gray-500'}`}>평일</p>
              </div>
              <div className={`p-3 rounded-lg border ${secretary.availability.weekend ? 'bg-[#FF783B]/10 border-[#FF783B]/30' : 'bg-[#0F0F0F] border-[#2A2A2A]'}`}>
                <p className={`text-sm font-medium ${secretary.availability.weekend ? 'text-[#FF783B]' : 'text-gray-500'}`}>주말</p>
              </div>
              <div className={`p-3 rounded-lg border ${secretary.availability.fulltime ? 'bg-[#FF783B]/10 border-[#FF783B]/30' : 'bg-[#0F0F0F] border-[#2A2A2A]'}`}>
                <p className={`text-sm font-medium ${secretary.availability.fulltime ? 'text-[#FF783B]' : 'text-gray-500'}`}>풀타임</p>
              </div>
              <div className={`p-3 rounded-lg border ${secretary.availability.parttime ? 'bg-[#FF783B]/10 border-[#FF783B]/30' : 'bg-[#0F0F0F] border-[#2A2A2A]'}`}>
                <p className={`text-sm font-medium ${secretary.availability.parttime ? 'text-[#FF783B]' : 'text-gray-500'}`}>파트타임</p>
              </div>
            </div>
          </Card>

          {/* Reviews */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FF783B]" />
                리뷰 ({secretary.reviewCount})
              </h3>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-[#FF783B] text-[#FF783B]" />
                <span className="text-xl font-bold text-white">{secretary.rating}</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="pb-4 border-b border-[#2A2A2A] last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white font-medium">{review.clientName}</p>
                      <p className="text-xs text-gray-500">{review.date} • {review.period} 근무</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FF783B] text-[#FF783B]" />
                      <span className="text-sm font-bold text-white">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#2A2A2A] p-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 bg-transparent border-2 border-[#FF783B] text-[#FF783B] hover:bg-[#FF783B]/10"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            메시지 보내기
          </Button>
          <Button className="flex-1 h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-bold shadow-lg shadow-[#FF783B]/20">
            채용 제안하기
          </Button>
        </div>
      </div>
    </div>
  )
}
