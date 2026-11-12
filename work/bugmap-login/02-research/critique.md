판정: **ready — 리서치 범위 내 준비 완료. 사람 승인이나 최종 디자인 검증을 의미하지 않는다.**

새 맥락에서 원본 PRD·상태·리서치 문서와 실제 이미지 6개를 직접 확인했다. 작성 대화나 이전 총평은 읽지 않았다. 파일 수정, 원격 Figma 조작, 인증 실행, approve/review, 사람 점수 작성은 수행하지 않았다.

검토 범위와 직접 확인

- 기준: `.agents/skills/design-critic/SKILL.md`, 공통 `protocol.md`, AGENTS.md, docs/PRD.md·DESIGN.md·screens/login.md·design-harness.md, TDD의 로그인·상태·검증 기준.
- 입력: `work/bugmap-login/01-prd/{PRD.md,requirements.csv}`, `control/{project.json,decisions.md,figma.json}`.
- 대상: `02-research/{sources.md,findings.md,recommendations.md,refs.json,captures.json,initial-capture-attempt.json}`.
- 이미지 도구로 직접 열었다: `01-prd/baseline/1:2.png`, `2:2.png`, `02-research/captures/{kakao-official.png,naver-official.png,apple-official.png,apple-hig-incomplete.png}`.
- 읽기 전용 check를 직접 실행했다. `prd/research passed`, `currentStage structure`, structure 필수 파일 미작성으로 전체 종료 코드 1이었다. 리서치의 의미적 충족 여부는 별도로 판단했다.

발견

