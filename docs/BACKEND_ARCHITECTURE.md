# 하루비서 백엔드 아키텍처

## 목차
- [개요](#개요)
- [기술 스택](#기술-스택)
- [데이터베이스 스키마](#데이터베이스-스키마)
- [API 구조](#api-구조)
- [인증 시스템](#인증-시스템)
- [주요 기능](#주요-기능)

## 개요

하루비서는 경영자(CEO)와 비서를 연결하는 매칭 플랫폼입니다. Supabase를 백엔드로 사용하여 사용자 인증, 데이터 관리, 실시간 업데이트를 처리합니다.

### 주요 사용자 타입
- **경영자(Client)**: 비서를 구인하는 CEO
- **비서(Secretary)**: 업무를 찾는 전문 비서

## 기술 스택

### Backend
- **Supabase**: BaaS (Backend as a Service)
  - PostgreSQL 데이터베이스
  - 실시간 구독
  - 파일 스토리지
  - Row Level Security (RLS)
  - 서버리스 함수

### Frontend Integration
- **@supabase/supabase-js**: Supabase 클라이언트 라이브러리
- **React Query** (선택사항): 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리

## 데이터베이스 스키마

### 1. users (사용자 기본 정보)
Supabase Auth와 연동되는 확장 프로필 테이블

```sql
- id: UUID (FK to auth.users)
- email: VARCHAR
- user_type: ENUM ('client', 'secretary')
- name: VARCHAR
- phone: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 2. client_profiles (경영자 프로필)
```sql
- id: UUID (PK)
- user_id: UUID (FK to users)
- company_name: VARCHAR
- business_number: VARCHAR
- position: VARCHAR
- region: VARCHAR
- bio: TEXT
- avatar_url: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 3. secretary_profiles (비서 프로필)
```sql
- id: UUID (PK)
- user_id: UUID (FK to users)
- region: VARCHAR
- bio: TEXT
- specialty: TEXT (일정관리, 문서작성 등)
- education: VARCHAR
- experience_years: INTEGER
- hourly_rate: INTEGER
- rating: DECIMAL(3,2)
- review_count: INTEGER
- completed_jobs: INTEGER
- avatar_url: VARCHAR
- available_days: JSONB (요일별 가능 여부)
- languages: JSONB (언어 능력)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 4. verifications (인증 정보)
```sql
- id: UUID (PK)
- user_id: UUID (FK to users)
- verification_type: ENUM ('identity', 'business', 'revenue', 'salary')
- status: ENUM ('pending', 'approved', 'rejected')
- document_url: VARCHAR
- verified_at: TIMESTAMP
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 5. certifications (자격증)
```sql
- id: UUID (PK)
- secretary_id: UUID (FK to secretary_profiles)
- name: VARCHAR
- issuer: VARCHAR
- issue_date: DATE
- certificate_url: VARCHAR
- created_at: TIMESTAMP
```

### 6. work_history (경력 사항)
```sql
- id: UUID (PK)
- secretary_id: UUID (FK to secretary_profiles)
- company_name: VARCHAR
- position: VARCHAR
- start_date: DATE
- end_date: DATE
- description: TEXT
- created_at: TIMESTAMP
```

### 7. job_postings (공고)
```sql
- id: UUID (PK)
- client_id: UUID (FK to client_profiles)
- title: VARCHAR
- description: TEXT
- categories: JSONB (업무 카테고리)
- region: VARCHAR
- work_type: ENUM ('full_time', 'part_time', 'contract')
- salary_type: ENUM ('monthly', 'hourly', 'negotiable')
- salary_amount: INTEGER
- start_date: DATE
- end_date: DATE
- status: ENUM ('recruiting', 'in_progress', 'closed')
- required_skills: JSONB
- benefits: JSONB
- applicant_count: INTEGER (default 0)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 8. matches (매칭)
```sql
- id: UUID (PK)
- job_posting_id: UUID (FK to job_postings) NULLABLE
- client_id: UUID (FK to client_profiles)
- secretary_id: UUID (FK to secretary_profiles)
- match_type: ENUM ('job_application', 'direct_contact')
- status: ENUM ('pending', 'accepted', 'rejected', 'completed')
- applied_date: TIMESTAMP
- response_date: TIMESTAMP
- message: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 9. contracts (계약)
```sql
- id: UUID (PK)
- match_id: UUID (FK to matches)
- client_id: UUID (FK to client_profiles)
- secretary_id: UUID (FK to secretary_profiles)
- title: VARCHAR
- start_date: DATE
- end_date: DATE
- salary: INTEGER
- status: ENUM ('active', 'pending', 'completed', 'cancelled')
- contract_url: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 10. payments (결제)
```sql
- id: UUID (PK)
- contract_id: UUID (FK to contracts)
- amount: INTEGER
- payment_date: DATE
- payment_method: VARCHAR
- status: ENUM ('pending', 'completed', 'failed')
- description: TEXT
- receipt_url: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 11. reviews (리뷰)
```sql
- id: UUID (PK)
- contract_id: UUID (FK to contracts)
- reviewer_id: UUID (FK to users)
- reviewee_id: UUID (FK to users)
- rating: INTEGER (1-5)
- comment: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 12. messages (메시지) - 향후 구현
```sql
- id: UUID (PK)
- sender_id: UUID (FK to users)
- receiver_id: UUID (FK to users)
- match_id: UUID (FK to matches) NULLABLE
- content: TEXT
- read: BOOLEAN
- created_at: TIMESTAMP
```

## API 구조

### API Service Layer

```
src/
  lib/
    supabase/
      client.ts          # Supabase 클라이언트 초기화
      auth.ts            # 인증 관련 함수
    api/
      users.ts           # 사용자 API
      secretaries.ts     # 비서 API
      clients.ts         # 경영자 API
      jobs.ts            # 공고 API
      matches.ts         # 매칭 API
      contracts.ts       # 계약 API
      payments.ts        # 결제 API
      reviews.ts         # 리뷰 API
      verifications.ts   # 인증 API
  hooks/
    useAuth.ts           # 인증 훅
    useProfile.ts        # 프로필 훅
    useJobs.ts           # 공고 훅
    useMatches.ts        # 매칭 훅
  types/
    database.types.ts    # DB 타입 정의
    api.types.ts         # API 타입 정의
```

## 인증 시스템

### Supabase Auth 플로우

1. **회원가입**
   - Supabase Auth로 사용자 생성
   - users 테이블에 프로필 생성
   - user_type에 따라 client_profiles 또는 secretary_profiles 생성

2. **로그인**
   - Supabase Auth로 로그인
   - 세션 토큰 저장
   - 사용자 프로필 로드

3. **권한 관리**
   - Row Level Security (RLS) 정책 적용
   - 사용자는 자신의 데이터만 수정 가능
   - 공개 데이터는 누구나 읽기 가능

## 주요 기능

### 1. 비서 검색 및 매칭
- 지역, 전문분야, 경력별 필터링
- 평점 및 리뷰 기반 정렬
- 직접 연락하기 (direct_contact)

### 2. 공고 관리
- 공고 생성/수정/삭제
- 지원자 관리
- 상태 변경 (모집중, 진행중, 마감)

### 3. 매칭 시스템
- 공고 지원 (job_application)
- 직접 연락 (direct_contact)
- 승인/거부
- 7일 자동 필터링
- 양측 승인시 계약으로 전환

### 4. 계약 관리
- 계약서 생성
- 진행 상태 추적
- 완료 처리

### 5. 결제 시스템
- 결제 내역 기록
- 영수증 관리
- 통계 집계

### 6. 리뷰 시스템
- 계약 완료 후 리뷰 작성
- 평점 계산 및 업데이트
- 리뷰 표시

### 7. 인증 시스템
- 본인인증
- 사업자 인증
- 매출/연봉 인증
- 문서 업로드

## Row Level Security (RLS) 정책

### 기본 원칙
1. 사용자는 자신의 데이터만 수정 가능
2. 공개 프로필은 모두가 읽기 가능
3. 매칭/계약은 당사자만 접근 가능
4. 관리자는 모든 데이터 접근 가능

### 예시 정책
```sql
-- secretary_profiles 읽기: 모두 가능
CREATE POLICY "Anyone can read secretary profiles"
ON secretary_profiles FOR SELECT
USING (true);

-- secretary_profiles 수정: 본인만 가능
CREATE POLICY "Users can update own profile"
ON secretary_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- matches 읽기: 당사자만 가능
CREATE POLICY "Users can read own matches"
ON matches FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM client_profiles WHERE id = client_id
    UNION
    SELECT user_id FROM secretary_profiles WHERE id = secretary_id
  )
);
```

## 실시간 기능

### Realtime Subscriptions
- 새로운 매칭 알림
- 메시지 실시간 업데이트 (향후)
- 계약 상태 변경 알림

```typescript
// 매칭 실시간 구독 예시
supabase
  .channel('matches')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'matches',
    filter: `client_id=eq.${clientId}`
  }, (payload) => {
    console.log('New match!', payload)
  })
  .subscribe()
```

## 파일 스토리지

### Storage Buckets
- `avatars`: 프로필 사진
- `documents`: 인증 서류
- `contracts`: 계약서
- `receipts`: 영수증
- `certificates`: 자격증

### 업로드 정책
```sql
-- 사용자는 자신의 폴더에만 업로드 가능
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## 성능 최적화

### 인덱싱
```sql
-- 자주 검색되는 필드에 인덱스
CREATE INDEX idx_secretary_region ON secretary_profiles(region);
CREATE INDEX idx_secretary_rating ON secretary_profiles(rating DESC);
CREATE INDEX idx_job_status ON job_postings(status);
CREATE INDEX idx_matches_status ON matches(status, applied_date DESC);
```

### 캐싱 전략
- React Query로 서버 데이터 캐싱
- Stale time 설정으로 불필요한 요청 감소
- Optimistic update로 UX 향상

## 보안

### 환경 변수
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### API Key 관리
- 프론트엔드: anon key 사용
- 백엔드 작업: service_role key 사용 (절대 노출 금지)

### SQL Injection 방지
- Supabase 클라이언트 사용시 자동 방지
- 파라미터화된 쿼리 사용

## 에러 처리

### 표준 에러 응답
```typescript
interface ApiError {
  message: string
  code: string
  details?: any
}
```

### 에러 코드
- `AUTH_ERROR`: 인증 오류
- `PERMISSION_DENIED`: 권한 없음
- `NOT_FOUND`: 리소스 없음
- `VALIDATION_ERROR`: 입력 검증 오류
- `SERVER_ERROR`: 서버 오류

## 배포

### Supabase 프로젝트 설정
1. Supabase 대시보드에서 새 프로젝트 생성
2. SQL 에디터에서 스키마 실행
3. Storage 버킷 생성
4. RLS 정책 활성화
5. API 키 복사

### 환경별 설정
- **개발**: Local Supabase (선택사항)
- **스테이징**: Supabase 스테이징 프로젝트
- **프로덕션**: Supabase 프로덕션 프로젝트

## 모니터링

### Supabase Dashboard
- API 사용량
- 데이터베이스 성능
- 스토리지 사용량
- 에러 로그

### 로깅
- 주요 API 호출 로깅
- 에러 추적
- 사용자 행동 분석

---

**작성일**: 2025-01-15
**최종 수정**: 2025-01-15
**버전**: 1.0.0
