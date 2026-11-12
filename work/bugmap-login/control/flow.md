# 재개 메모 — bugmap-login

2026-11-13. 현재 단계: figma / 전체 raw 내보내기·LoaderCircle 변수 보정 도구 기능 부족으로 blocked. 1~5승인은 유효하다. Talk To Figma 채널 연결 후 오류 화면4개의 버튼8개 너비를 보정하고 20PNG를 재캡처했다. nodes.json은 여전히 미완료이며 CLI는 in_progress다. 아래 과거 안내는 이력이고 현재 상태는 마지막 재개 기록을 따른다.

## 완료한 착수 작업

- 참조 대화 read_thread, 프로젝트 기준 문서 확인.
- 연결된 BugMap의 현재 Page 1(0:1)과 기존 로그인 두 노드 1:2·2:2 확인.
- 두 로그인 PNG를 01-prd/baseline/에 원격에서 새로 저장하고 직접 열어 비교. 기존 노드 변경 없음.
- 로그인 범위 PRD·requirements.csv·control/project.json(원본 SHA-256)·control/figma.json(대상/보존 범위)·decisions.md 준비.
- 읽기 전용 check 결과 PRD canApprove=true. 사람 승인·점수 파일을 생성/수정하지 않음.
- control/harness-diagnostic.json: 실제 쓰기 없이 로컬 정책 함수를 호출하면 create_frame은 시스템 미승인으로 deny. Stop의 로컬 호출은 현재 단계를 반환. 실제 runtime 훅 작동 검증과는 별개.

## 중단 이유와 사람 확인

1. PRD·제공자 범위(카카오/네이버/Apple)·공식 브랜드 예외·인증 제외·기존 화면 보존을 검토해야 한다.
2. 저장소 루트에서 사람이 직접 실행한다:

```sh
node tools/design-harness/bin/design-harness approve prd --project bugmap-login --by '본인 이름'
```

이번 프로젝트는 처음부터 실행하는 하네스다. 기존 docs나 원격 시안의 존재를 자동으로 해시 기반 승인으로 이관하지 않는다. PRD 승인 후에도 4·5·7·8에서 사람 직접 승인 규칙을 유지한다.

## 다음 세션 첫 작업

```sh
node tools/design-harness/bin/design-harness check --project bugmap-login --json
```

상위 원본의 기록 SHA-256과 현재 파일, Figma 로컬 브리지 키/실제 현재 파일을 다시 비교한다. 승인 유효 시 research 단계만 design_researcher에게 위임한다. 공식 제공자 자산/지침과 참고 화면은 그때 실제 조사하고 캡처한다. 승인 없이 구조·와이어프레임·시스템·새 Figma 프레임을 만들지 않는다.

## 자동 훅 상태/발견

`codex plugin list --marketplace bugmap-design --json`은 installed=[]를 반환했다. 현재 runtime의 자동 차단을 확인한 것으로 보고하지 않는다. 플러그인 설치/활성화와 사람의 훅 신뢰 검토가 별도로 필요하다. 실제 브리지의 list_files/get_selection/get_document/save_screenshots는 현재 정책에서 보수적으로 쓰기로 분류된다. 자동 적용 전 읽기 도구 구분을 보완할 필요가 있으며 진단 JSON에 기록했다. 이번 요청에서는 하네스 소스·전역 설정을 변경하지 않았다.

## PRD 비평

새 맥락 design_critic의 판정은 ready(사람 승인 아님)이며 원문은 01-prd/critique.md다. 약관/개인정보 동작의 CSV 추적성에 경미 지적 1건이 있다. 본문 범위/수용 조건은 유지하며, 사람이 해당 범위를 검토하고 구조 단계에서 LOGIN-06과 정책 동작/미정 상태의 대응을 명시해야 한다. 승인 전에 요구사항 CSV를 바꾸면 변경 버전으로 재검토한다.

## 2026-11-13 재개 확인

사용자가 직접 실행했다고 알린 뒤 check에서 PRD passed 및 승인자 jungmin, 승인 ID 20dc1b08-a6d8-487f-87cb-9c6c9464ce9b를 확인했다. sourceDocuments 여섯 파일의 현재 SHA-256도 착수 버전과 일치한다. 과거 승인 대기 안내는 이력이며 현재 대기 지점이 아니다. 승인 파일은 읽기만 했고 생성/수정하지 않았다. design_researcher에게 02-research/만 위임했으며 리서치의 실제 캡처·비평 통과 후 구조/와이어프레임 담당을 시작한다. README·01-prd·공통 승인 입력은 승인 당시 바이트를 유지한다. 현재 진행 상태는 이 메모와 check로 확인한다.

