# 구축 전 발견과 적용 범위

공식 use_figma로 Page 1과 보존5루트의 일치, 기존 로컬 컴포넌트/변수/텍스트스타일 없음, Noto Sans KR Light/Medium/Bold 사용 가능을 조회했다. Pretendard와 Apple SD Gothic Neo는 원격 폰트 목록에 없었다. 승인 서체의 sans-serif fallback으로 Noto Sans KR를 쓰고 300/500/700·크기·행간을 유지한다. 실제 캡처에서 줄바꿈을 검수한다.

Code Connect 파일 검색 결과 없음. get_libraries 후 구독된 Material3/Simple Design System/iOS26를 대상으로 social login screen/providerButton/recovery/colors-primary/body를 검색했다. 요청 컴포넌트 결과 없음. 검색된 Material3/iOS 색/서체는 승인된 로그인 토큰/한국어300·500·700과 호환되지 않아 채택하지 않는다. watchOS/visionOS/macOS는 이번 모바일 로그인 대상 밖이다. 승인05의 범위에 필요한 로컬 토큰·스타일·컴포넌트를 새로 구성한다. 일반 UI Lucide SVG, Kakao 공식SVG, Naver/Apple 공식PNG 원본을 사용한다.

web/은 승인된05의 screen.html/styles.css/screen.js/공식 자산을 복사한 대응 검토본이다. per-state HTML은 URL 상태만 초기화한다. 인증SDK/실기기/원격 Figma 픽셀 검증은 이 HTML의 검사 범위 밖이다. Figma 폰트 fallback 차이는 위와 같다. 실제 앱 코드는 변경하지 않는다.
