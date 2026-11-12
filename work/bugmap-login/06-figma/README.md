# 로그인 Figma 구축 — 부분 완료 / blocked

2026-11-13. 정식 파일: [BugMap](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-26). Talk To Figma로 오류4화면의 복구 버튼8개를 동등너비로 보정하고 아래20개 PNG를 새로 저장·직접 검수했다. 단계6은 전체 raw 재내보내기와 로딩 아이콘 secondary 변수 바인딩 미완료로 통과하지 않았다. [재개 보고서](talk-repair-report.md), [실제 호출·bounds·캡처 해시](talk-repair-log.json).

|화면|상태|실제 Figma|원격 PNG|대응 HTML|
|---|---|---|---|---|
|login|default|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-26)|[PNG](captures/talk/72-26.png)|[HTML](web/login--default.html)|
|login|loading_kakao|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-84)|[PNG](captures/talk/72-84.png)|[HTML](web/login--loading_kakao.html)|
|login|loading_naver|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-145)|[PNG](captures/talk/72-145.png)|[HTML](web/login--loading_naver.html)|
|login|loading_apple|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-206)|[PNG](captures/talk/72-206.png)|[HTML](web/login--loading_apple.html)|
|login|cancelled|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-267)|[PNG](captures/talk/72-267.png)|[HTML](web/login--cancelled.html)|
|login|network_error|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-325)|[PNG](captures/talk/72-325.png)|[HTML](web/login--network_error.html)|
|login|unsupported|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-390)|[PNG](captures/talk/72-390.png)|[HTML](web/login--unsupported.html)|
|login|service_outage|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-450)|[PNG](captures/talk/72-450.png)|[HTML](web/login--service_outage.html)|
|login|success|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-515)|[PNG](captures/talk/72-515.png)|[HTML](web/login--success.html)|
|login|policy_pending|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-573)|[PNG](captures/talk/72-573.png)|[HTML](web/login--policy_pending.html)|
|login-compact|default|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-631)|[PNG](captures/talk/72-631.png)|[HTML](web/login-compact--default.html)|
|login-compact|loading_kakao|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-689)|[PNG](captures/talk/72-689.png)|[HTML](web/login-compact--loading_kakao.html)|
|login-compact|loading_naver|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-750)|[PNG](captures/talk/72-750.png)|[HTML](web/login-compact--loading_naver.html)|
|login-compact|loading_apple|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-811)|[PNG](captures/talk/72-811.png)|[HTML](web/login-compact--loading_apple.html)|
|login-compact|cancelled|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-872)|[PNG](captures/talk/72-872.png)|[HTML](web/login-compact--cancelled.html)|
|login-compact|network_error|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-930)|[PNG](captures/talk/72-930.png)|[HTML](web/login-compact--network_error.html)|
|login-compact|unsupported|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-995)|[PNG](captures/talk/72-995.png)|[HTML](web/login-compact--unsupported.html)|
|login-compact|service_outage|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-1055)|[PNG](captures/talk/72-1055.png)|[HTML](web/login-compact--service_outage.html)|
|login-compact|success|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-1120)|[PNG](captures/talk/72-1120.png)|[HTML](web/login-compact--success.html)|
|login-compact|policy_pending|[열기](https://www.figma.com/design/LynbxdW8Qf7TavCrPLd2nY/BugMap?node-id=72-1178)|[PNG](captures/talk/72-1178.png)|[HTML](web/login-compact--policy_pending.html)|

상세 변경/미완료: [change-log.md](change-log.md), 원격 ID: [screen-ledger.json](screen-ledger.json), 부분 raw: [nodes.partial.json](nodes.partial.json), 차단 응답: [quota-blocker.json](quota-blocker.json).
