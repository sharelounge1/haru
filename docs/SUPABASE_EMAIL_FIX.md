# Supabase 이메일 유효성 검사 오류 해결

## 문제
회원가입 시 "Email address 'test1@test.com' is invalid" 오류 발생

## 원인
Supabase의 이메일 확인 설정이 활성화되어 있거나, 특정 도메인을 차단하고 있음

---

## 해결 방법 1: 이메일 확인 비활성화 (개발 환경 권장)

### 1단계: Supabase 대시보드 접속
1. https://supabase.com 로그인
2. 프로젝트 선택: `haru`

### 2단계: Authentication 설정
1. 왼쪽 메뉴 → **Authentication** 클릭
2. **Settings** 탭 클릭
3. 아래로 스크롤하여 **Email Auth** 섹션 찾기

### 3단계: 이메일 확인 비활성화
다음 옵션을 **비활성화**:
- ✅ **"Enable email confirmations"** → **OFF**로 변경
- ✅ **"Secure email change"** → **OFF**로 변경 (선택사항)

### 4단계: 저장
- **Save** 버튼 클릭

---

## 해결 방법 2: 실제 이메일 주소 사용

Gmail, Naver 등 실제 이메일 서비스 주소 사용:

### 테스트용 이메일 예시
```
your_email+test1@gmail.com
your_email+ceo@gmail.com
your_email+secretary@gmail.com
```

**Gmail Tip**: `+` 기호를 사용하면 하나의 Gmail 계정으로 여러 테스트 계정 생성 가능
- 예: `myemail+test1@gmail.com`, `myemail+test2@gmail.com`
- 모두 `myemail@gmail.com`으로 이메일 수신됨

---

## 해결 방법 3: 로컬 개발용 도메인 사용

```
test@localhost.local
admin@example.local
ceo@dev.local
```

---

## 추가 설정: 이메일 Rate Limit 조정 (선택사항)

개발 중 반복 테스트를 위해:

1. **Authentication → Settings**
2. **Rate Limits** 섹션에서:
   - Email sending rate: **높은 값으로 설정** (예: 100/hour)

---

## 설정 후 테스트

### 1. 이메일 확인 비활성화 후
```
이메일: test@test.com
비밀번호: test1234
```
→ 즉시 회원가입 완료, 이메일 확인 불필요

### 2. 실제 이메일 사용 시
```
이메일: youremail+test@gmail.com
비밀번호: test1234
```
→ 이메일 확인 링크 수신 → 클릭하여 확인 완료

---

## 개발 완료 후 프로덕션 설정

**중요**: 실제 서비스 배포 전에는 이메일 확인을 **다시 활성화**해야 합니다!

1. **Authentication → Settings**
2. **"Enable email confirmations"** → **ON**으로 변경
3. 이메일 템플릿 커스터마이징 (선택사항)

---

## 문제 해결 체크리스트

- [ ] Supabase Authentication 설정에서 "Enable email confirmations" 비활성화
- [ ] 회원가입 폼에서 아무 이메일로 테스트
- [ ] 정상 회원가입 확인
- [ ] 로그인 테스트
- [ ] 프로덕션 배포 전 이메일 확인 재활성화 예정

---

## 참고

### Supabase 이메일 확인 설정 위치
```
Dashboard → Authentication → Settings → Email Auth → Enable email confirmations
```

### 이메일 템플릿 설정 (선택사항)
```
Dashboard → Authentication → Email Templates
```

여기서 회원가입 확인 이메일, 비밀번호 재설정 이메일 등의 템플릿을 커스터마이징할 수 있습니다.
