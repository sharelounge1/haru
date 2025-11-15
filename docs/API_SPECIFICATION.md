# API 명세서

**문서 버전**: 1.0
**최종 수정일**: 2025-01-15
**Base URL**: `https://api.haru-secretary.com/api/v1` (예시)

## 개요

하루비서 앱의 모든 API 엔드포인트를 정의합니다.
- **Backend**: Supabase + Render.com 서버
- **인증**: Supabase Auth (JWT 토큰)
- **외부 API**: NICE (본인인증), Hyphen (결제)

## 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": { /* 실제 데이터 */ },
  "message": "선택적 성공 메시지",
  "timestamp": "2025-01-15T10:30:00Z",
  "requestId": "uuid-v4-string"
}
```

### 실패 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 친화적 오류 메시지",
    "details": "개발자용 상세 정보 (선택적)"
  },
  "timestamp": "2025-01-15T10:30:00Z",
  "requestId": "uuid-v4-string"
}
```

## HTTP 상태 코드

- `200 OK`: 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청 (유효성 검증 실패)
- `401 Unauthorized`: 인증 실패 (토큰 없음/만료)
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `409 Conflict`: 중복 리소스
- `500 Internal Server Error`: 서버 오류

## 인증 헤더

모든 인증이 필요한 엔드포인트는 다음 헤더를 포함해야 합니다:

```http
Authorization: Bearer <Supabase_JWT_Token>
```

---

## 1. 인증 API (Authentication)

### 1.1. 회원가입 (경영자)

- **Endpoint**: `POST /auth/signup/client`
- **설명**: 경영자 회원가입
- **인증**: 불필요
- **Request**:
```json
{
  "email": "client@example.com",
  "password": "securePassword123!",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "profileImageUrl": "https://storage.example.com/profiles/client123.jpg" // 선택
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "userId": "usr_client_001",
    "email": "client@example.com",
    "role": "client",
    "emailVerified": false,
    "message": "회원가입 성공. 이메일 인증을 완료해주세요."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```
