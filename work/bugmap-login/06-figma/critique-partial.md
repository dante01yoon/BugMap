# 단계6 중간 산출물 비평 원문

검토자: login_figma_partial_critic, 새 맥락·읽기 전용. 2026-11-13. 사람 승인 아님.

판정: **blocked — 6단계 전체 준비 완료 판정에 필요한 원격 속성 증거가 일부 부족함.** 확보된 20개 실제 Figma PNG의 정적 시각 범위에서는 중요한 잘림·문구 누락·브랜드 왜곡을 발견하지 않았다. 이는 사람 승인이나 7단계 검증을 대신하지 않는다.

새 맥락에서 design-critic 스킬·공통 계약·역할 설정을 읽고 검토했다. 이전 비평이나 작성 대화는 읽지 않았다. 읽기 전용 파일 조회·이미지 열기·해시 계산만 수행했고, 원격 MCP 호출·Figma 조작·원본/보고서 저장·approve/review는 수행하지 않았다.

검토 범위와 직접 본 캡처:

| 상태 | login 390×844 | login-compact 360×800 |
|---|---|---|
| default | `72:26.png` | `72:631.png` |
| loading_kakao | `72:84.png` | `72:689.png` |
| loading_naver | `72:145.png` | `72:750.png` |
| loading_apple | `72:206.png` | `72:811.png` |
| cancelled | `72:267.png` | `72:872.png` |
| network_error | `72:325.png` | `72:930.png` |
| unsupported | `72:390.png` | `72:995.png` |
| service_outage | `72:450.png` | `72:1055.png` |
| success | `72:515.png` | `72:1120.png` |
| policy_pending | `72:573.png` | `72:1178.png` |

모두 `work/bugmap-login/06-figma/captures/bridge/`에서 이미지 도구로 직접 열었다. PNG 헤더의 실제 크기도 표의 viewport와 일치했다. 비교 대상으로 `05-design-system/captures/390x844-default.png`, `360x800-service_outage.png`와 공식 Kakao medium PNG, NAVER white-center H48 PNG, Apple 358/328 @2x PNG를 직접 열었다.

발견:

1. **차단 — 전체 노드 속성·완료 증거 부족**
   - 근거: `nodes.partial.json`은 expectedRootCount 20, exportedRootCount 8이며 390px의 default부터 service_outage까지만 포함한다. success·policy_pending과 compact 10개는 전체 원격 속성이 없다. `bridge-document-after-build.json`은 20개 루트의 위치·크기를 보여주지만 하위 구조는 truncated이다.
   - 영향: compact의 실제 48px 조작 프레임, 이미지 원본 비율/필터, 컴포넌트·변수·스타일 바인딩, 전체 auto-layout을 PNG만으로 확정할 수 없다. 원격 전체 완료나 lint:figma 통과로 확장해 판단할 수 없다.
   - 수정/재검토: 호출 제한 해소 후 나머지 12개 루트와 필요한 foundation/component 원격 속성을 재조회하여 전체 내보내기를 완성한다. 기존 8개도 최종 버전과 동일한지 확인하고 재검토한다. 시각 전면 수정이 필요하다는 발견은 아니다.

2. **중요 — 화면·상태→노드→캡처 매핑이 여러 파일로 분산됨**
   - 근거: `screen-ledger.json`에는 20쌍, `capture-manifest.json`에는 20 PNG가 있지만 `node-map.partial.json`에는 8쌍만 있다. 해당 node-map 행에는 캡처 경로도 없다. 현재는 세 파일을 nodeId로 결합해야 전체 추적이 된다.
   - 영향: node-map만 전달받으면 12개 상태를 누락으로 오해하거나 어느 PNG가 해당 상태인지 수동 추정해야 한다. LOGIN-08의 전달 증거가 불완전하다.
   - 수정 제안: 원격 raw 확보 여부를 별도 필드로 유지하면서 20쌍 모두의 screen/state/nodeId/Figma URL/viewport/실제 PNG 경로를 한 매핑에 연결한다. 매핑 완성이 원격 raw 완성을 의미한다고 표기하지 않는다.

유지할 점:

