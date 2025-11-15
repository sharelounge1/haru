import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MobileLayout from '@/components/layout/MobileLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Search, FileText, Shield, Star, MapPin, Award, TrendingUp, Users } from 'lucide-react'

export default function ClientHomeScreenAlt() {
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

  // Mock featured secretaries - Premium feel
  const featuredSecretaries = [
    {
      id: 'f1',
      name: '박서현',
      age: 29,
      region: '서울 강남',
      category: 'Executive 비서',
      rating: 4.9,
      reviewCount: 89,
      experience: '5년+',
      image: 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=400&h=400&fit=crop',
      verified: true
    },
    {
      id: 'f2',
      name: '이지원',
      age: 31,
      region: '서울 서초',
      category: 'Business 비서',
      rating: 5.0,
      reviewCount: 124,
      experience: '7년+',
      image: 'https://images.unsplash.com/photo-1600275669439-14e40452d20b?w=400&h=400&fit=crop',
      verified: true
    },
    {
      id: 'f3',
      name: '최유진',
      age: 28,
      region: '서울 송파',
      category: 'Premium 비서',
      rating: 4.8,
      reviewCount: 67,
      experience: '4년+',
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=400&h=400&fit=crop',
      verified: true
    }
  ]

  // Mock recommended secretaries
  const recommendedSecretaries = [
    {
      id: '1',
      name: '강민지',
      age: 30,
      region: '서울 강남구',
      categories: ['Executive 비서'],
      rating: 4.9,
      reviewCount: 45,
      experience: '6년+',
      image: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=400&h=400&fit=crop',
      verified: true
    },
    {
      id: '2',
      name: '윤서아',
      age: 27,
      region: '서울 서초구',
      categories: ['Business 비서'],
      rating: 4.8,
      reviewCount: 32,
      experience: '3년+',
      image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=400&h=400&fit=crop',
      verified: true
    },
    {
      id: '3',
      name: '정하연',
      age: 32,
      region: '서울 역삼',
      categories: ['Premium 비서'],
      rating: 5.0,
      reviewCount: 58,
      experience: '8년+',
      image: 'https://images.unsplash.com/photo-1614108935583-5c7b4e4c497d?w=400&h=400&fit=crop',
      verified: true
    }
  ]

  const verificationCount = Object.values(user.verifications).filter(v => v).length

  // Auto-scroll carousel
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredSecretaries.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredSecretaries.length])

  return (
    <MobileLayout type="client">
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {/* Header with premium feel */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-b border-slate-700/50">
          <div className="px-5 pt-8 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Welcome back,</p>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {user.name}
                </h1>
              </div>
              <button className="relative p-2.5 bg-slate-800 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-900"></span>
              </button>
            </div>

            {/* Verification Status */}
            <div className="flex gap-2 flex-wrap mb-4">
              {user.verifications.identity && (
                <Badge className="text-xs bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {user.verifications.business && (
                <Badge className="text-xs bg-blue-950 text-blue-300 border border-blue-800 hover:bg-blue-900">
                  <Award className="w-3 h-3 mr-1" />
                  Business
                </Badge>
              )}
              {verificationCount < 4 && (
                <Badge className="text-xs text-blue-400 border-blue-500 bg-blue-950/50 hover:bg-blue-950">
                  +{4 - verificationCount} More
                </Badge>
              )}
            </div>

            {/* Premium verification CTA */}
            {verificationCount < 4 && (
              <div className="p-4 bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border border-blue-900/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Unlock Premium Access</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      Complete verification to access top-tier professionals
                    </p>
                    <Link to="/client/my/verifications">
                      <Button size="sm" className="bg-blue-600 text-white border-0 h-9 hover:bg-blue-700 font-medium">
                        Complete Verification
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured Professionals Carousel */}
        <div className="py-6 bg-slate-900">
          <div className="px-5 mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Featured Professionals
            </h2>
            <div className="flex gap-1.5">
              {featuredSecretaries.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentIndex % featuredSecretaries.length
                      ? 'w-6 bg-blue-500'
                      : 'w-1.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Horizontal scrollable carousel */}
          <div className="relative">
            <div className="flex gap-4 px-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {featuredSecretaries.map((secretary) => (
                <Link
                  key={secretary.id}
                  to={`/client/search/${secretary.id}/preview`}
                  className="flex-shrink-0 w-72 snap-start"
                >
                  <Card className="overflow-hidden border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 hover:border-blue-600/50 transition-all active:scale-98">
                    <div className="flex gap-4 p-4">
                      {/* Profile Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={secretary.image}
                          alt={secretary.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        {secretary.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-white">{secretary.name}</h3>
                            <p className="text-xs text-slate-400">{secretary.age}세 • {secretary.region}</p>
                          </div>
                        </div>
                        <Badge className="text-xs bg-blue-950 text-blue-300 border border-blue-800 mb-2">
                          {secretary.category}
                        </Badge>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-blue-400 text-blue-400" />
                            <span className="text-white font-medium">{secretary.rating}</span>
                            <span>({secretary.reviewCount})</span>
                          </div>
                          <span>•</span>
                          <span>{secretary.experience}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="px-5 py-6 bg-slate-900">
          <div className="space-y-3">
            <Link to="/client/search">
              <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/60 transition-all active:scale-98 rounded-xl">
                <Search className="w-5 h-5 mr-2" />
                Find Your Perfect Match
              </Button>
            </Link>

            <Link to="/client/jobs/create">
              <Button
                variant="outline"
                className="w-full h-14 bg-slate-800 border-2 border-slate-600 text-slate-200 text-base font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all active:scale-98 rounded-xl"
              >
                <FileText className="w-5 h-5 mr-2" />
                Post a Position
              </Button>
            </Link>
          </div>
        </div>

        {/* Recommended Professionals */}
        <div className="px-5 py-6 bg-slate-900">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">Recommended for You</h2>
            <Link to="/client/search" className="text-sm text-blue-400 font-medium hover:text-blue-300">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedSecretaries.map((secretary) => (
              <Link key={secretary.id} to={`/client/search/${secretary.id}/preview`}>
                <Card className="overflow-hidden hover:shadow-xl hover:shadow-blue-900/20 transition-all active:scale-98 border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 hover:border-blue-600/50">
                  <div className="flex gap-4 p-4">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={secretary.image}
                        alt={secretary.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      {secretary.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5 shadow-lg">
                          <Shield className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-white text-lg">{secretary.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                            <span>{secretary.age}세</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {secretary.region}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
                          <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                          <span className="text-sm font-bold text-white">{secretary.rating}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap mb-2">
                        {secretary.categories.map((cat) => (
                          <Badge
                            key={cat}
                            className="text-xs bg-blue-950 text-blue-300 border border-blue-800"
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{secretary.experience} experience</span>
                        <span>•</span>
                        <span>{secretary.reviewCount} reviews</span>
                      </div>
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
