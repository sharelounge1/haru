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

  // Mock popular secretaries for carousel
  const popularSecretaries = [
    {
      id: 'p1',
      name: '지수',
      age: 26,
      region: '서울 강남',
      category: '개인비서',
      rating: 4.9,
      reviewCount: 127,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      id: 'p2',
      name: '민아',
      age: 28,
      region: '서울 서초',
      category: '업무비서',
      rating: 4.8,
      reviewCount: 98,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
    },
    {
      id: 'p3',
      name: '수진',
      age: 25,
      region: '서울 송파',
      category: '출장비서',
      rating: 5.0,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
    },
    {
      id: 'p4',
      name: '혜원',
      age: 27,
      region: '서울 역삼',
      category: '개인비서',
      rating: 4.9,
      reviewCount: 143,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
    },
    {
      id: 'p5',
      name: '서연',
      age: 29,
      region: '서울 삼성',
      category: '업무비서',
      rating: 4.8,
      reviewCount: 112,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    }
  ]

  // Mock recommended secretaries
  const recommendedSecretaries = [
    {
      id: '1',
      name: '김영희',
      age: 32,
      region: '서울 강남구',
      categories: ['업무비서', '출장비서'],
      rating: 4.8,
      reviewCount: 24,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: '박지수',
      age: 28,
      region: '서울 서초구',
      categories: ['출장비서'],
      rating: 4.9,
      reviewCount: 18,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: '이민지',
      age: 30,
      region: '서울 송파구',
      categories: ['개인비서', '업무비서'],
      rating: 4.7,
      reviewCount: 31,
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      name: '최서연',
      age: 26,
      region: '서울 역삼동',
      categories: ['개인비서'],
      rating: 4.9,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop'
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
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {user.name}님
              </h1>
              <p className="text-gray-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                오늘도 좋은 인연을 만들어보세요
              </p>
            </div>
            <button className="relative p-2 bg-white rounded-full shadow-sm">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Verification Badges */}
          <div className="flex gap-2 flex-wrap">
            {user.verifications.identity && (
              <Badge variant="secondary" className="text-xs bg-white/80 backdrop-blur">
                <Shield className="w-3 h-3 mr-1" />
                본인인증
              </Badge>
            )}
            {user.verifications.business && (
              <Badge variant="secondary" className="text-xs bg-white/80 backdrop-blur">
                <Award className="w-3 h-3 mr-1" />
                사업자
              </Badge>
            )}
            {verificationCount < 4 && (
              <Badge variant="outline" className="text-xs text-purple-600 border-purple-400 bg-white/60 backdrop-blur">
                +{4 - verificationCount}개 더 인증하기
              </Badge>
            )}
          </div>
        </div>

        {/* Alert for incomplete verification */}
        {verificationCount < 4 && (
          <div className="mx-4 mb-4 p-4 bg-white/80 backdrop-blur border border-purple-200 rounded-2xl shadow-sm">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-purple-900 mb-1">인증으로 신뢰도 UP!</h3>
                <p className="text-sm text-purple-800 mb-3">
                  추가 인증 완료 시 더 많은 전문 비서에게 노출됩니다
                </p>
                <Link to="/client/my/verifications">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 h-8 hover:from-purple-700 hover:to-pink-700">
                    인증하러 가기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popular Secretaries Carousel */}
      <div className="py-6 bg-white">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            인기 비서
          </h2>
          <div className="flex gap-1">
            {popularSecretaries.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex % popularSecretaries.length
                    ? 'w-6 bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'w-1.5 bg-gray-300'
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
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all active:scale-95">
                  <div className="relative">
                    <img
                      src={secretary.image}
                      alt={secretary.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold">{secretary.rating}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <h3 className="text-white font-bold text-lg">{secretary.name}</h3>
                      <p className="text-white/90 text-xs">{secretary.age}세 • {secretary.region}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <Badge className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-0">
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
      <div className="px-4 py-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="space-y-3">
          <Link to="/client/search">
            <Button className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-98 rounded-2xl">
              <Search className="w-5 h-5 mr-2" />
              나에게 맞는 비서 찾기
            </Button>
          </Link>

          <Link to="/client/jobs/create">
            <Button
              variant="outline"
              className="w-full h-14 bg-white border-2 border-purple-300 text-purple-700 text-lg font-bold hover:bg-purple-50 transition-all active:scale-98 rounded-2xl"
            >
              <FileText className="w-5 h-5 mr-2" />
              나에게 필요한 하루 비서 구인하기
            </Button>
          </Link>
        </div>
      </div>

      {/* Recommended Secretaries */}
      <div className="px-4 py-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            추천 비서
          </h2>
          <Link to="/client/search" className="text-sm text-purple-600 font-medium">
            더보기
          </Link>
        </div>

        <div className="space-y-4">
          {recommendedSecretaries.map((secretary) => (
            <Link key={secretary.id} to={`/client/search/${secretary.id}/preview`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all active:scale-98 border-0 shadow-md rounded-2xl">
                <div className="flex gap-4 p-4">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={secretary.image}
                      alt={secretary.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                      <Heart className="w-4 h-4 text-pink-500" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{secretary.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <span>{secretary.age}세</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {secretary.region}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold">{secretary.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 flex-wrap mb-2">
                      {secretary.categories.map((cat) => (
                        <Badge
                          key={cat}
                          className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0"
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
    </MobileLayout>
  )
}