- **Response (실패 - 409)**:
```json
{
  "success": false,
  "error": {
    "code": "AUTH_EMAIL_ALREADY_EXISTS",
    "message": "이미 등록된 이메일입니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 1.2. 회원가입 (비서)

- **Endpoint**: `POST /auth/signup/secretary`
- **설명**: 비서 회원가입 (본인인증 포함)
- **인증**: 불필요
- **Request**:
```json
{
  "email": "secretary@example.com",
  "password": "securePassword123!",
  "name": "김비서",
  "phone": "010-9876-5432",
  "profileImageUrl": "https://storage.example.com/profiles/sec123.jpg", // 필수
  "bio": "10년 경력의 전문 비서입니다.",
  "experience": "대기업 임원 비서 5년, 개인 비서 5년",
  "availableRegions": ["서울", "경기"],
  "niceVerificationToken": "nice_token_from_verification" // NICE 본인인증 토큰
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "userId": "usr_sec_001",
    "email": "secretary@example.com",
    "role": "secretary",
    "approvalStatus": "pending",
    "message": "회원가입 성공. 관리자 승인 후 활동 가능합니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 1.3. 로그인

- **Endpoint**: `POST /auth/login`
- **설명**: 이메일/비밀번호 로그인
- **인증**: 불필요
- **Request**:
```json
{
  "email": "client@example.com",
  "password": "securePassword123!"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "dGhpcyBpcyByZWZyZXNo...",
    "user": {
      "id": "usr_client_001",
      "email": "client@example.com",
      "name": "홍길동",
      "role": "client",
      "profileImageUrl": "https://storage.example.com/profiles/client123.jpg"
    },
    "expiresIn": 3600
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```
- **Response (실패 - 401)**:
```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "이메일 또는 비밀번호가 올바르지 않습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 1.4. 토큰 갱신

- **Endpoint**: `POST /auth/refresh`
- **설명**: Refresh Token으로 Access Token 갱신
- **Request**:
```json
{
  "refreshToken": "dGhpcyBpcyByZWZyZXNo..."
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 1.5. 로그아웃

- **Endpoint**: `POST /auth/logout`
- **설명**: 로그아웃 (토큰 무효화)
- **인증**: 필수
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "로그아웃되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 2. 경영자 인증 API (Client Verification)

### 2.1. 사업자 인증 - API 간편인증 시작

- **Endpoint**: `POST /client-verifications/business/api/start`
- **설명**: 사업자 API 간편인증 시작
- **인증**: 필수 (경영자)
- **Request**:
```json
{
  "businessNumber": "123-45-67890",
  "companyName": "주식회사 하루"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "biz_verify_001",
    "status": "pending",
    "message": "사업자 인증이 진행 중입니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.2. 사업자 인증 - 서류 제출

- **Endpoint**: `POST /client-verifications/business/document`
- **설명**: 사업자 등록증 서류 업로드
- **인증**: 필수 (경영자)
- **Request**: multipart/form-data
```
file: [사업자등록증 파일]
businessNumber: "123-45-67890"
companyName: "주식회사 하루"
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "biz_doc_001",
    "status": "pending_admin_approval",
    "documentUrl": "https://storage.example.com/business/biz_doc_001.pdf",
    "message": "관리자 승인 대기 중입니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.3. 매출 인증 - API 간편인증

- **Endpoint**: `POST /client-verifications/revenue/api/start`
- **설명**: 매출 API 간편인증 시작 (국세청 연동 등)
- **인증**: 필수 (경영자)
- **Request**:
```json
{
  "businessNumber": "123-45-67890",
  "year": 2024,
  "consentToken": "user_consent_token"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "rev_verify_001",
    "status": "verified",
    "revenueAmount": 5000000000,
    "year": 2024,
    "badgeLevel": "high_revenue"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.4. 매출 인증 - 서류 제출

- **Endpoint**: `POST /client-verifications/revenue/document`
- **설명**: 재무제표 또는 손익계산서 업로드
- **인증**: 필수 (경영자)
- **Request**: multipart/form-data
```
file: [재무제표 파일]
year: 2024
revenueAmount: 5000000000
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "rev_doc_001",
    "status": "pending_admin_approval",
    "documentUrl": "https://storage.example.com/revenue/rev_doc_001.pdf"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.5. 연봉 인증 - API 간편인증

- **Endpoint**: `POST /client-verifications/salary/api/start`
- **설명**: 연봉 API 간편인증 시작 (금융기관 연동)
- **인증**: 필수 (경영자)
- **Request**:
```json
{
  "bankCode": "001",
  "accountNumber": "123-456789-01",
  "consentToken": "user_consent_token"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "sal_verify_001",
    "status": "verified",
    "annualSalary": 150000000,
    "badgeLevel": "high_income"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.6. 연봉 인증 - 서류 제출

- **Endpoint**: `POST /client-verifications/salary/document`
- **설명**: 근로소득 원천징수영수증 업로드
- **인증**: 필수 (경영자)
- **Request**: multipart/form-data
```
file: [원천징수영수증 파일]
year: 2024
annualSalary: 150000000
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "sal_doc_001",
    "status": "pending_admin_approval",
    "documentUrl": "https://storage.example.com/salary/sal_doc_001.pdf"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 2.7. 내 인증 현황 조회

- **Endpoint**: `GET /client-verifications/my`
- **설명**: 경영자의 모든 인증 현황 조회
- **인증**: 필수 (경영자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "identityVerified": true,
    "businessVerification": {
      "status": "approved",
      "verifiedAt": "2025-01-10T10:00:00Z",
      "badgeAwarded": true
    },
    "revenueVerification": {
      "status": "pending_admin_approval",
      "submittedAt": "2025-01-14T15:00:00Z",
      "badgeAwarded": false
    },
    "salaryVerification": {
      "status": "approved",
      "verifiedAt": "2025-01-12T11:00:00Z",
      "badgeAwarded": true
    },
    "badges": ["business_verified", "high_income"]
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 3. 본인인증 API (NICE Verification)

### 3.1. 본인인증 시작

- **Endpoint**: `POST /verification/nice/start`
- **설명**: NICE 본인인증 프로세스 시작 (서버에서 NICE API 호출)
- **인증**: 필수 (비서 회원가입 중)
- **Request**:
```json
{
  "name": "김비서",
  "phone": "010-9876-5432",
  "birthdate": "1990-01-01"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "verify_001",
    "nicePopupUrl": "https://nice.checkplus.co.kr/...", // NICE 팝업 URL
    "expiresIn": 300 // 5분
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 3.2. 본인인증 결과 확인

- **Endpoint**: `POST /verification/nice/callback`
- **설명**: NICE 인증 완료 후 콜백 처리 (서버에서 NICE 결과 검증)
- **인증**: 불필요 (NICE에서 호출)
- **Request**:
```json
{
  "verificationId": "verify_001",
  "encData": "NICE에서 전달한 암호화된 데이터"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationToken": "nice_token_abc123", // 회원가입 시 사용
    "name": "김비서",
    "phone": "010-9876-5432",
    "birthdate": "1990-01-01",
    "verified": true
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 4. 비서 프로필 API (Secretary Profiles)

### 4.1. 비서 프로필 조회 (본인)

- **Endpoint**: `GET /secretary-profiles/me`
- **설명**: 로그인한 비서의 프로필 조회
- **인증**: 필수 (비서)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "prof_sec_001",
    "userId": "usr_sec_001",
    "name": "김비서",
    "email": "secretary@example.com",
    "phone": "010-9876-5432",
    "profileImages": [
      {
        "id": "img_001",
        "url": "https://storage.example.com/profiles/sec123_1.jpg",
        "order": 1,
        "isPrimary": true
      },
      {
        "id": "img_002",
        "url": "https://storage.example.com/profiles/sec123_2.jpg",
        "order": 2,
        "isPrimary": false
      }
    ],
    "bio": "10년 경력의 전문 비서입니다.",
    "experience": "대기업 임원 비서 5년, 개인 비서 5년",
    "education": "서울대학교 경영학과 졸업",
    "skills": ["문서 작성", "일정 관리", "회의 준비", "영어 통역"],
    "categories": ["business_secretary", "travel_secretary"],
    "badges": [
      {
        "id": "badge_english",
        "name": "영어 가능",
        "icon": "🇬🇧",
        "verifiedAt": "2025-01-05T10:00:00Z"
      },
      {
        "id": "badge_driving",
        "name": "운전 가능",
        "icon": "🚗",
        "verifiedAt": "2025-01-05T10:00:00Z"
      }
    ],
    "availableRegions": ["서울", "경기"],
    "rating": 4.8,
    "reviewCount": 23,
    "approvalStatus": "approved",
    "verifiedAt": "2025-01-10T12:00:00Z",
    "createdAt": "2025-01-05T10:00:00Z"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.2. 비서 프로필 수정

- **Endpoint**: `PUT /secretary-profiles/me`
- **설명**: 비서 프로필 정보 수정
- **인증**: 필수 (비서)
- **Request**:
```json
{
  "bio": "15년 경력의 전문 비서입니다.",
  "experience": "대기업 임원 비서 10년, 개인 비서 5년",
  "education": "서울대학교 경영학과 졸업",
  "skills": ["문서 작성", "일정 관리", "회의 준비", "영어 통역", "중국어 회화"],
  "categories": ["business_secretary", "travel_secretary", "personal_secretary"],
  "availableRegions": ["서울", "경기", "인천"]
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "prof_sec_001",
    "message": "프로필이 수정되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.3. 프로필 이미지 추가

- **Endpoint**: `POST /secretary-profiles/me/images`
- **설명**: 프로필 이미지 추가 (다중 업로드)
- **인증**: 필수 (비서)
- **Request**: multipart/form-data
```
file: [이미지 파일]
order: 3
isPrimary: false
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "imageId": "img_003",
    "url": "https://storage.example.com/profiles/sec123_3.jpg",
    "order": 3,
    "isPrimary": false
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.4. 프로필 이미지 삭제

- **Endpoint**: `DELETE /secretary-profiles/me/images/:imageId`
- **설명**: 특정 프로필 이미지 삭제
- **인증**: 필수 (비서)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "이미지가 삭제되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.5. 배지 추가

- **Endpoint**: `POST /secretary-profiles/me/badges`
- **설명**: 비서 배지 추가
- **인증**: 필수 (비서)
- **Request**:
```json
{
  "badgeType": "english", // english | driving | cooking | yoga 등
  "proofDocument": "https://storage.example.com/badges/toeic_900.pdf" // 선택
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "badgeId": "badge_003",
    "badgeType": "english",
    "name": "영어 가능",
    "status": "pending_verification",
    "message": "관리자 승인 대기 중입니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.6. 배지 삭제

- **Endpoint**: `DELETE /secretary-profiles/me/badges/:badgeId`
- **설명**: 배지 삭제
- **인증**: 필수 (비서)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "배지가 삭제되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.7. 비서 검색 (경영자용 - 고급 필터)

- **Endpoint**: `GET /secretaries`
- **설명**: 비서 목록 조회 (고급 필터링, 정렬)
- **인증**: 필수 (경영자)
- **Query Parameters**:
  - `keyword`: 검색어 (이름, 소개 내용)
  - `region`: 지역 필터 (예: "서울")
  - `minAge`: 최소 나이
  - `maxAge`: 최대 나이
  - `gender`: 성별 (male | female | other)
  - `categories`: 비서 카테고리 (예: "business_secretary,personal_secretary")
  - `badges`: 필수 배지 (예: "english,driving")
  - `minRating`: 최소 평점 (예: 4.0)
  - `sortBy`: 정렬 기준 (rating | reviewCount | createdAt)
  - `page`: 페이지 번호 (기본값: 1)
  - `limit`: 페이지당 항목 수 (기본값: 20)
- **Request 예시**:
```
GET /secretaries?keyword=영어&region=서울&minAge=25&maxAge=35&gender=female&categories=business_secretary&badges=english,driving&minRating=4.0&sortBy=rating&page=1&limit=10
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "secretaries": [
      {
        "id": "prof_sec_001",
        "name": "김비서",
        "profileImageUrl": "https://storage.example.com/profiles/sec123.jpg",
        "bio": "10년 경력의 전문 비서입니다.",
        "availableRegions": ["서울", "경기"],
        "rating": 4.8,
        "reviewCount": 23
      },
      // ... 더 많은 비서
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "itemsPerPage": 10
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 3.4. 비서 공개 프로필 조회

- **Endpoint**: `GET /secretaries/:id`
- **설명**: 특정 비서의 공개 프로필 조회
- **인증**: 필수 (경영자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "prof_sec_001",
    "name": "김비서",
    "profileImageUrl": "https://storage.example.com/profiles/sec123.jpg",
    "bio": "10년 경력의 전문 비서입니다.",
    "experience": "대기업 임원 비서 5년, 개인 비서 5년",
    "availableRegions": ["서울", "경기"],
    "rating": 4.8,
    "reviewCount": 23,
    "recentReviews": [
      {
        "id": "rev_001",
        "rating": 5,
        "comment": "매우 만족스러운 서비스였습니다.",
        "clientName": "홍길동",
        "createdAt": "2025-01-10T12:00:00Z"
      }
    ]
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 4. 구인 요청 API (Job Requests)

### 4.1. 구인 요청 작성

- **Endpoint**: `POST /job-requests`
- **설명**: 경영자가 구인 요청 작성
- **인증**: 필수 (경영자)
- **Request**:
```json
{
  "title": "강원도 출장 운전 동행",
  "description": "3일간 강원도 출장 운전 및 일정 관리를 도와주실 분을 찾습니다.",
  "startDate": "2025-01-20",
  "endDate": "2025-01-22",
  "startTime": "09:00",
  "endTime": "18:00",
  "region": "강원도",
  "expectedSalary": 500000,
  "requirements": "운전 가능, 출장 경험 우대"
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "id": "req_001",
    "clientId": "usr_client_001",
    "title": "강원도 출장 운전 동행",
    "status": "open", // open | closed | completed
    "createdAt": "2025-01-15T10:30:00Z"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.2. 내 요청 목록 조회 (경영자)

- **Endpoint**: `GET /job-requests/my`
- **설명**: 경영자가 작성한 요청 목록
- **인증**: 필수 (경영자)
- **Query Parameters**:
  - `status`: 상태 필터 (open | closed | completed)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "id": "req_001",
        "title": "강원도 출장 운전 동행",
        "startDate": "2025-01-20",
        "endDate": "2025-01-22",
        "region": "강원도",
        "status": "open",
        "applicantCount": 5,
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 12
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.3. 요청 상세 조회

- **Endpoint**: `GET /job-requests/:id`
- **설명**: 구인 요청 상세 정보
- **인증**: 필수
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "req_001",
    "clientId": "usr_client_001",
    "clientName": "홍길동",
    "clientProfileImageUrl": "https://storage.example.com/profiles/client123.jpg",
    "title": "강원도 출장 운전 동행",
    "description": "3일간 강원도 출장 운전 및 일정 관리를 도와주실 분을 찾습니다.",
    "startDate": "2025-01-20",
    "endDate": "2025-01-22",
    "startTime": "09:00",
    "endTime": "18:00",
    "region": "강원도",
    "expectedSalary": 500000,
    "requirements": "운전 가능, 출장 경험 우대",
    "status": "open",
    "applicantCount": 5,
    "createdAt": "2025-01-15T10:30:00Z"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.4. 구인 요청 목록 조회 (비서용)

- **Endpoint**: `GET /job-requests`
- **설명**: 비서가 볼 수 있는 구인 요청 목록
- **인증**: 필수 (비서)
- **Query Parameters**:
  - `region`: 지역 필터
  - `startDate`: 시작일 필터
  - `endDate`: 종료일 필터
  - `minSalary`: 최소 급여
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "id": "req_001",
        "clientName": "홍길동",
        "title": "강원도 출장 운전 동행",
        "startDate": "2025-01-20",
        "endDate": "2025-01-22",
        "region": "강원도",
        "expectedSalary": 500000,
        "applicantCount": 5,
        "hasApplied": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 28
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.5. 요청 수정

- **Endpoint**: `PUT /job-requests/:id`
- **설명**: 구인 요청 수정 (작성자만)
- **인증**: 필수 (경영자, 본인)
- **Request**: 작성과 동일
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "req_001",
    "message": "요청이 수정되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 4.6. 요청 삭제

- **Endpoint**: `DELETE /job-requests/:id`
- **설명**: 구인 요청 삭제 (작성자만, 신청자 없을 때만)
- **인증**: 필수 (경영자, 본인)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "요청이 삭제되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 5. 신청 API (Applications)

### 5.1. 요청에 신청하기

- **Endpoint**: `POST /applications`
- **설명**: 비서가 구인 요청에 신청
- **인증**: 필수 (비서)
- **Request**:
```json
{
  "jobRequestId": "req_001",
  "message": "해당 업무에 적합한 경험을 보유하고 있습니다. 성실히 임하겠습니다."
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "id": "app_001",
    "jobRequestId": "req_001",
    "secretaryId": "usr_sec_001",
    "status": "pending", // pending | selected | rejected
    "createdAt": "2025-01-15T10:30:00Z"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 5.2. 내 신청 내역 조회 (비서)

- **Endpoint**: `GET /applications/my`
- **설명**: 비서가 신청한 내역 조회
- **인증**: 필수 (비서)
- **Query Parameters**:
  - `status`: 상태 필터 (pending | selected | rejected)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "app_001",
        "jobRequestId": "req_001",
        "jobRequestTitle": "강원도 출장 운전 동행",
        "clientName": "홍길동",
        "status": "pending",
        "appliedAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 8
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 5.3. 신청자 목록 조회 (경영자)

- **Endpoint**: `GET /job-requests/:id/applications`
- **설명**: 특정 요청에 신청한 비서 목록
- **인증**: 필수 (경영자, 요청 작성자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "app_001",
        "secretary": {
          "id": "usr_sec_001",
          "name": "김비서",
          "profileImageUrl": "https://storage.example.com/profiles/sec123.jpg",
          "rating": 4.8,
          "reviewCount": 23
        },
        "message": "해당 업무에 적합한 경험을 보유하고 있습니다.",
        "status": "pending",
        "appliedAt": "2025-01-15T10:30:00Z"
      }
    ]
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 5.4. 비서 선택 (매칭 확정)

- **Endpoint**: `POST /applications/:id/select`
- **설명**: 경영자가 신청자 중 한 명 선택 (매칭 확정)
- **인증**: 필수 (경영자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "matchId": "match_001",
    "applicationId": "app_001",
    "message": "매칭이 확정되었습니다. 결제를 진행해주세요."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 5.5. 신청 취소

- **Endpoint**: `DELETE /applications/:id`
- **설명**: 비서가 신청 취소
- **인증**: 필수 (비서, 본인)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "신청이 취소되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 6. 매칭 API (Matches)

### 6.1. 내 매칭 목록 조회

- **Endpoint**: `GET /matches/my`
- **설명**: 로그인한 사용자의 매칭 내역
- **인증**: 필수
- **Query Parameters**:
  - `status`: 상태 필터 (confirmed | in_progress | completed | cancelled)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "id": "match_001",
        "jobRequestTitle": "강원도 출장 운전 동행",
        "clientName": "홍길동",
        "secretaryName": "김비서",
        "startDate": "2025-01-20",
        "endDate": "2025-01-22",
        "region": "강원도",
        "salary": 500000,
        "status": "confirmed",
        "hasReviewed": false,
        "createdAt": "2025-01-15T11:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 3
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 6.2. 매칭 상세 조회

- **Endpoint**: `GET /matches/:id`
- **설명**: 매칭 상세 정보
- **인증**: 필수 (매칭 당사자만)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "id": "match_001",
    "jobRequest": {
      "id": "req_001",
      "title": "강원도 출장 운전 동행",
      "description": "3일간 강원도 출장...",
      "startDate": "2025-01-20",
      "endDate": "2025-01-22",
      "region": "강원도"
    },
    "client": {
      "id": "usr_client_001",
      "name": "홍길동",
      "profileImageUrl": "https://storage.example.com/profiles/client123.jpg"
    },
    "secretary": {
      "id": "usr_sec_001",
      "name": "김비서",
      "profileImageUrl": "https://storage.example.com/profiles/sec123.jpg",
      "rating": 4.8
    },
    "salary": 500000,
    "status": "completed",
    "payment": {
      "status": "completed",
      "paidAt": "2025-01-15T11:30:00Z"
    },
    "hasClientReviewed": true,
    "hasSecretaryReviewed": false,
    "createdAt": "2025-01-15T11:00:00Z",
    "completedAt": "2025-01-22T18:00:00Z"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 6.3. 매칭 완료 처리

- **Endpoint**: `POST /matches/:id/complete`
- **설명**: 매칭 업무 완료 처리 (양측 모두 완료 확인 필요)
- **인증**: 필수 (매칭 당사자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "matchId": "match_001",
    "status": "completed",
    "message": "매칭이 완료되었습니다. 리뷰를 작성해주세요."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 7. 리뷰 API (Reviews)

### 7.1. 리뷰 작성

- **Endpoint**: `POST /reviews`
- **설명**: 매칭 완료 후 리뷰 작성
- **인증**: 필수
- **Request**:
```json
{
  "matchId": "match_001",
  "targetUserId": "usr_sec_001", // 평가 대상 (비서 또는 경영자)
  "rating": 5,
  "comment": "매우 만족스러운 서비스였습니다."
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "id": "rev_001",
    "matchId": "match_001",
    "rating": 5,
    "createdAt": "2025-01-23T10:00:00Z"
  },
  "timestamp": "2025-01-23T10:00:00Z"
}
```

### 7.2. 비서의 받은 리뷰 조회

- **Endpoint**: `GET /reviews/secretary/:secretaryId`
- **설명**: 특정 비서가 받은 리뷰 목록
- **인증**: 필수
- **Query Parameters**:
  - `sortBy`: 정렬 (recent | rating)
  - `page`, `limit`: 페이지네이션
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "averageRating": 4.8,
    "totalReviews": 23,
    "reviews": [
      {
        "id": "rev_001",
        "rating": 5,
        "comment": "매우 만족스러운 서비스였습니다.",
        "clientName": "홍길동",
        "jobRequestTitle": "강원도 출장 운전 동행",
        "createdAt": "2025-01-23T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 23
    }
  },
  "timestamp": "2025-01-23T10:00:00Z"
}
```

---

## 8. 결제 API (Payments)

> **참고**: Hyphen API 연동은 서버에서 처리하며, 클라이언트는 이 API를 호출합니다.

### 8.1. 결제 시작

- **Endpoint**: `POST /payments/initiate`
- **설명**: 매칭 확정 후 결제 시작
- **인증**: 필수 (경영자)
- **Request**:
```json
{
  "matchId": "match_001",
  "amount": 500000,
  "paymentMethod": "card" // card | transfer
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_001",
    "hyphenPaymentUrl": "https://hyphen.com/pay/abc123", // Hyphen 결제 페이지
    "expiresIn": 600 // 10분
  },
  "timestamp": "2025-01-15T11:00:00Z"
}
```

### 8.2. 결제 콜백 처리

- **Endpoint**: `POST /payments/callback`
- **설명**: Hyphen 결제 완료 후 콜백
- **인증**: 불필요 (Hyphen에서 호출)
- **Request**:
```json
{
  "paymentId": "pay_001",
  "status": "success", // success | failed
  "transactionId": "hyphen_txn_123"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_001",
    "status": "completed",
    "matchStatus": "in_progress"
  },
  "timestamp": "2025-01-15T11:10:00Z"
}
```

### 8.3. 정산 처리

- **Endpoint**: `POST /payments/:matchId/settle`
- **설명**: 매칭 완료 후 비서에게 정산 (자동 또는 수동)
- **인증**: 필수 (관리자 또는 시스템)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "settlementId": "settle_001",
    "matchId": "match_001",
    "secretaryId": "usr_sec_001",
    "amount": 475000, // 수수료 제외
    "status": "completed",
    "settledAt": "2025-01-23T12:00:00Z"
  },
  "timestamp": "2025-01-23T12:00:00Z"
}
```

---

## 9. 관리자 API (Admin)

### 9.1. 비서 승인 대기 목록

- **Endpoint**: `GET /admin/secretary-approvals`
- **설명**: 승인 대기 중인 비서 목록
- **인증**: 필수 (관리자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "pendingSecretaries": [
      {
        "id": "usr_sec_002",
        "name": "이비서",
        "email": "lee@example.com",
        "phone": "010-1111-2222",
        "profileImageUrl": "https://storage.example.com/profiles/sec002.jpg",
        "verifiedAt": "2025-01-14T10:00:00Z",
        "appliedAt": "2025-01-14T09:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 3
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 9.2. 비서 승인

- **Endpoint**: `POST /admin/secretary-approvals/:id/approve`
- **설명**: 비서 승인
- **인증**: 필수 (관리자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "secretaryId": "usr_sec_002",
    "approvalStatus": "approved",
    "message": "비서가 승인되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 9.3. 비서 거부

- **Endpoint**: `POST /admin/secretary-approvals/:id/reject`
- **설명**: 비서 승인 거부
- **인증**: 필수 (관리자)
- **Request**:
```json
{
  "reason": "제출한 서류가 불완전합니다."
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "secretaryId": "usr_sec_002",
    "approvalStatus": "rejected",
    "message": "비서 승인이 거부되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 9.4. 전체 매칭 목록 (관리자)

- **Endpoint**: `GET /admin/matches`
- **설명**: 모든 매칭 내역 조회
- **인증**: 필수 (관리자)
- **Query Parameters**: status, startDate, endDate, page, limit
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "id": "match_001",
        "jobRequestTitle": "강원도 출장 운전 동행",
        "clientName": "홍길동",
        "secretaryName": "김비서",
        "status": "completed",
        "salary": 500000,
        "createdAt": "2025-01-15T11:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 98
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 9.5. 사용자 통계

- **Endpoint**: `GET /admin/statistics`
- **설명**: 전체 통계 데이터
- **인증**: 필수 (관리자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "totalUsers": 542,
    "totalClients": 289,
    "totalSecretaries": 243,
    "pendingSecretaries": 3,
    "totalMatches": 98,
    "completedMatches": 87,
    "totalRevenue": 45600000,
    "averageRating": 4.6
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 10. 알림 API (Notifications)

### 10.1. 내 알림 목록

- **Endpoint**: `GET /notifications/my`
- **설명**: 로그인한 사용자의 알림 목록
- **인증**: 필수
- **Query Parameters**:
  - `isRead`: 읽음 여부 필터 (true | false)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_001",
        "type": "application_received", // application_received | match_confirmed | review_received 등
        "title": "새로운 신청이 있습니다",
        "message": "김비서님이 '강원도 출장 운전 동행' 요청에 신청하셨습니다.",
        "relatedId": "app_001",
        "relatedType": "application",
        "isRead": false,
        "createdAt": "2025-01-15T10:30:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 18
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 10.2. 알림 읽음 처리

- **Endpoint**: `PUT /notifications/:id/read`
- **설명**: 특정 알림 읽음 처리
- **인증**: 필수
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "알림이 읽음 처리되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 10.3. 전체 알림 읽음 처리

- **Endpoint**: `PUT /notifications/read-all`
- **설명**: 모든 알림 읽음 처리
- **인증**: 필수
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "message": "모든 알림이 읽음 처리되었습니다.",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 11. 파일 업로드 API (File Upload)

### 11.1. 프로필 이미지 업로드

- **Endpoint**: `POST /upload/profile-image`
- **설명**: Supabase Storage에 프로필 이미지 업로드
- **인증**: 필수
- **Request**: multipart/form-data
```
file: [이미지 파일]
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "url": "https://storage.example.com/profiles/user123_1234567890.jpg",
    "fileName": "user123_1234567890.jpg",
    "size": 204800
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 11.2. 자격증명 서류 업로드

- **Endpoint**: `POST /upload/credential`
- **설명**: 비서 자격증명 서류 업로드
- **인증**: 필수 (비서)
- **Request**: multipart/form-data
```
file: [PDF 또는 이미지 파일]
documentType: "id_card" | "career_certificate" | "other"
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "url": "https://storage.example.com/credentials/sec123_idcard.pdf",
    "fileName": "sec123_idcard.pdf",
    "documentType": "id_card",
    "size": 512000
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 에러 코드 정리

| 코드 | 메시지 | HTTP 상태 |
|------|--------|-----------|
| AUTH_EMAIL_ALREADY_EXISTS | 이미 등록된 이메일입니다 | 409 |
| AUTH_INVALID_CREDENTIALS | 이메일 또는 비밀번호가 올바르지 않습니다 | 401 |
| AUTH_TOKEN_EXPIRED | 토큰이 만료되었습니다 | 401 |
| AUTH_UNAUTHORIZED | 인증이 필요합니다 | 401 |
| FORBIDDEN | 권한이 없습니다 | 403 |
| NOT_FOUND | 리소스를 찾을 수 없습니다 | 404 |
| VALIDATION_ERROR | 입력값이 올바르지 않습니다 | 400 |
| SECRETARY_NOT_APPROVED | 비서 승인이 필요합니다 | 403 |
| ALREADY_APPLIED | 이미 신청한 요청입니다 | 409 |
| MATCH_ALREADY_EXISTS | 이미 매칭된 요청입니다 | 409 |
| PAYMENT_FAILED | 결제에 실패했습니다 | 400 |
| FILE_TOO_LARGE | 파일 크기가 너무 큽니다 (최대 5MB) | 400 |
| INVALID_FILE_TYPE | 지원하지 않는 파일 형식입니다 | 400 |
| SERVER_ERROR | 서버 오류가 발생했습니다 | 500 |

---

## 12. 프로필 열람 결제 API (Profile View Payment)

### 12.1. 프로필 열람 결제 시작

- **Endpoint**: `POST /payments/profile-view/initiate`
- **설명**: 비서 프로필 전체 열람을 위한 결제 시작
- **인증**: 필수 (경영자)
- **Request**:
```json
{
  "secretaryProfileId": "prof_sec_001",
  "paymentMethod": "card" // card | kakao_pay | naver_pay
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "paymentId": "pv_pay_001",
    "amount": 10000,
    "paymentUrl": "https://pg.example.com/pay/abc123",
    "expiresIn": 600
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 12.2. 프로필 열람 결제 완료 확인

- **Endpoint**: `GET /payments/profile-view/:paymentId/status`
- **설명**: 결제 완료 여부 확인
- **인증**: 필수 (경영자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "paymentId": "pv_pay_001",
    "status": "completed",
    "secretaryProfileId": "prof_sec_001",
    "amount": 10000,
    "paidAt": "2025-01-15T10:35:00Z",
    "accessGranted": true
  },
  "timestamp": "2025-01-15T10:35:00Z"
}
```

### 12.3. 열람 권한 확인

- **Endpoint**: `GET /secretary-profiles/:id/access`
- **설명**: 특정 비서 프로필에 대한 열람 권한 확인
- **인증**: 필수 (경영자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "hasAccess": true,
    "accessGrantedAt": "2025-01-15T10:35:00Z",
    "viewType": "full" // preview | full
  },
  "timestamp": "2025-01-15T10:40:00Z"
}
```

---

## 13. 관리자 - 경영자 인증 승인 API

### 13.1. 경영자 인증 대기 목록

- **Endpoint**: `GET /admin/client-verifications/pending`
- **설명**: 승인 대기 중인 경영자 인증 목록
- **인증**: 필수 (관리자)
- **Query Parameters**:
  - `verificationType`: business | revenue | salary
  - `page`, `limit`
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verifications": [
      {
        "id": "biz_doc_001",
        "clientId": "usr_client_001",
        "clientName": "홍길동",
        "verificationType": "business",
        "documentUrl": "https://storage.example.com/business/biz_doc_001.pdf",
        "submittedAt": "2025-01-14T10:00:00Z",
        "status": "pending_admin_approval"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15
    }
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 13.2. 경영자 인증 승인

- **Endpoint**: `POST /admin/client-verifications/:id/approve`
- **설명**: 경영자 인증 승인 및 배지 부여
- **인증**: 필수 (관리자)
- **Request**:
```json
{
  "badgeLevel": "verified", // verified | high_revenue | high_income 등
  "adminNote": "서류 확인 완료"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "biz_doc_001",
    "status": "approved",
    "badgeAwarded": "business_verified",
    "message": "인증이 승인되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 13.3. 경영자 인증 거부

- **Endpoint**: `POST /admin/client-verifications/:id/reject`
- **설명**: 경영자 인증 거부
- **인증**: 필수 (관리자)
- **Request**:
```json
{
  "reason": "제출된 서류가 불완전합니다.",
  "adminNote": "사업자등록증 재제출 필요"
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "verificationId": "biz_doc_001",
    "status": "rejected",
    "message": "인증이 거부되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 14. 관리자 - 시스템 설정 API

### 14.1. 프로필 열람비 조회

- **Endpoint**: `GET /admin/settings/pricing/profile-view`
- **설명**: 현재 프로필 열람비 조회
- **인증**: 필수 (관리자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "amount": 10000,
    "currency": "KRW",
    "updatedAt": "2025-01-10T10:00:00Z",
    "updatedBy": "admin_001"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 14.2. 프로필 열람비 설정

- **Endpoint**: `PUT /admin/settings/pricing/profile-view`
- **설명**: 프로필 열람비 변경
- **인증**: 필수 (관리자)
- **Request**:
```json
{
  "amount": 15000
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "amount": 15000,
    "currency": "KRW",
    "message": "프로필 열람비가 변경되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 14.3. 매칭 수수료 설정

- **Endpoint**: `PUT /admin/settings/pricing/commission`
- **설명**: 매칭 수수료율 설정
- **인증**: 필수 (관리자)
- **Request**:
```json
{
  "rate": 0.05 // 5%
}
```
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "rate": 0.05,
    "message": "수수료율이 변경되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 14.4. 배지 목록 관리

- **Endpoint**: `GET /admin/settings/badges`
- **설명**: 전체 배지 목록 조회
- **인증**: 필수 (관리자)
- **Response (성공 - 200)**:
```json
{
  "success": true,
  "data": {
    "secretaryBadges": [
      {
        "id": "badge_english",
        "name": "영어 가능",
        "icon": "🇬🇧",
        "requiresVerification": true
      },
      {
        "id": "badge_driving",
        "name": "운전 가능",
        "icon": "🚗",
        "requiresVerification": true
      }
    ],
    "clientBadges": [
      {
        "id": "badge_business_verified",
        "name": "사업자 인증",
        "icon": "🏢",
        "requiresVerification": true
      },
      {
        "id": "badge_high_revenue",
        "name": "고매출 인증",
        "icon": "💰",
        "requiresVerification": true
      }
    ]
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### 14.5. 배지 추가

- **Endpoint**: `POST /admin/settings/badges`
- **설명**: 새로운 배지 추가
- **인증**: 필수 (관리자)
- **Request**:
```json
{
  "badgeType": "secretary", // secretary | client
  "id": "badge_chinese",
  "name": "중국어 가능",
  "icon": "🇨🇳",
  "requiresVerification": true
}
```
- **Response (성공 - 201)**:
```json
{
  "success": true,
  "data": {
    "badgeId": "badge_chinese",
    "message": "배지가 추가되었습니다."
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## 개발 참고사항

### Supabase Auth 토큰 흐름
1. 로그인 성공 시 Supabase Auth에서 JWT 토큰 발급
2. 클라이언트는 `Authorization: Bearer <token>` 헤더로 모든 API 요청
3. 서버는 Supabase SDK로 토큰 검증
4. 토큰 만료 시 `/auth/refresh`로 갱신

### NICE 본인인증 흐름
1. 클라이언트 → `/verification/nice/start` 호출
2. 서버 → NICE API 호출 → 팝업 URL 반환
3. 클라이언트 → NICE 팝업 열림
4. 사용자 인증 완료 → NICE → 서버 콜백 (`/verification/nice/callback`)
5. 서버 → 인증 토큰 생성 → 클라이언트에 전달
6. 클라이언트 → 회원가입 시 토큰 포함

### Hyphen 결제 흐름
1. 클라이언트 → `/payments/initiate` 호출
2. 서버 → Hyphen API 호출 → 결제 URL 반환
3. 클라이언트 → Hyphen 결제 페이지로 리디렉션
4. 사용자 결제 완료 → Hyphen → 서버 콜백 (`/payments/callback`)
5. 서버 → 매칭 상태 업데이트 → 클라이언트에 알림

---

**참고**: 실제 구현 시 엔드포인트와 100% 일치하도록 업데이트하세요.
