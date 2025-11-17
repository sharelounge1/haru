-- Supabase Auth 설정 확인 쿼리
-- SQL Editor에서 실행하여 현재 설정 상태 확인

-- 1. Auth 설정 확인
SELECT
  name,
  value
FROM
  auth.config
WHERE
  name IN (
    'MAILER_AUTOCONFIRM',
    'DISABLE_SIGNUP',
    'SITE_URL',
    'MAILER_SUBJECTS_CONFIRMATION'
  );

-- 2. 최근 생성된 사용자 확인 (이메일 확인 상태)
SELECT
  id,
  email,
  email_confirmed_at,
  confirmation_sent_at,
  created_at,
  raw_user_meta_data
FROM
  auth.users
ORDER BY
  created_at DESC
LIMIT 5;

-- 3. public.users 테이블 확인 (트리거가 작동하는지)
SELECT
  u.id,
  u.email,
  u.user_type,
  u.name,
  u.phone,
  u.created_at
FROM
  public.users u
ORDER BY
  u.created_at DESC
LIMIT 5;

-- 4. 트리거 확인
SELECT
  trigger_name,
  event_object_table,
  action_statement
FROM
  information_schema.triggers
WHERE
  trigger_name = 'on_auth_user_created';
