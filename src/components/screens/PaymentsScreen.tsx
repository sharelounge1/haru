import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  DollarSign,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react'

interface Payment {
  id: string
  date: string
  description: string
  amount: string
  method: string
  status: 'completed' | 'pending'
  contractId: string
}

export default function PaymentsScreen() {
  const navigate = useNavigate()

  // Mock payments data
  const payments: Payment[] = [
    {
      id: '1',
      date: '2024.02.01',
      description: 'CEO 개인비서 계약 - 2월 급여',
      amount: '450만원',
      method: '계좌이체',
      status: 'completed',
      contractId: '1'
    },
    {
      id: '2',
      date: '2024.01.31',
      description: '출장비서 단기계약 - 성과급',
      amount: '50만원',
      method: '계좌이체',
      status: 'completed',
      contractId: '2'
    },
    {
      id: '3',
      date: '2024.01.15',
      description: 'CEO 개인비서 계약 - 1월 급여',
      amount: '450만원',
      method: '계좌이체',
      status: 'pending',
      contractId: '1'
    }
  ]

  const totalAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace(/[^0-9]/g, '')), 0)

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
          <h1 className="text-lg font-bold text-white ml-2">결제 내역</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Summary */}
        <Card className="bg-gradient-to-br from-[#FF783B]/20 to-[#FF5722]/10 border-[#FF783B]/30 p-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">총 결제 금액</p>
            <p className="text-4xl font-bold text-white mb-1">
              {totalAmount.toLocaleString()}원
            </p>
            <p className="text-xs text-gray-400">
              {payments.filter(p => p.status === 'completed').length}건 완료
            </p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <div className="text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {payments.filter(p => p.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">완료</p>
            </div>
          </Card>
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-4">
            <div className="text-center">
              <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {payments.filter(p => p.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-400 mt-1">대기중</p>
            </div>
          </Card>
        </div>

        {/* Payments List */}
        <div className="space-y-3">
          {payments.map((payment) => (
            <Card
              key={payment.id}
              className="bg-[#1A1A1A] border-[#2A2A2A] p-4 hover:border-[#FF783B]/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-white font-medium mb-1">{payment.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{payment.date}</span>
                  </div>
                </div>
                <Badge
                  className={
                    payment.status === 'completed'
                      ? 'bg-green-500/20 text-green-500 border-green-500/30 border'
                      : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30 border'
                  }
                >
                  {payment.status === 'completed' ? '완료' : '대기중'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#FF783B]" />
                  <span className="text-sm text-gray-400">{payment.method}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#FF783B]">{payment.amount}</p>
                  </div>
                  {payment.status === 'completed' && (
                    <button className="p-2 hover:bg-[#0F0F0F] rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {payments.length === 0 && (
          <Card className="bg-[#1A1A1A] border-[#2A2A2A] p-12">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">결제 내역이 없습니다</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
