# Figma 준비 코드 검토

2026-11-13. 독립 코드 검토자 review_png_bridge_fix. 사람 리뷰/승인 기록이 아니다.

최초 Important 발견: IMAGE 노드 및 부모 회전을 무시해 회전된 브랜드 이미지를 허용했다. 노드/조상 회전의 실패 테스트를 먼저 확인한 뒤 lineage 검사로 수정했다. 매우 긴 이미지의 종횡비 차이는 상대 오차로 검사하고 유효하지 않은 opacity도 거부한다. 수정 후 전체 테스트38개를 통과했다.

Finder 메타데이터 보완 재검토 원문:

> No Important/Critical findings in the Finder metadata changes.
>
> - Only exact `.DS_Store` basenames are excluded. Real design-file additions/edits/deletions remain approval inputs.
> - Both traversal helpers call `safeStat` before excluding regular metadata files. Confirmed `.DS_Store` symlinks still fail in both `filesUnder()` and `check()`.
> - Approval/review comparisons filter copies; legacy logs remain unchanged. Upstream approval-ID checks remain strict.
>
> Minor recommendations:
>
> - Add regression coverage for `.DS_Store` symlinks, a directory named `.DS_Store` containing real files, and near-matches such as `.DS_Store.json`.
> - Exercise legacy review/evidence maps directly; current regression covers legacy approval maps.
> - Legacy generated `HANDOFF.md` files that already list `.DS_Store` may still become stale because handoff content is regenerated without those links. Document this compatibility boundary if claiming metadata is ignored across all eight stages.
>
> Verification: CLI suite passed **16/16**; temporary symlink checks passed. No repository edits, actual project approve/review commands, log rewrites, or Figma writes performed.

조정자 최종 확인: npm test39/39、skip0、fail0(실제 Chromium 포함), bundle-skills --check 통과. HANDOFF 호환 경계는 docs/design-harness.md에 명시했다. 추가 경미 테스트 제안은 미구현이다. 이 테스트는 실제 Figma 픽셀/노드 내보내기 또는 runtime 훅 신뢰를 인증하지 않는다.

## 실제 구축 중 발견한 후속 계약 보완

work/ 직계의 일반파일 `.DS_Store`를 프로젝트 폴더로 탐색해 ENOTDIR로 정상 쓰기를 거부한 문제를 실패 테스트로 재현했다. locateProject에서 폴더 여부를 먼저 확인하도록 수정했다. 다른 대상 키는 계속 거부한다. 이어 실제 Figma 인스턴스 자손 ID `I72:27;70:31;70:15`를 기존 숫자 전용 검사기가 거부하는 문제를 확인했다. native ID/이미지 매핑 성공, 중복/변조 이미지/잘못된 ID 실패 테스트 후 공통 ID 검사기를 보완했다. 사람 로그 및 승인 원본은 변경하지 않았다.

새 맥락 코드 검토자 review_native_figma_contract 원문:

> No Important or Critical findings in the scoped follow-up fixes.
>
> Both focused tests passed. The directory check preserves symlink rejection, and the shared ID validator preserves IDs verbatim while retaining duplicate and image provenance checks.
>
> Optional test gap: add a valid descendant ID with multiple semicolons, such as `I71:5;70:31;69:2`, to cover the longer path explicitly.

최종 전체 npm test41/41, skip0, fail0(실제 Chromium 포함), bundle-skills --check 및 git diff --check 통과. 다중 세미콜론 경로는 코드가 허용하며 별도 회귀 사례 추가는 미구현이다.