## 승인된 브랜드 예외의 기준 문서 반영

PRD 승인 범위에 명시된 공식 제공자 로고 예외를 docs/DESIGN.md와 docs/screens/login.md에 반영했다. 일반 UI Lucide·Figma 추출 금지·실제 인증 제공자 미확정은 유지한다. 앱 코드 변경 없음. control/project.json.sourceDocuments는 승인 당시 **착수 버전**이므로 덮어쓰지 않는다. 두 문서의 아래 현재 해시 차이는 이 승인된 예외 반영에 한정되며, 재개 시 다른 추가 변경이 없는지 diff로 확인해야 한다. 승인된 PRD·공통 승인 JSON 바이트는 유지한다.

```json
{
  "docs/DESIGN.md": "0e7bdc283732450b6447ce4909dc0d8e4bd3b5ef1c4aa5f67f887438e103abb1",
  "docs/screens/login.md": "c12a953aa29542e601ff64b041f9e8e0990a5bccbc77a5133146b4da0d112af9"
}
```

## 리서치 통과·구조 위임

02-research/critique.md에 새 맥락 비평 원문을 보존했다. 비평 시점의 docs 원본 해시는 착수 버전이며, 이후 조정자가 위 브랜드 예외를 반영한 이력을 구분한다. 현재 check에서도 prd/research passed. 공식 캡처 3개를 조정자도 직접 열어 관찰과 대조했다. 브랜드 수치/배율은 시스템 단계 원본 자산 확인으로 넘기고, 제공불가의 구체 이유와 정책 추적성은 구조 담당에게 전달했다. design_architect는 03-structure/·04-wireframes/만 소유하며 구조·모든 상태·두 viewport와 실제 SVG/PNG·검수보고서를 준비한다. 사람의 와이어프레임 승인 전 디자인 시스템/Figma 쓰기는 하지 않는다.

## 구조·와이어프레임 검수

03-structure/의 두 viewport×10상태와 04-wireframes/의 PNG20·SVG20·검토 index.html을 생성했다. 조정자도 기본/컴팩트·로딩·오류·미지원·정책 이미지를 직접 확인했다. 전체 새맥락 비평은20PNG를 모두 열어 시각 차단/중요 문제 없음, CSV 기본전이와 검토전용 정책 상태 관계의 경미 불일치1건으로 needs_revision을 반환했다. 원문 critique.md 보존. 담당자가 states.csv 두 셀을 제품전이/내부참조로 분리하고 hashes.md를 갱신했다. PNG/JSON은 변경하지 않았다. 현재 별도 새맥락 비평가가 변경범위를 재검토 중이다. 사람승인4전 시스템 단계는 시작하지 않는다.

## 와이어프레임 사람 승인 대기

새 맥락 변경범위 비평은 ready이며 원문은 04-wireframes/critique-transition.md. 정책 검토 전이 불일치를 수정한 states.csv와4개해당캡처/해시를 재확인했다. 나머지 이미지의 전체 검토는 직전20PNG비평 범위로 유지하며 이미지/JSON은 변경하지 않았다. 남은 경미 제안은 기본 상태표의 지원정보 사전분기 요약 명료화이며 상세 흐름도/행동명세에서 이미 분기를 확인할 수 있어 승인 차단 항목은 아니다. 구현 시 상세flows를 따라야 한다.

사람 검토: 04-wireframes/index.html (두 크기10상태), 04-wireframes/README.md (개별SVG/PNG), 03-structure/behavior.md (순서·복구·요구사항), 두 비평 원문과 review.md. 확인할 결정은 정보순서·세제공자 선택·상태/복구·좁은화면·정책검토전용 구분이다. 실제브랜드자산/색/폰트/최종시각은 다음 시스템단계, 실제SDK/동적스크롤/기기접근성은 미검증이다.

```sh
node tools/design-harness/bin/design-harness approve wireframes --project bugmap-login --by 'jungmin'
```

