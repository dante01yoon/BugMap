# 로그인 첫 화면 — 디자인 하네스 실행

- 프로젝트: bugmap-login. 사용자 요청일: 2026-11-13.
- 목적: 현재 Figma BugMap / Page 1에 기존 시안을 보존하며 로그인 첫 화면을 디자인하고 하네스의 단계·승인·Figma 게이트를 실제 확인한다.
- 원본 기준: ../../docs/PRD.md, ../../docs/DESIGN.md, ../../docs/TDD.md, ../../docs/screens/login.md. 현재 버전 SHA-256은 control/project.json에 기록한다.
- 대상: control/figma.json. 로컬 MCP 브리지 키는 공개 Figma URL/fileKey와 같은 식별 체계라고 가정하지 않는다.
- 현재 단계: 01-prd. [요구사항](01-prd/PRD.md), [수용 조건](01-prd/requirements.csv), [기존 화면 캡처](01-prd/baseline/), [결정](control/decisions.md).
- 다음 작업: PRD 독립 비평·검사 → 사람이 PRD 승인 → 리서치. Figma 쓰기는 디자인 시스템 승인 전까지 금지한다.
- 사람 명령: `node tools/design-harness/bin/design-harness approve prd --project bugmap-login --by '본인 이름'`.
