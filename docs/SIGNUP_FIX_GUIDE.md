# 회원가입 오류 해결 가이드

## 문제 상황
- 회원가입 시 "Database error saving new user" 오류 발생
- 브라우저 콘솔에 `POST .../auth/v1/signup 500 (Internal Server Error)` 표시

## 원인 분석
Supabase Auth에서 사용자 생성 시, `auth.users` 테이블에 INSERT가 성공하면 **자동으로** `public.users` 테이블에도 데이터를 생성하는 트리거가 실행되어야 합니다.

하지만 현재 트리거 함수에 **`phone` 필드가 누락**되어 있어, users 테이블의 NOT NULL 제약조건을 위반하거나 제대로 데이터가 생성되지 않고 있습니다.

## 해결 방법

### 1단계: Supabase 대시보드 접속
1. https://supabase.com 로그인
2. 프로젝트 선택: `haru` (또는 해당 프로젝트)
3. 왼쪽 메뉴에서 **SQL Editor** 클릭

### 2단계: 트리거 수정 SQL 실행
`docs/FIX_SIGNUP_TRIGGER.sql` 파일의 전체 내용을 복사하여 SQL Editor에 붙여넣고 **Run** 버튼 클릭

또는 아래 SQL을 직접 실행:

```sql
-- 기존 트리거 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.create_user_profile();

-- 새로운 트리거 함수 생성 (phone 필드 포함)
CREATE OR REPLACE FUNCTION public.create_user_profile()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.users (id, email, user_type, name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'client'),
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE WARNING 'Failed to create user profile: %', SQLERRM;
    RETURN NULL;
END;
$$;

-- 트리거 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_profile();

-- 권한 부여
GRANT EXECUTE ON FUNCTION public.create_user_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_profile() TO anon;
```

### 3단계: 트리거 생성 확인
SQL Editor에서 다음 쿼리 실행하여 트리거가 제대로 생성되었는지 확인:

```sql
-- 트리거 확인
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 함수 확인
SELECT
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines
WHERE routine_name = 'create_user_profile';
```

결과가 나와야 정상입니다.

### 4단계: 회원가입 테스트
1. 로컬 개발 서버 실행 확인 (`npm run dev`)
2. http://localhost:3000/signup/client 접속
3. 회원가입 진행:
   - 이메일: test@test.com
   - 비밀번호: test1234
   - 이름: 테스트
   - 전화번호: 010-1234-5678

### 5단계: 성공 확인
- 회원가입 성공 시 자동으로 홈 화면으로 이동
- 오류 없이 로그인 상태 유지

## 기술 상세

### 수정된 부분
**수정 전:**
```sql
INSERT INTO users (id, email, user_type, name)  -- phone 누락
VALUES (...)
```

**수정 후:**
```sql
INSERT INTO users (id, email, user_type, name, phone)  -- phone 추가
VALUES (
  NEW.id,
  NEW.email,
  COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'client'),
  COALESCE(NEW.raw_user_meta_data->>'name', ''),
  COALESCE(NEW.raw_user_meta_data->>'phone', '')  -- 메타데이터에서 추출
)
```

### 트리거 동작 흐름
1. 사용자가 회원가입 폼 제출
2. `auth.signUp()` 호출 → Supabase Auth API로 전송
3. Supabase Auth가 `auth.users` 테이블에 INSERT
4. **트리거 자동 실행** → `public.users` 테이블에도 INSERT
5. 클라이언트 코드에서 프로필 테이블 생성 (`client_profiles` 또는 `secretary_profiles`)

## 문제 해결 안내

### 여전히 오류가 발생하는 경우

#### 1. RLS 정책 확인
```sql
-- users 테이블의 RLS 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'users';
```

#### 2. users 테이블 제약조건 확인
```sql
-- users 테이블 구조 확인
\d users

-- NOT NULL 제약 조건 확인
SELECT column_name, is_nullable
FROM information_schema.columns
WHERE table_name = 'users';
```

#### 3. 트리거 함수 로그 확인
Supabase 대시보드 → Logs → Functions에서 에러 로그 확인

#### 4. auth.users 메타데이터 확인
테스트용으로 아래 쿼리 실행하여 메타데이터 구조 확인:
```sql
SELECT id, email, raw_user_meta_data
FROM auth.users
LIMIT 1;
```

## 추가 작업: 테스트 데이터 생성

회원가입 수정 후, 테스트 데이터가 필요한 경우:

```bash
# Supabase SQL Editor에서 실행
# docs/QUICK_TEST_DATA.sql 파일 내용 실행
```

이 스크립트는 다음을 생성합니다:
- 비서 프로필 5개
- CEO 계정 1개
- 공고 5개
- 자격증 및 경력 정보

## 완료 후 확인사항
- ✅ 회원가입이 정상적으로 완료됨
- ✅ 로그인 후 프로필 정보가 표시됨
- ✅ CEO/비서 구분이 정상적으로 작동함
- ✅ 게스트 모드와 로그인 모드 전환이 정상 작동

## 참고 문서
- DATABASE_SCHEMA.sql: 전체 데이터베이스 스키마
- FIX_SIGNUP_TRIGGER.sql: 트리거 수정 SQL
- API_SPECIFICATION.md: API 명세서