조정자가 이 명령을 실행하지 않는다. 사람이 실행 후 첫 check에서 현재승인을 확인하고 design_system_designer에게05-design-system/만 위임한다. 승인 전 시스템/Figma도구쓰기/후속담당시작 금지. 자동Figma훅 설치·신뢰와브리지읽기도구분류 보완점은 기존미해결로남으며 그미설치를 자동차단검증으로 보고하지 않는다.

## 2026-11-13 와이어프레임 승인 후 재개

사용자 실행 알림 뒤 check에서 wireframes passed와 현재 입력 해시 일치를 확인했다. 승인자 jungmin, 승인 ID df0fd77a-a4a2-4800-b7e3-a9392d037a8b. 앞 단계1~4가 모두 passed다. 위 과거 와이어프레임 대기는 이력이며 현재 중단 지점이 아니다. design_system_designer에게 05-design-system/만 위임했다. 공식 브랜드 원본/사용 규정/배율, 의미 토큰·컴포넌트·문구와 실제 두 크기 대표 화면을 준비하고 비평 뒤 사람의 시스템 승인5에서 멈춘다. 승인된 상위 산출물·공통 승인 JSON·사람 로그는 수정하지 않는다.

## 사용자 제공 브랜드 자산 확인

사용자가 해당 경로에 다운로드했다고 알린 뒤 05-design-system/assets/Kakao Login 및 NAVER_login_KR를 읽기 전용으로 확인했다. 카카오 한국어 PNG와 실제 벡터 SVG, 네이버 한국어 녹색 배경/흰 N의 center·wide·icon H48 PNG를 직접 열거나 SVG 구조로 확인했다. H48 PNG는 4배 해상도(버튼1472×192, 아이콘192×192)다. 사용자 원본을 변경하거나 새 파일로 덮지 않았다. 목록/치수/형식/SHA-256은 control/asset-inspection.json에 기록했다. 현재 Apple 자산은 이 경로에 없다. 시스템 담당에게 두 제공자는 사용자 파일을 사용하고 중복 다운로드를 멈추며 출처를 사용자 제공과 공식 가이드 링크로 구분하라고 전달했다.

## 후속 Figma 이미지 검사 제약

공식 네이버·Apple 자산이 PNG라는 점을 확인했다. 현재 tools/design-harness/figma.mjs는 IMAGE fill을 unsupported-fill로 처리하므로 이 자산을 사용하는 실제 Figma 노드를 현재 lint로 통과시켰다고 보고할 수 없다. 사용자에게 이 제약을 알렸고 시스템 담당에게는 원본을 임의 재그림·추적해 회피하지 말라고 전달했다. 시스템 단계의 원본·출처·SHA-256·규정·실제 시각 검수는 진행하며, Figma 단계 전에 승인 자산의 이미지 검사 지원 또는 명시적 계약 조정이 필요하다. 자동 훅 설치/신뢰·브리지 읽기 도구 분류 보완도 별도 미해결이다.

## 디자인 시스템 검토와 사람 승인5 자료

05-design-system/에 tokens/components/copy JSON, 생성 DESIGN.md와 증거, 공식 브랜드 자산/배율/출처/해시, Lucide 목록, 실제두크기×10상태 PNG와 컴포넌트보드·초점·preview를 준비했다. 조정자도 기본390/360·컴팩트오류·보드를 직접 열었다. 네이버는 흰배경·녹색N·검정레이블 공식원본을 선택했고 녹색대안의3.09:1한계는보드에기록했다. Pretendard미설치로실제Apple SD Gothic Neo/.SF NS가쓰였음을CDP플랫폼폰트로확인했다. 사용자78원본파일해시는변경없다.

전체 새맥락 비평은 ready, 중요/차단없음이다. 원문 05-design-system/critique.md. 복구버튼 문서의동등너비와실제2px차이경미지적은CSS최소수정으로동일173/173px(390)·158/158px(360)로맞추고실제재렌더했다. JSON/생성MD본문은변경없고관련캡처·report/생성증거·hashes를갱신한다. 변경범위새맥락검토결과는05-design-system/critique-recovery.md에보존해사람승인전에확인한다.

검토자료: 05-design-system/index.html, captures/390x844-default.png, captures/360x800-default.png, captures/components-board.png, asset-sources.md, self-check.md 및 두 비평. 승인대상은시각방향·서체/대체·토큰·컴포넌트/상태·공식자산/배율·문구다. 실제인증/실기기접근성/최종Figma검증은미완료다. 사람만아래명령을실행한다.

