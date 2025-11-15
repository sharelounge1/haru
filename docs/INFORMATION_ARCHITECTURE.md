# 하루비서 정보구조도

**문서 버전**: 1.0
**최종 수정일**: 2025-01-15

## 개요
하루비서 앱의 전체 화면 구조와 네비게이션 경로를 정의합니다.
3가지 사용자 유형(경영자, 비서, 관리자)에 따라 다른 화면과 기능에 접근할 수 있습니다.

## 사용자 유형별 권한

### 경영자 (Client)
- 구인 요청 작성 및 관리
- 비서 검색 및 조회 (고급 필터)
- 신청 내역 확인 및 비서 선택
- 프로필 열람 결제
- 매칭 내역 조회
- 리뷰 작성
- 본인인증 및 배지 인증 (사업자, 매출, 연봉)

### 비서 (Secretary)
- 프로필 등록 및 관리
  - 다중 이미지 업로드
  - 카테고리 중복 선택
  - 배지 관리 (영어, 운전 등)
- 본인인증 및 자격증명
- 구인 요청 조회 및 신청 (고급 필터)
- 매칭 내역 조회
- 리뷰 작성

### 관리자 (Admin)
- 전체 사용자 관리
- 경영자 인증 승인 (사업자, 매출, 연봉)
- 비서 자격증명 승인
- 매칭 관리
- 신고 및 분쟁 처리
- 시스템 설정 (열람비, 수수료)

## 홈 화면 메뉴 구조

### 경영자 홈 (6개 메뉴)
```
경영자 홈 화면 (ClientHomeScreen)
├── 구인 요청 작성 (/requests/new)
├── 내 요청 관리 (/requests/my)
├── 비서 검색 (/secretaries/search)
├── 매칭 내역 (/matches)
├── 인증 관리 (/verifications)
└── 마이페이지 (/mypage)
```

### 비서 홈 (5개 메뉴)
```
비서 홈 화면 (SecretaryHomeScreen)
├── 구인 요청 찾기 (/requests/browse)
├── 내 신청 내역 (/applications/my)
├── 매칭 내역 (/matches)
├── 내 프로필 (/profile/edit)
└── 마이페이지 (/mypage)
```

### 관리자 홈 (6개 메뉴)
```
관리자 홈 화면 (AdminHomeScreen)
├── 사용자 관리 (/admin/users)
├── 경영자 인증 승인 (/admin/client-approvals)
├── 비서 승인 관리 (/admin/secretary-approvals)
├── 매칭 관리 (/admin/matches)
├── 신고 관리 (/admin/reports)
└── 시스템 설정 (/admin/settings)
```

## 전체 사이트맵

