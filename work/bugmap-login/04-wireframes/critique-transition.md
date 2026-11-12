판정: **ready** — 지정된 변경 범위의 준비 완료이며 사람 승인을 의미하지 않습니다.

검토 범위는 `default`의 제공자 선택과 내부 검토용 `policy_pending`의 관계, 두 viewport의 해당 캡처, 입력 해시 정합성입니다. 새 맥락에서 읽기 전용으로 검토했고 이전 비평·작성 대화는 읽지 않았습니다. 파일 수정·승인·사람 리뷰·원격 쓰기를 수행하지 않았습니다.

- `states.csv`의 두 기본 행은 `loading_{provider}` 제품 전이와 `policy_pending (제품 진입 없음)` 내부 참조를 구분합니다.
- `flows.mmd`는 정책 비교를 점선으로 표시하고 `실제 링크 아님`을 명시합니다. `behavior.md`와 `index.html`도 제품 정책 링크가 없고 미정 상세판임을 일관되게 설명합니다.
- JSON의 두 상태는 정책 슬롯을 모두 `box`로 지정합니다. 직접 연 네 PNG에서도 “미연결”, “검토용” 표기가 보이고 정책 동의가 완료됐다는 주장은 없습니다.
- 두 viewport 모두 해당 문구와 하단 정책 영역이 화면 안에 읽히며, 기본 상태의 로그인 선택과 정책 검토 주석이 겹치지 않습니다.

차단·중요 발견은 없습니다. 경미한 문서 보완 여지는 있습니다. `states.csv` 기본 행은 제품 출구를 `loading_{provider}`로 요약하지만, 흐름도는 선택 직후 지원정보 확인에서 `unsupported`·`service_outage`로 분기할 수 있다고 명시합니다. 사용자 전이의 상세 기준은 흐름도에서 확인 가능하므로 이번 정책 관계 수정의 차단 사유는 아니지만, 상태표도 “지원정보 확인 → loading / 확인된 미지원 / 일시 장애”처럼 맞추면 후속 구현자의 해석이 더 명확해집니다.

직접 확인한 입력 SHA-256:

| 입력 | SHA-256 |
|---|---|
| `01-prd/PRD.md` | `8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8` |
| `01-prd/requirements.csv` | `41d9d2ff3a392cc445aa541368af1db9e140322a3cd48758f6cfaa1389a06b8b` |
| `03-structure/states.csv` | `496d58c956ba452c4aaa58335a51282d22e71865d065334104c6cb18cac9dc4a` |
| `03-structure/flows.mmd` | `448b481d07b8c0c922e316a6bda92ddb19991723a7c086d2685d60404cafd45e` |
| `03-structure/behavior.md` | `f5d710f6e765e66c364f66951e24063979658dc97935e505923fa065dea37922` |
| `04-wireframes/wireframes.json` | `206a9ae4126462a1704e96f0c1983c12e042a9779c8a61f8d486bc1bbab1ec4c` |
| `04-wireframes/index.html` | `a0f0da82a1f84e8102edb0ecedddcbc2d434aae459ec5fe801a8fc3ced5d46e7` |

`hashes.md`에 열거된 18개 파일 해시를 직접 계산해 모두 일치함을 확인했습니다. 기존 비평 파일은 해시만 계산했고 내용을 읽지 않았습니다.

이미지 도구로 직접 연 캡처와 SHA-256:

| `04-wireframes/captures/` 아래 경로 | SHA-256 |
|---|---|
| `login/default.png` · 390×844 | `beec0a1ffe162075a4f24e9a89d9387b4ad609c8bed766a92543e8b7e0bf8803` |
| `login/policy_pending.png` · 390×844 | `9f779facad2cac8a8aa0051932b45c9bd8405fd2a2577b53b02705bb8ca6b7ff` |
| `login-compact/default.png` · 360×800 | `b99923aa4053e581b3769ddbbc6854d2dd62fdb1a90050312a45619794a79872` |
| `login-compact/policy_pending.png` · 360×800 | `a174ce9380d7d5b8ea374888e253b3a94a4e49e66dacc1c051132a8c4a6774ba` |

기계 check 결과는 `currentStage: wireframes`, PRD·research·structure `passed`, wireframes `awaiting_approval`, `canApprove: true`, 해당 단계 issue는 사람 승인 필요 1건입니다. 전체 check 종료 1은 승인 대기와 후속 단계 미작성 상태를 포함합니다.

유지할 점은 제품 전이와 내부 비교를 문구·도식·정적 화면에서 함께 구분한 점입니다. 정책 미정을 숨기지 않으면서 사용 가능한 링크나 동의 완료로 표현하지 않습니다.

미검증: 실제 정책 URL·인증·탭·키보드 초점·접근성 역할·외부 문서 복귀는 구현 및 실제 조작 검증이 없습니다. 나머지 8개 상태의 시각 품질·복구 흐름 전체는 이번 재검토 범위 밖이며 새로 통과 판정하지 않았습니다. 정책 연결이나 기본 전이 계약을 변경하면 해당 입력과 캡처를 다시 검토해야 합니다.