```sh
node tools/design-harness/bin/design-harness approve design-system --project bugmap-login --by 'jungmin'
```

재개첫작업은check --project bugmap-login --json으로현재승인을확인하는것이다. 승인전Figma담당/쓰기를시작하지않는다. 승인후에도앞서기록한IMAGE-fill 검사지원·브리지읽기도구분류·자동훅설치/사람신뢰문제를먼저확인해야하며미설치를자동차단검증성공이라고하지않는다. 기존Figma노드는아직변경하지않았다.

## 정식 파일 URL 확인 후 현재 중단 지점

공식 Figma get_metadata가 LynbxdW8Qf7TavCrPLd2nY / 0:1에서 기존 다섯 루트의 ID·위치·크기를 반환했다. 응답은 06-figma/official-metadata.xml, 변경 이유는 control/figma-target-update.md, 기존 설정은 control/history/figma-before-canonical-url.json에 보존했다. 임시 브리지의 명시 키 조회 실패는 두 preflight JSON에 남겼다. 원격 쓰기는 아직 0건이다.

CLI/플러그인0.3.1에서 공식 PNG 매핑/비율/회전/불투명도 검사, 브리지 읽기 분류, 일반 .DS_Store 제외를 보완했다. 전체 npm test39/39(skip0), bundle 검사와 diff 공백 검사 통과. 독립 코드 검토 기록은06-figma/prerequisite-review.md. 자동 훅 설치/사람 신뢰는 미완료이며 테스트 성공을 runtime 적용 성공으로 표시하지 않는다.

06-figma/target-check.json에서 기존1·4·5 승인 해시와 현재 입력의 실제 차이는 control/figma.json만 확인했다. 기존 승인 로그/05 산출물은 수정하지 않았다. 05/hashes.json은 당시 입력의 스냅샷이며 이 메모와 대상 설정의 현재 해시로 다시 쓰지 않는다.

사람이 저장소 루트에서 아래 명령을 직접 실행한다. PRD 대상 입력을 승인하면 자동2·3을 검사하고, 이어4·5를 현재 대상에 재연결한다. 실패하면 다음 승인을 실행하지 않는다.

```sh
for stage in prd wireframes design-system; do
  node tools/design-harness/bin/design-harness approve "$stage" --project bugmap-login --by 'jungmin' || break
done
```

재개 첫 작업은 check --project bugmap-login --json. 유효한1~5 확인 뒤에만 design_figma_builder에게 정식 파일 키와 승인 원본을 넘긴다. 공식 도구 sessionId는8860e952-09fa-4669-b2d5-73a759d755ca. 새 프레임 구축·실제 원격 재내보내기·캡처·HTML 대응·lint·새맥락 비평 뒤 사람 검증7에서 다시 멈춘다.

## 정식 대상 재승인 후 재개

사용자의 실행 알림 후 check에서1~5 passed를 확인했다. 최신 승인자 jungmin: PRD1d7bf784-6137-469b-862c-f6b6690c9032, wireframes7966bed3-f874-4273-bcd4-47cd650abc2c, design-system9a8fe850-589b-4d30-aef6-0a7c9b6fb283. 사람 로그는 읽기만 했다. design_figma_builder에게06-figma/와 정식 파일 Page1의 새 노드만 위임했다. 보존5루트 수정금지, 승인01~05 변경금지. 자동가드 플러그인은 여전히installed=[]이므로 실제쓰기전 로컬가드검사와 정확한fileKey를 사용하며 자동훅활성화로 주장하지 않는다.

## 실제 Figma 구축·호출 한도 중단

76개 실제 변수·7개 텍스트 스타일·컴포넌트와20개 편집 가능한 화면을 공식 도구로 생성했다. 기본화면72:26, 좁은기본72:631. 기존5루트는 편집 범위에서 제외했다. 실제raw8루트 재조회 뒤 Starter MCP 호출 한도 오류(quota-blocker.json)가 발생해 나머지12raw 재조회와 보정을 중단했다. nodes.json을 부분 데이터로 만들지 않았다.

조정자는 기존 bridge 기본 get_document에서 동일20신규노드가 보임을 확인한 뒤 read-only save_screenshots로20PNG를 모두 저장했다. captures/bridge/와 bridge-*-after-build.json, capture-manifest.json, node-map.json, README.md 참조. 브리지는 요약 속성만 반환해 전체raw검증을 대체하지 않는다. 승인된 sans-serif fallback으로 실제 Noto Sans KR를 사용했고 차이는 change-log.md에 명시했다.

