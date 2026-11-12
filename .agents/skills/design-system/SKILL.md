---
name: design-system
description: Use when the design harness needs tokens, component contracts, UI copy and a generated DESIGN.md based on approved structure and wireframes.
---

# Design system

[공통 계약](../design-flow/references/protocol.md)을 읽는다. design_system_designer는 05-design-system/만 소유한다. 현재 check에서 구조/와이어프레임의 사람 승인과 파일 해시가 유효한지 먼저 확인한다. “승인됐다고 들었다”는 입력으로 새 시각 방향을 확정하지 않는다.

프로젝트 공통 디자인 기준과 기존 컴포넌트를 재사용할 범위를 정한다. 충돌하는 색/폰트/문구 변경은 근거와 범위를 조정자에게 반환한다. 이 역할에서 docs/DESIGN.md를 덮어쓰거나 승인 정책·제품 요구사항을 바꾸지 않는다.

CLI 계약에 맞춰 tokens.json(colors·fontSizes/typography), components.json(설명·정의된 토큰 참조·상태), copy.json(strings·forbidden)을 작성한다. 기존 스타일의 장식 요소를 무조건 복제하지 않고 의미·가독성·동작 상태에 필요한 값을 선택한다. 정의되지 않은 토큰이나 근거 없는 성능·이용자 수·보장 문구를 넣지 않는다.

design-md로 이 폴더의 DESIGN.md와 생성 증거를 만들고, icons.csv에는 Lucide 이름·목적·카탈로그 링크를 기록한다. preview.svg와 실제 captures/를 준비해 대표 컴포넌트·입력·오류·선택/비활성 상태에서 대비·가독성·44px 조작 영역·문구를 확인한다. 생성된 문서와 캡처를 직접 보고 JSON과 일치하는지 검수한다. 캡처나 동작을 확인하지 못하면 해당 범위를 미검증으로 반환한다.

새 비평가에게 JSON 원본·생성 문서·대표 화면·해시·판단 기준을 넘긴다. 검사/수정 결과와 남은 결정을 반환한 뒤 **시각 방향의 사람 직접 승인**을 기다린다. Figma 작업이나 사람 approve/review는 실행하지 않는다.
