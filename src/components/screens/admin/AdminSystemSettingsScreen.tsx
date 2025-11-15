import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, DollarSign } from 'lucide-react'

interface SystemSettings {
  profileViewPrice: number
  platformCommissionRate: number
  secretaryApprovalAutomatic: boolean
  verificationAutoApproval: boolean
}

export default function AdminSystemSettingsScreen() {
  const [settings, setSettings] = useState<SystemSettings>({
    profileViewPrice: 5000,
    platformCommissionRate: 10,
    secretaryApprovalAutomatic: false,
    verificationAutoApproval: false
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: keyof SystemSettings, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // TODO: Call API to save settings
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSaving(false)
    alert('설정이 저장되었습니다')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                대시보드
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">시스템 설정</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Pricing Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <CardTitle>가격 설정</CardTitle>
              </div>
              <CardDescription>
                플랫폼 요금 및 수수료를 설정합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile View Price */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="profileViewPrice" className="text-base font-semibold">
                    프로필 열람 가격
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    경영자가 비서 프로필을 열람할 때 지불하는 금액
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    id="profileViewPrice"
                    type="number"
                    value={settings.profileViewPrice}
                    onChange={(e) => handleChange('profileViewPrice', parseInt(e.target.value))}
                    className="max-w-xs"
                  />
                  <span className="text-sm text-gray-600">원</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>현재 설정:</strong> 경영자는 비서 프로필 1개를 열람할 때{' '}
                    <strong>{settings.profileViewPrice.toLocaleString()}원</strong>을 지불합니다.
                  </p>
                </div>
              </div>

              {/* Platform Commission Rate */}
              <div className="space-y-3 pt-6 border-t">
                <div>
                  <Label htmlFor="platformCommissionRate" className="text-base font-semibold">
                    플랫폼 수수료율
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">
                    계약 금액에 대한 플랫폼 수수료 비율
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    id="platformCommissionRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={settings.platformCommissionRate}
                    onChange={(e) => handleChange('platformCommissionRate', parseFloat(e.target.value))}
                    className="max-w-xs"
                  />
                  <span className="text-sm text-gray-600">%</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>예시:</strong> 계약 금액 3,000,000원 × {settings.platformCommissionRate}% ={' '}
                    <strong>{(3000000 * settings.platformCommissionRate / 100).toLocaleString()}원</strong> 수수료
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approval Settings */}
          <Card>
            <CardHeader>
              <CardTitle>승인 설정</CardTitle>
              <CardDescription>
                자동 승인 여부를 설정합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Secretary Approval */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">비서 프로필 자동 승인</h4>
                  <p className="text-sm text-gray-600">
                    새로 등록된 비서 프로필을 자동으로 승인합니다
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.secretaryApprovalAutomatic}
                    onChange={(e) => handleChange('secretaryApprovalAutomatic', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Verification Auto Approval */}
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">API 인증 자동 승인</h4>
                  <p className="text-sm text-gray-600">
                    API 간편인증을 통한 경영자 인증을 자동으로 승인합니다
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.verificationAutoApproval}
                    onChange={(e) => handleChange('verificationAutoApproval', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>결제 수단</CardTitle>
              <CardDescription>
                지원하는 결제 수단을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {['신용카드', '계좌이체', '간편결제 (카카오페이)', '간편결제 (네이버페이)', '간편결제 (토스)'].map((method) => (
                  <label key={method} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-6">
            <Link to="/admin">
              <Button variant="outline">취소</Button>
            </Link>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? '저장 중...' : '설정 저장'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
