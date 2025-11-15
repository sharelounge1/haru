# 하루비서 백엔드 구현 체크리스트

## ✅ 완료된 작업

### 1. 백엔드 설계
- [x] 전체 아키텍처 설계
- [x] 데이터베이스 스키마 설계 (12개 테이블)
- [x] API 구조 설계
- [x] 인증 시스템 설계
- [x] 파일 스토리지 계획

### 2. Supabase 설정
- [x] 데이터베이스 SQL 스크립트 작성
- [x] ENUM 타입 정의
- [x] 테이블 생성 (12개)
- [x] 인덱스 생성
- [x] 트리거 및 함수 작성
- [x] RLS 정책 작성
- [x] Storage 버킷 정책 작성

### 3. 패키지 설치
- [x] @supabase/supabase-js
- [x] zustand

### 4. 클라이언트 설정
- [x] Supabase 클라이언트 초기화
- [x] 환경 변수 설정 (.env.example)
- [x] TypeScript 타입 정의

### 5. 인증 시스템
- [x] 회원가입 함수
- [x] 로그인 함수
- [x] 로그아웃 함수
- [x] 비밀번호 재설정
- [x] 세션 관리
- [x] 인증 상태 리스너

### 6. API 서비스 레이어
- [x] **users.ts** - 사용자 API
  - getCurrentUserProfile
  - updateUser
  - getClientProfile/updateClientProfile
  - getSecretaryProfile/updateSecretaryProfile
  - uploadAvatar

- [x] **secretaries.ts** - 비서 API
  - searchSecretaries (검색/필터링)
  - getSecretaryById
  - updateSecretaryProfile
  - addCertification
  - addWorkHistory
  - getSecretaryReviews
  - getPopularSecretaries

- [x] **jobs.ts** - 공고 API
  - searchJobs
  - getJobById
  - createJob
  - updateJob/deleteJob
  - updateJobStatus
  - getMyJobs
  - getJobApplicants
  - getRecommendedJobs

- [x] **matches.ts** - 매칭 API
  - createMatch
  - updateMatchStatus
  - getReceivedMatches (받은 제안)
  - getSentMatches (보낸 제안)
  - getSecretaryApplications
  - filterOldPendingMatches (7일 필터링)
  - sortByRecentResponse (정렬)
  - getCompletedMatches
  - deleteMatch

- [x] **contracts.ts** - 계약 API
  - createContract
  - getContractById
  - getMyContracts
  - updateContractStatus
  - updateContract/deleteContract
  - getContractStats

- [x] **payments.ts** - 결제 API
  - createPayment
  - getPaymentsByContract
  - getMyPayments
  - updatePaymentStatus
  - updatePayment
  - getPaymentStats

- [x] **reviews.ts** - 리뷰 API
  - createReview
  - getReviewByContract
  - getReceivedReviews
  - getWrittenReviews
  - canWriteReview

### 7. React Hooks
- [x] useAuth 훅

### 8. 상태 관리
- [x] authStore (Zustand)

### 9. 문서화
- [x] README.md
- [x] BACKEND_ARCHITECTURE.md
- [x] SETUP_GUIDE.md
- [x] DATABASE_SCHEMA.sql
- [x] IMPLEMENTATION_CHECKLIST.md

## 📋 다음 단계 (화면 연결)

### 1. 인증 화면 연결
- [ ] LandingScreen - 로그인 없이 둘러보기
- [ ] LoginScreen - 로그인 API 연결
- [ ] SignupTypeScreen - 회원가입 타입 선택
- [ ] ClientSignupScreen - CEO 회원가입 API 연결
- [ ] SecretarySignupScreen - 비서 회원가입 API 연결

### 2. 비서 검색
- [ ] ClientSearchScreen - searchSecretaries API 연결
- [ ] SecretaryDetailScreen - getSecretaryById API 연결
- [ ] 필터링 기능 구현
- [ ] 정렬 기능 구현

### 3. 공고 관리
- [ ] ClientJobsScreen - getMyJobs API 연결
- [ ] JobDetailScreen - getJobById API 연결
- [ ] JobRequestCreateScreen - createJob API 연결
- [ ] 공고 수정/삭제 기능
- [ ] 지원자 목록 보기

### 4. 매칭 시스템
- [ ] MatchingScreen - getReceivedMatches/getSentMatches API 연결
- [ ] 7일 필터링 로직 적용
- [ ] 정렬 로직 적용
- [ ] 승인/거부 버튼 연결
- [ ] 실시간 업데이트 (Realtime 구독)

