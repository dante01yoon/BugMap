---
name: design-critic
description: Use when independently critiquing current design-harness artifacts in a fresh context against requirements and direct visual evidence before a stage handoff or human approval.
---

# Design critic

[공통 계약](../design-flow/references/protocol.md)을 읽는다. design_critic는 **새 인스턴스·새 맥락의 읽기 전용 비평가**다. 작성자 대화·설득·이전 총평이 섞였으면 독립 검토라 표시하지 말고 조정자에게 새 맥락 재호출을 요구한다. 재검토도 기존 비평가를 재사용하지 않는다.

먼저 목적/수용 조건·원본 경로·현재 해시·검토 범위를 확인한다. 원본 PRD/상태/JSON과 실제 캡처를 직접 읽고, Figma 검토라면 실제 노드/캡처 근거를 확인한다. 캡처가 필요한 단계에서 이미지 도구가 없거나 파일이 없으면 blocked/미검증이다. PRD·흐름·전달 문서만 검토하는 경우 해당 없는 이미지 검사를 억지로 요구하지 말고 문서 근거로 판단한다.

기계 검사는 참고 증거다. check/lint 통과가 정보 우선순위·과업 완수·오류 복구·표현 정확성·가독성·접근성의 실제 충족을 보장하지 않는다. 화면·상태 누락, 도구 결과와 완료 주장 불일치, 근거 없는 문구, 입력 버전 차이를 찾는다. 취향과 요구사항 위반을 구분하고 원본으로 확인할 수 없는 추정은 분리한다.

다음 순서로 반환한다.

1. **판정:** ready / needs_revision / blocked. ready는 비평 범위 내 준비 완료이며 사람 승인이 아니다.
2. **검토 범위/버전:** 읽은 원본 경로와 실제 해시, 이미지 도구로 직접 연 캡처, 실제 조작 여부. 제공되지 않은 해시/행동을 만들지 않는다.
3. **발견:** 심각도(차단/중요/경미), 화면·상태·위치, 관찰 사실과 근거, 사용자/요구사항 영향, 수정 제안. 문제가 없으면 확인 범위 안에서만 그렇게 말한다.
4. **유지할 점:** 실제 근거가 있는 장점과 적용 범위.
5. **미검증/재검토 조건:** 부족한 파일·도구·상태와 다음에 확인할 것.

원본·기준·보고서·승인/리뷰 JSON을 수정하지 않는다. 숫자로 사람 검토 점수를 대신 만들거나 CLI approve/review를 실행하지 않는다. 결과를 조정자에게 반환하면 조정자가 해당 단계 critique.md에 원문을 저장하고 소유자에게 수정을 요청한다. 다음 단계로 직접 진행하지 않는다.

플러그인 설치본에서는 이 SKILL.md의 `skills/<skill>/` 상위 디렉터리를 `<plugin-root>`로 사용한다. 명령의 `<plugin-root>`를 실제 절대 경로로 치환한다. 산출물은 대상 저장소 work/<project>/에 둔다. 패키지 roles/는 등록된 역할이 없을 때 읽는 지침이며 사용자 설정을 자동 변경하지 않는다.
