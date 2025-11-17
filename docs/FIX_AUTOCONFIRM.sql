-- ==========================================
-- Supabase 이메일 자동 확인 활성화
-- ==========================================
--
-- 문제: 회원가입 API가 응답을 받지 못하고 무한 대기
-- 원인: MAILER_AUTOCONFIRM 설정이 false
-- 해결: MAILER_AUTOCONFIRM을 true로 설정
--
-- ==========================================

-- 현재 설정 확인
SELECT name, value FROM auth.config WHERE name = 'MAILER_AUTOCONFIRM';

-- MAILER_AUTOCONFIRM을 true로 설정
UPDATE auth.config
SET value = 'true'
WHERE name = 'MAILER_AUTOCONFIRM';

-- 설정 확인
SELECT name, value FROM auth.config WHERE name = 'MAILER_AUTOCONFIRM';

-- ==========================================
-- 참고: 이 설정 후 회원가입 시
-- - 이메일 확인 없이 즉시 가입 완료
-- - session이 즉시 생성됨
-- - email_confirmed_at이 자동으로 설정됨
-- ==========================================
