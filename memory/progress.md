# 진행 기록

## 2026-11-09 — 작업 규칙 설정

- 완료: 루트 `AGENTS.md`에 기준 문서의 역할, 작업·검증 원칙, 완료 기록 규칙을 작성했다.
- 산출물: [AGENTS.md](../AGENTS.md).
- 검증: `docs/PRD.md`, `docs/DESIGN.md`, `docs/TDD.md`와 이 기록 파일의 존재를 확인하고 규칙의 참조 경로를 검토했다. 문서 변경으로 실행 테스트는 해당하지 않는다.
- 남은 일: 구현이 시작되면 실제 실행·테스트 명령을 확정해 문서화한다.

## 2026-11-09 — 발견 지도 디자인 기준 반영

- 완료: `docs/DESIGN.md`에 메인 / 발견 지도 화면의 지도 전용 색상, 전체 지도·하단 검색 패널 구성, 조작부, 마커·현재 위치, 5개 내비게이션 항목을 추가했다. 작은 필터 탭 제외와 시안·구현 범위의 차이도 명시했다.
- 산출물: [DESIGN.md](../docs/DESIGN.md), 기준 [화면 캡처](../design/main-map/4:150.png). Figma 기준 노드: `4:150`.
- 검증: 저장된 화면 캡처를 시각적으로 확인하고 지도 생성 소스·PRD와 대조했다. 문서 내 로컬 참조 경로와 추가 색상 값도 확인했다. 이번 작업에서는 Figma 화면을 수정하지 않았다.
- 남은 일: 구현 시 10px 보조 문구 크기와 시스템 아이콘을 공통 규칙에 맞추고, 확장 패널·키보드·검색 결과·권한·오류 상태를 별도로 설계한다.

## 2026-11-09 — 발견·채집 기록 작성 화면 디자인

- 완료: 로컬 Figma `BugMap`의 메인 오른쪽에 `03 · 발견·채집 기록 / 모바일`(390×844, `13:433`)과 `전체 펼침`(390×1432, `12:235`)을 추가했다. 사진 촬영·첨부, 곤충명·관찰/채집, 위치·공개 범위, 발견 날짜·시간, 관찰 글, 비활성 저장 버튼을 편집 가능한 레이어로 구성했다.
- 산출물: [모바일 캡처](../design/record-entry/13:433.png), [전체 캡처](../design/record-entry/12:235.png), [디자인 기준](../docs/DESIGN.md). 기존 메인·로그인 화면은 유지했다.
- 검증: 최종 두 캡처를 시각적으로 확인해 정렬·여백·텍스트 잘림과 폼 순서를 검수했다. Figma 구조 조회로 프레임 크기와 텍스트·프레임·도형 구성을 확인했다. 지도 배경만 기존 이미지를 재사용했다. 앱 코드 변경은 없어 실행 테스트는 해당하지 않는다.
- 남은 일: 메인에서의 프로토타입 연결·실제 스크롤 및 입력 기능은 미구현이다. 첨부 후 상태·선택기·키보드·권한/오류·입력 완료 상태는 후속 설계 대상이다. 사진 한도·위치 공개 기본값과 해상도는 기존 미결정으로 유지한다.

## 2026-11-09 — Expo 초기 설정·선택 로그인 화면 코드 작성

- 완료: Expo·React Native·TypeScript 설정 파일과 로그인 화면 코드를 작성했다. 사용자 선택 프레임 `2:3`을 기준으로 브랜드·소개 카드·소셜 버튼·보조 동작·안내를 구성했다. 최초 구현은 Figma 아이콘을 내보냈으나, 2026-11-09 규칙 변경으로 제거하고 Lucide 컴포넌트로 교체했다. 원본 Figma의 임시 복제본은 삭제했다.
- 산출물: [README](../README.md), [앱 진입점](../App.tsx), [로그인 화면](../src/features/auth/LoginScreen.tsx), [아이콘 연결](../src/features/auth/AppIcon.tsx), [소개 카드](../src/features/auth/FeatureCarousel.tsx), [Figma 참조 캡처](../design/login/reference/2:2.png), [계획·검증 기록](../docs/superpowers/plans/2026-11-09-login-screen.md). PRD·TDD·DESIGN의 현재 구현 상태와 시안 차이도 갱신했다.
- 검증: 자산 16개 파일·치수·참조 검사 통과. TS/TSX 6개 문법 변환 진단 0개, JSON 4개 구문 확인. 별도 정적 코드 리뷰에서 페이지 표시 버튼의 작은 터치 영역을 지적받아 44×44로 보정했다. 실제 화면 캡처는 Figma 참조만 있으며 앱 실행 결과가 아니다.
- 미완료: npm 온라인 설치는 `ENOTFOUND`, 오프라인 설치는 `ENOTCACHED`로 실패했다. 전체 타입 검사는 미설치 모듈·Expo 기본 설정을 찾지 못해 실패했고 웹 시작은 `expo: command not found`로 실패했다. 설치·lockfile·번들·네이티브/웹 실행·구현 캡처 검수는 미완료다. 네트워크 복구 후 README 명령으로 확인해야 한다. 인증·서버·이메일/비회원 이동·정책 연결은 사용자 요청대로 미구현이다.

