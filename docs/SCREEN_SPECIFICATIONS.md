# 화면 명세서

**문서 버전**: 1.0
**최종 수정일**: 2025-01-15

> **참고**: 이 문서는 프로젝트 초기 설계 단계입니다. 실제 화면 구현 후 스크린샷과 함께 업데이트됩니다.
> 스크린샷 캡처는 `scripts/capture-*.mjs` 스크립트를 통해 자동화됩니다.

## 문서 사용 방법

### 스크린샷 캡처 및 명세서 생성 프로세스
1. 화면 구현 완료
2. `scripts/capture-[기능명].mjs` 작성
3. `node scripts/capture-[기능명].mjs` 실행
4. `scripts/generate-complete-spec.cjs`에 화면 정보 추가
5. `node scripts/generate-complete-spec.cjs` 실행하여 이 문서 자동 갱신

---

## 인증 및 온보딩

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>

<tr>
  <td>HS-AUTH-001</td>
  <td><strong>랜딩 페이지</strong><br/><code>/</code></td>
  <td><em>스크린샷 예정</em><br/><code>landing-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>서비스 소개 (메인 배너)</li>
      <li>주요 기능 설명 (3단 카드)</li>
      <li>로그인 버튼</li>
      <li>회원가입 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>앱 접속 → 랜딩 페이지 표시</li>
      <li>로그인 버튼 클릭 → 로그인 화면 이동</li>
      <li>회원가입 버튼 클릭 → 회원가입 타입 선택 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-AUTH-002</td>
  <td><strong>로그인</strong><br/><code>/login</code></td>
  <td><em>스크린샷 예정</em><br/><code>login-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>이메일 입력</li>
      <li>비밀번호 입력</li>
      <li>로그인 버튼</li>
      <li>비밀번호 찾기 링크</li>
      <li>회원가입 링크</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>이메일, 비밀번호 입력 → 유효성 검증</li>
      <li>로그인 버튼 클릭 → Supabase Auth 인증</li>
      <li>성공 → 사용자 역할에 따라 홈 화면 리디렉션</li>
      <li>실패 → 에러 메시지 표시</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-AUTH-003</td>
  <td><strong>회원가입 타입 선택</strong><br/><code>/signup</code></td>
  <td><em>스크린샷 예정</em><br/><code>signup-type-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>경영자 회원가입 선택 카드</li>
      <li>비서 회원가입 선택 카드</li>
      <li>각 유형 설명</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>경영자 선택 → 경영자 회원가입 화면 이동</li>
      <li>비서 선택 → 비서 회원가입 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-AUTH-004</td>
  <td><strong>경영자 회원가입</strong><br/><code>/signup/client</code></td>
  <td><em>스크린샷 예정</em><br/><code>client-signup-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>이름 입력</li>
      <li>이메일 입력</li>
      <li>비밀번호 입력 (확인 포함)</li>
      <li>전화번호 입력</li>
      <li>프로필 사진 업로드 (선택)</li>
      <li>회원가입 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>필수 정보 입력 → 유효성 검증</li>
      <li>회원가입 버튼 클릭 → Supabase Auth 회원가입</li>
      <li>성공 → 이메일 인증 안내</li>
      <li>이메일 인증 완료 → 로그인 화면으로 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-AUTH-005</td>
  <td><strong>비서 회원가입</strong><br/><code>/signup/secretary</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-signup-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>기본 정보 입력 (이름, 이메일, 비밀번호, 전화번호)</li>
      <li>프로필 사진 업로드 (필수)</li>
      <li>자기소개 입력</li>
      <li>경력 입력</li>
      <li>가능 지역 선택</li>
      <li>NICE 본인인증 버튼</li>
      <li>회원가입 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>기본 정보 입력 → 유효성 검증</li>
      <li>NICE 본인인증 완료 (필수)</li>
      <li>프로필 정보 입력</li>
      <li>회원가입 버튼 클릭 → Supabase Auth 회원가입 + 프로필 저장</li>
      <li>성공 → 관리자 승인 대기 안내</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-AUTH-006</td>
  <td><strong>NICE 본인인증</strong><br/><code>/signup/secretary/verify</code></td>
  <td><em>스크린샷 예정</em><br/><code>nice-verification-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>본인인증 시작 버튼</li>
      <li>NICE 인증 팝업 (외부)</li>
      <li>인증 완료 콜백 처리</li>
      <li>인증 결과 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>본인인증 시작 → NICE API 호출 (서버)</li>
      <li>인증 팝업 열림 → 사용자 인증 진행</li>
      <li>인증 완료 → 콜백 처리</li>
      <li>결과 저장 → DB에 인증 상태 업데이트</li>
    </ol>
  </td>
