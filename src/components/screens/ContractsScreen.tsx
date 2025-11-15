import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  FileText,
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'

type ContractStatus = 'active' | 'pending' | 'completed' | 'cancelled'

interface Contract {
  id: string
  title: string
  clientName: string
  secretaryName: string
  startDate: string
  endDate: string
  salary: string
  status: ContractStatus
  period: string
}

export default function ContractsScreen() {
  const navigate = useNavigate()

  // Mock contracts data
  const contracts: Contract[] = [
    {
      id: '1',
      title: 'CEO 개인비서 계약',
      clientName: '박대표',
      secretaryName: '김소희',
      startDate: '2024.01.15',
      endDate: '2024.07.15',
      salary: '월 450만원',
      period: '6개월',
      status: 'active'
    },
    {
      id: '2',
      title: '출장비서 단기계약',
      clientName: '이사장',
      secretaryName: '박예린',
      startDate: '2024.02.01',
      endDate: '2024.02.28',
      salary: '월 300만원',
      period: '1개월',
      status: 'pending'
    },
    {
      id: '3',
      title: '업무비서 장기계약',
      clientName: '최CEO',
      secretaryName: '이서연',
      startDate: '2023.08.01',
      endDate: '2024.01.31',
      salary: '월 500만원',
      period: '6개월',
      status: 'completed'
    }
  ]

  const getStatusInfo = (status: ContractStatus) => {
    switch (status) {
      case 'active':
        return {
          label: '진행중',
          className: 'bg-[#FF783B]/20 text-[#FF783B] border-[#FF783B]/30',
          icon: <CheckCircle className="w-4 h-4" />
        }
      case 'pending':
        return {
          label: '대기중',
          className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
          icon: <Clock className="w-4 h-4" />
        }
      case 'completed':
        return {
          label: '완료',
          className: 'bg-green-500/20 text-green-500 border-green-500/30',
          icon: <CheckCircle className="w-4 h-4" />
        }
      case 'cancelled':
        return {
          label: '취소',
          className: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
          icon: <XCircle className="w-4 h-4" />
        }
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0F0F0F]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white ml-2">계약 관리</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Summary */}
        <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FF783B]">
                {contracts.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">진행중</p>
            </div>
            <div className="text-center border-x border-[#2A2A2A]">
              <p className="text-2xl font-bold text-yellow-500">
                {contracts.filter(c => c.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">대기중</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {contracts.filter(c => c.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">완료</p>
            </div>
          </div>
        </Card>

        {/* Contracts List */}
        <div className="space-y-3">
          {contracts.map((contract) => {
            const statusInfo = getStatusInfo(contract.status)
            return (
              <Card
                key={contract.id}
                className="bg-[#1A1A1A] border-[#2A2A2A] p-4 hover:border-[#FF783B]/50 transition-all cursor-pointer"
                onClick={() => {/* Navigate to detail */}}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{contract.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{contract.clientName} ↔ {contract.secretaryName}</span>
                    </div>
                  </div>
                  <Badge className={`${statusInfo.className} border flex items-center gap-1`}>
                    {statusInfo.icon}
                    {statusInfo.label}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-[#FF783B]" />
                    <span>{contract.startDate} ~ {contract.endDate}</span>
                    <Badge variant="outline" className="border-[#2A2A2A] text-gray-400 text-xs ml-auto">
                      {contract.period}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-4 h-4 text-[#FF783B]" />
                    <span className="font-medium">{contract.salary}</span>
                  </div>
                </div>

                {contract.status === 'active' && (
                  <div className="mt-3 pt-3 border-t border-[#2A2A2A]">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-[#2A2A2A] text-gray-300 hover:bg-[#0F0F0F]"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle contract detail
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      계약서 보기
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {contracts.length === 0 && (
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-12">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">진행중인 계약이 없습니다</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
