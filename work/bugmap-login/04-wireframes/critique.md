판정: **needs_revision** — 시각적 차단·중요 문제는 없으나, 정책 상태 진입에 관한 경미한 명세 불일치 1건을 승인 전에 정리해야 합니다. 사람 승인을 대신하는 판정이 아닙니다.

검토 범위·방법

- 새 맥락에서 원본 PRD·requirements.csv, control 설정·결정, 연구 findings/recommendations, 공통 디자인·로그인·기술 기준, 구조 4개, 와이어프레임 JSON·보고서·README·review·index·hashes를 직접 읽었습니다. 이전 critique 문서는 읽지 않았습니다.
- `view_image`로 `04-wireframes/captures/login/` 및 `login-compact/`의 **각 10개 PNG, 총 20개를 모두 직접 열었습니다**. 상태: default, loading_kakao, loading_naver, loading_apple, cancelled, network_error, unsupported, service_outage, success, policy_pending.
- 연구의 kakao-official.png, naver-official.png, apple-official.png도 직접 열었습니다. Apple 캡처의 불완전한 상단 렌더와 버튼 샘플을 구분했습니다.
- 직접 계산한 CSV↔JSON 상태쌍은 20/20 일치합니다. SVG 20개의 텍스트가 JSON 블록과 일치하며, 보고서가 기록한 입력 및 SVG20·PNG20의 현재 SHA-256 불일치는 없습니다.
- 읽기 전용 `check` 결과: prd/research/structure passed, wireframes awaiting_approval, 종료 1. 후속 시스템 이후 단계는 차단 상태입니다.
- 파일 수정, approve/review, 점수 작성, Figma 쓰기, 실제 프로토타입 조작은 수행하지 않았습니다.

발견

| 심각도 | 위치 | 직접 관찰 근거 | 영향 | 수정 제안 |
|---|---|---|---|---|
| 경미 | `03-structure/states.csv`의 login/default 및 login-compact/default 행 `recovery_exit` | 두 행 모두 `loading_{provider} 또는 policy_pending`으로 기록됩니다. 반면 behavior.md는 정책 슬롯을 비조작 box·링크 role 없음으로 정하고, flows.mmd는 정책 상태를 검토에서만 비교하는 점선 연결로 표현합니다. 두 default PNG에도 “미연결 (검토용)”이 보입니다. | CSV를 구현·연결 입력으로 사용하는 담당자가 검토용 상세판을 제품에서 열리는 정책 화면으로 연결할 가능성이 있습니다. LOGIN-06의 미구현 동작 오인 방지와 관련됩니다. | 두 default 행의 제품 종료 경로를 `loading_{provider}`로 한정하고, `policy_pending`은 별도 검토 비교 관계임을 명시하십시오. 제품 동작·캡처를 새로 추가할 필요는 없습니다. |

확인된 장점과 요구사항 대응

- LOGIN-01: 두 크기 모든 상태에서 사진·위치 기반 기록과 공유 설명이 제공자 선택 앞에 보입니다. 근거 없는 AI·성능·수치·가입 시간·보안 약속을 발견하지 않았습니다.
- LOGIN-02: 세 제공자는 텍스트로 명확히 구분됩니다. `[공식 자산 자리]`는 저충실도 주석이며 일반 Lucide 기호를 공식 표식으로 대체하지 않았습니다. 실제 공식 자산 확인은 시스템 단계에 남아 있습니다.
- LOGIN-03: 세 loading 상태는 선택 제공자를 상태 문구에 유지하고, 세 선택을 모두 box로 바꿉니다. 중복 요청 잠금·단일 콜백·오래된 콜백 무시는 behavior.md에 명세돼 있습니다.
- LOGIN-04: cancelled는 오류 문구와 구분되며 선택 가능 형태로 돌아옵니다. network_error는 실패 제공자와 연결 복구 안내, 48px 재시도/다른 방법을 제공합니다.
- LOGIN-05: 모든 캡처에서 필수 텍스트·제공자·상태·복구·정책 위치의 잘림이나 겹침을 발견하지 않았습니다. JSON의 실제 버튼은 모두 높이 48px이고, 가장 좁은 복구 버튼도 158×48px입니다. 정책 box는 44px 높이이며 현재 조작 대상이 아닙니다. 전체 블록은 좌우 16px, 상단 44px·하단 34px 예산 안에 있습니다.
- LOGIN-06: 이메일·비회원 주 동작이 없고, 정책 영역은 미연결 검토 위치로 표시됩니다. policy_pending은 “검토 주석”, success는 “검토판”임을 화면에도 명시해 제품 UI와 구분합니다. 일반 오류·진행 상태에 잠금 로직이나 OS 판정 지침 같은 구현 메모가 노출되지는 않습니다.
- LOGIN-07: 기존 원격 노드 보존·별도 새 프레임 계약이 명세돼 있습니다. 실제 원격 보존은 이 단계에서 검증한 것으로 취급하지 않았습니다.
- LOGIN-08: 현재 JSON→SVG→PNG 40개 산출물의 해시가 일치하고 단계 승인 경계가 유지됩니다. 후속 승인·검증을 완료로 주장하지 않습니다.
- LOGIN-09: 환경 미지원과 일시 장애는 서로 다른 메시지·복구를 제공합니다. unsupported의 Apple만 비활성이고 나머지 선택은 활성 형태입니다. 실제 지원정보에 의한 조건부 예시라는 외부 명세가 있습니다. 성공 목적지는 기존 지도이며 로그인 스택 제거도 명세돼 있습니다.

