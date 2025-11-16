# 하루비서 Supabase SQL 설정 가이드

## 🚀 빠른 실행 (권장)

Supabase SQL Editor에서 아래 스크립트들을 **순서대로** 복사하여 실행하세요.

---

## 1️⃣ STEP 1: Extensions 및 ENUM 타입 생성

**SQL Editor에 복사하여 실행:**

```sql
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM 타입 정의
CREATE TYPE user_type AS ENUM ('client', 'secretary');
CREATE TYPE verification_type AS ENUM ('identity', 'business', 'revenue', 'salary');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE work_type AS ENUM ('full_time', 'part_time', 'contract');
CREATE TYPE salary_type AS ENUM ('monthly', 'hourly', 'negotiable');
CREATE TYPE job_status AS ENUM ('recruiting', 'in_progress', 'closed');
CREATE TYPE match_type AS ENUM ('job_application', 'direct_contact');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');
CREATE TYPE contract_status AS ENUM ('active', 'pending', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 2️⃣ STEP 2: 테이블 생성 (1/2 - 기본 테이블)

**SQL Editor에 복사하여 실행:**

```sql
-- Users 테이블
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type user_type NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Client Profiles 테이블
CREATE TABLE client_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name VARCHAR(200),
  business_number VARCHAR(50),
  position VARCHAR(100),
  region VARCHAR(100),
  bio TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Secretary Profiles 테이블
CREATE TABLE secretary_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  region VARCHAR(100),
  bio TEXT,
  specialty TEXT,
  education VARCHAR(200),
  experience_years INTEGER DEFAULT 0,
  hourly_rate INTEGER,
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  avatar_url VARCHAR(500),
  available_days JSONB DEFAULT '{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":false,"sun":false}'::jsonb,
  languages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Verifications 테이블
CREATE TABLE verifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  verification_type verification_type NOT NULL,
  status verification_status DEFAULT 'pending' NOT NULL,
  document_url VARCHAR(500),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, verification_type)
);

-- Certifications 테이블
CREATE TABLE certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  secretary_id UUID REFERENCES secretary_profiles(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(200) NOT NULL,
  issuer VARCHAR(200),
  issue_date DATE,
  certificate_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Work History 테이블
CREATE TABLE work_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  secretary_id UUID REFERENCES secretary_profiles(id) ON DELETE CASCADE NOT NULL,
  company_name VARCHAR(200) NOT NULL,
  position VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 3️⃣ STEP 3: 테이블 생성 (2/2 - 비즈니스 테이블)

**SQL Editor에 복사하여 실행:**

```sql
-- Job Postings 테이블
CREATE TABLE job_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  categories JSONB DEFAULT '[]'::jsonb,
  region VARCHAR(100),
  work_type work_type DEFAULT 'full_time',
  salary_type salary_type DEFAULT 'monthly',
  salary_amount INTEGER,
  start_date DATE,
  end_date DATE,
  status job_status DEFAULT 'recruiting' NOT NULL,
  required_skills JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  applicant_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Matches 테이블
CREATE TABLE matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE SET NULL,
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE NOT NULL,
  secretary_id UUID REFERENCES secretary_profiles(id) ON DELETE CASCADE NOT NULL,
  match_type match_type NOT NULL,
  status match_status DEFAULT 'pending' NOT NULL,
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  response_date TIMESTAMP WITH TIME ZONE,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Contracts 테이블
CREATE TABLE contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE NOT NULL,
  secretary_id UUID REFERENCES secretary_profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  salary INTEGER NOT NULL,
  status contract_status DEFAULT 'pending' NOT NULL,
  contract_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Payments 테이블
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50),
  status payment_status DEFAULT 'pending' NOT NULL,
  description TEXT,
  receipt_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews 테이블
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(contract_id, reviewer_id)
);

-- Messages 테이블
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  match_id UUID REFERENCES matches(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 4️⃣ STEP 4: 인덱스 생성

**SQL Editor에 복사하여 실행:**

```sql
-- Users 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);

-- Secretary Profiles 인덱스
CREATE INDEX idx_secretary_region ON secretary_profiles(region);
CREATE INDEX idx_secretary_rating ON secretary_profiles(rating DESC);
CREATE INDEX idx_secretary_experience ON secretary_profiles(experience_years DESC);

-- Client Profiles 인덱스
CREATE INDEX idx_client_region ON client_profiles(region);

-- Job Postings 인덱스
CREATE INDEX idx_job_status ON job_postings(status);
CREATE INDEX idx_job_region ON job_postings(region);
CREATE INDEX idx_job_client ON job_postings(client_id);
CREATE INDEX idx_job_created ON job_postings(created_at DESC);

-- Matches 인덱스
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_client ON matches(client_id);
CREATE INDEX idx_matches_secretary ON matches(secretary_id);
CREATE INDEX idx_matches_job ON matches(job_posting_id);
CREATE INDEX idx_matches_applied ON matches(applied_date DESC);

-- Contracts 인덱스
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_client ON contracts(client_id);
CREATE INDEX idx_contracts_secretary ON contracts(secretary_id);

