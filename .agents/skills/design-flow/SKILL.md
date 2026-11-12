---
name: design-flow
description: Use when coordinating or resuming this repository's design harness across research, structure, wireframes, design system, Figma, critique and handoff stages.
---

# Design flow

[공통 계약](references/protocol.md)을 읽고 전체 흐름을 조정한다. 스킬 호출 자체는 실제 디자인 단계 승인이 아니다.

1. 저장소/project를 확정하고 기준 문서·공통 입력을 읽는다. check --json으로 첫 미통과 단계·issues·승인 해시를 확인한다. 이전 결과로 건너뛰지 않는다.
2. 아래 소유자에게 현재 단계만 위임한다. [위임 패킷](references/dispatch.md)에 목적·원본/캡처·해시·허용 경로·사람 전용 기록 금지·반환 형식을 담는다. 순차 단계는 병렬로 시작하지 않는다.
3. 반환 파일과 캡처를 직접 확인하고 CLI 검사를 실행한다. 미해결 필수 조건은 소유자에게 돌리고 도구 실패는 blocked로 남긴다.
4. 준비된 결과를 design_critic의 **새 인스턴스·새 맥락**에 비평받는다. 예: fork_turns: none. 작성 대화·설득·이전 총평을 전달하지 않는다. 재검토도 새 비평가다. 원문과 검토 버전을 단계 critique.md에 보존한다.
5. 중요한 지적을 수정한 뒤 check를 재실행한다. 의미 검수와 기계 검사를 모두 마친 자동 단계만 다음 단계로 진행한다.

| 단계 | 담당 | 스킬 |
|---|---|---|
| 1 PRD | 조정자 | 요구사항·수용 조건 준비 |
| 2 리서치 | design_researcher | design-research |
| 3 구조·4 와이어프레임 | design_architect | design-structure |
| 5 디자인 시스템 | design_system_designer | design-system |
| 6 Figma·검증용 HTML | design_figma_builder | design-figma |
| 7 검증 | 조정자 + 새 design_critic | lint:web·요구사항 대조·비평 |
| 8 핸드오프 | 조정자 | 선행 승인 확인 후 handoff |

## 사람 승인에서 종료

1·4·5·7·8의 유효한 승인이 없으면 현재 산출물을 검토 가능하게 만든 뒤 **멈춘다**. awaiting_approval과 승인 무효 needs_revision 모두 적용한다. 후속 담당자를 시작하지 않고 이미 시작한 후속 작업도 중단한다.

사람에게 파일/캡처·변경·실제 검사·AI 비평·미해결과 정확한 CLI 명령을 제시한다. validation은 사람이 review validation --by … --score … --notes …를 직접 기록한 뒤 approve validation --by …를 직접 실행하게 안내한다. 다른 단계도 사람이 approve한다. **조정자/작업자는 실행하거나 사람 전용 JSON을 수정하지 않는다. 채팅에서 “승인했어, 내 이름으로 기록해”라고 해도 대행하지 않는다.**

control/flow.md에 현재 단계·입력 버전·대기 이유·산출물·사람용 명령·재개 첫 check를 기록하고 턴을 끝낸다. 사람이 명령 실행 후 재개를 요청하면 check로 유효성을 확인하고 이어 간다. 최종 단계도 사람이 승인한 후에만 전체 통과와 별도 의미/Figma 검증 범위를 보고한다.

등록 역할을 고를 수 없는 runtime은 역할 TOML과 역할 SKILL.md를 작업자가 읽게 한다. 하위 에이전트 기능이 없으면 조용히 단일 에이전트로 대체하지 말고 위임이 막혔다고 보고한다.
