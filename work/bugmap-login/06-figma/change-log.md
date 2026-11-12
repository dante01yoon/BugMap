# Figma 구축 기록 — 2026-11-13

상태: **blocked / 단계6 미완료**. Talk To Figma 재개에서 복구 버튼8개의 동등너비 보정과20PNG 갱신을 완료했다. 전체 원격 raw 재내보내기와 로딩 아이콘 secondary 바인딩은 남았다. 아래 초기 구축 기록은 이력이며 최신 결과는 마지막 재개 항목과 talk-repair-report.md를 따른다. 사람 approve/review, 승인로그, 01~05 원본, 제품 앱 코드는 변경하지 않았다.

## 실제 수행

- check에서 유효한 사람 승인1~5와 정식 fileKey LynbxdW8Qf7TavCrPLd2nY / Page0:1을 확인했다. 공식 use_figma 첫 조회에서 기존 다섯 루트 ID/위치/크기를 확인했다. 코드의 쓰기 범위는 새 노드뿐이었다.
- 실제 PreToolUse 정책 검사에서 work/.DS_Store의 후보 검색 오류로 처음 차단됐다. 조정자가 안전한 폴더 후보 검사로 수정하고 테스트한 뒤, 해당 정책이 허용함을 재확인하고 쓰기 시작했다. 자동 플러그인 설치/사람의 훅 신뢰 완료로 주장하지 않는다.
- get_libraries → library search/Code Connect/기존 원격 컴포넌트·변수·스타일을 조사했다. 신규 승인 원본과 호환되는 자산이 없어 로컬 토큰76개(primitive38+semantic alias38)·공유 텍스트스타일7개·컴포넌트15개/세트3개를 실제 생성했다. ID는 state-ledger.json/component-ledger.json.
- 승인된 source JSON·SVG·PNG를 직접 읽고 390×844/360×800×10상태의20 native editable frames를 만들었다. Native text, auto-layout, linked instances, 실제 변수 바인딩을 사용했다. 전체UI를 이미지로 만들지 않았다. 기존 화면 오른쪽2500부터 배치했다.
- Kakao는 공식224×46 SVG 전체를48/46로 균등 확대해233.739×48로 표시하고 배경만 좌우확장했다. Naver/Apple은 등록된 공식 원본 PNG 바이트를 createImage에 전달했고 실제 imageHash3개를 반환받았다. Naver368×48 원본은328/358 컨테이너의 빈 가장자리만 대칭 clipping한다. 일반 UI는 승인된 Lucide SVG 원본이다.
- 원격에서 Noto Sans KR Light/Medium/Bold 가용성을 확인했다. Pretendard/Apple SD Gothic Neo 미가용으로 승인 sans-serif fallback을 적용했다. 로컬HTML의 Apple SD와 한글 폭/획이 다르지만26/20/14/13/12px,300/500/700,행간·문구·2줄제목을 유지한다.
- 쓰기 후 정책 PostToolUse를 직접 호출해 재내보내기/캡처/lint/check 안내를 확인했고, 실제 원격 재조회를 수행했다. native instance 자손ID(I72:27;70:31;70:15 등)를 변조하지 않았다. 일부 응답은48000byte 한도를 넘었으므로 중복 absoluteBoundingBox를 제외하고 실제x/y/width/height와 필수 원본 속성을 유지해 응답을 좁혔다.
- 원격 raw8루트(390의default/loading3/cancelled/network_error/unsupported/service_outage)를 재조회했다. nodes.partial.json과 node-map.partial.json. 나머지12 raw는 미확인이다. **nodes.json을 부분 데이터로 만들어 통과시키지 않았다.**
- 공식 get_screenshot 두 개(기본390,일시장애360)를 실제다운로드하고 열었다. 이후 Starter MCP 한도 오류가 발생했다. 조정자가 기존 figma-agent bridge의 읽기로 같은 파일/페이지/20신규루트를 확인하고20개 PNG를 captures/bridge/에 저장했다. 브리지 요약은 font/layout/imageHash가 없어 full raw를 대신하지 않는다. 그 응답은 bridge-*-after-build.json에 보존한다.
- 대응 web/은 승인된 시스템 HTML/CSS/JS와 공식 자산 복사본 및20상태 초기화 HTML이다. 실제 앱·인증SDK를 연결하지 않았다. node-map.json에20루트/실제 PNG/HTML 링크를 연결했지만 images는8개 raw 루트의 실제 확인분만 포함하며 blocked를 명시한다.

## 직접 시각 검수

