# 새 맥락 비평 원문 — Talk 보정

아래는 design_critic의 반환 원문이다. 후속 매핑 문서 검토는 별도 추가 기록으로 보존한다.

판정: **blocked — 6단계 전체 완료 기준. 이번 복구 버튼 균등 폭 수정 범위는 ready.** 사람 승인을 의미하지 않는다.

새 인스턴스에서 현재 원본·캡처만 읽었다. 작성자 대화·이전 비평 보고서는 읽지 않았다. 파일 수정, Figma 조작, approve/review, 사람 기록 수정은 수행하지 않았다.

검토 범위와 직접 확인한 증거:

- 기준: 프로젝트 PRD, behavior.md, states.csv, 승인 05단계 tokens/components/copy와 self-check, 저장소 디자인·화면 기준.
- 대상: talk-repair.mjs, talk-preflight.json, talk-repair-log.json, 오류 4개 화면의 before/after JSON 8개.
- 이미지 도구로 직접 연 PNG: `captures/talk/72-325.png`, `72-450.png`, `72-930.png`, `72-1055.png`, `72-26.png`, `72-631.png`, `72-689.png`.
- 전체 20개 talk PNG의 실제 바이트를 읽어 SHA-256과 PNG 크기를 계산했다. 모두 talk-repair-log.json의 해시 및 390×844 / 360×800 기록과 일치했다.
- 최신 check를 직접 실행했다. 종료 1, 단계 1~5 passed, currentStage figma, 6단계 in_progress. 직접 확인된 6단계 문제는 `06-figma/nodes.json` 누락이다.

발견:

| 심각도 | 위치 | 관찰·근거 | 영향·제안 |
|---|---|---|---|
| 차단 | 06-figma/nodes.json | 최신 check에서 파일 누락. Talk 응답은 전체 Figma 노드 내보내기를 대신하지 못한다. | PRD의 동일 버전 내보내기·노드 검사 요건을 충족하지 못한다. 실제 원격 전체 속성 내보내기를 확보한 뒤 lint:figma와 상태·매핑 대조를 진행해야 한다. |
| 중요·증거 한계 | talk-preflight / talk-repair-log / Talk 도구 | 로그는 fileKey를 도구가 노출하지 않는다고 명시한다. Page 1(0:1), 보존 루트 및 생성 루트 33개의 ID·이름 대조는 확인되지만, 연결된 원격 파일의 fileKey 직접 확인은 아니다. | fileKey가 직접 조회된 증거와 연결해 최종 파일 동일성을 확인해야 한다. 현재 루트 대조만으로 파일 동일성을 확정하면 안 된다. |
| 중요·증거 한계 | Talk get_node_info 내보내기 | 플러그인 code.js의 filterFigmaNode는 VECTOR를 제외하고 fill/stroke boundVariables를 제거한다. server.ts도 같은 필터를 다시 적용한다. 반환 항목은 제한된 이름·형태·색·bounds·text/style 중심이다. | 현재 before/after JSON으로 폭 수정은 확인할 수 있으나 아이콘 전체, 변수 연결, 레이아웃·컴포넌트 연결·접근성 메타데이터 완전성은 판정할 수 없다. 이 응답을 이름만 nodes.json으로 바꾸거나 누락 속성을 추정해 채우지 말고 비필터 원격 내보내기를 확보해야 한다. |

복구 수정 확인:

| 화면 루트 | 수정 인스턴스 | before → after |
|---|---|---|
| 72:325 / 390 network_error | 72:380, 72:382 | 172/174 → 173/173×48 |
| 72:450 / 390 service_outage | 72:505, 72:507 | 172/174 → 173/173×48 |
| 72:930 / 360 network_error | 72:985, 72:987 | 157/159 → 158/158×48 |
| 72:1055 / 360 service_outage | 72:1110, 72:1112 | 157/159 → 158/158×48 |

8건의 resize_node 응답과 후속 get_node_info bounds가 일치한다. 두 버튼 사이 간격은 12px이며 본문 폭 358/328px에 맞는다. after JSON의 라벨 이동도 폭 변경에 따른 중앙 정렬과 일치한다. 비교한 JSON에서 다른 본문·색·문구 변경은 발견하지 않았다.

유지할 점:

- 직접 연 오류·일시 장애 4PNG에서 두 복구 버튼의 동등 폭, 48px 높이, 중앙 라벨이 유지된다.
- 360폭에서도 장애 도움말·복구 동작·정책 두 영역이 잘리거나 겹치지 않는다. 정책 아래 34px 여백이 남는다.
- 카카오 연결 실패와 Apple 일시 장애를 서로 다른 문구로 구별하고, 각 상태에 다시 시도·다른 방법을 제공한다.
- 기본 2크기와 loading_kakao 캡처에서 가치 설명→제공자→상태→정책 순서가 유지된다. 로딩 메시지는 버튼 밖에 제공자명을 표시한다.
- 공식 제공자 버튼이 로딩 중에도 흐림 처리나 임의 대체 기호로 바뀌지 않는다. 다만 실제 disabled·잠금 동작은 PNG로 확인할 수 없다.