## 2026-11-09 — Figma 아이콘 금지·Lucide 규칙 적용

- 완료: `AGENTS.md`에 공통 아이콘 출처 규칙을 추가하고 로그인 화면의 16개 Figma PNG 아이콘을 Lucide 컴포넌트로 교체했다. 소셜 버튼은 Lucide의 일반 메시지·검색·기기 아이콘을 표시한다. 사용하지 않는 PNG·출처 목록·검사 스크립트를 제거했다.
- 산출물: [AGENTS.md](../AGENTS.md), [아이콘 매핑](../src/features/auth/AppIcon.tsx), [로그인 화면](../src/features/auth/LoginScreen.tsx), [DESIGN.md](../docs/DESIGN.md), [TDD.md](../docs/TDD.md), [README](../README.md).
- 검증: 코드·문서에서 `assets/login` 참조가 남지 않았음을 검색으로 확인하고 `package.json` JSON 형식을 확인했다. 앱 화면 캡처와 타입 검사는 Lucide/Expo 의존성이 아직 설치되지 않아 실행하지 못했다. 오프라인 lockfile 동기화도 `ENOTCACHED`로 실패했다. `package-lock.json`은 있으나 새 Lucide 의존성은 반영되지 않았다.
- 남은 일: 네트워크 복구 후 의존성 설치, Expo 호환성·타입 검사·실행 캡처 확인.

## 2026-11-09 — Lucide 의존성 설치 시도

- 사용자가 `npm install`, `npx expo install --check`, `npm install lucide-react-native`를 완료했다고 알려 설치 상태를 다시 검증했다. `lucide-react-native@1.70.0`, `react-native-svg@15.16.1`을 확인했다.
- 검증: `npm run typecheck` 통과. `npm run export:web` 통과(웹 번들 2,266 모듈). `npm ls lucide-react-native react-native-svg --depth=0` 통과. `npx expo install --check`는 네트워크 비활성으로 로컬 호환성 표만 사용했고 SVG 15.16.0 권장과 15.16.1 설치 간 패치 차이를 알렸다. 이를 설치하려는 `npx expo install react-native-svg`는 registry DNS `ENOTFOUND`로 실패했다. 이후 사용자가 열어둔 앱 호스트 `http://127.0.0.1:8081`에 Ego Browser로 접속해 390px 화면을 검수하고 [구현 캡처](../design/login/implementation.png)를 저장했다. 17개 Lucide SVG의 렌더링과 두 번째 소개 인디케이터를 눌렀을 때 가로 스크롤되는 동작을 확인했다.
- 추가 변경: React Native 0.88의 `ScrollViewInstance` 타입 정의에 맞춰 소개 카드 ref 타입을 수정했다. 웹 번들과 타입 검사에 반영된 상태다.
- 남은 일: 온라인에서 Expo SVG 호환 패치 적용 후 `npx expo install --check` 재확인, 실제 기기 검증.

## 2026-11-09 — 웹 SVG accessible 속성 오류 수정