담당자는 두 공식캡처와 captures/bridge/의390/360 모든 상태 PNG를 직접 열었다. 기본·제공자별로딩·취소·네트워크·미지원·일시장애·검토용성공·정책상태의 문구와 로고가 읽힌다. 두크기의 제목/제공자3개/복구/하단정책은 잘리거나 겹치지 않는다. 실제 인증 성공/실기기 접근성/프로토타입 클릭 동작은 검증하지 않았다. 상태 프레임과 로컬 HTML의 검토용 전이는 실제 SDK 동작이 아니다.

## 확인된 수정 필요

1. recovery의 동등너비:390 network_error/service_outage raw에서 primary172×48,secondary174×48이다. 승인된173/173 계약과2px 차이가 있다. 인스턴스를FILL로 둔 상태에서secondary stroke의 외곽분배가 반영된 것으로 보인다(원인추론). 향후 네오류화면의 두 인스턴스를 FIXED173/173 또는158/158로 설정하고 실제 bounds·캡처를 재확인해야 한다.360 raw bounds는 아직 미확인이다.
2. loading LoaderCircle이 현재primary녹색이다. 승인 HTML에서는secondary회색을 상속한다. 원본도형은 보존하되 해당 master stroke를secondary 변수에 바인딩하는 좁은 보정이 남았다.

준비한 scripts/pending-repair.js는 **아직 실행하지 않았다**. 승인/대상 가드를 다시 통과한 뒤 실제quota/연결이 허용할 때만 실행하고, 실제 재조회/캡처로 검증한다. 원격값을 로컬JSON에서 수정하지 않는다.

## 차단과 재개

공식 서버가 Starter plan MCP tool call limit 오류를 반환했다(원문quota-blocker.json). 한도 후 추가 공식 호출/과금·플랜 변경/원격수정은 하지 않았다. 자동훅은 현재 설치/신뢰 미확인이다.

재개: 현재 check → 정식파일/기존보존루트/ledger노드 재확인 → pending-repair.js 실제적용·bounds/captures 검증 →20루트 전체 상세raw 재내보내기(nodes.json)와 모든IMAGE매핑 보완 → lint:figma/lint:web(조정자) → 새독립비평 → 사람 검증7. 현 상태에서 단계6ready나 전체완료를 선언하지 않는다. check가 nodes.json누락으로 차단되는 것은 의도된 정직한 상태다.

## Talk To Figma 재개 — 2026-11-13

- 사용자 연결 채널 t0852evy를 통해 로컬 MCP SDK/stdio로 실제 호출했다. 실행 전 로컬 정책 검사와 Page0:1의 보존5루트·기존 생성28루트 존재를 재확인했다. Talk는 fileKey를 반환하지 않으므로 이 검사는 파일키 인증과 구분한다.
- network_error/service_outage의8개 recovery INSTANCE만 resize_node로 보정했다.390폭은173/173×48,360폭은158/158×48이며 전후 get_node_info와 실제 반환 bounds로 확인했다. 노드 생성·삭제·기존 보존5루트 변경은 하지 않았다.
-20상태를 export_node_as_image scale1로 다시 저장했다. 모든 PNG의 시그니처·치수·SHA-256을 확인했고 담당자가20개 모두 이미지 도구로 직접 열었다. 잘림·겹침·로고 왜곡·복구 버튼 문제는 보이지 않는다. 로딩6상태의 녹색 아이콘은 미보정이다.
- captures/talk/가 최신이며 기존 captures/bridge/는 이력이다. node-map/capture-manifest/README를 새 캡처로 연결했다. 수정된4루트의 rawExported는 false로 표시해 이전 부분raw가 최신으로 오인되지 않게 했다. nodes.partial.json은 당시 원격 응답 그대로 보존했다.
- Talk의 필터가 VECTOR·layoutMode·변수 바인딩·이미지 참조를 제거하고 arbitrary JS를 제공하지 않는다. set_stroke_color는 기존 stroke와 바인딩을 치환하므로 사용하지 않았다. 전체 nodes.json을 추정값으로 만들거나 검사계약을 완화하지 않았다.
- scripts/pending-repair.js는 공식 use_figma용 전체 보정 계획이며 여전히 실행하지 않았다. 이번에는 별도 scripts/talk-repair.mjs로 너비 부분만 실행했다. 로딩 바인딩과 full raw를 지원하는 실제 도구가 필요하다. 상세 실행 근거·제약은 talk-repair-report.md와 talk-repair-log.json에 보존한다. lint:web는07단계 산출물이므로 이번06범위에서 실행하지 않았다.