직접 계산한 입력 SHA-256  
경로는 `work/bugmap-login/` 기준이다.

```text
8416daa164768841f906dec660b6da053b997712f68b48c6728ed81a2eb1dbe8  01-prd/PRD.md
f5d710f6e765e66c364f66951e24063979658dc97935e505923fa065dea37922  03-structure/behavior.md
496d58c956ba452c4aaa58335a51282d22e71865d065334104c6cb18cac9dc4a  03-structure/states.csv
b2e55b30080167b17fb02bf3c1222cc4ef1e14400967f4a964280b4215c6484e  05-design-system/tokens.json
6e1accd5f6986897723f3fa00eadec3156db4164b53abf05cc58e4a07a70c5e8  05-design-system/components.json
49dfff66b9f10a0d91992e5210289197c09cde574b1cc1ba3c644c0b69710b79  05-design-system/copy.json
83d67e50d73a1b1a91a2ce639b43baa2f7594c462424aec7c8442bf62c9e01a8  05-design-system/self-check.md
a520988431afbcf7b69eca582315d52842880eb6cbec14d1efe4e92bd015e084  06-figma/scripts/talk-repair.mjs
fc76dcb1c873e3cd6fa9828ed33b88421088dfa4a10c1e8fc12ebbb33d8016bd  06-figma/talk-preflight.json
eb374b49f823e667b08490073a15c8eefd53009c45aa27c157314b3771bcac18  06-figma/talk-repair-log.json
d9587d2dc233fe4fa64541f4524cbfa9690c0dc9a055a0c151e3da7fa5ea3ce1  06-figma/talk-before-72-325.json
4c89a49747ea3052060e5d007da277cc0421490ce9dd1fda374abddfb702352e  06-figma/talk-after-72-325.json
eb981454c2bff77c33c47f3ef587d3337b40f3803f1fdb1c54bca2f0dbf642ab  06-figma/talk-before-72-450.json
44402d80e051b716ac7ed12c014e57982a0acfb047dfd52d1f46e530c34a591b  06-figma/talk-after-72-450.json
e6261ba8dc9d6b90bf0e7425ff8382f3114869c410f856d5cceb29f068d79ccf  06-figma/talk-before-72-930.json
674c27b473605e42b7678e1f869766451475986d0272173be925d03c559983d8  06-figma/talk-after-72-930.json
31faea0db301bae5b3d81a479476d706c676420334da29f3e5c88a0bee744f8c  06-figma/talk-before-72-1055.json
ce74109b0647436b2c7474ca812ff6f700d4b543006d2d868ad1b61162086084  06-figma/talk-after-72-1055.json
```

직접 연 캡처 SHA-256:

```text
17b90b109bbb1283becbd8047e9d8c5e356ac0e64b12b94d824deede7fcdbe07  72-325.png
b0f5dc766db802a726d16210da4e1dcae926e00cde1627d92512def93929ea5e  72-450.png
c8e9ae76f1b7f62f70c88798168cb48c5dd62c47a1bf1d1544f0d3f30e6149c8  72-930.png
4e173c80a741b969f6011788739b6eb439297bccb30a820b00dd042ea2dec5f8  72-1055.png
7e5143b91a4dace983ce83223c8f4b58aff9eca3a36c8cf2e74da118a0af6951  72-26.png
1d58cd1703a2a914afeeea43c9214ca25c7b353a8fc2f0d67b7abfa2032d2bc8  72-631.png
414e62fa23c5d64e11aa2e960ccf1b972d64a955f281a766a5b660e5a9f9cb67  72-689.png
```

미검증·재검토 조건:

- 나머지 13PNG는 파일 해시·크기만 확인했으며 이미지 도구로 직접 열지 않았다.
- 실시간 Figma 노드 조회나 프로토타입 클릭은 수행하지 않았다. 판단 근거는 저장된 실제 도구 응답과 캡처다.
- LoaderCircle 변수 바인딩, 모든 변수·컴포넌트 연결, 전체 기존 노드의 내용 보존, 실제 키보드·보조 기술·확대 글자·실기기 safe area는 확인하지 못했다.
- 전체 노드 내보내기 및 파일 동일성 근거를 확보하고, 해당 버전 캡처·매핑·lint 결과를 다시 대조해야 6단계 전체 ready를 판정할 수 있다.
- 보고서 저장과 진행 기록은 조정자 담당이다.