1. **경미 — 캡처 밖 브랜드 규정의 보존 근거가 URL 중심이다.**  
   Kakao의 색·radius·크기 변경 규칙과 Naver의 16/8/20px, Apple HIG의 동일 위계·스크롤 없는 노출은 현재 PNG만으로 모두 재현할 수 없다. 문서는 이를 본문 근거와 후속 확인으로 구분하므로 시각 관찰을 과장한 문제는 아니다. 이번 검토에서 공식 본문을 별도 조회해 해당 내용이 존재함을 확인했다. [Kakao 가이드](https://developers.kakao.com/docs/ko/kakaologin/design-guide), [Naver 가이드](https://developers.naver.com/docs/login/bi/bi.md), [Apple HIG Markdown](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple.md)  
   영향: 외부 본문 변경 시 당시 수치를 캡처 해시만으로 재구성하기 어렵다.  
   제안: 시스템 단계에서 실제 사용할 자산의 URL·버전/조회일·해시와 적용 배율을 남긴다. 연구 단계 진행을 막을 정도는 아니다.

2. **경미 — 공통 기준의 제공자 기호 규칙이 아직 이전 내용이다.**  
   docs/DESIGN.md와 docs/screens/login.md는 제공자 표식을 일반 Lucide 기호로 대체하도록 적고 있다. 이번 PRD·decisions·리서치는 공식 자산 사용을 명확히 선택하며 충돌을 숨기지 않는다.  
   영향: 후속 담당자가 공통 기준만 따르면 LOGIN-02를 위반할 수 있다.  
   제안: 조정자가 승인 PRD의 예외를 공통 기준에 반영하는 기존 후속 항목을 처리하고, 기준 변경에 따른 입력 해시·승인 영향을 확인한다. 비평가는 기준 파일을 수정하지 않았다.

3. **경미 — 제공 불가 예시 메시지에는 구체적인 이유가 빠져 있다.**  
   recommendations의 LOGIN-09는 미지원/일시 장애를 구분하라고 명시하지만 예시 문구 자체는 일반적인 사용 불가 안내다.  
   영향: 예시를 그대로 모든 상태에 복사하면 PRD의 “제공 불가 이유” 조건이 약해진다.  
   제안: 구조 단계에서 확인된 미지원 환경과 일시 장애를 별도 상태·문구·복구 경로로 정의한다. 현재 연구는 이 작업을 후속 담당에게 요구하므로 리서치 차단 사유로 보지 않았다.

유지할 점

- baseline의 빈 동작, 잘린 가로 소개, 수치·시간·보안 약속을 실제 픽셀에 근거해 지적했다. 원격 로고와 앱의 일반 기호 대체 문제를 혼동하지 않는다.
- 공식 표식과 텍스트를 함께 사용하며, 브랜드색·비율을 앱 테마에 맞춰 임의 변경하지 않도록 했다.
- Apple HIG의 검은 본문 캡처를 실패로 보존했다. 대체 페이지도 상단 CSS 불완전, 영문·32pt 초기값이라는 한계를 설명한다. 직접 확인한 이미지와 설명이 일치한다.
- Naver 화이트 변형의 검정 레이블·표와 추출 alt의 불일치를 발견하고 녹색 완성형을 추천한 판단이 타당하다.
- LOGIN-01~09 모두 추천에 연결된다. 요청 중·중복 요청 방지·취소 복귀·오류 후 재시도·제공 불가·성공 도착을 관찰 사실과 구분한 설계 제안으로 제시한다.
- 정책 미정, 실제 인증 제외, 기존 Figma 노드 보존, 사람 승인 경계가 유지된다. 리서치가 모바일 배치나 실제 인증을 검증했다고 주장하지 않는다.

실제 계산한 SHA-256

경로는 `work/bugmap-login/` 기준이다.

```text
01-prd/PRD.md
8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8
01-prd/requirements.csv
41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b
control/project.json
b3b83318203c00869b6d7daa84c20e100673eae635b4a2750a0158fcddd70842
control/decisions.md
03b4940f5110eceda5cf069007f458da5febd9869bcc95a746e1169e0d60e77a
control/figma.json
71303c028c95efa6beb4a4ac7653689dedf254910303208394b50e205d0934de
02-research/sources.md
b9bf54ebb7f1297101360323b6f6f548c41d7270973c80dc9969f767982afd03
02-research/findings.md
7db4e473192b8e583e24384a51e88c44b374c46dee89d0a881926944c53b40e3
02-research/recommendations.md
56a9c1cda8c9d5dfb6c025666a21e36c819434b77438df6181475dfa45b2ac9f
02-research/refs.json
da920c230fe7e6e5a95df5d95076e2d9a8b587f2e015790a3727a67d4e16982e
02-research/captures.json
3dee5c2aebaeb9b01dc4f8e85aa5a3512f98166d91bf877f42869c6e30dc03b2
02-research/initial-capture-attempt.json
ac7bfc0720c7d1090fe77ad2c914ae3c913bdf67f755e117be8a493ffcd93563
01-prd/baseline/1:2.png
4d9d82ab108655e0d630fb3ca3700846d6937288b72d24535a0c16d69af223da
01-prd/baseline/2:2.png
ec05f5986117d18b82f72101aeb15d2735c497fa03f092d6f2516a2ebeff9da4
02-research/captures/kakao-official.png
32d51b7af3ae5d05a1fc4e48542db5e036f2c3cacfd8eeef75868424d1924e60
02-research/captures/naver-official.png
7058420b292812f1a443f7fa5bb8b5ec6b011c7c663cca1d785d65086e43bf0f
02-research/captures/apple-official.png
2ae30281f5a7856d12b6ab849f4d5f87e18139ce5d042970a771549e58e07b11
02-research/captures/apple-hig-incomplete.png
175dff86224533909b992ebaf53a890699f45d5a85562a4a02b01d1d3135ae10
```

공통 원본 6개를 별도 계산한 결과도 `control/project.json.sourceDocuments`의 값과 모두 일치했다. sources와 captures의 기록 해시 역시 현재 파일과 일치했다.

미검증·재검토 조건

공식 자산 다운로드·재배포 조건과 실제 48px 비율, Apple 한국어 버튼, 390×844·360×800 배치, 확대 글자·대비·초점·스크린리더, 인증 SDK·성공·취소·실패, 정책 링크, 현재 원격 Figma 노드 보존 여부는 검증하지 않았다. 원격 작업은 수행하지 않았다. 이 항목들은 후속 단계 증거로 확인해야 한다.

보고서는 조정자가 저장한다. 수정 파일은 없다.
