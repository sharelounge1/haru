import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Search, FileText, Shield, Star, MapPin, Award, Heart, Sparkles, Briefcase, Users } from 'lucide-react'

// User type: 'client' | 'secretary' | 'guest'
type UserType = 'client' | 'secretary' | 'guest'

export default function UnifiedHomeScreen() {
  // Mock user data - in real app, this would come from auth context
  const [userType, setUserType] = useState<UserType>('guest')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const user = {
    name: '김철수',
    verifications: {
      identity: true,
      business: true,
      revenue: false,
      salary: false,
    }
  }

  // Mock popular secretaries for carousel
  const popularSecretaries = [
    {
      id: 'p1',
      name: '서윤',
      age: 26,
      region: '서울 강남',
      category: '개인비서',
      rating: 4.9,
      reviewCount: 127,
      image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=400&h=400&fit=crop'
    },
    {
      id: 'p2',
      name: '지우',
      age: 28,
      region: '서울 서초',
      category: '업무비서',
      rating: 4.8,
      reviewCount: 98,
      image: 'https://images.unsplash.com/photo-1614108935583-5c7b4e4c497d?w=400&h=400&fit=crop'
    },
    {
      id: 'p3',
      name: '하은',
      age: 25,
      region: '서울 송파',
      category: '출장비서',
      rating: 5.0,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=400&h=400&fit=crop'
    }
  ]

  // Mock job postings for secretaries
  const jobPostings = [
    {
      id: 'j1',
      title: '스타트업 CEO 개인비서',
      company: 'Tech Startup',
      region: '서울 강남구',
      salary: '월 400-500만원',
      period: '장기',
      posted: '2일 전'
    },
    {
      id: 'j2',
      title: '중견기업 임원 업무비서',
      company: 'ABC Corporation',
      region: '서울 서초구',
      salary: '월 450-550만원',
      period: '장기',
      posted: '5일 전'
    },
    {
      id: 'j3',
      title: '출장동행 비서',
      company: 'Global Trading',
      region: '서울 전지역',
      salary: '건당 협의',
      period: '단기',
      posted: '1주 전'
    }
  ]

  const verificationCount = Object.values(user.verifications).filter(v => v).length
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popularSecretaries.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [popularSecretaries.length])

  // Render different content based on user type
  const renderMainActions = () => {
    if (userType === 'client' || userType === 'guest') {
      return (
        <div className="px-4 py-6 bg-[#0F0F0F]">
          <div className="space-y-6">
            <Link to={isLoggedIn ? "/search" : "/login"}>
              <Button className="w-full h-14 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white text-lg font-bold shadow-lg shadow-[#FF783B]/20 hover:shadow-xl hover:shadow-[#FF783B]/30 transition-all active:scale-98 rounded-2xl">
                <Search className="w-5 h-5 mr-2" />
                나에게 맞는 비서 찾기
              </Button>
            </Link>

            <Link to={isLoggedIn ? "/jobs/create" : "/login"}>
              <Button
                variant="outline"
                className="w-full h-14 bg-transparent border-2 border-[#FF783B] text-[#FF783B] text-lg font-bold hover:bg-[#FF783B]/10 transition-all active:scale-98 rounded-2xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                나에게 필요한 하루 비서 구인하기
              </Button>
            </Link>
          </div>
        </div>
      )
    } else {
      // Secretary view
      return (
        <div className="px-4 py-6 bg-[#0F0F0F]">
          <div className="space-y-6">
            <Link to={isLoggedIn ? "/jobs" : "/login"}>
              <Button className="w-full h-14 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white text-lg font-bold shadow-lg shadow-[#FF783B]/20 hover:shadow-xl hover:shadow-[#FF783B]/30 transition-all active:scale-98 rounded-2xl">
                <Briefcase className="w-5 h-5 mr-2" />
                구인 공고 찾기
              </Button>
            </Link>

            <Link to={isLoggedIn ? "/clients" : "/login"}>
              <Button
                variant="outline"
                className="w-full h-14 bg-transparent border-2 border-[#FF783B] text-[#FF783B] text-lg font-bold hover:bg-[#FF783B]/10 transition-all active:scale-98 rounded-2xl"
              >
                <Users className="w-5 h-5 mr-2" />
                나에게 맞는 경영자 찾기
              </Button>
            </Link>
          </div>
        </div>
      )
    }
  }

  return (
    <MobileLayout type={userType === 'secretary' ? 'secretary' : 'client'}>
      <div className="bg-[#0F0F0F] min-h-screen">
        {/* Header with dark background */}
        <div className="bg-[#0F0F0F]">
          <div className="px-4 pt-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {isLoggedIn ? `${user.name}님` : '하루비서'}
                </h1>
                <p className="text-gray-400 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#FF783B]" />
                  {isLoggedIn ? '오늘도 좋은 인연을 만들어보세요' : '로그인하고 더 많은 기능을 사용하세요'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isLoggedIn && (
                  <Link to="/login">
                    <Button size="sm" className="bg-[#FF783B] hover:bg-[#FF783B]/90 text-white h-9">
                      로그인
                    </Button>
                  </Link>
                )}
                <button className="relative p-2 bg-[#1A1A1A] rounded-full border border-[#2A2A2A]">
                  <Bell className="w-6 h-6 text-gray-300" />
                  {isLoggedIn && <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF783B] rounded-full"></span>}
                </button>
              </div>
            </div>

            {/* User Type Switcher (for demo) */}
            {isLoggedIn && (
              <div className="mb-4 p-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
                <p className="text-xs text-gray-400 mb-2">권한 전환</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setUserType('client')}
                    className={`flex-1 h-8 ${userType === 'client' ? 'bg-[#FF783B] text-white' : 'bg-[#0F0F0F] text-gray-400 border border-[#2A2A2A]'}`}
                  >
                    경영자
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setUserType('secretary')}
                    className={`flex-1 h-8 ${userType === 'secretary' ? 'bg-[#FF783B] text-white' : 'bg-[#0F0F0F] text-gray-400 border border-[#2A2A2A]'}`}
                  >
                    비서
                  </Button>
                </div>
              </div>
            )}

            {/* Verification Badges (for logged in clients) */}
            {isLoggedIn && userType === 'client' && (
              <div className="flex gap-2 flex-wrap">
                {user.verifications.identity && (
                  <Badge variant="secondary" className="text-xs bg-[#1A1A1A] text-gray-300 border border-[#2A2A2A]">
                    <Shield className="w-3 h-3 mr-1" />
                    본인인증
                  </Badge>
                )}
                {user.verifications.business && (
                  <Badge variant="secondary" className="text-xs bg-[#1A1A1A] text-gray-300 border border-[#2A2A2A]">
                    <Award className="w-3 h-3 mr-1" />
                    사업자
                  </Badge>
                )}
                {verificationCount < 4 && (
                  <Badge variant="outline" className="text-xs text-[#FF783B] border-[#FF783B] bg-[#FF783B]/10">
                    +{4 - verificationCount}개 더 인증하기
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Alert for incomplete verification (clients only) */}
          {isLoggedIn && userType === 'client' && verificationCount < 4 && (
            <div className="mx-4 mb-4 p-4 bg-[#1A1A1A] border border-[#FF783B]/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">인증으로 신뢰도 UP!</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    추가 인증 완료 시 더 많은 전문 비서에게 노출됩니다
                  </p>
                  <Link to="/my/verifications">
                    <Button size="sm" className="bg-[#FF783B] text-white border-0 h-8 hover:bg-[#FF783B]/90">
                      인증하러 가기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Popular Secretaries Carousel (for clients/guest) or Job Postings (for secretaries) */}
        {userType === 'client' || userType === 'guest' ? (
          <div className="py-6 bg-[#0F0F0F]">
            <div className="px-4 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#FF783B] fill-[#FF783B]" />
                인기 비서
              </h2>
              <div className="flex gap-1">
                {popularSecretaries.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentIndex % popularSecretaries.length
                        ? 'w-6 bg-[#FF783B]'
                        : 'w-1.5 bg-[#2A2A2A]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {popularSecretaries.map((secretary) => (
                  <Link
                    key={secretary.id}
                    to={isLoggedIn ? `/search/${secretary.id}/preview` : '/login'}
                    className="flex-shrink-0 w-44 snap-start"
                  >
                    <Card className="overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A] shadow-xl hover:shadow-2xl hover:border-[#FF783B]/50 transition-all active:scale-95">
                      <div className="relative">
                        <img
                          src={secretary.image}
                          alt={secretary.name}
                          className="w-full h-56 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#FF783B] text-[#FF783B]" />
                          <span className="text-xs font-bold text-white">{secretary.rating}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                          <h3 className="text-white font-bold text-lg">{secretary.name}</h3>
                          <p className="text-gray-300 text-xs">{secretary.age}세 • {secretary.region}</p>
                        </div>
                      </div>
                      <div className="p-3">
                        <Badge className="text-xs bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
                          {secretary.category}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-2">리뷰 {secretary.reviewCount}개</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Job Postings for secretaries
          <div className="py-6 bg-[#0F0F0F]">
            <div className="px-4 mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#FF783B]" />
                추천 구인 공고
              </h2>
            </div>

            <div className="px-4 space-y-3">
              {jobPostings.map((job) => (
                <Link key={job.id} to={isLoggedIn ? `/jobs/${job.id}` : '/login'}>
                  <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4 hover:border-[#FF783B]/50 transition-all active:scale-98">
                    <h3 className="text-white font-bold mb-2">{job.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="text-xs bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30">
                        {job.region}
                      </Badge>
                      <Badge className="text-xs bg-[#1A1A1A] text-gray-300 border border-[#2A2A2A]">
                        {job.salary}
                      </Badge>
                      <Badge className="text-xs bg-[#1A1A1A] text-gray-300 border border-[#2A2A2A]">
                        {job.period}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{job.posted}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Action Buttons */}
        {renderMainActions()}

        {/* Guest Login Prompt */}
        {!isLoggedIn && (
          <div className="px-4 pb-6">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#FF783B]/30 p-6">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-[#FF783B] mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">더 많은 기능을 사용하세요</h3>
                <p className="text-gray-400 text-sm mb-4">
                  로그인하고 완벽한 매칭을 경험하세요
                </p>
                <div className="flex gap-3">
                  <Link to="/login" className="flex-1">
                    <Button className="w-full bg-[#FF783B] hover:bg-[#FF783B]/90 text-white">
                      로그인
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button variant="outline" className="w-full border-[#FF783B] text-[#FF783B] hover:bg-[#FF783B]/10">
                      회원가입
                    </Button>
                  </Link>
                </div>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="mt-4 text-xs text-gray-500 hover:text-gray-400"
                >
                  (데모: 로그인 상태로 전환)
                </button>
              </div>
            </Card>
          </div>
        )}

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </MobileLayout>
  )
}
