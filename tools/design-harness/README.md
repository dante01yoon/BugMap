# design-harness

Node 20 이상, 외부 의존성 없음. 앱 설치와 무관하게 실행하는 디자인 하네스의 첫 CLI다. [전체 설계](../../docs/design-harness.md)를 따른다.

```sh
# 저장소 루트에서, 설치 없이
npm run design-harness -- check --project bugmap
npm run design-harness -- approve 1 --by "홍길동" --project bugmap
npm run design-harness -- check --project bugmap --json
npm test

# 독립 패키지의 명령을 PATH에 추가해 같은 명령 사용
export PATH="$PWD/tools/design-harness/bin:$PATH"
design-harness check --project bugmap
design-harness approve prd --by "홍길동" --project bugmap
# 다른 저장소에서 사용할 때
design-harness check --root /path/to/repository --project example
# 하네스 테스트만 실행
npm --prefix tools/design-harness test
```

`--root` 기본값은 현재 디렉터리, `--project` 기본값은 `bugmap`이다. 프로젝트 ID는 영문·숫자로 시작하고 영문·숫자·`_`·`-`만 허용한다. 단계는 `1`~`8` 또는 아래 ID다. 옵션 중복·알 수 없는 옵션·빈 승인자는 오류다. `--help`로 사용법을 확인한다.

| 단계 | ID | 기본 승인 |
|---|---|---|
| 1 | prd | 필수 |
| 2 | research | 구조 검사로 통과 |
| 3 | structure | 구조 검사로 통과 |
| 4 | wireframes | 필수 |
| 5 | design-system | 필수 |
| 6 | figma | 구조 검사로 통과 |
| 7 | validation | 필수 |
| 8 | handoff | 필수 |

모든 단계에 명시적 승인을 추가할 수 있다. 승인된 선택 단계도 파일이 바뀌면 다시 승인해야 한다.

## 입력과 검사

작업 위치는 `<root>/work/<project>/`다. CLI는 산출물을 생성하지 않는다. 공통 입력으로 비어 있지 않은 `README.md`, `control/project.json`(유효한 JSON), `control/decisions.md`가 필요하다. `project.json` 내부 메타데이터 스키마 검증은 후속 범위다. 단계별 필수 경로는 [전체 설계의 표](../../docs/design-harness.md)를 그대로 사용한다. 와이어프레임은 `<화면ID>/<상태>.svg`가 하나 이상 필요하고, captures·assets 폴더도 실제 파일이 있어야 한다. 비어 있거나 공백뿐인 파일은 누락으로 취급한다. 모든 `.json` 파일은 구문 검사한다. 심볼릭 링크·특수 파일은 허용하지 않는다.

`check`는 앞에서부터 판정한다. 첫 미통과 단계가 현재 단계이며 뒤 단계는 `blocked`다. 누락은 `in_progress`, 필요한 승인 부재는 `awaiting_approval`, 기존 승인 불일치는 `needs_revision`, 통과는 `passed`다. 해시와 누락 문제는 함께 출력한다. `--json`은 `currentStage`, `complete`, `scope`, `stages`를 반환한다. 각 단계에는 `stage`, `number`, `status`, `issues`, `canApprove`, 현재까지 `files` 해시·`upstreamApprovals`를 담는다.

종료 코드: `0`은 구조 검사 전체 통과 또는 승인 저장 성공, `1`은 현재 미통과 단계 존재, `2`는 명령·파일 접근·손상된 승인 기록 등의 오류다. 오류는 stderr에 출력하며 잘못된 `approvals.json`을 초기화하거나 덮어쓰지 않는다. `check`는 파일을 쓰지 않는다.

구조 통과는 실제 요구사항 충족이나 디자인 품질의 증명이 아니다. CSV 행·화면별 커버리지·SVG/이미지 내용·링크·Figma 실행·검증 보고서의 의미는 자동 검사하지 않는다. 사람은 실제 검토 후 `approve`를 실행해야 한다. 파일명만 갖춘 예시 데이터로 제품 디자인을 완료 처리하면 안 된다.

## 승인 계약

`control/approvals.json`의 초기 형식은 다음과 같다. 파일이 없으면 빈 이력으로 읽고, 첫 승인 시 생성한다. 기존 이력은 배열에 추가하며 보존한다.

```json
{ "version": 1, "approvals": [] }
```

승인 항목은 다음 필드를 갖는다.

| 필드 | 내용 |
|---|---|
| id | 승인별 UUID |
| stage | 단계 ID |
| by | `--by`의 이름, 앞뒤 공백 제거 |
| at | UTC ISO 시각 |
| files | 프로젝트 상대 경로 → 파일 바이트의 SHA-256 |
| upstreamApprovals | 선행 유효 승인 단계 ID → 승인 UUID |

파일 해시는 공통 입력 3개와 **현재 단계까지 모든 단계 폴더의 파일 전체**를 포함한다. 선택 파일의 추가·삭제도 감지하고 이후 단계의 파일은 포함하지 않는다. 승인 파일·잠금·임시 파일은 해시에 포함하지 않는다. `stages.json`은 이 뼈대에서 읽거나 쓰지 않는다.

각 단계의 **마지막 승인**만 현재 내용·선행 승인들과 비교한다. 파일이 바뀌면 이력을 삭제하지 않고 유효성만 해제한다. 같은 단계 재승인은 새 UUID를 만들므로 상위 단계를 다시 승인하면 하위도 재승인해야 한다. 파일 바이트와 선행 승인 ID를 과거 상태로 정확히 복구하면 원래 승인과 다시 일치한다. 이는 내용 기반 승인으로, 관측하지 않은 편집 이력을 추적하지 않는다.

승인자는 자기 기입 이름이며 인증·서명 기능은 없다. 저장 시 `.approvals.lock`을 배타적으로 생성하고 같은 폴더의 임시 파일에 기록한 뒤 rename한다. 동시 승인은 오류로 중단해 기록 유실을 막는다. 프로세스 강제 종료로 잠금이 남으면 실행 중인 승인 프로세스가 없는지 확인하고 `control/.approvals.lock`을 제거한다. 산출물 작성 도구는 잠금에 참여하지 않으므로 승인 중에는 파일 편집을 멈춰야 한다. 원본 파일의 버전별 사본 보관과 `stages.json` 상태 저장, 조건부 승인, 원격 신원 인증은 후속 구현이다.
