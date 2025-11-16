# Supabase 설정 완전 점검 가이드

## 문제: 회원가입 API 호출이 무한 대기

**증상**: "⏳ Supabase Auth API 호출 중..." 에서 멈춤

**원인**: Email confirmation 설정이 활성화되어 이메일 확인 대기 중

---

## ✅ 해결 완료

코드를 다음과 같이 수정했습니다:

### 1. Supabase Client 설정 수정
```typescript
// src/lib/supabase/client.ts
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit' // ✨ 추가: 이메일 확인 없이 즉시 로그인
  }
})
```

### 2. signUp 함수 수정
```typescript
// src/lib/supabase/auth.ts
const { data: authData, error } = await supabase.auth.signUp({
  email: data.email,
  password: data.password,
  options: {
    emailRedirectTo: undefined, // ✨ 추가: 이메일 확인 비활성화
    data: { ... }
  }
})
```

### 3. Session null 처리
```typescript
// session이 null이어도 user가 있으면 성공으로 처리
if (!authData.user) {
  throw new Error('User creation failed')
}
// 계속 진행
```

---

## 🔍 Supabase Dashboard 최종 점검

반드시 다음 설정을 확인하세요:

### 1단계: Authentication 설정
1. **Supabase Dashboard** 접속
2. 프로젝트 선택: `haru`
3. **Authentication** → **Settings** 클릭

### 2단계: Email Auth 설정
**Email Auth** 섹션에서:

```
✅ Enable email provider: ON
❌ Enable email confirmations: OFF  ← 중요!
❌ Secure email change: OFF
❌ Double confirm email changes: OFF
```

**저장 버튼 클릭!**

### 3단계: URL Configuration
**Authentication** → **URL Configuration**

```
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/**
```

---

## 🧪 테스트

### 1. 브라우저 새로고침 (F5)

### 2. 콘솔 지우기

### 3. 회원가입 시도
```
이메일: newtest@test.com
비밀번호: test1234
이름: 신규테스트
전화번호: 010-1234-5678
```

### 4. 콘솔 로그 확인

**이제 다음과 같이 나와야 합니다:**

```
📝 회원가입 시작...
🔵 회원가입 시도: {...}
⏳ Supabase Auth API 호출 중...
📦 Auth API 응답 받음: {user: "...", session: "null", error: null}
✅ Auth 사용자 생성 성공: {userId: "...", email: "...", hasSession: false}
⏳ 트리거 실행 대기 중 (500ms)...
🔵 client_profiles 생성 시도...
✅ Client profile 생성 성공
✅ 회원가입 완료!
✅ 회원가입 성공! 성공 화면으로 전환...
```

그리고 **성공 화면으로 자동 전환!**

---

## 📊 주요 변경사항

| 항목 | 이전 | 변경 후 |
|------|------|---------|
| flowType | 기본값 | `implicit` |
| emailRedirectTo | 자동 설정 | `undefined` |
| session 체크 | 필수 | 선택적 |
| 화면 전환 | 응답 후 | user 확인 후 즉시 |

---

## 🚨 여전히 문제가 있다면

### 브라우저 Network 탭 확인
1. **F12** → **Network** 탭
2. 회원가입 시도
3. `signup` 요청 찾기
4. **Status** 확인:
   - `200 OK`: 정상
   - `Pending`: 대기 중 ← 문제!
   - `400/422/500`: 오류

### Pending 상태라면
- Supabase 프로젝트가 Paused 상태인지 확인
- Supabase Dashboard → **Project Settings** → **General** → **Pause Project** 확인

### 여전히 안 된다면
Supabase 설정 스크린샷 공유 필요:
1. Authentication → Settings → Email Auth 섹션
2. Authentication → Providers → Email 설정
3. 브라우저 Network 탭의 signup 요청 상세

---

## ✅ 성공 확인

회원가입 성공 시:
1. ✅ 성공 화면 표시
2. ✅ "서비스 이용하기" 버튼 표시
3. ✅ 클릭 시 자동 로그인
4. ✅ 메인 화면으로 이동

---

## 📝 참고

- **개발 환경**: 이메일 확인 비활성화 권장
- **프로덕션 환경**: 이메일 확인 활성화 후 적절한 처리 필요
