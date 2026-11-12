# 출처·캡처·실행 증거

조회일 2026-11-13 KST. 최종 캡처 시각 2026-11-12T19:38:15.761Z(2026-11-13 04:38:15 KST). 외부 로그인/가입·유료 서비스·정책 결정·원격 Figma 쓰기를 수행하지 않았다.

## 승인 입력

직접 실행: `node tools/design-harness/bin/design-harness check --root /Users/mac/Documents/BugMap --project bugmap-login`. 착수 시 prd passed / research in_progress 확인. 사람 PRD 승인 ID `20dc1b08-a6d8-487f-87cb-9c6c9464ce9b`. PRD 문서의 “승인 전”이라는 초안 제목보다 CLI의 현재 해시 기반 승인을 따른다. 입력은 변경하지 않았다.

| 입력 | SHA-256 |
|---|---|
| ../01-prd/PRD.md | 8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8 |
| ../01-prd/requirements.csv | 41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b |
| ../control/project.json | b3b83318203c00869b6d7daa84c20e100673eae635b4a2750a0158fcddd70842 |
| ../control/decisions.md | 03b4940f5110eceda5cf069007f458da5febd9869bcc95a746e1169e0d60e77a |
| ../control/figma.json | 71303c028c95efa6beb4a4ac7653689dedf254910303208394b50e205d0934de |
| ../01-prd/baseline/1:2.png | 4d9d82ab108655e0d630fb3ca3700846d6937288b72d24535a0c16d69af223da |
| ../01-prd/baseline/2:2.png | ec05f5986117d18b82f72101aeb15d2735c497fa03f092d6f2516a2ebeff9da4 |

공통 입력 AGENTS.md, docs/PRD.md, docs/DESIGN.md, docs/TDD.md, docs/screens/login.md, docs/design-harness.md와 스킬/공통 계약을 읽었다. 착수 공통 문서 해시는 control/project.json의 sourceDocuments에 기록돼 있다. 이번 UI 범위 승인과 상위 제공자 권장안의 차이를 recommendations.md에 명시했다.

## 공식 1차 출처

| 출처·선정 이유 | 원본 URL → 최종 URL | 캡처/해시 |
|---|---|---|
| Kakao 공식 디자인 가이드. 표준 국문 버튼·심볼/레이블 구성과 브랜드 규정 | https://developers.kakao.com/docs/ko/kakaologin/design-guide#카카오-로그인-버튼 → 동일 URL(한글 fragment percent encoding) | captures/kakao-official.png · 1280×1800 · 32d51b7af3ae5d05a1fc4e48542db5e036f2c3cacfd8eeef75868424d1924e60 |
| Naver 공식 버튼 사용 가이드. 변경된 지정색·완성형·자산 링크 | https://developers.naver.com/docs/login/bi/bi.md → 동일 | captures/naver-official.png · 1280×1800 · 7058420b292812f1a443f7fa5bb8b5ec6b011c7c663cca1d785d65086e43bf0f |
| Apple 공식 HIG가 연결한 버튼 미리보기. 실제 표식·표준 버튼 확인 | https://appleid.apple.com/signinwithapple/button → https://account.apple.com/signinwithapple/button | captures/apple-official.png · 1280×4096 · 2ae30281f5a7856d12b6ab849f4d5f87e18139ce5d042970a771549e58e07b11 |

보조 문서: https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/ 는 웹 조회 시 JavaScript 요구 안내. 연결된 공식 Markdown https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple.md 로 본문을 읽었다. 이 문서가 `appleid.apple.com/signinwithapple/button`을 미리보기로 연결한다. 문서의 정책적 추천과 실제 대체 캡처의 관찰을 findings.md에서 구분했다. 공식 로고 자산을 아직 내려받거나 재배포하지 않았다. Kakao는 공식 리소스 다운로드, Naver는 해당 문서의 PNG/Illustrator 다운로드, Apple은 HIG의 Apple Design Resources/시스템 버튼을 후속 자산 출처로 사용한다. Naver 페이지의 Figma 다운로드는 사용하지 않았다.

## 실행과 직접 확인

1. `refs:capture` 최초 샌드박스 실행은 `Chromium exited` / exit 2. 실패를 통과로 간주하지 않았다. 권한 escalation 후 동일 명령을 실행해 PNG를 생성했다.
2. 최초 Apple HIG 캡처는 본문 렌더 미완료. captures/apple-hig-incomplete.png로 보존했다. SHA-256 `175dff86224533909b992ebaf53a890699f45d5a85562a4a02b01d1d3135ae10`, 1280×1800. 당시 report는 initial-capture-attempt.json(2026-11-12T19:36:42.342Z), 실패 이미지의 원래 키는 apple-official.png다.
3. 대체 공식 샘플의 첫 1800px는 버튼 위에서 끝나 관찰 근거가 충분하지 않았다. refs의 Apple viewport를 4096으로 늘려 자신이 소유한 생성 파일에만 `--force` 재생성했다. 최종 refs 입력 해시 `da920c230fe7e6e5a95df5d95076e2d9a8b587f2e015790a3727a67d4e16982e`.
4. view_image로 baseline 2개, 최종 공식 캡처 3개, 보존된 HIG 실패 캡처를 모두 직접 열었다. 최종 카카오/네이버 PNG는 재생성 전후 해시가 같고 다시 직접 열었다. Apple은 최종 4096px 이미지에서 두 버튼 미리보기를 직접 확인했다.

## 한계

공식 참조는 버튼 시각 및 지침의 근거이며 모바일 곤충맵의 레이아웃 검증이 아니다. 390×844·360×800 최종 화면, 한국어 Apple 버튼, 확대 글자·대비 측정·스크린리더·실제 SDK·취소/오류·정책 링크는 미검증이다. 외부 참조의 정적 로딩·오류 UI가 안 보인다고 해당 기능이 없다고 판단하지 않는다. 미검증 항목은 후속 단계 검증 책임으로 넘긴다.
