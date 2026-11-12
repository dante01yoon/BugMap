# 独立 PRD 비평 원문

판정: **ready** — PRD 범위에서 사람 검토에 제출할 준비가 됐습니다. 사람 승인이나 후속 단계 진행 허가는 아닙니다.

검토 범위는 `bugmap-login`의 PRD와 공통 설정, 지정된 기준 문서입니다. 새 맥락에서 작성 대화·이전 총평 없이 검토했습니다. 파일 수정, Figma 조작, approve/review 실행은 하지 않았습니다.

직접 연 캡처:

- `01-prd/baseline/1:2.png`: 제목·지도형 일러스트·Google 행이 보이고, 다른 제공자 위치는 비어 있거나 식별하기 어렵습니다. PRD 설명과 일치합니다.
- `01-prd/baseline/2:2.png`: 카카오·네이버·Apple 버튼, 가로 카드 일부의 화면 밖 배치, 실시간 지도·오늘 제보 42건·개인위치 암호화·3초 시작 문구를 확인했습니다. PRD가 기존 시안의 미검증 표현으로 구분한 내용과 일치합니다.

발견:

- **경미 — 약관·개인정보 동작의 요구사항 추적성.** PRD의 ‘범위와 핵심 여정’에는 약관/개인정보 동작 위치와 미정 표시가 포함되지만 `requirements.csv`에 이를 직접 확인하는 수용 조건이 없습니다. 후속 구조·검증에서 누락될 가능성이 있습니다. LOGIN-06에 “정책 링크의 위치와 미정/미연결 상태를 명확히 표현한다”를 추가하거나 별도 요구사항으로 연결하는 것을 권합니다. 현재 PRD 본문에 범위가 명시되어 있어 승인 제출을 막는 누락으로 보지는 않습니다.

유지할 점:

- 목적·사용자·포함/제외 범위·핵심 여정·두 viewport·상태·완료 증거가 구체적입니다.
- 카카오·네이버·Apple은 **이번 UI 검토 대상 제안**이며, 상위 PRD/TDD의 카카오·Google·Apple 권장안과 차이가 있음을 명시했습니다. 인증 제공자 채택으로 오인시키지 않습니다.
- 공식 제공자 로고는 **승인 전 기준 변경 제안**으로 분리했습니다. 현재 `docs/DESIGN.md`와 `docs/screens/login.md`의 Lucide 대체 기호 규칙이 이미 바뀐 것처럼 서술하지 않습니다.
- 기존 노드 보존과 별도 프레임 추가, 인증 동작 제외, 단계 1·4·5·7·8의 사람 직접 승인 경계가 명확합니다.
- 기존 시안의 제품·성능·보안 표현을 새 시안의 확정 요구사항으로 승계하지 않습니다.

실제 계산한 SHA-256:

| 경로 | SHA-256 |
|---|---|
| `AGENTS.md` | `c4374f749618d10136c24e720011df1c3f31a5880525989d99a0fad9c04d715b` |
| `docs/PRD.md` | `44b85763b8874bbeaad4222749ceda3f94108b958412f724e064394839c6ab9e` |
| `docs/DESIGN.md` | `b6929177e72f5387cd50148dbebb081e650d7bb3e5d250f6d5c830500a1a5bdd` |
| `docs/TDD.md` | `e3360066d0219975ebb5ebee8b161a2c8c965c20634d7e6b1f594d76ecf238f8` |
| `docs/screens/login.md` | `c27b2e429b5bbf0b0c267ed50b455d671296ad414900b83af83c9c340466a38b` |
| `docs/design-harness.md` | `6c7ab19f446b1ee7b3c8ddd4dd8db7880c4a845fc8355936a8a6e368f32f7b89` |
| `work/bugmap-login/README.md` | `604f069e4c74d52eb0d8b977b9b8494743b3ce451fbe003f83de4d54d0ac6618` |
| `work/bugmap-login/control/project.json` | `b3b83318203c00869b6d7daa84c20e100673eae635b4a2750a0158fcddd70842` |
| `work/bugmap-login/control/figma.json` | `71303c028c95efa6beb4a4ac7653689dedf254910303208394b50e205d0934de` |
| `work/bugmap-login/control/decisions.md` | `03b4940f5110eceda5cf069007f458da5febd9869bcc95a746e1169e0d60e77a` |
| `work/bugmap-login/01-prd/PRD.md` | `8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8` |
| `work/bugmap-login/01-prd/requirements.csv` | `41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b` |
| `work/bugmap-login/01-prd/baseline/1:2.png` | `4d9d82ab108655e0d630fb3ca3700846d6937288b72d24535a0c16d69af223da` |
| `work/bugmap-login/01-prd/baseline/2:2.png` | `ec05f5986117d18b82f72101aeb15d2735c497fa03f092d6f2516a2ebeff9da4` |

`control/project.json.sourceDocuments`의 여섯 기준 해시는 실제 계산값과 모두 일치합니다. 추가로 design-critic 스킬, 역할 TOML, 공통 계약과 CLI README를 읽었습니다.

미검증/재검토 조건:

- 원격 Figma 파일·페이지·보존 노드의 현재 상태를 직접 조회하지 않았습니다. 이번 검토는 저장된 baseline과 PRD의 정합성에 한정됩니다.
- `read_thread` 실행 이력, 실제 runtime 훅 설치·신뢰·차단, 인증·SDK·프로토타입 동작, CLI 승인 유효성은 검증하지 않았습니다.
- 최신 공식 브랜드 사용 지침은 PRD가 정한 후속 리서치 항목입니다.
- 위 검토 입력이 바뀌면 변경 영향을 반영한 새 맥락 검토가 필요합니다. 보고서 저장과 이후 check는 조정자가 수행하며, 사람 PRD 승인 전에는 리서치에 착수하지 않아야 합니다.
