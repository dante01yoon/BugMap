# 곤충맵

React Native + Expo + TypeScript 앱의 초기 화면 구현입니다. 현재는 Figma에서 선택한 로그인 프레임 `2:3`의 화면만 작성했습니다. 서버·인증·세션·AI·지도 서비스는 연결하지 않았습니다.

## 실행

Node.js 22.13 이상과 npm을 사용합니다.

```sh
npm install
npx expo install --check
npm run web
```

기기나 Expo Go에서는 `npm start`, 시뮬레이터는 `npm run ios`, Android 에뮬레이터는 `npm run android`를 사용합니다. 네이티브 실행에는 각 플랫폼 개발 환경이 필요합니다.

```sh
npm run typecheck
npm run export:web
```

의존성은 설치되어 있으며 lockfile에 기록되어 있습니다. 2026-11-09에 타입 검사·웹 번들·Expo 의존성 검사(오프라인 로컬 호환성 표 기준)가 통과했습니다. `react-native-svg`는 Expo 권장 버전 15.16.0입니다. [구현 화면 캡처](design/login/implementation.png)에서 모바일 레이아웃과 Lucide SVG 렌더링을 확인했고, 개발 모드에서 앱 콘솔 오류가 없음을 확인했습니다. 실제 기기 검증은 미완료입니다.

## 파일 구성

- `App.tsx`, `index.ts`: 앱 진입점, 상태바·안전 영역 설정.
- `src/features/auth/LoginScreen.tsx`: 브랜드, 소셜 버튼, 보조 동작·안내.
- `src/features/auth/FeatureCarousel.tsx`: 가로 소개 카드와 페이지 표시.
- `src/features/auth/loginContent.ts`: 소개 카드 문구.
- `src/features/auth/AppIcon.tsx`: Lucide 아이콘 이름과 화면 사용 위치 연결.
- `src/theme/tokens.ts`: 선택 화면의 색상·치수.
- `design/login/reference/2:2.png`: 배경을 포함한 **Figma 참조 캡처**. 앱 실행 결과가 아닙니다.

## 현재 동작과 범위

- 소개 카드는 가로 스크롤과 페이지 표시를 구성했습니다. 런타임 검증은 설치 후 필요합니다.
- 카카오·네이버·Apple 및 이메일·비회원 버튼은 디자인을 유지하면서 접근성 상태를 비활성으로 지정했습니다. 인증 호출·외부 이동·가짜 로그인 성공 처리는 없습니다.
- 약관은 디자인 문구만 표시합니다. 실제 정책 페이지와 동의 처리는 후속 작업입니다.
- 선택 프레임의 네이버·AI·경로 안내·정확도·사용자 수·보안 문구는 디자인 참고용입니다. PRD의 확정 기능·검증된 수치·실제 보안을 뜻하지 않습니다. 출시 전에 정합성을 조정해야 합니다.
- 배경 `#FAF8FF`, 제공자 고유색은 현재 선택 시안을 우선했습니다. 기기 시스템 글꼴을 사용하며, Figma의 작은 고정 텍스트 프레임을 그대로 복제해 글자를 자르지 않도록 자연스러운 줄 높이를 사용했습니다.

Expo 버전 조합은 [SDK 호환 표](https://docs.expo.dev/versions/latest/)와 [SDK 58 TypeScript 템플릿](https://github.com/expo/expo/blob/sdk-58/templates/expo-template-blank-typescript/package.json), 안전 영역은 [공식 문서](https://docs.expo.dev/versions/latest/sdk/safe-area-context/)를 기준으로 작성했습니다. 실제 설치 호환성은 아직 확인하지 못했습니다.

UI 아이콘은 Figma에서 복사하지 않고 [Lucide 아이콘](https://lucide.dev/icons)을 `lucide-react-native` 컴포넌트로 사용합니다. React Native 렌더링은 `react-native-svg`에 의존합니다.
