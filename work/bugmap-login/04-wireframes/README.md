# 로그인 저충실도 비교

[전체 이미지 비교](index.html) · [검수](review.md) · [행동 명세](../03-structure/behavior.md)

정적 시안이며 공식 로고/SDK/정책 링크 미연결. disabled는 box, enabled는 button으로 구분한 저충실도 표현입니다. 잠금·지원판정 조건은 사용자용 문구가 아니라 외부 검토 명세입니다.

| 상태 | 390×844 | 360×800 | 설명 |
|---|---|---|---|
| default | [PNG](captures/login/default.png) / [SVG](login/default.svg) | [PNG](captures/login-compact/default.png) / [SVG](login-compact/default.svg) | 기본 선택. 정책 영역은 미연결 검토 위치입니다. |
| loading_kakao | [PNG](captures/login/loading_kakao.png) / [SVG](login/loading_kakao.svg) | [PNG](captures/login-compact/loading_kakao.png) / [SVG](login-compact/loading_kakao.svg) | 선택 카카오 유지. 세 선택 비활성 box이며 중복 요청 금지 계약은 behavior.md에 있습니다. |
| loading_naver | [PNG](captures/login/loading_naver.png) / [SVG](login/loading_naver.svg) | [PNG](captures/login-compact/loading_naver.png) / [SVG](login-compact/loading_naver.svg) | 선택 네이버 유지. 세 선택 비활성 box. |
| loading_apple | [PNG](captures/login/loading_apple.png) / [SVG](login/loading_apple.svg) | [PNG](captures/login-compact/loading_apple.png) / [SVG](login-compact/loading_apple.svg) | 선택 Apple 유지. 세 선택 비활성 box. |
| cancelled | [PNG](captures/login/cancelled.png) / [SVG](login/cancelled.svg) | [PNG](captures/login-compact/cancelled.png) / [SVG](login-compact/cancelled.svg) | 중립 취소 안내. 세 선택 다시 활성. |
| network_error | [PNG](captures/login/network_error.png) / [SVG](login/network_error.svg) | [PNG](captures/login-compact/network_error.png) / [SVG](login-compact/network_error.svg) | 카카오 실패 예시. 다른 제공자에도 같은 템플릿. 재시도/다른 방법 48px. |
| unsupported | [PNG](captures/login/unsupported.png) / [SVG](login/unsupported.svg) | [PNG](captures/login-compact/unsupported.png) / [SVG](login-compact/unsupported.svg) | Apple 예시는 검증된 특정 인증 브라우저 미지원 입력을 가정한 시안입니다. 실제 판정 아님. OS만으로 판단 금지. Apple box 비활성, 나머지 선택 활성. |
| service_outage | [PNG](captures/login/service_outage.png) / [SVG](login/service_outage.svg) | [PNG](captures/login-compact/service_outage.png) / [SVG](login-compact/service_outage.svg) | 확인된 일시 장애. 환경 미지원과 구분. |
| success | [PNG](captures/login/success.png) / [SVG](login/success.svg) | [PNG](captures/login-compact/success.png) / [SVG](login-compact/success.svg) | 검토용 연결 명세판. 실제 인증 완료 화면이나 인증검증 결과가 아닙니다. |
| policy_pending | [PNG](captures/login/policy_pending.png) / [SVG](login/policy_pending.svg) | [PNG](captures/login-compact/policy_pending.png) / [SVG](login-compact/policy_pending.svg) | 검토용 미정 상세판. 정책 URL/동의 방식 미정이며 제품 링크에서 진입하지 않습니다. |