</tr>

</table>

---

## 경영자 기능

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>

<tr>
  <td>HS-CLIENT-001</td>
  <td><strong>경영자 홈</strong><br/><code>/client</code></td>
  <td><em>스크린샷 예정</em><br/><code>client-home-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>6개 메인 메뉴 카드</li>
      <li>최근 매칭 내역 (3개)</li>
      <li>인증 배지 표시</li>
      <li>알림 배지</li>
      <li>프로필 미리보기</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>로그인 성공 → 경영자 홈 표시</li>
      <li>인증 배지 확인 (사업자, 매출, 연봉)</li>
      <li>메뉴 선택 → 해당 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-001-1</td>
  <td><strong>본인인증</strong><br/><code>/client/verifications/identity</code></td>
  <td><em>스크린샷 예정</em><br/><code>client-identity-verification-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>NICE 본인인증 시작 버튼</li>
      <li>인증 상태 표시</li>
      <li>인증 완료 시 배지 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>본인인증 버튼 클릭 → NICE 팝업</li>
      <li>인증 완료 → 상태 업데이트</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-001-2</td>
  <td><strong>사업자 인증</strong><br/><code>/client/verifications/business</code></td>
  <td><em>스크린샷 예정</em><br/><code>business-verification-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>API 간편인증 선택</li>
      <li>서류 제출 선택</li>
      <li>인증 현황 표시</li>
      <li>승인 상태 확인</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>인증 방법 선택 (API / 서류)</li>
      <li>API 선택 → 사업자번호 입력 → 즉시 인증</li>
      <li>서류 선택 → 파일 업로드 → 관리자 승인 대기</li>
      <li>승인 완료 → 배지 부여</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-001-3</td>
  <td><strong>매출 인증</strong><br/><code>/client/verifications/revenue</code></td>
  <td><em>스크린샷 예정</em><br/><code>revenue-verification-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>API 간편인증 (국세청 연동)</li>
      <li>재무제표 서류 제출</li>
      <li>인증 현황 표시</li>
      <li>배지 레벨 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>인증 방법 선택</li>
      <li>API → 동의 후 자동 인증</li>
      <li>서류 → 파일 업로드 → 관리자 승인 대기</li>
      <li>승인 → 배지 부여 (매출 규모별)</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-001-4</td>
  <td><strong>연봉 인증</strong><br/><code>/client/verifications/salary</code></td>
  <td><em>스크린샷 예정</em><br/><code>salary-verification-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>API 간편인증 (금융기관 연동)</li>
      <li>원천징수영수증 제출</li>
      <li>인증 현황 표시</li>
      <li>배지 레벨 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>인증 방법 선택</li>
      <li>API → 은행 계좌 연동 동의 → 자동 인증</li>
      <li>서류 → 원천징수영수증 업로드 → 관리자 승인 대기</li>
      <li>승인 → 배지 부여 (연봉 수준별)</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-001-5</td>
  <td><strong>내 배지</strong><br/><code>/client/mypage/badges</code></td>
  <td><em>스크린샷 예정</em><br/><code>client-my-badges-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>획득한 배지 목록</li>
      <li>배지별 상세 정보</li>
      <li>미획득 배지 안내</li>
      <li>인증 시작 링크</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>배지 현황 확인</li>
      <li>미획득 배지 클릭 → 인증 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-002</td>
  <td><strong>구인 요청 작성</strong><br/><code>/client/requests/new</code></td>
  <td><em>스크린샷 예정</em><br/><code>create-request-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>제목 입력</li>
      <li>업무 내용 상세 입력</li>
      <li>날짜 선택 (시작일, 종료일 또는 "상관없음")</li>
      <li>시간 선택 (시작 시간, 종료 시간 또는 "상관없음")</li>
      <li>지역 선택 (드롭다운)</li>
      <li>원하는 비서 종류 선택 (선택사항)</li>
        - 개인 비서, 업무 비서, 출장 비서, 요가 비서 등</li>
      <li>제시 금액 입력</li>
      <li>등록 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>필수 정보 입력 → 유효성 검증</li>
      <li>"상관없음" 선택 시 검색 필터에서 모든 조건 노출</li>
      <li>등록 버튼 클릭 → API 호출 (POST /job-requests)</li>
      <li>성공 → 내 요청 목록으로 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-003</td>
  <td><strong>내 요청 목록</strong><br/><code>/client/requests/my</code></td>
  <td><em>스크린샷 예정</em><br/><code>my-requests-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>내가 작성한 요청 리스트</li>
      <li>상태별 필터 (모집중, 마감, 완료)</li>
      <li>신청자 수 배지</li>
      <li>요청 카드 클릭 → 상세 화면</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → API 호출 (GET /job-requests/my)</li>
      <li>요청 목록 표시</li>
      <li>요청 선택 → 상세 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-004</td>
  <td><strong>요청 상세 및 신청자 목록</strong><br/><code>/client/requests/:id</code></td>
  <td><em>스크린샷 예정</em><br/><code>request-detail-applicants-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>요청 상세 정보</li>
      <li>신청한 비서 목록 (카드 형식)</li>
      <li>각 비서의 프로필 사진, 평점, 경력</li>
      <li>비서 선택 버튼</li>
      <li>요청 수정/삭제 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 요청 정보 + 신청자 목록 조회</li>
      <li>비서 프로필 클릭 → 비서 상세 프로필 화면</li>
      <li>비서 선택 → 매칭 확정 (결제 프로세스 시작)</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-005</td>
  <td><strong>비서 검색 (고급 필터)</strong><br/><code>/client/secretaries/search</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-search-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>검색바 (키워드 검색)</li>
      <li>나이 필터 (최소/최대)</li>
      <li>성별 필터</li>
      <li>지역 필터</li>
      <li>비서 배지 필터 (영어, 운전 등)</li>
      <li>비서 카테고리 필터 (개인/업무/출장/요가 등)</li>
      <li>평점 필터 (4.0 이상 등)</li>
      <li>비서 카드 목록 (사진 1장, 이름, 나이, 평점, 배지, 간단 소개)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>필터 적용 → API 호출 (GET /secretaries)</li>
      <li>비서 목록 표시 (결제 전 프리뷰)</li>
      <li>비서 클릭 → 프리뷰 화면 (결제 전)</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-005-1</td>
  <td><strong>비서 프로필 프리뷰</strong><br/><code>/client/secretaries/:id</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-profile-preview-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>프로필 사진 1장 미리보기</li>
      <li>나이 표시</li>
      <li>간단한 이력 (학력, 경력 요약)</li>
      <li>배지 표시</li>
      <li>전체 프로필 보기 버튼 (결제 필요 안내)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>제한된 정보 표시</li>
      <li>전체 프로필 보기 클릭 → 결제 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-005-2</td>
  <td><strong>프로필 열람 결제</strong><br/><code>/client/secretaries/:id/payment</code></td>
  <td><em>스크린샷 예정</em><br/><code>profile-view-payment-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>열람 비용 표시 (어드민 설정 금액)</li>
      <li>결제 수단 선택 (카드, 카카오페이, 네이버페이)</li>
      <li>결제하기 버튼</li>
      <li>취소 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>열람 비용 확인</li>
      <li>결제 수단 선택 → 결제 진행</li>
      <li>결제 완료 → 전체 프로필 열람 권한 부여</li>
      <li>전체 프로필 화면으로 자동 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-005-3</td>
  <td><strong>비서 전체 프로필</strong><br/><code>/client/secretaries/:id/full</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-full-profile-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>프로필 사진 여러 장</li>
      <li>이름, 나이, 성별</li>
      <li>자기소개 전체</li>
      <li>상세 경력 및 학력</li>
      <li>능력 (스킬)</li>
      <li>가능 지역</li>
      <li>비서 카테고리</li>
      <li>배지 목록</li>
      <li>받은 리뷰 목록</li>
      <li>직접 제안 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>전체 프로필 정보 표시</li>
      <li>직접 제안 → 채팅 또는 구인 요청 작성</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-006</td>
  <td><strong>비서 공개 프로필</strong><br/><code>/client/secretaries/:id</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-public-profile-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>프로필 사진</li>
      <li>이름, 평점, 리뷰 수</li>
      <li>자기소개</li>
      <li>경력 사항</li>
      <li>가능 지역</li>
      <li>받은 리뷰 목록</li>
      <li>직접 제안 버튼 (선택)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 비서 프로필 조회 (GET /secretaries/:id)</li>
      <li>프로필 정보 표시</li>
      <li>직접 제안 → 채팅 또는 요청 작성 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-007</td>
  <td><strong>매칭 내역</strong><br/><code>/client/matches</code></td>
  <td><em>스크린샷 예정</em><br/><code>client-matches-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>확정된 매칭 목록</li>
      <li>상태별 탭 (진행중, 완료, 취소)</li>
      <li>매칭 카드 (비서 정보, 기간, 상태)</li>
      <li>리뷰 작성 버튼 (완료된 매칭)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 매칭 목록 조회 (GET /matches/my)</li>
      <li>매칭 클릭 → 상세 화면</li>
      <li>리뷰 작성 버튼 → 리뷰 작성 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-CLIENT-008</td>
  <td><strong>리뷰 작성</strong><br/><code>/client/matches/:id/review</code></td>
  <td><em>스크린샷 예정</em><br/><code>write-review-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>별점 선택 (1~5)</li>
      <li>리뷰 텍스트 입력</li>
      <li>등록 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>별점, 리뷰 입력 → 유효성 검증</li>
      <li>등록 → API 호출 (POST /reviews)</li>
      <li>성공 → 매칭 상세 화면으로 돌아가기</li>
    </ol>
  </td>