-- Payments 인덱스
CREATE INDEX idx_payments_contract ON payments(contract_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Reviews 인덱스
CREATE INDEX idx_reviews_contract ON reviews(contract_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);

-- Messages 인덱스
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 5️⃣ STEP 5: 함수 및 트리거 생성

**SQL Editor에 복사하여 실행:**

```sql
-- Updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 각 테이블에 updated_at 트리거 적용
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_secretary_profiles_updated_at BEFORE UPDATE ON secretary_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verifications_updated_at BEFORE UPDATE ON verifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 신규 사용자 프로필 자동 생성 함수
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, user_type, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'client')::user_type,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auth 사용자 생성시 자동으로 프로필 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- 리뷰 작성시 비서 평점 업데이트 함수
CREATE OR REPLACE FUNCTION update_secretary_rating()
RETURNS TRIGGER AS $$
DECLARE
  secretary_user_id UUID;
BEGIN
  SELECT sp.user_id INTO secretary_user_id
  FROM secretary_profiles sp
  WHERE sp.id IN (
    SELECT c.secretary_id
    FROM contracts c
    WHERE c.id = NEW.contract_id
  );

  IF secretary_user_id IS NOT NULL AND NEW.reviewee_id = secretary_user_id THEN
    UPDATE secretary_profiles
    SET
      rating = (
        SELECT AVG(rating)::DECIMAL(3,2)
        FROM reviews
        WHERE reviewee_id = secretary_user_id
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE reviewee_id = secretary_user_id
      )
    WHERE user_id = secretary_user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_secretary_rating();

-- 공고 지원자 수 업데이트 함수
CREATE OR REPLACE FUNCTION update_job_applicant_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.match_type = 'job_application' THEN
    UPDATE job_postings
    SET applicant_count = applicant_count + 1
    WHERE id = NEW.job_posting_id;
  END IF;

  IF TG_OP = 'DELETE' AND OLD.match_type = 'job_application' THEN
    UPDATE job_postings
    SET applicant_count = GREATEST(applicant_count - 1, 0)
    WHERE id = OLD.job_posting_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_match_created_or_deleted
  AFTER INSERT OR DELETE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_job_applicant_count();
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 6️⃣ STEP 6: RLS 활성화

**SQL Editor에 복사하여 실행:**

```sql
-- RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE secretary_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 7️⃣ STEP 7: RLS 정책 생성 (1/3 - Users & Profiles)

**SQL Editor에 복사하여 실행:**

```sql
-- Users 정책
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Client Profiles 정책
CREATE POLICY "Anyone can read client profiles"
  ON client_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own client profile"
  ON client_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own client profile"
  ON client_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Secretary Profiles 정책
CREATE POLICY "Anyone can read secretary profiles"
  ON secretary_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own secretary profile"
  ON secretary_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own secretary profile"
  ON secretary_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Verifications 정책
CREATE POLICY "Users can read own verifications"
  ON verifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own verifications"
  ON verifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own verifications"
  ON verifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Certifications 정책
CREATE POLICY "Anyone can read certifications"
  ON certifications FOR SELECT
  USING (true);

CREATE POLICY "Secretary can manage own certifications"
  ON certifications FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );

-- Work History 정책
CREATE POLICY "Anyone can read work history"
  ON work_history FOR SELECT
  USING (true);

CREATE POLICY "Secretary can manage own work history"
  ON work_history FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 8️⃣ STEP 8: RLS 정책 생성 (2/3 - Jobs & Matches)

**SQL Editor에 복사하여 실행:**

```sql
-- Job Postings 정책
CREATE POLICY "Anyone can read active job postings"
  ON job_postings FOR SELECT
  USING (true);

CREATE POLICY "Client can manage own job postings"
  ON job_postings FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
    )
  );

-- Matches 정책
CREATE POLICY "Users can read own matches"
  ON matches FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
      UNION
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );

CREATE POLICY "Secretary can create matches"
  ON matches FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );

CREATE POLICY "Client can create matches"
  ON matches FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
    )
  );

CREATE POLICY "Users can update own matches"
  ON matches FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
      UNION
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## 9️⃣ STEP 9: RLS 정책 생성 (3/3 - Contracts, Payments, Reviews, Messages)

**SQL Editor에 복사하여 실행:**

```sql
-- Contracts 정책
CREATE POLICY "Users can read own contracts"
  ON contracts FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
      UNION
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );

CREATE POLICY "Users can update own contracts"
  ON contracts FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
      UNION
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );

CREATE POLICY "Users can create contracts"
  ON contracts FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM client_profiles WHERE id = client_id
      UNION
      SELECT user_id FROM secretary_profiles WHERE id = secretary_id
    )
  );

-- Payments 정책
CREATE POLICY "Users can read own payments"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM contracts c
      WHERE c.id = contract_id
      AND auth.uid() IN (
        SELECT user_id FROM client_profiles WHERE id = c.client_id
        UNION
        SELECT user_id FROM secretary_profiles WHERE id = c.secretary_id
      )
    )
  );

CREATE POLICY "Client can create payments"
  ON payments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contracts c
      WHERE c.id = contract_id
      AND auth.uid() IN (
        SELECT user_id FROM client_profiles WHERE id = c.client_id
      )
    )
  );

-- Reviews 정책
CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for own contracts"
  ON reviews FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contracts c
      WHERE c.id = contract_id
      AND auth.uid() IN (
        SELECT user_id FROM client_profiles WHERE id = c.client_id
        UNION
        SELECT user_id FROM secretary_profiles WHERE id = c.secretary_id
      )
    )
    AND auth.uid() = reviewer_id
  );

-- Messages 정책
CREATE POLICY "Users can read own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update received messages"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);
```

**실행 후**: "Success. No rows returned" 메시지 확인

---

## ✅ 완료!

모든 SQL 스크립트 실행이 완료되었습니다!

### 확인 방법:
1. 좌측 메뉴 "Table Editor" 클릭
2. 다음 12개 테이블이 보이는지 확인:
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

### 다음 단계:
```bash
npm run dev
```
개발 서버를 실행하고 테스트하세요!