```
하루비서 앱
│
├── 🔐 인증 (Authentication)
│   ├── 랜딩 페이지 (/) - LandingScreen
│   ├── 로그인 (/login) - LoginScreen
│   ├── 회원가입 선택 (/signup) - SignupTypeScreen
│   │   ├── 경영자 회원가입 (/signup/client) - ClientSignupScreen
│   │   └── 비서 회원가입 (/signup/secretary) - SecretarySignupScreen
│   │       └── 본인인증 (/signup/secretary/verify) - NiceVerificationScreen
│   └── 비밀번호 찾기 (/forgot-password) - ForgotPasswordScreen
│
├── 👔 경영자 기능 (Client Features) - /client
│   ├── 홈 (/) - ClientHomeScreen
│   │
│   ├── 인증 관리 (/verifications)
│   │   ├── 본인인증 (/identity) - ClientIdentityVerificationScreen
│   │   ├── 사업자 인증 (/business) - BusinessVerificationScreen
│   │   │   ├── API 간편인증 (/api) - BusinessAPIVerificationScreen
│   │   │   └── 서류 제출 (/document) - BusinessDocumentUploadScreen
│   │   ├── 매출 인증 (/revenue) - RevenueVerificationScreen
│   │   │   ├── API 간편인증 (/api) - RevenueAPIVerificationScreen
│   │   │   └── 서류 제출 (/document) - RevenueDocumentUploadScreen
│   │   └── 연봉 인증 (/salary) - SalaryVerificationScreen
│   │       ├── API 간편인증 (/api) - SalaryAPIVerificationScreen
│   │       └── 서류 제출 (/document) - SalaryDocumentUploadScreen
│   │
│   ├── 구인 요청 (/requests)
│   │   ├── 요청 작성 (/new) - CreateRequestScreen
│   │   ├── 내 요청 목록 (/my) - MyRequestsListScreen
│   │   └── 요청 상세 (/:id)
│   │       ├── 상세 정보 (/) - RequestDetailScreen
│   │       ├── 신청자 목록 (/applicants) - ApplicantsListScreen
│   │       └── 신청자 프로필 (/applicants/:secretaryId)
│   │           ├── 프리뷰 (/) - ApplicantProfilePreviewScreen (결제 전)
│   │           ├── 결제 (/payment) - ProfileViewPaymentScreen
│   │           └── 전체 보기 (/full) - ApplicantProfileFullScreen (결제 후)
│   │
│   ├── 비서 검색 (/secretaries)
│   │   ├── 검색 (/) - SecretarySearchScreen (고급 필터: 나이, 성별, 지역, 배지, 검색어)
│   │   └── 비서 프로필 (/:id)
│   │       ├── 프리뷰 (/) - SecretaryProfilePreviewScreen (결제 전)
│   │       ├── 결제 (/payment) - ProfileViewPaymentScreen
│   │       └── 전체 보기 (/full) - SecretaryPublicProfileScreen (결제 후)
│   │
│   ├── 매칭 내역 (/matches)
│   │   ├── 목록 (/) - ClientMatchesListScreen
│   │   └── 상세 (/:id) - MatchDetailScreen
│   │       └── 리뷰 작성 (/review) - WriteReviewScreen
│   │
│   └── 마이페이지 (/mypage)
│       ├── 프로필 수정 (/) - ClientProfileEditScreen
│       ├── 내 배지 (/badges) - MyBadgesScreen
│       ├── 내 리뷰 (/reviews) - MyReviewsScreen
│       └── 설정 (/settings) - SettingsScreen
│
├── 💼 비서 기능 (Secretary Features) - /secretary
│   ├── 홈 (/) - SecretaryHomeScreen
│   │
│   ├── 프로필 관리 (/profile)
│   │   ├── 프로필 등록/수정 (/) - SecretaryProfileEditScreen
│   │   │   ├── 기본 정보 (/) - BasicInfoEditScreen
│   │   │   ├── 이미지 관리 (/images) - ProfileImagesManagementScreen (다중 이미지)
│   │   │   ├── 카테고리 선택 (/categories) - CategorySelectionScreen (중복 선택)
│   │   │   ├── 배지 관리 (/badges) - BadgeManagementScreen (영어, 운전 등)
│   │   │   ├── 학력 입력 (/education) - EducationEditScreen
│   │   │   └── 능력 입력 (/skills) - SkillsEditScreen
│   │   ├── 본인인증 (/verify) - NiceVerificationScreen
│   │   └── 자격증명 관리 (/credentials) - CredentialsManagementScreen
│   │
│   ├── 구인 요청 (/requests)
│   │   ├── 찾아보기 (/) - BrowseRequestsScreen
│   │   │   (고급 필터: 검색어, 나이, 성별, 지역, 대표자 배지, 기간, 선호 비서종류, 금액)
│   │   └── 요청 상세 (/:id)
│   │       ├── 상세 정보 (/) - RequestDetailScreen
│   │       └── 신청하기 (/apply) - ApplyToRequestScreen
│   │
│   ├── 내 신청 (/applications)
│   │   ├── 목록 (/) - MyApplicationsListScreen
│   │   └── 상세 (/:id) - ApplicationDetailScreen
│   │
│   ├── 매칭 내역 (/matches)
│   │   ├── 목록 (/) - SecretaryMatchesListScreen
│   │   └── 상세 (/:id) - MatchDetailScreen
│   │       └── 리뷰 작성 (/review) - WriteReviewScreen
│   │
│   └── 마이페이지 (/mypage)
│       ├── 내 프로필 보기 (/) - SecretaryProfileViewScreen
│       ├── 내 배지 (/badges) - MyBadgesScreen
│       ├── 받은 리뷰 (/reviews) - ReceivedReviewsScreen
│       └── 설정 (/settings) - SettingsScreen
│
├── 🛠️ 관리자 기능 (Admin Features) - /admin
│   ├── 대시보드 (/) - AdminDashboardScreen
│   │
│   ├── 사용자 관리 (/users)
│   │   ├── 목록 (/) - UsersListScreen
│   │   └── 상세 (/:id) - UserDetailScreen
│   │
│   ├── 경영자 인증 승인 (/client-approvals)
│   │   ├── 대기 목록 (/) - PendingClientApprovalsScreen
│   │   └── 경영자 상세 (/:id)
│   │       ├── 승인 심사 (/) - ClientApprovalScreen
│   │       ├── 사업자 인증 확인 (/business) - BusinessVerificationReviewScreen
│   │       ├── 매출 인증 확인 (/revenue) - RevenueVerificationReviewScreen
│   │       └── 연봉 인증 확인 (/salary) - SalaryVerificationReviewScreen
│   │
│   ├── 비서 승인 관리 (/secretary-approvals)
│   │   ├── 대기 목록 (/) - PendingSecretaryApprovalsScreen
│   │   └── 비서 상세 (/:id)
│   │       ├── 승인 심사 (/) - SecretaryApprovalScreen
│   │       └── 자격증명 확인 (/credentials) - CredentialsReviewScreen
│   │
│   ├── 매칭 관리 (/matches)
│   │   ├── 전체 목록 (/) - AllMatchesListScreen
│   │   └── 매칭 상세 (/:id) - AdminMatchDetailScreen
│   │
│   ├── 신고 관리 (/reports)
│   │   ├── 목록 (/) - ReportsListScreen
│   │   └── 상세 (/:id) - ReportDetailScreen
│   │
│   └── 시스템 설정 (/settings)
│       ├── 기본 설정 (/) - SystemSettingsScreen
│       ├── 비용 설정 (/pricing) - PricingSettingsScreen
│       │   ├── 프로필 열람비 (/) - ProfileViewPriceScreen
│       │   └── 수수료 (/) - CommissionRateScreen
│       └── 배지 관리 (/badges) - BadgeManagementSettingsScreen
│
└── 🔔 알림 (/notifications)
    └── 알림 목록 (/) - NotificationsScreen
```