</tr>

</table>

---

## 비서 기능

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>

<tr>
  <td>HS-SEC-001</td>
  <td><strong>비서 홈</strong><br/><code>/secretary</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-home-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>5개 메인 메뉴 카드</li>
      <li>승인 상태 배너 (승인 대기/승인 완료)</li>
      <li>최근 신청 내역 (3개)</li>
      <li>프로필 완성도 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>로그인 성공 → 비서 홈 표시</li>
      <li>승인 상태 확인 → 미승인 시 기능 제한</li>
      <li>메뉴 선택 → 해당 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-002</td>
  <td><strong>프로필 등록/수정</strong><br/><code>/secretary/profile</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-profile-edit-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>프로필 사진 업로드</li>
      <li>자기소개 입력</li>
      <li>경력 사항 추가/수정/삭제</li>
      <li>가능 지역 다중 선택</li>
      <li>가능 업무 유형 선택</li>
      <li>저장 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 현재 프로필 조회</li>
      <li>정보 수정 → 유효성 검증</li>
      <li>저장 → API 호출 (PUT /secretary-profiles/:id)</li>
      <li>성공 → 프로필 화면으로 돌아가기</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-003</td>
  <td><strong>자격증명 관리</strong><br/><code>/secretary/profile/credentials</code></td>
  <td><em>스크린샷 예정</em><br/><code>credentials-management-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>신분증 사본 업로드</li>
      <li>경력증명서 업로드</li>
      <li>기타 증빙 서류 업로드</li>
      <li>업로드된 서류 목록</li>
      <li>승인 상태 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>파일 선택 → 업로드 (Supabase Storage)</li>
      <li>서류 정보 저장 → DB 업데이트</li>
      <li>관리자 승인 대기</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-004</td>
  <td><strong>구인 요청 찾기</strong><br/><code>/secretary/requests</code></td>
  <td><em>스크린샷 예정</em><br/><code>browse-requests-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>구인 요청 카드 목록</li>
      <li>지역 필터</li>
      <li>기간 필터</li>
      <li>급여 범위 필터</li>
      <li>요청 카드 (제목, 기간, 지역, 급여)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 요청 목록 조회 (GET /job-requests)</li>
      <li>필터 적용 → 목록 갱신</li>
      <li>요청 선택 → 상세 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-005</td>
  <td><strong>요청 상세 및 신청</strong><br/><code>/secretary/requests/:id</code></td>
  <td><em>스크린샷 예정</em><br/><code>request-detail-apply-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>요청 상세 정보</li>
      <li>경영자 프로필 미리보기</li>
      <li>신청 메시지 입력</li>
      <li>신청하기 버튼</li>
      <li>이미 신청한 경우 신청 취소 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 요청 정보 조회</li>
      <li>신청 메시지 입력</li>
      <li>신청하기 → API 호출 (POST /applications)</li>
      <li>성공 → 신청 완료 메시지</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-006</td>
  <td><strong>내 신청 내역</strong><br/><code>/secretary/applications/my</code></td>
  <td><em>스크린샷 예정</em><br/><code>my-applications-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>신청한 요청 목록</li>
      <li>상태별 필터 (대기중, 선정됨, 탈락)</li>
      <li>신청 카드 (요청 제목, 신청일, 상태)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 신청 목록 조회 (GET /applications/my)</li>
      <li>신청 선택 → 상세 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-007</td>
  <td><strong>매칭 내역</strong><br/><code>/secretary/matches</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-matches-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>확정된 매칭 목록</li>
      <li>상태별 탭 (진행중, 완료, 취소)</li>
      <li>매칭 카드 (경영자 정보, 기간, 상태)</li>
      <li>리뷰 작성 버튼 (완료된 매칭)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 매칭 목록 조회</li>
      <li>매칭 클릭 → 상세 화면</li>
      <li>리뷰 작성 버튼 → 리뷰 작성 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-SEC-008</td>
  <td><strong>받은 리뷰</strong><br/><code>/secretary/mypage/reviews</code></td>
  <td><em>스크린샷 예정</em><br/><code>received-reviews-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>평균 별점 표시</li>
      <li>리뷰 목록 (별점, 작성자, 내용, 날짜)</li>
      <li>리뷰 정렬 (최신순, 별점순)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 리뷰 목록 조회 (GET /reviews/secretary/:id)</li>
      <li>리뷰 목록 표시</li>
    </ol>
  </td>
