-- ============================================
-- 하루비서 테스트 데이터 생성 SQL
-- ============================================
--
-- 테스트 계정 정보:
--
-- [CEO 계정]
-- 이메일: ceo@test.com
-- 비밀번호: test1234
-- 이름: 김철수 대표
-- 회사: (주)테크스타트업
--
-- [비서 계정]
-- 이메일: secretary@test.com
-- 비밀번호: test1234
-- 이름: 이영희
-- 경력: 5년
--
-- 주의: 이 SQL은 Supabase에서 실제 사용자를 생성하지 않습니다.
-- 먼저 Supabase Auth에서 수동으로 계정을 만든 후,
-- 아래 UUID를 실제 사용자 UUID로 교체하여 실행하세요.
-- ============================================

-- ============================================
-- Step 1: 테스트 사용자 기본 정보 생성
-- (먼저 Supabase Auth에서 사용자를 만들고, UUID를 아래에 입력하세요)
-- ============================================

-- CEO 사용자 (UUID는 Supabase Auth에서 생성된 UUID로 교체)
INSERT INTO users (id, email, name, phone, user_type, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'ceo@test.com', '김철수 대표', '010-1234-5678', 'client', NOW());

-- 비서 사용자 (UUID는 Supabase Auth에서 생성된 UUID로 교체)
INSERT INTO users (id, email, name, phone, user_type, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000002', 'secretary@test.com', '이영희', '010-2345-6789', 'secretary', NOW());


-- ============================================
-- Step 2: CEO 프로필 생성
-- ============================================

INSERT INTO client_profiles (user_id, company_name, business_registration, region, industry, company_size, bio)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    '(주)테크스타트업',
    '123-45-67890',
    '서울 강남구',
    'IT/소프트웨어',
    '10-50명',
    '혁신적인 IT 서비스를 제공하는 스타트업입니다. 빠르게 성장하고 있으며, 전문 비서를 통해 업무 효율을 극대화하고자 합니다.'
  );


-- ============================================
-- Step 3: 비서 프로필 생성 (샘플 5명)
-- ============================================

-- 테스트 비서 1: 이영희
INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count)
VALUES
  (
    '00000000-0000-0000-0000-000000000002',
    5,
    '영어, 일정관리, 문서작성',
    '서울 강남구',
    '5년 경력의 전문 비서입니다. 외국계 기업에서 근무한 경험이 있으며, 영어 비즈니스 커뮤니케이션이 가능합니다.',
    4.8,
    24
  );

-- 샘플 비서 2: 박지수
INSERT INTO users (id, email, name, phone, user_type)
VALUES ('10000000-0000-0000-0000-000000000001', 'secretary2@example.com', '박지수', '010-3456-7890', 'secretary');

INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count)
VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    3,
    '출장동행, 일본어, 여행코디',
    '서울 서초구',
    '해외 출장 동행 전문 비서입니다. 일본어 통역이 가능하며, 출장 일정 조율 및 항공권/호텔 예약 경험이 풍부합니다.',
    4.9,
    18
  );

-- 샘플 비서 3: 최민준
INSERT INTO users (id, email, name, phone, user_type)
VALUES ('10000000-0000-0000-0000-000000000002', 'secretary3@example.com', '최민준', '010-4567-8901', 'secretary');

INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count)
VALUES
  (
    '10000000-0000-0000-0000-000000000002',
    7,
    'MBA, 재무관리, 전략기획',
    '서울 종로구',
    '대기업 임원 비서 출신으로 7년 경력을 보유하고 있습니다. MBA 학위 소지자이며, 재무 보고서 작성 및 전략 기획 지원이 가능합니다.',
    5.0,
    32
  );

-- 샘플 비서 4: 정수아
INSERT INTO users (id, email, name, phone, user_type)
VALUES ('10000000-0000-0000-0000-000000000003', 'secretary4@example.com', '정수아', '010-5678-9012', 'secretary');

INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count)
VALUES
  (
    '10000000-0000-0000-0000-000000000003',
    4,
    '중국어, 무역실무, 계약서검토',
    '서울 영등포구',
    '중국어가 능통한 비서입니다. 무역 회사에서 4년간 근무하며 수출입 실무와 중국 바이어 미팅 지원 경험이 있습니다.',
    4.7,
    21
  );

-- 샘플 비서 5: 강태현
INSERT INTO users (id, email, name, phone, user_type)
VALUES ('10000000-0000-0000-0000-000000000004', 'secretary5@example.com', '강태현', '010-6789-0123', 'secretary');

INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count)
VALUES
  (
    '10000000-0000-0000-0000-000000000004',
    6,
    '운전, 차량관리, 개인일정',
    '서울 송파구',
    '운전 가능한 남성 비서입니다. 6년간 VIP 개인 비서로 근무하며, 차량 관리 및 개인 일정 조율 경험이 풍부합니다.',
    4.9,
    28
  );


-- ============================================
-- Step 4: 자격증 정보 추가
-- ============================================

-- 이영희 자격증
INSERT INTO certifications (secretary_id, name, issuer, issue_date)
SELECT id, 'TOEIC 950점', 'ETS', '2020-05-15'
FROM secretary_profiles WHERE user_id = '00000000-0000-0000-0000-000000000002';