- 20 PNG 모두 브랜드→가치 설명→사진·위치 시각→제공자→상태/복구→정책 순서가 유지된다. 두 viewport에서 필수 문구·버튼·하단 정책 슬롯이 잘리지 않는다.
- 요청 중 세 상태는 버튼 밖에서 선택 제공자를 명시하고 공식 버튼 그림을 유지한다. 취소는 중립 안내, 네트워크 오류는 연결 확인, 일시 장애는 대기/다른 방법, 미지원은 대체 제공자를 제시한다.
- 재시도·다른 방법은 오류 본문 다음에 동등한 폭으로 배치된다. compact service_outage에서도 복구와 하단 슬롯 사이 간격이 남는다.
- success는 실제 완료 화면 대신 검토용 연결 명세로 표시한다. policy_pending과 하단 정책 슬롯은 미연결/검토용임이 읽힌다.
- 근거 없는 AI·성능·사용자 수·보안 약속과 이메일/비회원 선택은 보이지 않는다.
- 승인된 05 대표 화면과 주요 위치·크기·공식 브랜드 그림이 일치한다. Noto Sans KR fallback의 글자 모양 차이는 있지만 해당 비교에서 추가 줄바꿈·잘림을 발견하지 않았다.
- 실제 raw 8개에서는 루트 VERTICAL auto-layout, 좌우 16px·상단 44px·하단 34px를 확인했다. 기본 프레임 최하단은 y810으로 844 높이 안에 있다.
- raw default의 제공자 인스턴스는 각각 358×48, y368/428/488이며 간격 12px다. NAVER 이미지는 368×48, x−5로 대칭 clipping하고 Apple은 358×48이다. 두 이미지 fill은 opacity 1·FIT·필터 0이다. Kakao 원본 SVG 그룹은 233.739×48로 중앙 배치되어 승인 시스템의 비례 확대 계약과 맞는다.
- raw default는 `nodes.partial.json` 첫 루트와 내용이 일치한다. TEXT 노드는 Noto Sans KR 300/500/700과 실제 textStyleId·색 변수 바인딩을 포함한다.
- 토큰의 명목 색 대비를 직접 계산하면 본문 #4B5563/흰색 7.56:1, 정책 #6B7280/흰색 4.83:1, 복구 흰색/#15803D 5.02:1이다. 이 계산은 실제 기기의 가독성·초점·스크린리더 검증을 대신하지 않는다.

현재 입력 SHA-256 — 다음 경로는 `work/bugmap-login/` 기준:

```text
01-prd/PRD.md
8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8
01-prd/requirements.csv
41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b
03-structure/behavior.md
f5d710f6e765e66c364f66951e24063979658dc97935e505923fa065dea37922
03-structure/states.csv
496d58c956ba452c4aaa58335a51282d22e71865d065334104c6cb18cac9dc4a
03-structure/screens.csv
ddfcacb34694b7b88d586689c1c28174ef33d0a4817012132338333455bf0e0f
05-design-system/tokens.json
b2e55b30080167b17fb02bf3c1222cc4ef1e14400967f4a964280b4215c6484e
05-design-system/components.json
6e1accd5f6986897723f3fa00eadec3156db4164b53abf05cc58e4a07a70c5e8
05-design-system/copy.json
49dfff66b9f10a0d91992e5210289197c09cde574b1cc1ba3c644c0b69710b79
05-design-system/DESIGN.md
fbc66c0bef30bf57b35280635c56e92adf0f18241c285a9c80370a90a540e3de
05-design-system/asset-sources.md
8ebaa807a15145b5abf93c1f369f4f459a5cdf2c59af92faf3af0ee3afa74d99
05-design-system/assets-manifest.json
e436a1b16d48483b6b2538c33611ca2d36e674304291186f0957230eb9348708
04-wireframes/wireframes.json
206a9ae4126462a1704e96f0c1983c12e042a9779c8a61f8d486bc1bbab1ec4c
control/figma.json
aee8d08420496feb69648dfff3a406bd6ebe2614a77602ace8c1db1e8f5b554c
06-figma/screen-ledger.json
56586a1cc17e4699b4262ea08ca60c287c486132626ad1965ddb1d30013440f7
06-figma/nodes.partial.json
eb1475cc7a6c6897d03e65e6b4403500bc8eec79112ea2c803599983929bd932
06-figma/node-map.partial.json
653fe96b9750b0fd8e6eea54648f2ca58eb4a1d610640530a1d955ce94eee104
06-figma/raw-default.json
ac459c5d1922de4f6f65b7e2f49448d2c878f64ffe315764c4ce848023951ea2
06-figma/bridge-document-after-build.json
6a69dd958f17f5ddd1b38afc01297c0df54f26f182152528067d675245ea9246
06-figma/input-hashes.json
ade81bbe265385bf8821b9a3101cc4e0a651c1fece3171a562550a39eb86d951
06-figma/discovery.md
d2a5ba360a4dafae2e23bbdb6df78724882779621967001229be37f17a30a5e7
06-figma/capture-manifest.json
79af90362d9250268fabd076ddcc92eab7cf12b2829f2d7f8e6539832b4045a4
```

`input-hashes.json`의 6개 기록은 직접 계산한 현재 파일 해시와 모두 일치했다.

미검증/재검토 조건:

- 실제 인증·중복 요청 잠금·disabled 접근성·콜백·초점 복구·라이브 발표·재시도 전이·정책 비조작·외부 이동은 직접 조작하지 않았다. 스크립트나 ledger를 실제 행동 증거로 취급하지 않았다.
- 360px 10개 및 390px 2개의 전체 raw, 전체 foundation/component 바인딩·상태 variant의 원격 속성은 미검증이다.
- 기존 5개 보존 루트의 존재·크기는 bridge 문서에서 확인되지만 하위 내용의 전후 동일성은 그 truncated 문서만으로 입증되지 않는다.
- 확대 글자·실기기 safe area·스크롤·키보드·스크린리더·명암 환경별 가독성은 미검증이다.
- 공식 캡처 18개 부족을 bridge 20 PNG로 시각적으로 보완했으나, 공식 원격 내보내기 전체 완료로 간주하지 않았다.
- 조정자가 원문을 저장하고 매핑을 보완한 뒤, 원격 제한 해소 후 새 맥락 비평가에게 최종 6단계 증거를 재검토시켜야 한다.