## 화면 설명

### 인증 및 온보딩
- **LandingScreen**: 앱 소개 및 로그인/회원가입 선택
- **LoginScreen**: 이메일/비밀번호 로그인
- **SignupTypeScreen**: 경영자/비서 회원가입 타입 선택
- **ClientSignupScreen**: 경영자 회원가입 (기본 정보)
- **SecretarySignupScreen**: 비서 회원가입 (기본 정보 + 프로필)
- **NiceVerificationScreen**: NICE 본인인증 화면
- **ForgotPasswordScreen**: 비밀번호 재설정

### 경영자 화면
- **ClientHomeScreen**: 경영자 메인 런처 (6개 메뉴)
- **인증 관련**
  - **ClientIdentityVerificationScreen**: 본인인증 (NICE)
  - **BusinessVerificationScreen**: 사업자 인증 선택
  - **BusinessAPIVerificationScreen**: 사업자 API 간편인증
  - **BusinessDocumentUploadScreen**: 사업자 서류 제출
  - **RevenueVerificationScreen**: 매출 인증 선택
  - **RevenueAPIVerificationScreen**: 매출 API 간편인증
  - **RevenueDocumentUploadScreen**: 매출 서류 제출
  - **SalaryVerificationScreen**: 연봉 인증 선택
  - **SalaryAPIVerificationScreen**: 연봉 API 간편인증
  - **SalaryDocumentUploadScreen**: 연봉 서류 제출
  - **MyBadgesScreen**: 내 배지 관리
- **구인 요청 관련**
  - **CreateRequestScreen**: 구인 요청 작성 (날짜/시간, 제목/내용, 원하는 비서 종류, 금액)
  - **MyRequestsListScreen**: 내가 작성한 요청 목록
  - **RequestDetailScreen**: 요청 상세 정보
  - **ApplicantsListScreen**: 신청한 비서 목록
  - **ApplicantProfilePreviewScreen**: 신청 비서 프리뷰 (결제 전: 사진 1장, 나이, 간단 이력)
  - **ProfileViewPaymentScreen**: 프로필 열람 결제
  - **ApplicantProfileFullScreen**: 신청 비서 전체 프로필 (결제 후)
- **비서 검색 관련**
  - **SecretarySearchScreen**: 비서 검색 (고급 필터: 나이, 성별, 지역, 배지, 검색어)
  - **SecretaryProfilePreviewScreen**: 비서 프로필 프리뷰 (결제 전)
  - **SecretaryPublicProfileScreen**: 비서 공개 프로필 (결제 후)
- **매칭 및 리뷰**
  - **ClientMatchesListScreen**: 확정된 매칭 목록
  - **MatchDetailScreen**: 매칭 상세 정보
  - **WriteReviewScreen**: 리뷰 작성

### 비서 화면
- **SecretaryHomeScreen**: 비서 메인 런처 (5개 메뉴)
- **프로필 관리**
  - **SecretaryProfileEditScreen**: 프로필 등록/수정
  - **BasicInfoEditScreen**: 기본 정보 수정
  - **ProfileImagesManagementScreen**: 프로필 이미지 관리 (다중 업로드)
  - **CategorySelectionScreen**: 비서 카테고리 선택 (개인/업무/출장/요가 등 중복 선택)
  - **BadgeManagementScreen**: 배지 관리 (영어, 운전 등 능력 표시)
  - **EducationEditScreen**: 학력 입력
  - **SkillsEditScreen**: 능력 자유 입력
  - **CredentialsManagementScreen**: 자격증명 서류 관리
  - **MyBadgesScreen**: 내 배지 확인
