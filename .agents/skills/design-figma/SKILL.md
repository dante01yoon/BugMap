---
name: design-figma
description: Use when the design harness reaches Figma construction or repair after design-system approval, including node mapping, actual captures and matching web screens.
---

# Design Figma

[공통 계약](../design-flow/references/protocol.md)을 읽는다. design_figma_builder는 06-figma/와 위임받은 Figma 파일/페이지/노드 범위만 맡는다. check로 시스템 승인·입력 해시를 확인하고 화면/상태·tokens/components/copy·디자인 기준을 읽는다.

대상 파일/페이지, 편집 범위, 실제 연결 도구를 확인한다. 파일이 불명확하거나 도구가 없으면 필요한 대상/연결을 조정자에게 반환하고 blocked로 멈춘다. 로컬 HTML이 있어도 Figma 완료나 가짜 node-map을 만들지 않는다. 기존 작업을 조회해 보존하고 원래 권한 밖의 파일 생성·덮어쓰기·플러그인 설치를 추정하지 않는다.

사용할 Figma 도구에 대응하는 제공 스킬을 먼저 읽는다. 예: use_figma에는 figma:figma-use, 전체 화면 구성에는 figma:figma-generate-design, 변수/컴포넌트에는 figma:figma-generate-library를 함께 적용한다. 이 스킬만으로 API 사용 절차를 대체하지 않는다. 필요한 도구/스킬이 없으면 연결/기능 부족을 보고한다.

승인된 화면·상태를 편집 가능한 레이어·컴포넌트·토큰으로 구성한다. 오토레이아웃·크기 대응·텍스트를 확인하고 실제 노드 조회와 viewport 캡처를 성공시킨다. 캡처를 직접 열어 잘림·겹침·정보 순서·문구·아이콘을 대조한다. UI 아이콘은 Figma에서 복사/추출하지 않고 프로젝트 Lucide 컴포넌트 규칙을 따른다.

node-map.json에 화면/상태→실제 노드 ID·링크·치수·캡처 경로를 연결하고 change-log.md에 실제 변경·도구 결과·검수/미검증을 남긴다. lint:web용 web/에는 같은 화면·상태·토큰·copy를 반영한 HTML/로컬 자산을 준비하고 대응 관계를 명시한다. HTML lint가 Figma 편집·조작·네이티브 검증을 대신하지 않는다. 실패/누락을 숨기는 빈 JSON·가짜 캡처·수동 passed 기록을 만들지 않는다.

현재 파일·실제 캡처·해시·검증 범위를 새 비평가와 조정자에게 반환한다. 후속 validation·사람 review/approve·handoff는 이 역할이 대신 진행하지 않는다.
