# Supabase 이메일 "invalid" 오류 상세 진단

## 문제
모든 이메일 주소가 "Email address ... is invalid" 오류 발생
- `test@test.com` → invalid
- `test@gmail.com` → invalid

이것은 Supabase Auth 설정 문제입니다.

---

## 해결 방법: Supabase 설정 점검

### 1️⃣ Email Provider 활성화 확인

1. https://supabase.com → 프로젝트 `haru` 선택
2. **Authentication** → **Providers** 클릭
3. **Email** provider 찾기
4. **Enable Email provider** 스위치가 **ON**인지 확인
5. OFF라면 → **ON**으로 변경 후 **Save**

---

### 2️⃣ Email Auth 설정 확인

1. **Authentication** → **Settings** 클릭
2. **Email Auth** 섹션에서 다음 확인:

#### 확인 사항:
- ✅ **Enable email provider**: ON
- ✅ **Enable email confirmations**: OFF (개발 중)
- ✅ **Secure email change**: OFF (개발 중)
- ✅ **Minimum password length**: 6

---

### 3️⃣ Site URL 설정 확인

1. **Authentication** → **URL Configuration** 클릭
2. **Site URL** 확인:
   ```
   http://localhost:3000
   ```
3. **Redirect URLs** 추가:
   ```
   http://localhost:3000/**
   ```

---

### 4️⃣ Email Templates 확인

1. **Authentication** → **Email Templates** 클릭
2. **Confirm signup** 템플릿 확인
3. 템플릿이 비어있거나 오류가 있는지 확인

---

### 5️⃣ SMTP 설정 확인

1. **Settings** → **Auth** 클릭
2. **SMTP Settings** 섹션 확인
3. **Custom SMTP**가 설정되어 있다면:
   - 설정이 올바른지 확인
   - 또는 임시로 **Disable custom SMTP** 선택

---

## 브라우저에서 정확한 오류 확인

### Chrome 개발자 도구 사용법:

1. **F12** 키 또는 우클릭 → **검사**
2. **Console** 탭 클릭
3. 회원가입 시도
4. 빨간색 오류 메시지 확인

**예상되는 오류 메시지:**
```
AuthApiError: Email address "test@gmail.com" is invalid
  at ... (supabase-js/...)
```

5. **Network** 탭 클릭
6. `signup` 요청 찾기
7. **Response** 탭에서 오류 내용 확인:

**정상적인 응답:**
```json
{
  "error": {
    "message": "Email address \"test@gmail.com\" is invalid",
    "status": 400
  }
}
```

---

## 임시 해결책: Auth 설정 리셋

위의 방법들이 안 될 경우:

### 방법 1: Email Confirmations 완전히 비활성화
```
Authentication → Settings → Email Auth
→ Enable email confirmations: OFF
→ Double email confirmation: OFF
→ Save
```

### 방법 2: Auth Provider 재설정
1. **Authentication** → **Providers**
2. **Email** provider **Disable**
3. **Save**
4. 다시 **Enable**
5. **Save**

---

## 코드에서 디버깅 추가

임시로 auth.ts 파일에 디버깅 코드 추가:

```typescript
// src/lib/supabase/auth.ts
export async function signUp(data: SignUpData) {
  console.log('🔵 Attempting signup with:', {
    email: data.email,
    userType: data.userType,
    name: data.name
  })

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_type: data.userType,
        name: data.name,
        phone: data.phone
      }
    }
  })

  if (error) {
    console.error('🔴 Signup error:', error)
    console.error('🔴 Error details:', {
      message: error.message,
      status: error.status,
      name: error.name
    })
    throw error
  }

  console.log('✅ Signup successful:', authData)
  // ... 나머지 코드
}
```

이렇게 하면 브라우저 콘솔에서 정확한 오류를 볼 수 있습니다.

---

## 확인 후 다음 단계

1. Supabase 설정 변경 후
2. 페이지 새로고침 (F5)
3. 회원가입 재시도
4. 여전히 오류 발생 시:
   - 브라우저 콘솔의 전체 오류 메시지 복사
   - Supabase Auth 설정 스크린샷

---

## 추가 확인 사항

### Supabase 프로젝트 상태
- 프로젝트가 **Paused** 상태는 아닌지 확인
- 프로젝트 **Dashboard** → 상태 확인

### API 키 만료
- `.env` 파일의 ANON KEY가 유효한지 확인
- Supabase Dashboard → Settings → API → anon public key 비교

---

## 가장 가능성 높은 원인

**1. Email Provider가 비활성화되어 있음**
   → Authentication → Providers → Email → Enable

**2. Email confirmations 설정 문제**
   → Authentication → Settings → Enable email confirmations OFF

**3. SMTP 설정 오류**
   → Settings → Auth → SMTP → Disable custom SMTP

---

위의 설정들을 확인한 후에도 문제가 지속되면,
브라우저 콘솔의 정확한 오류 메시지를 공유해주세요.
