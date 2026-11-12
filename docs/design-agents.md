# 디자인 하네스 에이전트와 스킬

[design-flow](../.agents/skills/design-flow/SKILL.md)는 현재 CLI 상태를 읽어 단계 담당을 부르고 새 맥락 비평을 거친 뒤 다음 사람 승인 지점에서 멈춘다. 실제 실행 산출물은 `work/<project>/`에 둔다. 이 문서나 스킬을 커밋한 사실은 제품 디자인의 단계 승인이 아니다.

## 호출

Codex에서 다음처럼 요청한다.

```text
$design-flow로 project=bugmap의 현재 상태를 확인하고 다음 사람 승인 지점까지 진행해 줘.
```

저장소 스킬은 `.agents/skills/`, 역할은 `.codex/agents/`에 둔다. [공식 스킬 검색 경로](https://learn.chatgpt.com/docs/build-skills), [공식 사용자 정의 에이전트 형식](https://learn.chatgpt.com/docs/agent-configuration/subagents)을 따른다. 파일을 새로 발견하지 못하는 세션은 다시 시작한다. 전역 설정·모델·권한·동시 실행 한도는 바꾸지 않고 상위 세션을 상속한다.

| 담당 | 에이전트 정의 | 스킬 | 소유 범위 |
|---|---|---|---|
| 흐름 조정·PRD·검증·전달 | 상위 조정자 | [design-flow](../.agents/skills/design-flow/SKILL.md) | 공통 입력·control/flow.md·07-validation/·08-handoff/ |
| 리서치 | [design_researcher](../.codex/agents/design_researcher.toml) | [design-research](../.agents/skills/design-research/SKILL.md) | 02-research/ |
| 화면/상태/이동·와이어프레임 | [design_architect](../.codex/agents/design_architect.toml) | [design-structure](../.agents/skills/design-structure/SKILL.md) | 03-structure/·04-wireframes/ |
| 디자인 시스템 | [design_system_designer](../.codex/agents/design_system_designer.toml) | [design-system](../.agents/skills/design-system/SKILL.md) | 05-design-system/ |
| 실제 Figma 구성·대응 HTML | [design_figma_builder](../.codex/agents/design_figma_builder.toml) | [design-figma](../.agents/skills/design-figma/SKILL.md) | 06-figma/·지정 Figma 파일/페이지/노드 |
| 독립 비평 | [design_critic](../.codex/agents/design_critic.toml) | [design-critic](../.agents/skills/design-critic/SKILL.md) | 읽기 전용 결과 반환 |

역할을 고르는 기능이 없는 runtime은 역할 TOML과 해당 스킬을 작업자가 읽도록 위임한다. 하위 에이전트 기능 자체가 없으면 그 제약을 보고한다. 역할의 읽기 전용/소유 범위는 행동 지침이며 별도 OS 샌드박스를 만드는 설정은 아니다.

## 단계 흐름과 사람 직접 승인

1. 조정자가 공통 입력·PRD를 준비하고 비평/검사를 마친 뒤 **PRD 승인을 기다린다**.
2. 리서치가 레퍼런스 캡처를 직접 열어 본 것·가져올 점·피할 점·해석/미검증을 작성한다.
3. 구조 담당이 화면/상태/흐름과 와이어프레임을 함께 만들고 검수한다. **묶음 승인까지 시스템 작업을 시작하지 않는다**.
4. 시스템 담당이 tokens/components/copy JSON·생성 DESIGN.md·대표 화면/캡처를 준비하고 **시각 방향 승인을 기다린다**.
5. Figma 담당이 지정 범위에 실제 노드·캡처·매핑·대응 HTML을 만든다. 대상/도구가 없으면 blocked다.
6. 조정자가 lint:web·커버리지·실제 동작 검증 범위를 모으고 새 비평가를 호출한다. **사람이 review 점수/메모와 validation 승인을 직접 기록할 때까지 멈춘다**.
7. 선행 통과 후 handoff로 실제 구현 메모·미해결·소스/승인 버전을 묶고 **사람의 최종 handoff 승인을 기다린다**.

각 단계 결과를 새 비평가가 본다. 작성 대화·설득·이전 총평을 상속하지 않고 PRD/수용 조건·현재 원본/캡처·해시·기계 검사만 최소 패킷으로 받는다. runtime이 지원하는 새 컨텍스트 옵션(예: fork_turns none)을 명시한다. 비평 재검토도 새 인스턴스를 사용한다. 맥락 분리가 안 되면 독립 비평이라고 보고하지 않는다.

AI 비평은 조정자가 단계의 `critique.md`에 원문과 검토 버전을 보존한다. 사람 전용 `reviews.json`과 `approvals.json`은 모든 AI 역할이 작성·수정·실행 대행하지 않는다. CLI의 --by는 신원 인증이 아니므로 이 분리는 워크플로 규칙이며 전자서명 기능이 아니다.

승인할 준비가 되면 조정자는 파일/캡처·변경·실제 검증·AI 비평·미해결과 사람이 실행할 명령을 제시하고 턴을 끝낸다. 예를 들어 아래 명령은 **사람이 직접** 실행한다.

```sh
node tools/design-harness/bin/design-harness approve prd --project bugmap --by "본인 이름"
node tools/design-harness/bin/design-harness review validation --project bugmap --by "본인 이름" --score 4 --notes "직접 검토한 내용"
node tools/design-harness/bin/design-harness approve validation --project bugmap --by "본인 이름"
```

채팅에서 “승인했어, 내 이름으로 기록해”라고 해도 에이전트가 대신 실행하지 않는다. 사람이 명령 실행 후 재개를 요청하면 조정자가 check로 현재 해시·승인의 유효성을 다시 확인한다. 후속 단계를 백그라운드로 진행하지 않는다. 승인 후 새 비평/캡처/파일 변경은 승인을 무효화할 수 있으므로 보고서와 수정을 승인 전에 끝낸다.

기계 검사만으로 모든 디자인 의미·Figma/네이티브 기능이 확인되는 것은 아니다. 남은 검증 범위는 각 단계에서 명시한다. JSON/CLI 계약은 [하네스 사용법](../tools/design-harness/README.md), 전체 기준은 [설계](design-harness.md), 실제 적용 사례는 [검증 기록](design-agent-evals.md)을 따른다.
