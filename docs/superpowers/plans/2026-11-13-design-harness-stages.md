# design-harness 단계 도구 구현 계획

**Goal:** Node 20·외부 npm 의존성 없이 refs:capture, wireframe, design-md, lint:web, review, handoff를 구현하고 check/approve의 단계 게이트에 연결한다.
**Spec:** [기존 설계](../../design-harness.md), 2026-11-13 사용자 요청.
**Architecture:** 공통 안전 파일 I/O, JSON 계약·생성기, 설치된 Chromium을 CDP pipe로 제어하는 브라우저 모듈, 브라우저 안에서 실행되는 웹 규칙, 단계별 증거 검증을 분리한다. 앱 코드·루트 DESIGN.md는 변경하지 않는다.

## 구현 결정

- 산출물은 work/<project> 안에만 기록. 기존 파일은 기본 거부하고 --force로 명시적 재생성. 심볼릭 링크/경로 탈출 금지. 해시는 입력과 생성 결과 모두 기록한다.
- refs:capture: 02-research/refs.json의 URL·viewport를 실제 캡처해 captures/와 captures.json에 출처·시각·해시 저장.
- wireframe: 04-wireframes/wireframes.json의 화면/상태·블록 배치를 편집 가능한 SVG와 실제 PNG로 출력. 경계·중복 ID·버튼 최소 크기·XML 이스케이프 검사.
- design-md: 05-design-system/{tokens,components,copy}.json을 검증하고 같은 폴더 DESIGN.md 생성. colors/typography 또는 fontSizes, 컴포넌트별 설명·토큰 참조, UI 문구·금지 문구를 문서화.
- lint:web: 06-figma/web/의 HTML을 로컬 서버로 열고 설정 viewport별 계산된 색·글자 크기·44px 터치 영역·금지 문구 검사. 결과·입력 해시·캡처를 07-validation에 저장. 외부 리소스는 미추적 입력으로 실패. 동적 상태/닫힌 shadow/iframe 검증 한계는 명시.
- review <stage> --by 이름 --score 0..5 --notes 내용: 단계별 reviews.json에 입력 해시와 사람 점수를 추가. validation은 유효한 최신 리뷰가 필요하며 project.json.reviewMinScore 기본 4, 0..5로 조정 가능. 리뷰는 approve를 대신하지 않는다.
- handoff: 1~7단계 통과와 검증 승인 후 구현 메모·미해결 항목·자산을 모아 08-handoff/HANDOFF.md 및 manifest.json 생성. 최종 승인 자동 생성 없음.
- check는 생성물과 보고서의 입력/출력 해시·필수 스키마·리뷰를 검증하여 누락/오류/오래된 결과를 막는다. 승인 스냅샷 규칙 유지. 기존 임의 자리표시자 fixture는 새 계약에 맞게 갱신.

## 순서와 검증

- [x] 실패하는 CLI/계약 테스트 작성·실행.
- [x] 파일 안전성·JSON 계약·생성/리뷰·단계 검증 구현.
- [x] CDP 브라우저·레퍼런스 캡처·웹 lint와 실제 브라우저 테스트 구현.
- [x] 기존 승인 회귀 테스트 및 전체 파이프라인 통합 테스트.
- [x] Node 20 실행·SVG/캡처 시각 확인·독립 검토·문서/진행 기록 갱신·커밋.

Review focus: 보고서 위조/삭제/입력 변경 시 fail closed, 상위 승인 무효화, handoff 순환 해시 방지, CSS 상속/반응형/가상 요소/금지 문구 분할, 브라우저 실패 cleanup, 생성 파일 충돌·심볼릭 링크, 리뷰 추가에 따른 승인 무효화.