- **구인 요청 관련**
  - **BrowseRequestsScreen**: 구인 요청 목록 (고급 필터: 검색어, 나이, 성별, 지역, 대표자 배지, 기간, 선호 비서종류, 금액)
  - **ApplyToRequestScreen**: 요청에 신청하기
  - **MyApplicationsListScreen**: 내 신청 내역
  - **ApplicationDetailScreen**: 신청 상세 정보
- **매칭 및 리뷰**
  - **SecretaryMatchesListScreen**: 확정된 매칭 목록
  - **ReceivedReviewsScreen**: 받은 리뷰 목록

### 관리자 화면
- **AdminDashboardScreen**: 관리자 대시보드 (통계)
- **사용자 관리**
  - **UsersListScreen**: 전체 사용자 목록
  - **UserDetailScreen**: 사용자 상세 정보
- **경영자 인증 승인**
  - **PendingClientApprovalsScreen**: 승인 대기 중인 경영자 목록
  - **ClientApprovalScreen**: 경영자 승인 심사
  - **BusinessVerificationReviewScreen**: 사업자 인증 서류 확인 및 승인
  - **RevenueVerificationReviewScreen**: 매출 인증 서류 확인 및 승인
  - **SalaryVerificationReviewScreen**: 연봉 인증 서류 확인 및 승인
- **비서 승인 관리**
  - **PendingSecretaryApprovalsScreen**: 승인 대기 중인 비서 목록
  - **SecretaryApprovalScreen**: 비서 승인 심사
  - **CredentialsReviewScreen**: 자격증명 서류 확인
- **매칭 및 신고**
  - **AllMatchesListScreen**: 전체 매칭 내역
  - **AdminMatchDetailScreen**: 매칭 상세 (관리자 뷰)
  - **ReportsListScreen**: 신고 목록
  - **ReportDetailScreen**: 신고 상세 및 처리
- **시스템 설정**
  - **SystemSettingsScreen**: 기본 시스템 설정
  - **PricingSettingsScreen**: 비용 설정
  - **ProfileViewPriceScreen**: 프로필 열람비 설정
  - **CommissionRateScreen**: 매칭 수수료 설정
  - **BadgeManagementSettingsScreen**: 배지 관리 (추가/삭제/수정)

### 공통 화면
- **NotificationsScreen**: 알림 목록 (매칭, 신청, 리뷰 알림)
- **SettingsScreen**: 설정 (알림 설정, 계정 관리)

## 네비게이션 규칙

### 1. 역할 기반 접근 제어 (RBAC)
- 각 사용자는 자신의 역할에 맞는 홈 화면으로 리디렉션
- 권한 없는 경로 접근 시 403 또는 홈으로 리디렉션

### 2. 인증 필수 화면
- `/client/*`, `/secretary/*`, `/admin/*` 모든 하위 경로는 로그인 필수
- 미인증 시 `/login`으로 리디렉션

### 3. 비서 자격증명 상태
- 비서는 본인인증 완료 + 관리자 승인 후 활동 가능
- 승인 대기 중일 경우 제한된 기능만 사용 가능

### 4. 모바일 네비게이션
- 하단 탭바: 홈, 검색/요청, 매칭, 마이페이지, 알림
- 상단 앱바: 뒤로가기, 제목, 액션 버튼

## 라우팅 코드 예시

```typescript
// AppRouter.tsx (참고용)
const router = createBrowserRouter([
  { path: '/', element: <LandingScreen /> },
  { path: '/login', element: <LoginScreen /> },
  { path: '/signup', element: <SignupTypeScreen /> },
  { path: '/signup/client', element: <ClientSignupScreen /> },
  { path: '/signup/secretary', element: <SecretarySignupScreen /> },

  // 경영자 라우트
  {
    path: '/client',
    element: <ProtectedRoute role="client" />,
    children: [
      { index: true, element: <ClientHomeScreen /> },
      { path: 'requests/new', element: <CreateRequestScreen /> },
      { path: 'requests/my', element: <MyRequestsListScreen /> },
      { path: 'requests/:id', element: <RequestDetailScreen /> },
      // ... 기타 라우트
    ]
  },

  // 비서 라우트
  {
    path: '/secretary',
    element: <ProtectedRoute role="secretary" />,
    children: [
      { index: true, element: <SecretaryHomeScreen /> },
      { path: 'profile', element: <SecretaryProfileEditScreen /> },
      { path: 'requests', element: <BrowseRequestsScreen /> },
      // ... 기타 라우트
    ]
  },

  // 관리자 라우트
  {
    path: '/admin',
    element: <ProtectedRoute role="admin" />,
    children: [
      { index: true, element: <AdminDashboardScreen /> },
      { path: 'users', element: <UsersListScreen /> },
      // ... 기타 라우트
    ]
  },
]);
```

---

**참고**: 이 문서는 실제 구현된 화면과 100% 일치해야 합니다. 화면 추가/변경 시 반드시 업데이트하세요.
