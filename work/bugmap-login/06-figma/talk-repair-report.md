# Talk To Figma 재개 검수 — 2026-11-13

판정: **blocked / 단계6 미완료**. 복구 버튼 너비 보정은 완료했다. 전체 raw 내보내기와 로딩 아이콘 변수 바인딩은 미완료다. 사람 승인·리뷰를 대신하지 않는다.

## 입력과 대상

- project: bugmap-login. 정식 fileKey LynbxdW8Qf7TavCrPLd2nY, Page0:1. control/figma.json SHA-256 `aee8d08420496feb69648dfff3a406bd6ebe2614a77602ace8c1db1e8f5b554c`.
- 승인 tokens.json SHA-256 `b2e55b30080167b17fb02bf3c1222cc4ef1e14400967f4a964280b4215c6484e`.
- 최신 check에서1~5 passed. 실제 쓰기 전 로컬 PreToolUse 정책결과 `{}` 확인. 자동 훅 설치·신뢰가 완료됐다는 뜻이 아니다.
- Talk channel t0852evy. get_document_info로 Page0:1, 보존5루트, 생성 ledger의 컴포넌트8루트·화면20루트를 대조했다. Talk에 fileKey 조회기능이 없어 이 검사를 정식키의 원격 인증으로 확대하지 않는다.

## 실제 변경과 원격 검증

|화면 루트|보정한 INSTANCE|확인한 최종 너비×높이|
|---|---|---|
|72:325|72:380,72:382|각173×48|
|72:450|72:505,72:507|각173×48|
|72:930|72:985,72:987|각158×48|
|72:1055|72:1110,72:1112|각158×48|

각 루트의 전후 응답은 talk-before-*.json/talk-after-*.json, 호출 인자·응답·최종 bounds는 talk-repair-log.json에 있다. 조회 응답의 INSTANCE ID·이름이 계획과 일치한 뒤 해당8개만 resize했다. 기존 보존5루트, 공유 LoaderCircle, 상위01~05와 사람 기록은 변경하지 않았다.

## 실제 캡처 검수

captures/talk/의20개 PNG를 새로 저장하고 담당자가 이미지 도구로 **모두 직접 열었다**. PNG 시그니처·390×844 또는360×800 치수·SHA-256을 확인했다. 개별 경로·해시는 capture-manifest.json과 talk-repair-log.json에 연결했다. README/node-map도 같은 최신 캡처를 가리킨다.

- 두 크기의 default/loading3/cancelled/network_error/unsupported/service_outage/success/policy_pending 전체를 확인했다.
- 제목2줄·세 제공자 로고/문구·상태·하단 정책 검토용 문구가 읽히고 잘림/겹침은 보이지 않는다. 네 오류화면의 복구 버튼은 정렬·높이와 동등너비를 만족한다.
- loading6화면의 LoaderCircle은 여전히 녹색이다. 승인 HTML의 secondary회색과 일치하지 않아 알려진 미완료로 유지한다.
- 실제 인증SDK·네이티브 기기·클릭/스크린리더 동작은 이번 정적 캡처 검증범위가 아니다.

## 남은 도구 제약

### 실제 재개 경로

현재 세션에 Talk 도구가 직접 노출되지 않아 설치된 MCP SDK의 Client/StdioClientTransport로 서버에 연결했다. SDK listTools와 join_channel/get_document_info 호출이 성공했다. 실행환경 PATH에서 bunx를 찾지 못한 경로는 `/Users/mac/.bun/bin/bun`과 `/Users/mac/Documents/cursor-talk-to-figma-mcp/dist/server.js` 절대경로로 해결했다. localhost3055 접근은 sandbox에서 실패하므로 실행 시 require_escalated 승인을 받아야 했다. 연결 직후 socket 시작을1200ms 기다린다. 실제 사용한 scripts/talk-repair.mjs를 보존했으며, 다음 실행 전 check·채널·대상·현재 노드 상태를 다시 확인해야 한다.

로컬 Talk 소스의 getNodeInfo는 JSON_REST_V1을 내보낸 뒤 filterFigmaNode로 VECTOR를 제거하고, fills/strokes의 변수 바인딩과 imageRef를 삭제하며 layoutMode를 보존하지 않는다. MCP 서버도 같은 필터를 다시 적용한다. execute_code는 타입 선언만 있고 실제 도구/명령으로 등록되지 않았다. export_node_as_image는 PNG로 고정된다. 따라서 nodes.json의 전체 노드·layoutMode·원본IMAGE 매핑 계약을 충족하는 원격 데이터를 확보하지 못했다.

set_stroke_color는 node.strokes를 새 SOLID 배열로 치환하고 weight도 다시 설정한다. 승인된 secondary 변수 바인딩 보정에 사용하면 바인딩을 잃으므로 호출하지 않았다. 외부 플러그인 코드를 변경하거나 원격 미조회 값을 예상치로 채우지 않았다.

nodes.partial.json과 이전8루트 raw는 과거 응답으로 보존했다. 수정된4루트에 rawExported=false를 기록했다. 현재 nodes.json 미생성으로 단계6 및 lint:figma 전체 통과는 미검증이다. lint:web는07-validation 산출물을 만들므로 현재06단계에서 실행하지 않았다. 전체raw와 LoaderCircle 바인딩을 지원하는 실제 도구 연결 후 해당 작업·캡처·기계검사·독립비평이 필요하다.
