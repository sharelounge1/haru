# 하루비서 프로젝트 문서

## 📚 문서 목록

### 1. 백엔드 아키텍처
- **[BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)** - 전체 백엔드 시스템 아키텍처
  - 기술 스택
  - 데이터베이스 스키마 설명
  - API 구조
  - 인증 시스템
  - RLS 정책
  - 실시간 기능
  - 파일 스토리지
  - 보안

### 2. 설정 가이드
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - 프로젝트 초기 설정 가이드
  - Supabase 프로젝트 생성
  - 데이터베이스 스키마 설정
  - Storage 버킷 생성
  - 환경 변수 설정
  - 패키지 설치
  - 개발 서버 실행
  - 트러블슈팅

### 3. 데이터베이스
- **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - Supabase SQL 스크립트
  - 모든 테이블 생성
  - ENUM 타입 정의
  - 인덱스 생성
  - 트리거 및 함수
  - RLS 정책
  - 실행 방법: Supabase SQL Editor에 복사하여 실행

## 🚀 빠른 시작

### 1. 환경 설정
```bash
# 1. 저장소 클론 (이미 있음)
cd haru

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 Supabase 정보 입력
```

### 2. Supabase 설정
```bash
# Supabase 대시보드에서:
# 1. 새 프로젝트 생성
# 2. SQL Editor에서 DATABASE_SCHEMA.sql 실행
# 3. Storage 버킷 생성 (avatars, documents, contracts, receipts, certificates)
# 4. API 키 복사하여 .env에 입력
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 📁 프로젝트 구조

```
haru/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── screens/        # 페이지 컴포넌트
│   │   │   ├── auth/       # 인증 관련 화면
│   │   │   ├── client/     # CEO 화면
│   │   │   ├── secretary/  # 비서 화면
│   │   │   └── admin/      # 관리자 화면
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   └── ui/             # UI 컴포넌트 (shadcn/ui)
│   ├── lib/                # 라이브러리
│   │   ├── supabase/       # Supabase 설정
│   │   │   ├── client.ts   # Supabase 클라이언트
│   │   │   └── auth.ts     # 인증 함수
│   │   └── api/            # API 함수들
│   │       ├── users.ts    # 사용자 API
│   │       ├── secretaries.ts  # 비서 API
│   │       ├── jobs.ts     # 공고 API
│   │       ├── matches.ts  # 매칭 API
│   │       ├── contracts.ts    # 계약 API
│   │       ├── payments.ts # 결제 API
│   │       └── reviews.ts  # 리뷰 API
│   ├── hooks/              # React Hooks
│   │   └── useAuth.ts      # 인증 훅
│   ├── stores/             # 상태 관리 (Zustand)
│   │   └── authStore.ts    # 인증 스토어
│   ├── types/              # TypeScript 타입
│   │   └── database.types.ts  # DB 타입 정의
│   └── App.tsx             # 메인 앱 컴포넌트
├── docs/                   # 문서
│   ├── README.md           # 이 파일
│   ├── BACKEND_ARCHITECTURE.md
│   ├── SETUP_GUIDE.md
│   └── DATABASE_SCHEMA.sql
├── .env.example            # 환경 변수 예시
└── package.json
```

## 🔑 주요 기능

### 인증
- [x] 회원가입 (경영자/비서 구분)
- [x] 로그인
- [x] 로그아웃
- [x] 비밀번호 재설정
- [ ] OAuth (Google, Kakao 등) - 향후 구현

### 비서 기능
- [x] 프로필 관리
- [x] 공고 검색 및 지원
- [x] 매칭 관리
- [x] 계약 관리
- [x] 리뷰 관리
- [x] 자격증/경력 관리

### CEO 기능
- [x] 프로필 관리
- [x] 비서 검색
- [x] 공고 등록/관리
- [x] 지원자 관리
- [x] 매칭 관리 (7일 자동 필터링)
- [x] 계약 관리
- [x] 결제 관리
- [x] 인증 시스템 (본인, 사업자, 매출, 연봉)

## 🔐 보안

### Row Level Security (RLS)
모든 테이블에 RLS 정책이 적용되어 있습니다:
- 사용자는 자신의 데이터만 수정 가능
- 공개 프로필은 모두가 읽기 가능
- 매칭/계약은 당사자만 접근 가능

### 환경 변수
```env
# .env 파일 (절대 커밋하지 않음!)
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**중요**: `.env` 파일은 절대 Git에 커밋하지 마세요!

## 📊 데이터베이스

### 주요 테이블
1. **users** - 사용자 기본 정보
2. **client_profiles** - 경영자 프로필
3. **secretary_profiles** - 비서 프로필
4. **job_postings** - 공고
5. **matches** - 매칭
6. **contracts** - 계약
7. **payments** - 결제
8. **reviews** - 리뷰
9. **verifications** - 인증
10. **certifications** - 자격증
11. **work_history** - 경력
12. **messages** - 메시지 (향후 구현)

자세한 내용은 [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql) 참조

## 🛠 개발 도구

### 필수 패키지
```json
{
  "@supabase/supabase-js": "^2.x",
  "zustand": "^4.x",
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "lucide-react": "^0.x"
}
```

### 개발 명령어
```bash
npm run dev      # 개발 서버
npm run build    # 빌드
npm run preview  # 프리뷰
npm run lint     # 린트
```

## 📝 API 사용 예시

### 인증
```typescript
import { signIn, signUp, signOut } from '@/lib/supabase/auth'

// 회원가입
await signUp({
  email: 'user@example.com',
  password: 'password123',
  userType: 'client',
  name: '홍길동',
  phone: '010-1234-5678'
})

// 로그인
await signIn({
  email: 'user@example.com',
  password: 'password123'
})

// 로그아웃
await signOut()
```

### 비서 검색
```typescript
import { searchSecretaries } from '@/lib/api/secretaries'

const secretaries = await searchSecretaries({
  region: '서울 강남구',
  minRating: 4.0,
  sortBy: 'rating',
  limit: 20
})
```

### 공고 생성
```typescript
import { createJob } from '@/lib/api/jobs'

const job = await createJob(clientId, {
  title: 'CEO 개인비서 채용',
  description: '...',
  region: '서울 강남구',
  work_type: 'full_time',
  salary_type: 'monthly',
  salary_amount: 4500000,
  categories: ['일정관리', '문서작성'],
  status: 'recruiting'
})
```

### 매칭 생성
```typescript
import { createMatch } from '@/lib/api/matches'

const match = await createMatch({
  clientId: 'client-uuid',
  secretaryId: 'secretary-uuid',
  matchType: 'job_application',
  jobPostingId: 'job-uuid',
  message: '지원합니다!'
})
```

## 🐛 트러블슈팅

### 문제: "Failed to connect to Supabase"
**해결책**:
- .env 파일의 URL과 KEY 확인
- Supabase 프로젝트가 실행 중인지 확인

### 문제: "Row Level Security policy violation"
**해결책**:
- RLS 정책이 올바르게 설정되었는지 확인
- 사용자가 로그인되어 있는지 확인

### 문제: Storage 업로드 실패
**해결책**:
- Storage 정책이 올바르게 설정되었는지 확인
- 파일 크기 제한 확인 (Free tier: 1GB)

## 📞 지원

문제가 발생하면:
1. 문서를 먼저 확인하세요
2. Supabase 대시보드에서 로그 확인
3. 브라우저 콘솔에서 에러 메시지 확인

## 📄 라이선스

Private Project

---

**작성일**: 2025-01-15
**최종 수정**: 2025-01-15
**버전**: 1.0.0