남은 수정: 네 오류 화면의 복구 버튼 동등너비(390raw172/174→173/173;360목표158/158), 로딩 아이콘 녹색→승인 secondary 회색 바인딩. scripts/pending-repair.js는 미실행이다. 한도 복구 후 check/대상/ledger 확인→실제 보정→20루트raw와캡처갱신→lint/독립비평→사람검증7 순서다. 현재 추가 승인은 필요하지 않으며1~5승인은 유효하다. 과금/플랜변경·한도 후 공식 호출 재시도·기존bridge쓰기·사람기록대행은 하지 않았다.

구축 중 발견한 work 일반파일 ENOTDIR·native 인스턴스 자손ID 검사를 RED→GREEN으로 보완했다. 전체 npm test41/41(skip0), bundle검사, diff검사 통과. 독립 코드 리뷰 중요/차단 없음. 상세06/prerequisite-review.md. 이 테스트 결과는 실제 Figma 전체 lint 통과가 아니다.

## 2026-11-13 Talk To Figma로 재개

check에서1~5 passed와 입력승인 유효성을 재확인했다. 현재 런타임 도구 목록에는 talk-to-figma가 없지만 사용자 설치 로컬 MCP server를 SDK stdio로 호출해 채널 t0852evy에 연결했다. 실행 경로는 /Users/mac/.bun/bin/bun 및 /Users/mac/Documents/cursor-talk-to-figma-mcp/dist/server.js이며 bunx는 현재 쉘 PATH에서 발견되지 않았다. 연결 초기화 뒤1200ms를 기다렸고 localhost:3055 접근은 샌드박스 밖 실행 권한으로 성공했다. 사용자 제공 플러그인/전역 설정은 수정하지 않았다.

실제 get_document_info로 Page0:1의 보존5루트와 신규28루트가 ledger와 일치함을 대조했다. Talk가 fileKey를 노출하지 않는 한계는 talk-preflight.json·talk-repair-log.json에 구분했다. 로컬 PreToolUse 정책검사와 대상/노드 조회 후 오류4화면 복구8노드를390은173×48,360은158×48로 resize했다. 전후 응답으로 너비를 확인했고20PNG를 captures/talk/에 재저장했다. 기존5루트는 변경 호출대상에 넣지 않았다. 조정자도390/360오류·로딩PNG를 직접 열었다.

현재 기능 차단: Talk get_node_info가 VECTOR·boundVariables·imageRef·layoutMode를 생략하고 execute_code가 실제 도구로 등록돼 있지 않아 전체 raw nodes.json을 만들 수 없다. set_stroke_color는 stroke를 치환해 변수연결이 사라지므로 LoaderCircle 색/바인딩 보정에는 사용하지 않았다. pending-repair.js 전체가 실행됐다고 보고하지 않는다. 원본8/20raw는 과거 스냅샷으로 유지하며 현재 전체내보내기로 표시하지 않는다.

남은 일은 변수 바인딩을 보존하는 Figma JS 실행·전체속성 내보내기 가능한 연결 확보→LoaderCircle secondary 바인딩 보정→20루트 원격raw·캡처갱신→lint/독립비평→사람검증7 순서다. 승인/사람리뷰 대기가 아니며 현재 추가승인 명령은 없다. 연결이 보완된 후 첫 명령은 node tools/design-harness/bin/design-harness check --project bugmap-login --json 이다. lint:web·lint:figma·7단계작업은6미완료로 실행하지 않았다. 사람승인/리뷰 기록을 만들거나 수정하지 않았다.

독립 새맥락 비평 원문은06-figma/critique-talk-repair.md. 비평가는 오류4·기본2·로딩1 PNG를 직접 열고20PNG해시를 검증했다. 판정은 균등너비 보정 ready/전체6단계 blocked다. fileKey 직접조회·전체속성 누락의 증거한계를 명시했으며 추가승인 요청은 없다.

최종메타데이터도 별도 새맥락 비평에서 ready(문서범위)를 확인했다. 원문06/critique-talk-metadata.md.20매핑·실제20PNG해시·과거raw구분과현재차단표시가일치한다. 전체6단계blocked판정은유지한다.