INSERT INTO certifications (secretary_id, name, issuer, issue_date)
SELECT id, '비서 1급', '대한상공회의소', '2019-08-20'
FROM secretary_profiles WHERE user_id = '00000000-0000-0000-0000-000000000002';

-- 최민준 자격증
INSERT INTO certifications (secretary_id, name, issuer, issue_date)
SELECT id, 'MBA', '연세대학교 경영대학원', '2018-02-28'
FROM secretary_profiles WHERE user_id = '10000000-0000-0000-0000-000000000002';


-- ============================================
-- Step 5: 경력 정보 추가
-- ============================================

-- 이영희 경력
INSERT INTO work_history (secretary_id, company_name, position, start_date, end_date, description)
SELECT
  id,
  '글로벌테크코리아',
  '임원비서',
  '2019-03-01',
  '2023-12-31',
  'CEO 비서로 근무하며 일정 관리, 미팅 준비, 영문 이메일 작성 등의 업무를 수행했습니다.'
FROM secretary_profiles WHERE user_id = '00000000-0000-0000-0000-000000000002';

-- 박지수 경력
INSERT INTO work_history (secretary_id, company_name, position, start_date, end_date, description)
SELECT
  id,
  '재팬비즈니스',
  '출장코디네이터',
  '2021-01-15',
  NULL,
  '일본 출장 전담 비서로 항공권, 숙박, 미팅 일정을 총괄 관리했습니다.'
FROM secretary_profiles WHERE user_id = '10000000-0000-0000-0000-000000000001';


-- ============================================
-- Step 6: CEO 공고 생성 (샘플 5개)
-- ============================================

-- 공고 1: 영어 가능 비서
INSERT INTO job_postings (client_id, title, description, region, work_type, salary_amount, salary_type, categories, status)
SELECT
  cp.id,
  '영어 가능한 임원 비서 구합니다',
  '외국계 파트너사와의 미팅이 잦아 영어 커뮤니케이션이 가능한 비서를 찾습니다. 일정 관리, 미팅 준비, 영문 이메일 작성이 주요 업무입니다.',
  '서울 강남구',
  'full_time',
  4000000,
  'monthly',
  ARRAY['business_secretary']::text[],
  'recruiting'
FROM client_profiles cp
WHERE cp.user_id = '00000000-0000-0000-0000-000000000001';

-- 공고 2: 출장 동행 비서
INSERT INTO job_postings (client_id, title, description, region, work_type, salary_amount, salary_type, categories, status, start_date, end_date)
SELECT
  cp.id,
  '미국 출장 동행 비서 (2주)',
  '미국 실리콘밸리 출장에 동행할 비서를 찾습니다. 영어 통역, 일정 관리, 현지 미팅 조율을 담당하게 됩니다.',
  '해외 (미국)',
  'temporary',
  8000000,
  'contract',
  ARRAY['travel_secretary']::text[],
  'recruiting',
  '2024-12-01',
  '2024-12-14'
FROM client_profiles cp
WHERE cp.user_id = '00000000-0000-0000-0000-000000000001';

-- 공고 3: 개인 비서
INSERT INTO job_postings (client_id, title, description, region, work_type, salary_amount, salary_type, categories, status)
SELECT
  cp.id,
  '개인 일정 관리 비서',
  '개인 일정, 가족 행사, 차량 관리 등을 담당할 비서를 찾습니다. 운전 가능자 우대합니다.',
  '서울 서초구',
  'part_time',
  2500000,
  'monthly',
  ARRAY['personal_secretary']::text[],
  'recruiting'
FROM client_profiles cp
WHERE cp.user_id = '00000000-0000-0000-0000-000000000001';

-- 공고 4: 재무 비서
INSERT INTO job_postings (client_id, title, description, region, work_type, salary_amount, salary_type, categories, status)
SELECT
  cp.id,
  '재무 보고서 작성 가능한 비서',
  '월간/분기 재무 보고서 작성 및 투자자 미팅 준비를 지원할 비서를 찾습니다. 회계 또는 재무 관련 지식이 있으신 분을 선호합니다.',
  '서울 강남구',
  'contract',
  5000000,
  'monthly',
  ARRAY['business_secretary']::text[],
  'recruiting'
FROM client_profiles cp
WHERE cp.user_id = '00000000-0000-0000-0000-000000000001';

-- 공고 5: 중국어 가능 비서
INSERT INTO job_postings (client_id, title, description, region, work_type, salary_amount, salary_type, categories, status)
SELECT
  cp.id,
  '중국어 통역 가능한 비서',
  '중국 바이어 미팅 및 무역 실무를 지원할 비서를 찾습니다. 중국어 통역 및 계약서 검토가 가능하신 분을 우대합니다.',
  '서울 영등포구',
  'full_time',
  4500000,
  'monthly',
  ARRAY['business_secretary']::text[],
  'recruiting'
FROM client_profiles cp
WHERE cp.user_id = '00000000-0000-0000-0000-000000000001';


-- ============================================
-- 완료!
-- ============================================
--
-- 데이터 생성이 완료되었습니다.
--
-- 주의사항:
-- 1. 먼저 Supabase Auth에서 다음 계정을 만드세요:
--    - ceo@test.com (비밀번호: test1234)
--    - secretary@test.com (비밀번호: test1234)
--
-- 2. 생성된 사용자의 UUID를 확인하여 위 SQL의 UUID를 교체하세요
--
-- 3. SQL Editor에서 순서대로 실행하세요
--
-- ============================================