</tr>

</table>

---

## 관리자 기능

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>

<tr>
  <td>HS-ADMIN-001</td>
  <td><strong>관리자 대시보드</strong><br/><code>/admin</code></td>
  <td><em>스크린샷 예정</em><br/><code>admin-dashboard-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>전체 통계 (사용자 수, 매칭 수, 결제액)</li>
      <li>승인 대기 비서 수</li>
      <li>신고 대기 수</li>
      <li>최근 활동 로그</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 통계 데이터 조회</li>
      <li>대시보드 표시</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-ADMIN-002</td>
  <td><strong>사용자 목록</strong><br/><code>/admin/users</code></td>
  <td><em>스크린샷 예정</em><br/><code>users-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>전체 사용자 목록 (테이블)</li>
      <li>역할별 필터 (경영자, 비서, 관리자)</li>
      <li>검색 (이름, 이메일)</li>
      <li>상태 필터 (활성, 정지, 탈퇴)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 사용자 목록 조회</li>
      <li>사용자 클릭 → 상세 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-ADMIN-003</td>
  <td><strong>비서 승인 대기 목록</strong><br/><code>/admin/secretary-approvals</code></td>
  <td><em>스크린샷 예정</em><br/><code>pending-approvals-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>승인 대기 중인 비서 목록</li>
      <li>신청일 순 정렬</li>
      <li>비서 카드 (사진, 이름, 신청일)</li>
      <li>빠른 승인/거부 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 대기 목록 조회</li>
      <li>비서 선택 → 승인 심사 화면</li>
      <li>빠른 승인/거부 → 상태 업데이트</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-ADMIN-004</td>
  <td><strong>비서 승인 심사</strong><br/><code>/admin/secretary-approvals/:id</code></td>
  <td><em>스크린샷 예정</em><br/><code>secretary-approval-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>비서 프로필 전체 정보</li>
      <li>본인인증 결과</li>
      <li>업로드된 증빙 서류 뷰어</li>
      <li>승인 버튼</li>
      <li>거부 버튼 (사유 입력)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 비서 정보 + 서류 조회</li>
      <li>서류 확인</li>
      <li>승인 → 비서 활성화</li>
      <li>거부 → 비서에게 알림 + 사유 전달</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-ADMIN-005</td>
  <td><strong>매칭 관리</strong><br/><code>/admin/matches</code></td>
  <td><em>스크린샷 예정</em><br/><code>all-matches-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>전체 매칭 목록 (테이블)</li>
      <li>상태별 필터</li>
      <li>기간별 필터</li>
      <li>검색 (경영자명, 비서명)</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 매칭 목록 조회</li>
      <li>매칭 클릭 → 상세 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-ADMIN-006</td>
  <td><strong>신고 목록</strong><br/><code>/admin/reports</code></td>
  <td><em>스크린샷 예정</em><br/><code>reports-list-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>신고 목록 (테이블)</li>
      <li>처리 상태별 필터 (대기, 처리중, 완료)</li>
      <li>신고 유형별 필터</li>
      <li>긴급도 표시</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 신고 목록 조회</li>
      <li>신고 클릭 → 상세 화면</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-ADMIN-007</td>
  <td><strong>신고 상세</strong><br/><code>/admin/reports/:id</code></td>
  <td><em>스크린샷 예정</em><br/><code>report-detail-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>신고 내용 전체</li>
      <li>신고자/피신고자 정보</li>
      <li>관련 매칭 정보</li>
      <li>증빙 자료</li>
      <li>처리 메모 입력</li>
      <li>조치 선택 (경고, 정지, 탈퇴)</li>
      <li>완료 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 신고 상세 조회</li>
      <li>내용 확인 → 조치 결정</li>
      <li>처리 완료 → 당사자들에게 알림</li>
    </ol>
  </td>
