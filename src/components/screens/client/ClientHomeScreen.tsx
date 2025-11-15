import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Search, FileText, Shield, Star, MapPin, Award, Heart, Sparkles } from 'lucide-react'

export default function ClientHomeScreen() {
  // Mock user data
  const user = {
    name: '김철수',
    verifications: {
      identity: true,
      business: true,
      revenue: false,
      salary: false,
    }
  }

  // Mock popular secretaries for carousel - Korean women
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
    },
    {
      id: 'p4',
      name: '채원',
      age: 27,
      region: '서울 역삼',
      category: '개인비서',
      rating: 4.9,
      reviewCount: 143,
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=400&fit=crop'
    },
    {
      id: 'p5',
      name: '민서',
      age: 29,
      region: '서울 삼성',
      category: '업무비서',
      rating: 4.8,
      reviewCount: 112,
      image: 'https://images.unsplash.com/photo-1601582589907-f92af5ed9db8?w=400&h=400&fit=crop'
    }
  ]

  // Mock recommended secretaries - Korean women
  const recommendedSecretaries = [
    {
      id: '1',
      name: '김소희',
      age: 32,
      region: '서울 강남구',
      categories: ['업무비서', '출장비서'],
      rating: 4.8,
      reviewCount: 24,
      image: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: '박예린',
      age: 28,
      region: '서울 서초구',
      categories: ['출장비서'],
      rating: 4.9,
      reviewCount: 18,
      image: 'https://images.unsplash.com/photo-1600275669439-14e40452d20b?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: '이서연',
      age: 30,
      region: '서울 송파구',
      categories: ['개인비서', '업무비서'],
      rating: 4.7,
      reviewCount: 31,
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      name: '최유나',
      age: 26,
      region: '서울 역삼동',
      categories: ['개인비서'],
      rating: 4.9,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=400&h=400&fit=crop'
    }
  ]

  const verificationCount = Object.values(user.verifications).filter(v => v).length

  // Auto-scroll carousel
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popularSecretaries.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [popularSecretaries.length])

  return (
    <MobileLayout type="client">
      <div className="bg-[#0F0F0F] min-h-screen">
      {/* Header with dark background */}
      <div className="bg-[#0F0F0F]">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {user.name}님
              </h1>
              <p className="text-gray-400 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#FF783B]" />
                오늘도 좋은 인연을 만들어보세요
              </p>
            </div>
            <button className="relative p-2 bg-[#1A1A1A] rounded-full border border-[#2A2A2A]">
              <Bell className="w-6 h-6 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF783B] rounded-full"></span>
            </button>
          </div>

          {/* Verification Badges */}
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
        </div>

        {/* Alert for incomplete verification */}
        {verificationCount < 4 && (
          <div className="mx-4 mb-4 p-4 bg-[#1A1A1A] border border-[#FF783B]/30 rounded-2xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#FF783B] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">인증으로 신뢰도 UP!</h3>
                <p className="text-sm text-gray-400 mb-3">
                  추가 인증 완료 시 더 많은 전문 비서에게 노출됩니다
                </p>
                <Link to="/client/my/verifications">
                  <Button size="sm" className="bg-[#FF783B] text-white border-0 h-8 hover:bg-[#FF783B]/90">
                    인증하러 가기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popular Secretaries Carousel */}
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

        {/* Horizontal scrollable carousel */}
        <div className="relative">
          <div
            className="flex gap-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth'
            }}
          >
            {popularSecretaries.map((secretary) => (
              <Link
                key={secretary.id}
                to={`/client/search/${secretary.id}/preview`}
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

      {/* CTA Buttons */}
      <div className="px-4 py-6 bg-[#0F0F0F]">
        <div className="space-y-6">
          <Link to="/client/search">
            <Button className="w-full h-14 bg-[#FF783B] hover:bg-[#FF783B]/90 text-white text-lg font-bold shadow-lg shadow-[#FF783B]/20 hover:shadow-xl hover:shadow-[#FF783B]/30 transition-all active:scale-98 rounded-2xl">
              <Search className="w-5 h-5 mr-2" />
              나에게 맞는 비서 찾기
            </Button>
          </Link>

          <Link to="/client/jobs/create">
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

      {/* Recommended Secretaries */}
      <div className="px-4 py-6 bg-[#0F0F0F]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF783B]" />
            추천 비서
          </h2>
          <Link to="/client/search" className="text-sm text-[#FF783B] font-medium">
            더보기
          </Link>
        </div>

        <div className="space-y-4">
          {recommendedSecretaries.map((secretary) => (
            <Link key={secretary.id} to={`/client/search/${secretary.id}/preview`}>
              <Card className="overflow-hidden hover:shadow-xl hover:shadow-[#FF783B]/10 transition-all active:scale-98 border border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#FF783B]/50 shadow-lg rounded-2xl">
                <div className="flex gap-4 p-4">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={secretary.image}
                      alt={secretary.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#FF783B] rounded-full p-1.5 shadow-lg">
                      <Heart className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">{secretary.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <span>{secretary.age}세</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {secretary.region}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#FF783B]/20 px-2 py-1 rounded-full border border-[#FF783B]/30">
                        <Star className="w-4 h-4 fill-[#FF783B] text-[#FF783B]" />
                        <span className="text-sm font-bold text-[#FF783B]">{secretary.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 flex-wrap mb-2">
                      {secretary.categories.map((cat) => (
                        <Badge
                          key={cat}
                          className="text-xs bg-[#FF783B]/20 text-[#FF783B] border border-[#FF783B]/30"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500">리뷰 {secretary.reviewCount}개</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

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
