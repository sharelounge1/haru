-- ============================================
-- 회원가입 오류 수정: users 테이블 자동 생성 트리거
-- ============================================
--
-- 문제: 회원가입 시 "Database error saving new user" 오류 발생
-- 원인: auth.users 생성 시 users 테이블에 자동 insert하는 트리거가
--       phone 필드를 누락하고 있음
--
-- 해결: 트리거 함수를 phone 필드를 포함하도록 수정
--
-- ============================================

-- Step 1: 기존 트리거 삭제 (있다면)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 2: 기존 함수 삭제 (있다면)
DROP FUNCTION IF EXISTS public.create_user_profile();

-- Step 3: 새로운 트리거 함수 생성 (phone 필드 포함)
CREATE OR REPLACE FUNCTION public.create_user_profile()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- auth.users에 새 사용자가 생성될 때 자동으로 public.users에도 생성
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
    -- 에러 발생 시 로그 남기고 NULL 반환하여 auth.users 생성 중단
    RAISE WARNING 'Failed to create user profile: %', SQLERRM;
    RETURN NULL;
END;
$$;

-- Step 4: 트리거 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_profile();

-- Step 5: 함수 실행 권한 부여
GRANT EXECUTE ON FUNCTION public.create_user_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_profile() TO anon;

-- ============================================
-- 검증 쿼리
-- ============================================

-- 1. 트리거 확인
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 2. 함수 확인
SELECT
  routine_name,
  routine_type,
  security_type
FROM information_schema.routines
WHERE routine_name = 'create_user_profile';

-- ============================================
-- 완료!
-- ============================================
--
-- 이 SQL을 Supabase SQL Editor에서 실행하세요.
-- 실행 후 회원가입을 다시 시도해보세요.
--
-- ============================================
