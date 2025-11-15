# 하루비서 정보구조도

**문서 버전**: 1.0
**최종 수정일**: 2025-01-15

## 개요
하루비서 앱의 전체 화면 구조와 네비게이션 경로를 정의합니다.
3가지 사용자 유형(경영자, 비서, 관리자)에 따라 다른 화면과 기능에 접근할 수 있습니다.

## 사용자 유형별 권한

### 경영자 (Client)
- 구인 요청 작성 및 관리
- 비서 검색 및 조회
- 신청 내역 확인 및 비서 선택
- 매칭 내역 조회
- 리뷰 작성

### 비서 (Secretary)
- 프로필 등록 및 관리
- 본인인증 및 자격증명
- 구인 요청 조회 및 신청
- 매칭 내역 조회
- 리뷰 작성

### 관리자 (Admin)
- 전체 사용자 관리
- 비서 자격증명 승인
- 매칭 관리
- 신고 및 분쟁 처리

## 홈 화면 메뉴 구조

### 경영자 홈 (5개 메뉴)
```
경영자 홈 화면 (ClientHomeScreen)
├── 구인 요청 작성 (/requests/new)
├── 내 요청 관리 (/requests/my)
├── 비서 검색 (/secretaries/search)
├── 매칭 내역 (/matches)
└── 마이페이지 (/mypage)
```

### 비서 홈 (5개 메뉤)
```
비서 홈 화면 (SecretaryHomeScreen)
├── 구인 요청 찾기 (/requests/browse)
├── 내 신청 내역 (/applications/my)
├── 매칭 내역 (/matches)
├── 내 프로필 (/profile/edit)
└── 마이페이지 (/mypage)
```

### 관리자 홈 (4개 메뉴)
```
관리자 홈 화면 (AdminHomeScreen)
├── 사용자 관리 (/admin/users)
├── 비서 승인 관리 (/admin/secretary-approvals)
├── 매칭 관리 (/admin/matches)
└── 신고 관리 (/admin/reports)
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
│   ├── 구인 요청 (/requests)
│   │   ├── 요청 작성 (/new) - CreateRequestScreen
│   │   ├── 내 요청 목록 (/my) - MyRequestsListScreen
│   │   └── 요청 상세 (/:id)
│   │       ├── 상세 정보 (/) - RequestDetailScreen
│   │       ├── 신청자 목록 (/applicants) - ApplicantsListScreen
│   │       └── 신청자 프로필 (/applicants/:secretaryId) - ApplicantProfileScreen
│   │
│   ├── 비서 검색 (/secretaries)
│   │   ├── 검색 (/) - SecretarySearchScreen
│   │   └── 비서 프로필 (/:id) - SecretaryPublicProfileScreen
│   │
│   ├── 매칭 내역 (/matches)
│   │   ├── 목록 (/) - ClientMatchesListScreen
│   │   └── 상세 (/:id) - MatchDetailScreen
│   │       └── 리뷰 작성 (/review) - WriteReviewScreen
│   │
│   └── 마이페이지 (/mypage)
│       ├── 프로필 수정 (/) - ClientProfileEditScreen
│       ├── 내 리뷰 (/reviews) - MyReviewsScreen
│       └── 설정 (/settings) - SettingsScreen
│
├── 💼 비서 기능 (Secretary Features) - /secretary
│   ├── 홈 (/) - SecretaryHomeScreen
│   │
│   ├── 프로필 관리 (/profile)
│   │   ├── 프로필 등록/수정 (/) - SecretaryProfileEditScreen
│   │   ├── 본인인증 (/verify) - NiceVerificationScreen
│   │   └── 자격증명 관리 (/credentials) - CredentialsManagementScreen
│   │
│   ├── 구인 요청 (/requests)
│   │   ├── 찾아보기 (/) - BrowseRequestsScreen
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
│   ├── 비서 승인 관리 (/secretary-approvals)
│   │   ├── 대기 목록 (/) - PendingApprovalsScreen
│   │   └── 비서 상세 (/:id)
│   │       ├── 승인 심사 (/) - SecretaryApprovalScreen
│   │       └── 자격증명 확인 (/credentials) - CredentialsReviewScreen
│   │
│   ├── 매칭 관리 (/matches)
│   │   ├── 전체 목록 (/) - AllMatchesListScreen
│   │   └── 매칭 상세 (/:id) - AdminMatchDetailScreen
│   │
│   └── 신고 관리 (/reports)
│       ├── 목록 (/) - ReportsListScreen
│       └── 상세 (/:id) - ReportDetailScreen
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
- **ClientHomeScreen**: 경영자 메인 런처 (5개 메뉴)
- **CreateRequestScreen**: 구인 요청 작성 (기간, 지역, 업무 내용)
- **MyRequestsListScreen**: 내가 작성한 요청 목록
- **RequestDetailScreen**: 요청 상세 정보
- **ApplicantsListScreen**: 신청한 비서 목록
- **ApplicantProfileScreen**: 신청 비서의 상세 프로필
- **SecretarySearchScreen**: 비서 검색 (지역, 평점, 경력 필터)
- **SecretaryPublicProfileScreen**: 비서 공개 프로필
- **ClientMatchesListScreen**: 확정된 매칭 목록
- **MatchDetailScreen**: 매칭 상세 정보
- **WriteReviewScreen**: 리뷰 작성

### 비서 화면
- **SecretaryHomeScreen**: 비서 메인 런처 (5개 메뉴)
- **SecretaryProfileEditScreen**: 프로필 등록/수정
- **CredentialsManagementScreen**: 자격증명 서류 관리
- **BrowseRequestsScreen**: 구인 요청 목록 (지역, 기간 필터)
- **ApplyToRequestScreen**: 요청에 신청하기
- **MyApplicationsListScreen**: 내 신청 내역
- **ApplicationDetailScreen**: 신청 상세 정보
- **SecretaryMatchesListScreen**: 확정된 매칭 목록
- **ReceivedReviewsScreen**: 받은 리뷰 목록

### 관리자 화면
- **AdminDashboardScreen**: 관리자 대시보드 (통계)
- **UsersListScreen**: 전체 사용자 목록
- **UserDetailScreen**: 사용자 상세 정보
- **PendingApprovalsScreen**: 승인 대기 중인 비서 목록
- **SecretaryApprovalScreen**: 비서 승인 심사
- **CredentialsReviewScreen**: 자격증명 서류 확인
- **AllMatchesListScreen**: 전체 매칭 내역
- **AdminMatchDetailScreen**: 매칭 상세 (관리자 뷰)
- **ReportsListScreen**: 신고 목록
- **ReportDetailScreen**: 신고 상세 및 처리

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
