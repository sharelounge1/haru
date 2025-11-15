import { useParams, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  Building,
  Users,
  Heart
} from 'lucide-react'

export default function JobDetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock job posting data
  const job = {
    id: id || '1',
    title: '스타트업 CEO 개인비서',
    company: 'Tech Startup Inc.',
    companyLogo: 'https://via.placeholder.com/80',
    region: '서울 강남구 테헤란로',
    salary: '월 400-500만원',
    period: '장기 (1년 이상)',
    workType: '풀타임',
    startDate: '즉시 또는 협의',
    postedDate: '2일 전',
    deadline: '2024.02.28',
    applicants: 12,
    views: 156,
    status: 'recruiting', // recruiting, closed
    categories: ['개인비서', '업무비서'],
    description: `빠르게 성장하는 IT 스타트업에서 함께할 전문 비서를 찾습니다.

CEO의 일정 관리부터 각종 업무 지원까지 폭넓은 역할을 담당하게 됩니다. 역동적인 스타트업 환경에서 성장하고 싶은 분들의 많은 지원 바랍니다.`,
    requirements: [
      '비서 관련 경력 3년 이상',
      '일정관리 및 문서작성 능력',
      '영어 커뮤니케이션 가능자 우대',
      '빠른 업무 처리 능력',
      '성실하고 책임감 있는 분'
    ],
    responsibilities: [
      'CEO 일정 관리 및 조율',
      '회의 준비 및 회의록 작성',
      '문서 작성 및 관리',
      '출장 동행 및 지원',
      '내/외부 커뮤니케이션 지원'
    ],
    preferredSkills: [
      '영어 회화 가능',
      'MS Office 능숙',
      '운전 가능자 우대',
      '경영학 전공자 우대'
    ],
    benefits: [
      '4대 보험 완비',
      '연차/월차 제공',
      '교육 지원',
      '중식 제공',
      '성과급 지급'
    ],
    workHours: {
      weekday: '09:00 - 18:00',
      weekend: '휴무',
      flexible: true
    },
    companyInfo: {
      name: 'Tech Startup Inc.',
      industry: 'IT/소프트웨어',
      employees: '50-100명',
      founded: '2020년',
      description: '혁신적인 IT 솔루션을 개발하는 빠르게 성장하는 스타트업입니다.'
    }
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
          <h1 className="text-lg font-bold text-white">공고 상세</h1>
          <button className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors">
            <Heart className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="pb-24">
        {/* Company Header */}
        <div className="px-4 py-6 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-[#2A2A2A] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Building className="w-8 h-8 text-[#FF783B]" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{job.title}</h2>
              <p className="text-gray-400 mb-2">{job.company}</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
                  {job.status === 'recruiting' ? '채용중' : '마감'}
                </Badge>
                <span className="text-sm text-gray-500">{job.postedDate}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {job.categories.map((cat) => (
              <Badge key={cat} variant="outline" className="border-[#2A2A2A] text-gray-300">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Info Cards */}
        <div className="px-4 py-6 space-y-4">
          {/* Key Info */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">근무지</p>
                  <p className="text-white">{job.region}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">급여</p>
                  <p className="text-white font-bold">{job.salary}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">근무기간</p>
                  <p className="text-white">{job.period}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">근무형태</p>
                  <p className="text-white">{job.workType}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">시작일</p>
                  <p className="text-white">{job.startDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FF783B]">{job.applicants}</p>
                <p className="text-sm text-gray-400 mt-1">지원자</p>
              </div>
              <div className="text-center border-x border-[#2A2A2A]">
                <p className="text-2xl font-bold text-[#FF783B]">{job.views}</p>
                <p className="text-sm text-gray-400 mt-1">조회수</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-400">마감일</p>
                <p className="text-sm text-white mt-1">{job.deadline}</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">공고 내용</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{job.description}</p>
          </Card>

          {/* Requirements */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">지원 자격</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Responsibilities */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">주요 업무</h3>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#FF783B] rounded-full mt-2 flex-shrink-0"></div>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Preferred Skills */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3">우대사항</h3>
            <div className="flex flex-wrap gap-2">
              {job.preferredSkills.map((skill, index) => (
                <Badge key={index} className="bg-[#FF783B]/10 text-[#FF783B] border border-[#FF783B]/30">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Benefits */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF783B]" />
              복리후생
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#FF783B] flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Work Hours */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF783B]" />
              근무시간
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">평일</span>
                <span className="text-white">{job.workHours.weekday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">주말</span>
                <span className="text-white">{job.workHours.weekend}</span>
              </div>
              {job.workHours.flexible && (
                <div className="mt-2 p-2 bg-[#FF783B]/10 border border-[#FF783B]/30 rounded-lg">
                  <p className="text-sm text-[#FF783B]">✓ 유연근무제 가능</p>
                </div>
              )}
            </div>
          </Card>

          {/* Company Info */}
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-[#FF783B]" />
              회사 정보
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-1">회사명</p>
                <p className="text-white">{job.companyInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">업종</p>
                <p className="text-white">{job.companyInfo.industry}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-400 mb-1">직원수</p>
                  <p className="text-white">{job.companyInfo.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">설립년도</p>
                  <p className="text-white">{job.companyInfo.founded}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">회사 소개</p>
                <p className="text-gray-300">{job.companyInfo.description}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F0F0F] border-t border-[#2A2A2A] p-4">
        {job.status === 'recruiting' ? (
          <Button className="w-full h-12 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white font-bold shadow-lg shadow-[#FF783B]/20">
            <Users className="w-5 h-5 mr-2" />
            지원하기
          </Button>
        ) : (
          <Button disabled className="w-full h-12 bg-gray-600 text-gray-300">
            마감된 공고입니다
          </Button>
        )}
      </div>
    </div>
  )
}
