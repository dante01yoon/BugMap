# Figma bridge readiness

Goal: 승인된 로그인 시스템을 실제 Figma로 옮길 수 있도록 이미 확인된 IMAGE-fill 검사 및 브리지 읽기 분류를 보완한다. 승인/제품 범위는 바꾸지 않는다.

- [x] 실패 테스트: 파일/선택/문서/노드/스타일 등 브리지 읽기는 쓰기 승인 없이 조회, 알 수 없는 쓰기는 계속 차단.
- [x] 실패 테스트: IMAGE는 승인 시스템 assets-manifest.json의 PNG 경로·SHA-256·실제 바이트·원격 imageHash/크기대응이 일치하는 매핑만 허용. 미등록/변경/경로탈출/다른 imageHash/왜곡은 실패. 임의 JSON은 원격 진위를 인증하지 않음을 유지.
- [x] 구현·전체 테스트·독립 코드 검토. 승인된 01~05 폴더와 사람 로그는 변경하지 않는다.
- [ ] 실제 연결/노드/기능 preflight 후 새 Figma 프레임만 구축, 실제 재조회/캡처/노드 내보내기/HTML 대응·lint·비평.
- [ ] 사람 검증 승인7에서 중단하고 현재 범위/한계/재개를 기록.

출처: 승인된 bugmap-login PRD·시스템, docs/design-harness.md. 자동 훅 신뢰는 사용자만 수행한다. 프로젝트 훅을 준비할 수 있지만 신뢰 미완료를 runtime 자동 차단 성공으로 표시하지 않는다.

2026-11-13 검사: npm test 39/39, skip 0(실제 Chromium 포함), bundle-skills --check 및 git diff --check 통과. 독립 코드 검토의 회전 누락을 회귀 테스트로 재현 후 수정했다. Finder 메타데이터의 잘못된 승인 무효도 실패 테스트 후 수정했고 독립 검토에 Important/Critical 없음. 실제 파일의 정식 키는 공식 get_metadata로 확인했다. control/figma.json 변경에 따른 1·4·5 사람 재승인에서 중단하며, Figma 쓰기와 단계7 검증은 아직 미완료다.
