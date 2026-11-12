판정: **ready** — 05 디자인 시스템의 사람 시각 검토에 전달할 준비가 되어 있습니다. 사람 승인이나 인증 기능 완료를 뜻하지 않습니다. 차단·중요 발견은 없고, 경미한 수치 불일치 1건이 있습니다.

검토 범위·버전

새 맥락에서 design-critic 스킬, 공통 계약, 역할 파일을 읽고 읽기 전용으로 검토했습니다. 작성 대화·이전 비평 본문은 읽지 않았습니다. 원본·승인/리뷰·보고서를 수정하지 않았습니다.

직접 실행한 `check --project bugmap-login --json` 결과는 종료 코드 1이며, 1~4단계 `passed`, 5단계 `awaiting_approval`, `canApprove=true`입니다. 종료 1은 필요한 사람 승인과 후속 단계가 남았기 때문입니다.

기준과 승인 입력을 현재 파일에서 읽고 SHA-256을 다시 계산했습니다.

| 입력 | 현재 SHA-256 |
|---|---|
| docs/DESIGN.md | `0e7bdc283732450b6447ce4909dc0d8e4bd3b5ef1c4aa5f67f887438e103abb1` |
| docs/screens/login.md | `c12a953aa29542e601ff64b041f9e8e0990a5bccbc77a5133146b4da0d112af9` |
| docs/TDD.md | `e3360066d0219975ebb5ebee8b161a2c8c965c20634d7e6b1f594d76ecf238f8` |
| 01-prd/PRD.md | `8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8` |
| 01-prd/requirements.csv | `41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b` |
| 03-structure/behavior.md | `f5d710f6e765e66c364f66951e24063979658dc97935e505923fa065dea37922` |
| 03-structure/states.csv | `496d58c956ba452c4aaa58335a51282d22e71865d065334104c6cb18cac9dc4a` |
| 03-structure/flows.mmd | `448b481d07b8c0c922e316a6bda92ddb19991723a7c086d2685d60404cafd45e` |
| 04-wireframes/wireframes.json | `206a9ae4126462a1704e96f0c1983c12e042a9779c8a61f8d486bc1bbab1ec4c` |

대상 `05-design-system/hashes.json`의 현재 해시는 `01a7196b05ee7e1d9bfe8edbb8f4b554c9818c4b5a9af3b66da8670aa7d392e9`입니다. 기록된 **입력 21개·출력 128개 모두 실물 해시와 일치**했습니다. 이 확인은 이전 비평 파일의 해시도 포함하지만 그 본문은 열지 않았습니다.

핵심 대상 해시:

- tokens.json: `b2e55b30080167b17fb02bf3c1222cc4ef1e14400967f4a964280b4215c6484e`
- components.json: `6e1accd5f6986897723f3fa00eadec3156db4164b53abf05cc58e4a07a70c5e8`
- copy.json: `49dfff66b9f10a0d91992e5210289197c09cde574b1cc1ba3c644c0b69710b79`
- DESIGN.md: `fbc66c0bef30bf57b35280635c56e92adf0f18241c285a9c80370a90a540e3de`

`design-md.json`의 세 JSON 입력과 생성 MD 해시도 실제 파일과 일치합니다. `assets-manifest.json`의 82개 파일에서 SHA-256·바이트와 PNG 치수를 대조했고 불일치가 없습니다. 별도 인계 기록 `control/asset-inspection.json`의 사용자 원본 78개도 현재 바이트·해시가 모두 같습니다.

직접 본 캡처

이미지 도구로 아래 **23개 최종 PNG 전체**를 열었습니다.

- `05-design-system/captures/{390x844,360x800}-{default,loading_kakao,loading_naver,loading_apple,cancelled,network_error,unsupported,service_outage,policy_pending,success}.png`
- `components-board.png`, `components-board-focus.png`, `preview.png`

승인 와이어프레임 대표 `04-wireframes/captures/login/default.png`, `login-compact/network_error.png`도 열어 정보 순서를 대조했습니다. Naver 흰 완성형 원본과 Apple 검정 328/358 원본도 이미지 도구로 직접 확인했습니다. Kakao는 실제 SVG 파일과 CSS 배율·최종 캡처를 대조했습니다.

발견

