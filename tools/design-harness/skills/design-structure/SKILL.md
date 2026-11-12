---
name: design-structure
description: Use when turning approved product requirements and research into the design harness screen structure, state coverage, flows and wireframes.
---

# Design structure

[공통 계약](../design-flow/references/protocol.md)을 읽는다. design_architect는 03-structure/와 04-wireframes/를 맡는다. check로 승인된 PRD·리서치의 현재 버전을 확인하고 요구사항 ID를 원본에서 읽는다. 사용자에게서 들은 승인이나 다른 보고서의 ID를 그대로 복사하지 않는다.

screens.csv에 화면 ID·목적·주요 행동·연결 요구사항을, states.csv에 화면/상태 ID·진입 조건·로딩/빈 결과/오류/권한/성공 상태·복구/종료 경로를 적는다. 해당 없는 상태는 이유를 남긴다. flows.mmd에 진입·이동·뒤로·취소·저장 후 복귀를 연결한다. PRD 범위의 누락·고립 화면을 찾고 새 기능 제안은 조정자에게 결정 필요로 반환한다.

같은 담당이 wireframes.json에 화면/상태별 정보 우선순위·블록 배치를 정의하고 wireframe으로 SVG/PNG를 생성한다. 구조 문서의 상태 목록과 대응시켜 빠진 시안을 조용히 기본 화면으로 대체하지 않는다. 캡처를 직접 열어 잘림·겹침·입력 순서·주요 행동·안전 영역을 확인하고 review.md에 실제 검수와 미검증을 적는다. 자동 생성 성공만으로 UX나 실제 스크롤 동작을 검증했다고 하지 않는다.

구조와 와이어프레임을 묶어 새 비평가에게 넘길 원본·캡처·해시·수용 조건을 반환한다. 중요 수정 후 검사와 캡처를 갱신한다. 구조 단계가 자동 통과해도 와이어프레임의 **사람 승인 전에는 디자인 시스템 작업을 시작하거나 시키지 않는다.** 공동 기준·제품 코드·다른 단계 폴더는 수정하지 않는다.

플러그인 설치본에서는 이 SKILL.md의 `skills/<skill>/` 상위 디렉터리를 `<plugin-root>`로 사용한다. 명령의 `<plugin-root>`를 실제 절대 경로로 치환한다. 산출물은 대상 저장소 work/<project>/에 둔다. 패키지 roles/는 등록된 역할이 없을 때 읽는 지침이며 사용자 설정을 자동 변경하지 않는다.
