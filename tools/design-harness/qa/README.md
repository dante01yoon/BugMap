# Playwright 캡처 비교 (선택 QA)

CLI 코어의 Node 20·무npm의존성 계약과 분리된 검증 스크립트다. 설치된 Google Chrome과 검증용 `playwright`, `pngjs`가 필요하다. 앱의 npm 의존성은 바꾸지 않고 임시 위치에 설치할 수 있다.

```sh
npm install --prefix /tmp/design-harness-qa-tools playwright pngjs
DESIGN_HARNESS_PNG_MODULE=/tmp/design-harness-qa-tools/node_modules/pngjs/lib/png.js \
node tools/design-harness/qa/playwright-compare.mjs \
  file:///absolute/path/to/screen.html \
  /absolute/path/to/expected.png /tmp/screen-comparison \
  390 844 /tmp/design-harness-qa-tools/node_modules/playwright/index.mjs
```

URL·기준 PNG·출력 디렉터리는 필수, 가로/세로 기본값은 390×844다. 마지막 인자는 Playwright 모듈 경로이며, 생략하면 보통의 모듈 탐색 또는 `DESIGN_HARNESS_PLAYWRIGHT_MODULE`을 사용한다. pngjs는 보통의 모듈 탐색 또는 `DESIGN_HARNESS_PNG_MODULE`을 사용한다.

출력: `expected.png`, `actual.png`, `diff.png`, `comparison.json`. 동일 크기의 RGBA를 픽셀 단위로 비교하고 차이를 자홍색으로 표시한다. 차이가 하나라도 있으면 종료 코드 1, 완전히 같으면 0이다. 이미지 크기가 다르면 오류로 중단한다. 허용 오차로 차이를 덮지 않으며, 서로 다른 브라우저/폰트/렌더러의 차이인지 화면 변경인지 사람이 판단한다. 파일·서버 URL에 대한 실제 페이지 로드와 폰트 준비 후 캡처한다. 로그인 페이지나 동적 앱의 중간 상태 조작은 이 스크립트의 범위가 아니다.
