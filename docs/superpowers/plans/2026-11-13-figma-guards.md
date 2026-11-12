# Figma guards and plugin implementation plan

**Goal:** 사용자 요청의 Figma 전후/종료 훅, 내보낸 노드 lint, 두 명령 설치용 Codex 플러그인과 커밋.
**Architecture:** 기존 Node 20 무의존성 CLI·해시 승인을 재사용한다. control/figma.json을 승인 입력으로 묶고, 훅은 프로젝트를 명확하게 선택하며 불확실한 Figma 쓰기를 거부한다. 기존 디자인 실행/사람 승인 기록은 수행하지 않는다.
**Spec:** docs/design-harness.md 및 2026-11-13 사용자 구현 지시.

## 작업

- [x] 실제 CLI/훅 입력 테스트 작성 → 실패 확인 → Figma 계약·lint:figma·check 연결.
- [x] PreToolUse 승인·정확 파일 검증, PostToolUse 재내보내기 안내, Stop 읽기 전용 check 구현·회귀 검증.
- [x] 기존 단계 스킬·역할과 CLI를 포함한 독립 플러그인·마켓플레이스 구성. 임시 CODEX_HOME에서 두 설치 명령 검증.
- [x] 전체 테스트, 타입 검사, 문서/진행 기록, diff 검토 후 커밋.

## Review focus

파일 누락/손상/다른 키/상위 승인 변경은 거부한다. 읽기 도구는 예외 목록으로만 허용하고 알 수 없는 Figma 도구는 보수적으로 쓴다고 본다. 훅은 cwd의 상위에서 루트를 찾으며 여러 work 프로젝트는 명시적 선택이 필요하다. Stop은 사람 대기에서 종료를 허용하고 재진입 루프를 만들지 않는다. 내보낸 데이터는 원격 최신성/진위를 증명하지 않으며 lint와 실제 캡처 검수는 별개다. 플러그인 설치가 사용자 전역 신뢰를 대행하지 않는다.

## 결과

Node 22 전체 35/35(실제 Chromium 포함, skip 0), Node 20 승인/단계 회귀 33/33 및 최신 Figma/플러그인 9/9 통과. 임시 Codex 설정에서 두 설치 명령과 설치본 훅 명령 실행을 확인했다. 타입·번들 일치·로컬 문서 링크·diff 검사 통과. 독립 검토 Important/Critical 없음. 추가 계약 점검에서 숫자 fileKey/시각을 거부하도록 실패→수정→통과 확인. 실제 프로젝트의 사람 승인이나 원격 Figma 쓰기는 수행하지 않았다.