입력 버전·직접 계산 SHA-256

경로는 `work/bugmap-login/` 기준입니다.

```text
01-prd/PRD.md
8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8
01-prd/requirements.csv
41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b
control/project.json
b3b83318203c00869b6d7daa84c20e100673eae635b4a2750a0158fcddd70842
control/figma.json
71303c028c95efa6beb4a4ac7653689dedf254910303208394b50e205d0934de
control/decisions.md
03b4940f5110eceda5cf069007f458da5febd9869bcc95a746e1169e0d60e77a
02-research/findings.md
7db4e473192b8e583e24384a51e88c44b374c46dee89d0a881926944c53b40e3
02-research/recommendations.md
56a9c1cda8c9d5dfb6c025666a21e36c819434b77438df6181475dfa45b2ac9f
03-structure/screens.csv
ddfcacb34694b7b88d586689c1c28174ef33d0a4817012132338333455bf0e0f
03-structure/states.csv
4ba18c810f159d3706aa3c773a24c0bab752f1717919e7f09504bf057e35f27c
03-structure/flows.mmd
448b481d07b8c0c922e316a6bda92ddb19991723a7c086d2685d60404cafd45e
03-structure/behavior.md
f5d710f6e765e66c364f66951e24063979658dc97935e505923fa065dea37922
04-wireframes/wireframes.json
206a9ae4126462a1704e96f0c1983c12e042a9779c8a61f8d486bc1bbab1ec4c
04-wireframes/wireframes-report.json
cfe46c85689fe1ed03605e50449362ace7d7978433e424de19259a383b1e2493
04-wireframes/index.html
a0f0da82a1f84e8102edb0ecedddcbc2d434aae459ec5fe801a8fc3ced5d46e7
04-wireframes/README.md
dca74a078a6c3c1a03236bf45a669ecbbdecdd816921d5b473444ccb5b216b7b
04-wireframes/review.md
2a4a47cfdaa76366fc506c68fe5addd0b53af2a146133cccdac00a6352f5cdb6
04-wireframes/hashes.md
bcaca728a26c46f677057b9b7016e1a6c60afbf51fe1bf2c6eb511830919837f
```

공통 기준 현재 해시:

```text
docs/DESIGN.md
0e7bdc283732450b6447ce4909dc0d8e4bd3b5ef1c4aa5f67f887438e103abb1
docs/screens/login.md
c12a953aa29542e601ff64b041f9e8e0990a5bccbc77a5133146b4da0d112af9
docs/TDD.md
e3360066d0219975ebb5ebee8b161a2c8c965c20634d7e6b1f594d76ecf238f8
```

전체 이미지·SVG 현재 버전은 개별 40개가 wireframes-report.json과 일치함을 직접 검증했습니다. 추가로 정렬한 각 파일의 `SHA256 + 두 공백 + 프로젝트 상대경로 + LF` 목록 자체를 해시한 값은 다음과 같습니다.

```text
SVG 20개 목록: f7459285e9d87ea73f2b9b6318b55b06d4b9fdab8b604503579af3db360a976b
PNG 20개 목록: d77c0e4cee6034f6855ed720702e50c9b6a1dc8686d0d1608c679644803f803e
```

미검증·재검토 조건

- 실제 인증 SDK/API·세션·콜백·연타 방지·취소·재시도·지도 이동은 구현·조작 검증되지 않았습니다. 정적 캡처와 행동 계약을 확인한 결과입니다.
- 글자 확대, 동적 세로 스크롤, 실제 기기 safe area, 스크린리더·live status·초점 복구, 정책 URL·동의 방식은 후속 검증 대상입니다.
- 최종 공식 자산·제공자 규정·48px 비율·한국어 Apple 레이블, 색·폰트는 시스템 단계 대상입니다.
- 실제 Figma 노드·기존 작업 보존·프로토타입은 검증하지 않았습니다.
- 조정자는 위 CSV 두 셀을 정리하고 관련 해시·검사 결과를 갱신한 뒤 새 맥락의 비평가에게 변경 범위를 재검토시키십시오. 이 보고서는 조정자가 저장해야 합니다.