</tr>

</table>

---

## 공통 화면

<table>
<tr>
  <th style="width: 10%;">화면 ID</th>
  <th style="width: 15%;">화면명</th>
  <th style="width: 50%;">화면 이미지</th>
  <th style="width: 25%;">주요 기능</th>
</tr>

<tr>
  <td>HS-COMMON-001</td>
  <td><strong>알림 목록</strong><br/><code>/notifications</code></td>
  <td><em>스크린샷 예정</em><br/><code>notifications-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>알림 목록 (시간순)</li>
      <li>읽음/안 읽음 표시</li>
      <li>알림 유형별 아이콘</li>
      <li>알림 클릭 → 해당 화면 이동</li>
      <li>전체 읽음 처리 버튼</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 알림 목록 조회</li>
      <li>알림 클릭 → 읽음 처리 + 관련 화면 이동</li>
    </ol>
  </td>
</tr>

<tr>
  <td>HS-COMMON-002</td>
  <td><strong>설정</strong><br/><code>/settings</code></td>
  <td><em>스크린샷 예정</em><br/><code>settings-screen.png</code></td>
  <td>
    <strong>주요 기능:</strong>
    <ul>
      <li>알림 설정 (푸시, 이메일)</li>
      <li>계정 정보 수정</li>
      <li>비밀번호 변경</li>
      <li>언어 설정</li>
      <li>로그아웃</li>
      <li>회원 탈퇴</li>
    </ul>
    <strong>프로세스:</strong>
    <ol>
      <li>화면 진입 → 현재 설정 조회</li>
      <li>설정 변경 → 저장</li>
      <li>로그아웃 → 로그인 화면 이동</li>
    </ol>
  </td>
</tr>

</table>

---

## 다음 단계

### 화면 구현 후 해야 할 일
1. **스크린샷 캡처 스크립트 작성**
   - `scripts/capture-auth.mjs`: 인증 화면 캡처
   - `scripts/capture-client.mjs`: 경영자 화면 캡처
   - `scripts/capture-secretary.mjs`: 비서 화면 캡처
   - `scripts/capture-admin.mjs`: 관리자 화면 캡처

2. **스크린샷 실행**
   ```bash
   node scripts/capture-auth.mjs
   node scripts/capture-client.mjs
   node scripts/capture-secretary.mjs
   node scripts/capture-admin.mjs
   ```

3. **명세서 자동 생성 스크립트 작성**
   - `scripts/generate-complete-spec.cjs`: 위 표를 자동 생성

4. **문서 업데이트**
   ```bash
   npm run docs:generate
   ```

---

**참고**: 이 문서는 실제 구현된 화면과 100% 일치해야 합니다. 화면 추가/변경 시 반드시 업데이트하세요.
