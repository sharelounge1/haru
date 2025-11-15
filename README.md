# 하루비서 (Daily Secretary)

## 프로젝트 개요
- **목적**: 경영자와 비서를 매칭하는 신뢰 기반 플랫폼
- **사용자**: 경영자(고객), 비서(서비스 제공자), 관리자
- **환경**: 모바일 웹앱 (추후 하이브리드 앱으로 패키징)

## 기술 스택
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com)
[![Render](https://img.shields.io/badge/Render-Hosting-46E3B7?logo=render)](https://render.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

### 주요 기술
- **Frontend**: React + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Hosting**: Render.com
- **Payment**: Hyphen API
- **Identity Verification**: NICE API

## 주요 기능

### 1. 사용자 관리
- **회원가입 및 인증**
  - 일반 사용자(경영자) 회원가입
  - 비서 회원가입 + NICE 본인인증
  - 이메일 인증
  - 로그인/로그아웃

### 2. 비서 프로필 관리
- **비서 등록 및 인증**
  - 프로필 정보 등록 (사진, 경력, 자기소개)
  - NICE 본인인증 연동
  - 자격증명 관리
  - 서비스 가능 지역 설정
  - 가능한 업무 유형 선택

- **비서 검색 및 조회**
  - 지역별 비서 검색
  - 평점 및 리뷰 조회
  - 경력 및 자격증명 확인

### 3. 구인 요청 매칭
- **경영자 기능**
  - 구인 요청글 작성 (기간, 지역, 업무 내용)
  - 예: "오늘 하루 강원도 출장 운전 해주실 분"
  - 예: "3일간 여행 동행 비서 구합니다"
  - 신청한 비서 목록 확인
  - 비서 선택 및 매칭 확정

- **비서 기능**
  - 구인 요청글 목록 조회
  - 관심 있는 요청에 신청
  - 매칭 상태 확인

### 4. 결제 및 정산
- **매칭비 결제**
  - Hyphen API 연동
  - 안전한 에스크로 방식
  - 서비스 완료 후 정산

### 5. 리뷰 및 평가
- **상호 평가 시스템**
  - 경영자 → 비서 평가
  - 비서 → 경영자 평가
  - 별점 및 리뷰 작성

### 6. 관리자 기능
- **사용자 관리**
  - 회원 정보 조회
  - 비서 자격증명 승인/거부
  - 신고 및 제재 관리

- **매칭 관리**
  - 전체 매칭 내역 조회
  - 분쟁 조정

## 프로젝트 구조
```
haru/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui 컴포넌트
│   │   ├── common/          # 공통 컴포넌트
│   │   ├── screens/         # 화면 컴포넌트
│   │   └── layout/          # 레이아웃 컴포넌트
│   ├── stores/              # 상태 관리
│   ├── hooks/               # 커스텀 훅
│   ├── services/            # API 서비스
│   │   ├── api/             # API 클라이언트
│   │   ├── auth/            # 인증 서비스
│   │   └── supabase/        # Supabase 클라이언트
│   ├── types/               # TypeScript 타입 정의
│   ├── utils/               # 유틸리티 함수
│   └── assets/              # 이미지, 폰트 등
├── docs/                    # 프로젝트 문서
│   ├── screenshots/         # 화면 캡처
│   ├── INFORMATION_ARCHITECTURE.md
│   ├── SCREEN_SPECIFICATIONS.md
│   ├── API_SPECIFICATION.md
│   └── DESIGN_SYSTEM.md
├── scripts/                 # 자동화 스크립트
└── supabase/               # Supabase 설정 및 마이그레이션
```

## 데이터 모델 (개념)

### 주요 테이블
- **users**: 사용자 기본 정보
- **secretary_profiles**: 비서 프로필 및 자격증명
- **job_requests**: 구인 요청글
- **applications**: 비서 신청 내역
- **matches**: 확정된 매칭
- **reviews**: 리뷰 및 평가
- **payments**: 결제 내역

## 개발 가이드

### 시작하기
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 Supabase, NICE, Hyphen API 키 설정

# 개발 서버 시작
npm run dev
```

### 주요 명령어
- `npm run dev`: 개발 서버 실행 (포트: 5173)
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 앱 미리보기
- `npm run type-check`: TypeScript 타입 체크
- `npm run lint`: ESLint 실행

### 스크린샷 캡처 및 문서 생성
```bash
# 모든 스크린샷 캡처
npm run capture:all

# 명세서 생성
npm run docs:generate

# 스크린샷 캡처 + 명세서 생성
npm run docs:update
```

## 문서
- [정보구조도](./docs/INFORMATION_ARCHITECTURE.md) - 전체 사이트맵 및 화면 구조
- [화면명세서](./docs/SCREEN_SPECIFICATIONS.md) - 각 화면의 상세 기능 및 스크린샷
- [API명세서](./docs/API_SPECIFICATION.md) - Backend API 엔드포인트 명세
- [디자인시스템](./docs/DESIGN_SYSTEM.md) - UI/UX 디자인 가이드

## 보안 및 개인정보 보호
- **민감 정보 처리**: NICE/Hyphen API 키는 클라이언트 노출 금지
- **서버리스 환경**: Supabase Edge Functions 또는 Render.com 서버에서 API 호출 처리
- **인증**: Supabase Auth를 통한 안전한 사용자 인증
- **데이터 암호화**: 개인정보 암호화 저장

## 개발 시 고려사항
1. **NICE 본인인증**: 비서 등록 시 필수
2. **사진 업로드**: Supabase Storage 활용
3. **실시간 알림**: Supabase Realtime으로 매칭 알림
4. **결제 안전성**: Hyphen API 에스크로 방식
5. **반응형 디자인**: 모바일 우선 설계

## 다음 단계
- [ ] 와이어프레임 설계
- [ ] Supabase 프로젝트 설정
- [ ] 데이터베이스 스키마 설계
- [ ] 비서 프로필 등록 화면 구현
- [ ] 구인 요청 등록 화면 구현
- [ ] NICE API 연동
- [ ] Hyphen API 연동
- [ ] 매칭 로직 구현

## 프로젝트 진행률
![Progress](https://img.shields.io/badge/진행률-5%25-orange)
- 완료된 모듈: 0/8
- 현재 진행 중: 기획 및 설계 단계

## 라이선스
Private Project

---

**개발 문의**: [프로젝트 담당자 연락처]