- 원인: `AppIcon`의 `accessible={false}`가 웹 SVG DOM으로 전달되어 React 개발 모드에서 비 boolean 속성 오류가 출력됐다. Ego Browser의 개발 콘솔에서 메시지를 확인했다. 앞선 화면 중심 검증에서 콘솔 오류를 놓쳤다.
- 변경: [AppIcon](../src/features/auth/AppIcon.tsx)에서 웹은 `aria-hidden`, 네이티브는 `accessible={false}`를 전달한다. README·TDD의 설치 및 검증 상태도 갱신했다.
- 검증: 타입 검사·웹 번들·Expo 의존성 검사 모두 통과. SVG 15.16.0 설치 확인. 개발 서버 새로고침 후 앱 콘솔 오류 0건, 렌더링된 SVG 16개 모두 `aria-hidden=true`, `accessible` DOM 속성 0개를 확인했다. [390×844 구현 캡처](../design/login/implementation.png)를 다시 저장하고 시각 검수했다.
- 남은 일: 실제 iOS·Android 기기 검증.

## 2026-11-13 — AI 디자인 하네스 플러그인 설계 문서

- 완료: [DESIGN.md](../docs/DESIGN.md)에 PRD → 리서치 → 화면 구조 → 와이어프레임 → 디자인 시스템 → 피그마 → 검증 → 핸드오프의 8단계 표를 추가했다. 각 단계의 파일·통과 조건·사람 승인 기본값, 사용하는 저장소의 `work/<프로젝트>/` 저장 계약, 상태·재개·재승인 규칙을 명시했다. 사용자 확정 사항과 설계 제안을 구분했다.
- 검증: 문서 검토 에이전트가 구현 계획을 막는 중요한 누락·모순이 없다고 확인했다. 8단계 표·열 구성, 기존 YAML 토큰과 곤충맵 디자인 본문 보존을 검사했고 `git diff --check`를 통과했다. 문서만 변경했으므로 앱 실행·화면 캡처 검증은 수행하지 않았다.
- 남은 일: 승인 정책 검토와 배포 플랫폼·실행 인터페이스·승인자 식별·Figma 도구·리서치 예산·재시도 정책 결정 후 플러그인 구현. 이번 작업에서는 코드·실행 산출물 폴더를 생성하지 않았다.
- 커밋 미완료: 요청에 따라 두 문서의 커밋을 시도했으나 현재 세션의 `.git` 읽기 전용 제한 때문에 `index.lock` 생성이 거부됐다. 문서 변경은 작업 폴더에 보존돼 있으며 Git 쓰기 권한이 있는 환경에서 커밋해야 한다.

## 2026-11-13 — 공통 디자인 지침과 개별 명세 분리

- 완료: [DESIGN.md](../docs/DESIGN.md)에는 공통 디자인 기준·토큰과 문서 안내만 남겼다. [메인 지도](../docs/screens/main-map.md), [기록 작성](../docs/screens/record-entry.md), [로그인](../docs/screens/login.md) 화면 명세와 [AI 디자인 하네스](../docs/design-harness.md)를 분리했다. 지도 전용 색상 토큰도 메인 지도 문서로 이동했다. AGENTS·README의 문서 안내와 상대 링크를 갱신했다.
- 검증: 새 문서의 로컬 링크, 하네스 8단계 표 보존, 공통 문서의 화면별 명세 제거, `git diff --check`를 확인했다. 문서 정리로 UI·코드 변경이 없어 앱 실행·캡처 검증은 해당하지 않는다.
- 남은 일: 앞서 요청된 커밋은 `.git` 쓰기 권한 제한으로 미완료 상태다. 하네스 구현은 이번 작업 범위에 포함하지 않는다.

## 2026-11-13 — 문서 정리 및 프로젝트 설정 커밋

- 반영: 공통·화면별 디자인 문서 분리와 [디자인 하네스 명세](../docs/design-harness.md), AGENTS·README 안내, [.codex/config.toml](../.codex/config.toml)의 프로젝트 Git 쓰기 권한 설정을 함께 커밋한다. 앞선 커밋 실패 기록의 후속 작업이다.
- 검증: 로컬 문서 링크 56개와 `git diff --check` 통과. 설정 내용은 직접 검토했으나 시스템 Python에 `tomllib`이 없어 TOML 파서 검증은 수행하지 못했다. 앱 코드·UI 변경이 없어 실행·캡처 검증은 수행하지 않았다.
- 남은 일: 하네스 플러그인 구현과 기존 기기 검증 항목은 별도 후속 작업이다.
