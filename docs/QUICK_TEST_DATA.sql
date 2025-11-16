-- ============================================
-- 빠른 테스트 데이터 생성 (간소화 버전)
-- ============================================
--
-- 이 SQL은 Supabase Auth 계정 생성 없이
-- 바로 데이터베이스에 샘플 데이터만 생성합니다.
--
-- 주의: 실제 로그인은 불가능하며,
-- "로그인 없이 둘러보기" 기능으로 확인할 수 있습니다.
--
-- ============================================

-- 샘플 비서 프로필 5개 생성
DO $$
DECLARE
  secretary1_user_id uuid := gen_random_uuid();
  secretary2_user_id uuid := gen_random_uuid();
  secretary3_user_id uuid := gen_random_uuid();
  secretary4_user_id uuid := gen_random_uuid();
  secretary5_user_id uuid := gen_random_uuid();

  secretary1_profile_id uuid;
  secretary2_profile_id uuid;
  secretary3_profile_id uuid;
  secretary4_profile_id uuid;
  secretary5_profile_id uuid;

  ceo1_user_id uuid := gen_random_uuid();
  ceo1_profile_id uuid;
BEGIN
  -- 비서 1: 이영희
  INSERT INTO users (id, email, name, phone, user_type, created_at)
  VALUES (secretary1_user_id, 'secretary1@demo.com', '이영희', '010-2345-6789', 'secretary', NOW() - interval '6 months');

  INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count, created_at)
  VALUES (
    secretary1_user_id,
    5,
    '영어, 일정관리, 문서작성',
    '서울 강남구',
    '5년 경력의 전문 비서입니다. 외국계 기업에서 근무한 경험이 있으며, 영어 비즈니스 커뮤니케이션이 가능합니다. TOEIC 950점 보유',
    4.8,
    24,
    NOW() - interval '6 months'
  )
  RETURNING id INTO secretary1_profile_id;

  -- 비서 2: 박지수
  INSERT INTO users (id, email, name, phone, user_type, created_at)
  VALUES (secretary2_user_id, 'secretary2@demo.com', '박지수', '010-3456-7890', 'secretary', NOW() - interval '3 months');

  INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count, created_at)
  VALUES (
    secretary2_user_id,
    3,
    '출장동행, 일본어, 여행코디',
    '서울 서초구',
    '해외 출장 동행 전문 비서입니다. 일본어 통역이 가능하며, 출장 일정 조율 및 항공권/호텔 예약 경험이 풍부합니다.',
    4.9,
    18,
    NOW() - interval '3 months'
  )
  RETURNING id INTO secretary2_profile_id;

  -- 비서 3: 최민준
  INSERT INTO users (id, email, name, phone, user_type, created_at)
  VALUES (secretary3_user_id, 'secretary3@demo.com', '최민준', '010-4567-8901', 'secretary', NOW() - interval '1 year');

  INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count, created_at)
  VALUES (
    secretary3_user_id,
    7,
    'MBA, 재무관리, 전략기획',
    '서울 종로구',
    '대기업 임원 비서 출신으로 7년 경력을 보유하고 있습니다. MBA 학위 소지자이며, 재무 보고서 작성 및 전략 기획 지원이 가능합니다.',
    5.0,
    32,
    NOW() - interval '1 year'
  )
  RETURNING id INTO secretary3_profile_id;

  -- 비서 4: 정수아
  INSERT INTO users (id, email, name, phone, user_type, created_at)
  VALUES (secretary4_user_id, 'secretary4@demo.com', '정수아', '010-5678-9012', 'secretary', NOW() - interval '4 months');

  INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count, created_at)
  VALUES (
    secretary4_user_id,
    4,
    '중국어, 무역실무, 계약서검토',
    '서울 영등포구',
    '중국어가 능통한 비서입니다. 무역 회사에서 4년간 근무하며 수출입 실무와 중국 바이어 미팅 지원 경험이 있습니다. HSK 6급',
    4.7,
    21,
    NOW() - interval '4 months'
  )
  RETURNING id INTO secretary4_profile_id;

  -- 비서 5: 강태현
  INSERT INTO users (id, email, name, phone, user_type, created_at)
  VALUES (secretary5_user_id, 'secretary5@demo.com', '강태현', '010-6789-0123', 'secretary', NOW() - interval '8 months');

  INSERT INTO secretary_profiles (user_id, experience_years, specialty, region, bio, rating, review_count, created_at)
  VALUES (
    secretary5_user_id,
    6,
    '운전, 차량관리, 개인일정',
    '서울 송파구',
    '운전 가능한 남성 비서입니다. 6년간 VIP 개인 비서로 근무하며, 차량 관리 및 개인 일정 조율 경험이 풍부합니다. 1종 보통 면허 보유',
    4.9,
    28,
    NOW() - interval '8 months'
  )
  RETURNING id INTO secretary5_profile_id;

  -- 자격증 추가
  INSERT INTO certifications (secretary_id, name, issuer, issue_date)
  VALUES
    (secretary1_profile_id, 'TOEIC 950점', 'ETS', '2020-05-15'),
    (secretary1_profile_id, '비서 1급', '대한상공회의소', '2019-08-20'),
    (secretary3_profile_id, 'MBA', '연세대학교 경영대학원', '2018-02-28'),
    (secretary4_profile_id, 'HSK 6급', '중국 한반', '2021-03-10'),
    (secretary5_profile_id, '1종 보통 면허', '경찰청', '2015-06-20');

  -- 경력 추가
  INSERT INTO work_history (secretary_id, company_name, position, start_date, end_date, description)
  VALUES
    (
      secretary1_profile_id,
      '글로벌테크코리아',
      '임원비서',
      '2019-03-01',
      '2023-12-31',
      'CEO 비서로 근무하며 일정 관리, 미팅 준비, 영문 이메일 작성 등의 업무를 수행했습니다.'
    ),
    (
      secretary2_profile_id,
      '재팬비즈니스',
      '출장코디네이터',
      '2021-01-15',
      NULL,
      '일본 출장 전담 비서로 항공권, 숙박, 미팅 일정을 총괄 관리했습니다.'
    ),
    (
      secretary3_profile_id,
      '삼성그룹',
      '임원비서실',
      '2017-01-01',
      '2023-06-30',
      '대기업 임원 비서로 근무하며 이사회 준비, 전략 보고서 작성 등을 담당했습니다.'
    ),
    (
      secretary4_profile_id,
      '코리아트레이딩',
      '무역비서',
      '2020-03-01',
      '2024-02-28',
      '중국 바이어 미팅 통역, 수출입 계약서 검토 및 작성을 담당했습니다.'
    ),
    (
      secretary5_profile_id,
      'VIP서비스그룹',
      '개인비서',
      '2018-05-01',
      NULL,
      '대기업 회장님 개인 비서로 일정 관리, 차량 관리, 가족 행사 준비 등을 담당했습니다.'
    );

  -- CEO 계정 생성
  INSERT INTO users (id, email, name, phone, user_type, created_at)
  VALUES (ceo1_user_id, 'ceo1@demo.com', '김철수 대표', '010-1234-5678', 'client', NOW() - interval '1 year');

  INSERT INTO client_profiles (user_id, company_name, business_registration, region, industry, company_size, bio, created_at)
  VALUES (
    ceo1_user_id,
    '(주)테크스타트업',
    '123-45-67890',
    '서울 강남구',
    'IT/소프트웨어',
    '10-50명',
    '혁신적인 IT 서비스를 제공하는 스타트업입니다. 빠르게 성장하고 있으며, 전문 비서를 통해 업무 효율을 극대화하고자 합니다.',
    NOW() - interval '1 year'
  )
  RETURNING id INTO ceo1_profile_id;

  -- 공고 생성
  INSERT INTO job_postings (client_id, title, description, region, work_type, salary_amount, salary_type, categories, status, created_at)
  VALUES
    (
      ceo1_profile_id,
      '영어 가능한 임원 비서 구합니다',
      '외국계 파트너사와의 미팅이 잦아 영어 커뮤니케이션이 가능한 비서를 찾습니다. 일정 관리, 미팅 준비, 영문 이메일 작성이 주요 업무입니다. TOEIC 900점 이상 보유자를 우대합니다.',
      '서울 강남구',
      'full_time',
      4000000,
      'monthly',
      ARRAY['business_secretary']::text[],
      'recruiting',
      NOW() - interval '5 days'
    ),
    (
      ceo1_profile_id,
      '미국 출장 동행 비서 (2주)',
      '미국 실리콘밸리 출장에 동행할 비서를 찾습니다. 영어 통역, 일정 관리, 현지 미팅 조율을 담당하게 됩니다. 해외 출장 경험이 있으신 분을 우대합니다.',
      '해외 (미국)',
      'temporary',
      8000000,
      'contract',
      ARRAY['travel_secretary']::text[],
      'recruiting',
      NOW() - interval '3 days'
    ),
    (
      ceo1_profile_id,
      '개인 일정 관리 비서',
      '개인 일정, 가족 행사, 차량 관리 등을 담당할 비서를 찾습니다. 운전 가능자 우대하며, 주 5일 근무입니다.',
      '서울 서초구',
      'part_time',
      2500000,
      'monthly',
      ARRAY['personal_secretary']::text[],
      'recruiting',
      NOW() - interval '7 days'
    ),
    (
      ceo1_profile_id,
      '재무 보고서 작성 가능한 비서',
      '월간/분기 재무 보고서 작성 및 투자자 미팅 준비를 지원할 비서를 찾습니다. 회계 또는 재무 관련 지식이 있으신 분을 선호합니다. MBA 또는 관련 자격증 보유자 우대',
      '서울 강남구',
      'contract',
      5000000,
      'monthly',
      ARRAY['business_secretary']::text[],
      'recruiting',
      NOW() - interval '2 days'
    ),
    (
      ceo1_profile_id,
      '중국어 통역 가능한 비서',
      '중국 바이어 미팅 및 무역 실무를 지원할 비서를 찾습니다. 중국어 통역 및 계약서 검토가 가능하신 분을 우대합니다. HSK 5급 이상 보유자',
      '서울 영등포구',
      'full_time',
      4500000,
      'monthly',
      ARRAY['business_secretary']::text[],
      'recruiting',
      NOW() - interval '1 day'
    );

  RAISE NOTICE '✅ 테스트 데이터 생성 완료!';
  RAISE NOTICE '📊 비서 프로필 5개, 공고 5개가 생성되었습니다.';
END $$;
