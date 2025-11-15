# 하루비서 백엔드 설정 가이드

## 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 설정](#2-데이터베이스-스키마-설정)
3. [Storage 버킷 생성](#3-storage-버킷-생성)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [패키지 설치](#5-패키지-설치)
6. [개발 서버 실행](#6-개발-서버-실행)

---

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성
1. [Supabase](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub 또는 이메일로 회원가입

### 1.2 새 프로젝트 생성
1. Dashboard에서 "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Organization**: 기존 organization 선택 또는 새로 생성
   - **Name**: `haru-secretary` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (저장 필수!)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 사용자용)
   - **Pricing Plan**: Free tier로 시작
3. "Create new project" 클릭
4. 프로젝트 생성 완료까지 약 2분 대기

---

## 2. 데이터베이스 스키마 설정

### 2.1 SQL Editor 접속
1. 좌측 메뉴에서 "SQL Editor" 클릭
2. "New query" 클릭

### 2.2 스키마 실행
1. `docs/DATABASE_SCHEMA.sql` 파일 내용 전체 복사
2. SQL Editor에 붙여넣기
3. 우측 하단 "Run" 버튼 클릭 (또는 Cmd/Ctrl + Enter)
4. 성공 메시지 확인: "Success. No rows returned"

### 2.3 테이블 확인
1. 좌측 메뉴에서 "Table Editor" 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - users
   - client_profiles
   - secretary_profiles
   - job_postings
   - matches
   - contracts
   - payments
   - reviews
   - verifications
   - certifications
   - work_history
   - messages

### 2.4 RLS 정책 확인
1. 각 테이블 선택
2. 우측 상단 "..." 메뉴 → "View policies" 클릭
3. RLS 정책들이 올바르게 생성되었는지 확인

---

## 3. Storage 버킷 생성

### 3.1 Storage 접속
1. 좌측 메뉴에서 "Storage" 클릭
2. "Create a new bucket" 클릭

### 3.2 필요한 버킷 생성
다음 버킷들을 순서대로 생성:

#### 3.2.1 avatars (프로필 사진)
- **Name**: `avatars`
- **Public bucket**: ✅ 체크 (공개)
- "Create bucket" 클릭

#### 3.2.2 documents (인증 서류)
- **Name**: `documents`
- **Public bucket**: ❌ 비공개
- "Create bucket" 클릭

#### 3.2.3 contracts (계약서)
- **Name**: `contracts`
- **Public bucket**: ❌ 비공개
- "Create bucket" 클릭

#### 3.2.4 receipts (영수증)
- **Name**: `receipts`
- **Public bucket**: ❌ 비공개
- "Create bucket" 클릭

#### 3.2.5 certificates (자격증)
- **Name**: `certificates`
- **Public bucket**: ✅ 체크 (공개)
- "Create bucket" 클릭

### 3.3 Storage 정책 설정

각 버킷에 대한 정책을 설정합니다.

#### avatars 정책
```sql
-- 모두 읽기 가능
CREATE POLICY "Anyone can read avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- 인증된 사용자는 자신의 폴더에 업로드 가능
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 사용자는 자신의 파일 업데이트 가능
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 사용자는 자신의 파일 삭제 가능
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

#### documents 정책
```sql
-- 사용자는 자신의 서류만 읽기 가능
CREATE POLICY "Users can read own documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 사용자는 자신의 폴더에 업로드 가능
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

나머지 버킷(contracts, receipts, certificates)도 유사한 정책을 적용합니다.

---

## 4. 환경 변수 설정

### 4.1 API 키 복사
1. 좌측 메뉴에서 "Settings" → "API" 클릭
2. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOi...` (긴 토큰)

### 4.2 .env 파일 생성
프로젝트 루트에 `.env` 파일 생성:

```bash
# Supabase 설정
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**중요**: 실제 값으로 교체하세요!

### 4.3 .gitignore 확인
`.gitignore` 파일에 다음이 포함되어 있는지 확인:

```
.env
.env.local
.env.*.local
```

---

## 5. 패키지 설치

### 5.1 Supabase 클라이언트 설치
터미널에서 다음 명령어 실행:

```bash
npm install @supabase/supabase-js
```

### 5.2 상태 관리 라이브러리 설치 (선택사항)
```bash
npm install zustand
```

### 5.3 폼 관리 라이브러리 설치 (선택사항)
```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## 6. 개발 서버 실행

### 6.1 의존성 설치
```bash
npm install
```

### 6.2 개발 서버 시작
```bash
npm run dev
```

### 6.3 브라우저에서 확인
```
http://localhost:3000
```

---

## 트러블슈팅

### 문제 1: "Failed to connect to Supabase"
**해결책**:
1. `.env` 파일의 URL과 KEY가 올바른지 확인
2. Supabase 프로젝트가 실행 중인지 확인
3. 브라우저 콘솔에서 네트워크 오류 확인

### 문제 2: "Row Level Security policy violation"
**해결책**:
1. RLS 정책이 올바르게 설정되었는지 확인
2. 사용자가 로그인되어 있는지 확인
3. Supabase Dashboard에서 정책 확인

### 문제 3: "Auth session missing"
**해결책**:
1. 사용자가 로그인되어 있는지 확인
2. `supabase.auth.getSession()`으로 세션 확인
3. 로그인 페이지로 리다이렉트

### 문제 4: Storage 업로드 실패
**해결책**:
1. Storage 정책이 올바르게 설정되었는지 확인
2. 파일 크기 제한 확인 (Free tier: 1GB)
3. 파일 형식이 허용되는지 확인

---

## 다음 단계

1. ✅ Supabase 프로젝트 생성
2. ✅ 데이터베이스 스키마 설정
3. ✅ Storage 버킷 생성
4. ✅ 환경 변수 설정
5. ✅ 패키지 설치
6. 🔄 인증 시스템 구현 → [AUTH_GUIDE.md](./AUTH_GUIDE.md)
7. 🔄 API 서비스 구현 → [API_GUIDE.md](./API_GUIDE.md)
8. 🔄 화면 연결 → [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)

---

**작성일**: 2025-01-15
**최종 수정**: 2025-01-15
**버전**: 1.0.0