**경미 — 복구 버튼 너비의 문서·계약 수치가 실제 렌더와 조금 다릅니다.**

- 위치: `components.json`의 recovery 설명, 생성 `DESIGN.md`, `self-check.md:13`, `styles.css`의 `.action`.
- 관찰: 계약은 “동등너비”, 자체 검수는 “173/158×48px”로 적었지만 `render-report.json`의 실제 수치는 390폭에서 **172/174×48px**, 360폭에서 **157/159×48px**입니다. 보조 버튼의 1px 테두리가 양쪽에 추가되고 `flex:1`에 `min-width:0`/동일 basis 보정이 없어 2px 차이가 발생하는 구조입니다.
- 영향: 최소 터치 영역이나 문구 접근에는 문제가 없고 캡처에서도 사용성 저하는 발견하지 못했습니다. 다만 전달 계약의 정밀도가 떨어집니다.
- 제안: 동등너비가 의도라면 두 버튼의 border box 너비를 같게 지정하고 재캡처하거나, 현재 차이가 허용된다면 “동등너비”·자체 검수 수치를 실제 결과로 정정하십시오. 화면 재설계는 필요하지 않습니다.

유지할 점

- 브랜드 → 가치 → 사진·위치 카드 → 세 제공자 → 상태·복구 → 정책 순서를 보존했습니다. 캐러셀·이메일·비회원·근거 없는 AI/수치/보안 약속을 추가하지 않았습니다.
- 두 크기×10상태에서 필수 텍스트와 제공자 표식의 잘림·겹침을 발견하지 못했습니다. 좁은 오류·일시장애에서도 복구 버튼과 하단 정책이 분리됩니다.
- 일반 UI는 Lucide 출처가 명시되고, 제공자는 공식 완성형 자산을 사용합니다. Naver의 검정 레이블 흰 버튼 선택은 일반 텍스트 대비에 유리합니다.
- 독립 계산한 대비는 정책 4.83:1, 복구 주요 버튼 5.02:1, 보조 문구/상태면 7.23:1입니다. 녹색 Naver 대안 3.09:1의 한계를 보드에서 드러내고 대표안에서 제외했습니다.
- loading의 선택 제공자 안내는 버튼 밖에 유지되고, 코드상 세 제공자를 잠급니다. 미지원은 Apple만 잠그며 다른 제공자 경로를 유지합니다. 일시장애와 확정 미지원 메시지를 구분합니다.
- 정책 슬롯은 실제 링크가 아닌 div이며 `미연결/검토용` 표식이 있습니다. policy_pending과 success도 캡처 자체에 검토용임을 표시해 제품 정책·완료 화면과 구별합니다.
- 사용자 제공 Kakao/Naver 자산의 실제 다운로드 URL·시간 미확인과 Apple 직접 다운로드를 문서에서 구분합니다. 원본 보존과 출처 확실성을 혼동하지 않았습니다.

미검증·재검토 조건

- 이번 비평에서 브라우저 클릭·키보드·스크린리더를 새로 조작하지 않았습니다. HTML/JS와 기존 렌더 보고서의 세 전이 증거를 검토했으며, 이를 독립 조작 성공으로 표시하지 않습니다.
- 플랫폼 폰트 조회 코드와 보고서에서 실제 Apple SD Gothic Neo/.SF NS 사용을 확인했습니다. Pretendard 렌더 완료 주장은 없습니다. 플랫폼 조회를 제가 새로 실행한 것은 아니므로 Pretendard 설치 후 재캡처가 필요합니다.
- 실제 인증 SDK/API·취소 콜백·세션·지원정보 판정·지도 이동·정책 URL/동의·확대 글자·실기기 safe area·초점 복구는 미검증입니다.
- 실제 Figma 노드·변수·프로토타입·기존 원격 노드 보존은 후속 검증 대상입니다.
- IMAGE fill의 후속 lint:figma 제약은 자체 검수에서 남은 일로 명시합니다. 이를 완료했다고 주장하지 않았으며, 해당 자동화 한계 때문에 현재 공식 브랜드 화면을 다시 그릴 이유는 없습니다.
- 위 경미 항목 수정 시 관련 JSON→MD·캡처·해시를 갱신하고 check를 다시 확인하십시오. 사람의 5단계 승인 전 Figma 작업은 진행하지 않습니다.
