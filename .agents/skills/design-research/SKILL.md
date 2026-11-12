---
name: design-research
description: Use when the design harness needs reference research grounded in actual captured screens, including adoption and avoidance decisions for approved requirements.
---

# Design research

[공통 계약](../design-flow/references/protocol.md)을 읽는다. design_researcher는 승인된 PRD를 입력으로 02-research/만 소유한다. 대상 사용자·과업·요구사항과 리서치가 필요한 가정을 먼저 확인한다.

refs.json에 관련 URL·viewport·선정 이유를 준비하고 refs:capture로 실제 캡처를 얻는다. 기존 캡처는 captures.json의 출처·시각·해시·viewport를 확인한다. **참조한 캡처마다 이미지 도구로 직접 열어 본다.** 도구로 볼 수 없거나 잘못 캡처된 화면은 미검증/blocked로 남기고 다른 설명으로 메우지 않는다.

sources.md에는 URL/최종 URL·조회일·캡처 경로·해시·선정 근거를 기록한다. findings.md에는 레퍼런스별로 다음 슬롯을 채운다.

- **직접 본 것:** 화면 위치와 실제 요소·배치·문구·색/위계. 메타데이터와 다르면 픽셀을 근거로 차이를 적는다.
- **가져올 점:** 관찰 근거 → 해결하는 우리 요구사항 → 적용할 원칙과 범위. 예쁜 이유만 적거나 화면 전체를 복제하지 않는다.
- **피할 점:** 실제로 보인 패턴과 우리 사용자/과업에서 생길 문제. 정적 이미지로 확인할 수 없는 불편을 사실로 만들지 않는다.
- **해석/미검증:** 클릭·스크롤·권한·저장·반응형·접근성 동작은 실제 조작 여부를 별도로 적는다. 로딩/오류가 보이지 않으면 없는 기능이라고 단정하지 않는다.

recommendations.md에서 관찰과 제안을 구분하고 각 제안을 PRD 요구사항에 연결한다. 범위/핵심 여정을 바꾸는 추천은 결정 필요로 조정자에게 돌린다. CLI 캡처 무결성과 의미 검수를 확인해 공통 반환 형식으로 넘긴다. 다음 단계 산출물과 사람 승인/리뷰 기록은 작성하지 않는다.