### 5. 마이페이지
- [ ] ProfileEditScreen - updateUser/updateProfile API 연결
- [ ] 프로필 사진 업로드 연결
- [ ] ContractsScreen - getMyContracts API 연결
- [ ] PaymentsScreen - getMyPayments API 연결
- [ ] SettingsScreen - 설정 저장

### 6. 계약 및 결제
- [ ] 계약 생성 화면 및 API 연결
- [ ] 결제 기록 추가
- [ ] 결제 통계 표시

### 7. 리뷰 시스템
- [ ] 리뷰 작성 화면
- [ ] 리뷰 목록 표시
- [ ] 평점 자동 업데이트 확인

### 8. 실시간 기능
- [ ] 새 매칭 알림
- [ ] 메시지 실시간 업데이트 (향후)

### 9. 에러 처리
- [ ] 전역 에러 핸들러
- [ ] 로딩 상태 관리
- [ ] 토스트 알림

### 10. 테스트
- [ ] 회원가입/로그인 테스트
- [ ] 비서 검색 테스트
- [ ] 공고 CRUD 테스트
- [ ] 매칭 흐름 테스트
- [ ] 계약/결제 테스트

## 🔧 Supabase 대시보드 설정 필요사항

### 1. 프로젝트 생성
```
1. https://supabase.com 접속
2. New Project 클릭
3. Organization 선택/생성
4. Project name: haru-secretary
5. Database Password 설정 (강력한 비밀번호!)
6. Region: Northeast Asia (Seoul)
7. Create project 클릭
```

### 2. SQL 스크립트 실행
```
1. SQL Editor 메뉴 클릭
2. New query 클릭
3. docs/DATABASE_SCHEMA.sql 내용 복사
4. 붙여넣기
5. Run 버튼 클릭
```

### 3. Storage 버킷 생성
```
Storage 메뉴에서 다음 버킷 생성:

1. avatars (Public)
2. documents (Private)
3. contracts (Private)
4. receipts (Private)
5. certificates (Public)
```

### 4. Storage 정책 설정
```
각 버킷에 대해 SETUP_GUIDE.md의 Storage 정책 SQL 실행
```

### 5. API 키 복사
```
Settings → API 메뉴에서:
1. Project URL 복사
2. anon public key 복사
3. .env 파일에 입력
```

## 🎯 핵심 비즈니스 로직

### 매칭 시스템
```typescript
// 7일 필터링
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
matches.filter(match => {
  if (match.status === 'pending') {
    return match.appliedDate > sevenDaysAgo
  }
  return true
})

// 정렬: 승인 → 최근 응답 → 최신순
matches.sort((a, b) => {
  if (a.status === 'accepted') return -1
  if (b.status === 'accepted') return 1

  const aRecent = a.responseDate > sevenDaysAgo
  const bRecent = b.responseDate > sevenDaysAgo
  if (aRecent && !bRecent) return -1
  if (!aRecent && bRecent) return 1

  return b.appliedDate - a.appliedDate
})
```

### 평점 자동 업데이트
```sql
-- reviews 테이블에 INSERT 트리거
-- 자동으로 secretary_profiles의 rating, review_count 업데이트
```

### 지원자 수 자동 업데이트
```sql
-- matches 테이블에 INSERT/DELETE 트리거
-- 자동으로 job_postings의 applicant_count 업데이트
```

## 📊 데이터 흐름

### 회원가입
```
1. SignupScreen
2. authApi.signUp()
3. Supabase Auth 사용자 생성
4. Database 트리거: users 테이블에 프로필 생성
5. user_type에 따라 client_profiles 또는 secretary_profiles 생성
6. 자동 로그인
```

### 공고 지원
```
1. JobDetailScreen에서 "지원하기" 버튼
2. createMatch({ matchType: 'job_application' })
3. matches 테이블에 INSERT
4. Database 트리거: job_postings.applicant_count +1
5. CEO의 매칭 화면에 새 지원자 표시
```

### 매칭 승인
```
1. MatchingScreen에서 "승인" 버튼
2. updateMatchStatus(matchId, 'accepted')
3. matches.status = 'accepted', response_date = NOW()
4. 양측 모두 승인시 status = 'completed'
5. 계약 생성 가능
```

---

**작성일**: 2025-01-15
**최종 수정**: 2025-01-15
**버전**: 1.0.0
