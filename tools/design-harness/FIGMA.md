# Figma 훅과 내보내기 계약

## 플러그인 설치 (두 명령)

다른 프로젝트에서 실행한다. 이 저장소의 로컬 체크아웃 경로를 사용한다.

```sh
codex plugin marketplace add /absolute/path/to/BugMap
codex plugin add design-harness@bugmap-design
```

Node 20+와 플러그인을 지원하는 Codex가 필요하다. 설치된 CLI 0.167.0에서 위 명령 두 개를 임시 사용자 설정으로 검증했다. 로컬 경로를 통해 설치하므로 원격 push가 필요 없다. Git 배포를 원하면 이 커밋을 push한 뒤 첫 줄을 `codex plugin marketplace add jungjeongml/BugMap --ref <공개된-커밋>`으로 바꾼다. 이 작업에서는 push하지 않는다.

새 세션에서 플러그인을 활성화하고 `/hooks`(데스크톱: Settings > Hooks)에서 세 훅의 코드·정의를 직접 검토하고 신뢰한다. 설치 명령은 신뢰 승인을 자동 수행하지 않는다. 신뢰되지 않거나 비활성화된 훅은 차단 장치로 동작하지 않는다. [공식 훅 안내](https://learn.chatgpt.com/docs/hooks), [패키지/마켓플레이스 안내](https://developers.openai.com/plugins/build/plugins).

패키지 루트 `plugin.json`, `hooks/`, `skills/`, `roles/`, CLI가 함께 복사되므로 원본 저장소 밖에서도 작동한다. `roles/`는 역할 등록 기능이 없는 runtime에서 읽을 지침이다. 사용자 전역 AGENTS·역할·MCP 설정을 덮어쓰지 않는다. Figma MCP 연결과 도구별 스킬은 별도로 제공돼야 한다. canonical 스킬 변경 후 `npm run bundle:design-plugin`, 검사 시 `node tools/design-harness/scripts/bundle-skills.mjs --check`를 실행한다. 패키지에 곤충맵 토큰·화면·승인·work 산출물은 포함하지 않는다.

## 대상 설정

산출물 루트는 사용하는 프로젝트의 `work/<project>/`다. 훅은 cwd부터 상위로 검색하고 Git 경계에서 멈춘다. work 안의 `control/project.json`이 한 개면 선택하고, 여러 개면 저장소 루트 `.design-harness.json`의 `{ "project": "my-app" }`로 선택해야 한다. Figma 쓰기는 프로젝트가 없을 때도 차단한다. Stop은 하네스가 없는 프로젝트에는 개입하지 않는다.

**첫 승인 전에** `work/<project>/control/figma.json`을 만든다.

```json
{ "fileKey": "YourFigmaFileKey", "pageId": "0:1" }
```

이 파일은 존재할 때 공통 승인 스냅샷에 포함된다. 나중에 생성/변경/삭제하면 기존 승인을 재검토해야 한다. Figma 단계부터는 필수다. Figma 파일 생성은 대상 키를 사전 검증할 수 없으므로 차단한다. 파일은 사람이 먼저 준비하고 기록한다. 기존 사용자의 파일/페이지/노드 편집 범위에 대한 권한도 지켜야 한다.

## 세 훅

- **PreToolUse:** 이름에 figma가 있는 도구를 대상으로 한다. 알려진 읽기 도구(get_metadata, get_design_context, get_screenshot 등) 외에는 쓰기로 취급한다. `use_figma`는 JavaScript를 실행하므로 조회 코드도 보수적으로 검사한다. 현재 `check`의 design-system 단계가 passed인지(상위 승인 포함), 인자의 fileKey/file_key/fileId/file_id 또는 Figma URL이 모두 설정 파일과 같은지 검사한다. 누락·충돌·손상·심볼릭 링크·알 수 없는 대상은 `permissionDecision: deny`로 거부한다. 허용 시 권한을 자동 승인하지 않고 일반 도구 권한 절차를 유지한다.
- **PostToolUse:** 쓰기 시도 뒤 원격 노드 재조회·nodes.json/node-map.json 재내보내기·실제 캡처 검수·lint:figma 및 check 재실행을 알린다. 실패 응답도 부분 변경 확인을 안내한다. 로컬 내보내기를 자동 조작하거나 원격 성공을 가정하지 않는다.
- **Stop:** 같은 읽기 전용 `check()`를 매번 실행하고 첫 미통과 단계·상태·이슈를 전달한다. 실패를 전체 완료로 보고하지 않게 한다. 사람 승인 대기에서 답변 종료가 가능해야 하므로 자동 재개/자체 승인/무한 루프를 만들지 않는다. `stop_hook_active` 재진입에도 check는 실행한다.

직접 Figma MCP 호출에 대한 장치다. 브라우저/UI·임의 shell/HTTP·이름에 figma가 없는 사용자 도구를 가로채거나 임의 JavaScript 내부의 파일 접근을 격리하는 OS 보안 경계는 아니다. 새로운 도구 명칭은 matcher와 policy를 검토한 뒤 사용한다.

## 원격에서 노드 내보내기

쓰기 후 실제 Figma 도구로 지정 페이지에서 매핑된 루트와 모든 자손을 다시 읽는다. 응답을 아래 계약으로 정규화해 `06-figma/nodes.json`에 저장한다. 원격에서 읽지 못한 값을 채워서 통과시키지 않는다. 루트는 승인 wireframes.json의 화면/상태와 1:1로 매핑한다.

```json
{
  "version": 1,
  "fileKey": "YourFigmaFileKey",
  "pageId": "0:1",
  "exportedAt": "2026-11-13T00:00:00Z",
  "nodes": [{
    "id": "1:1", "type": "FRAME", "name": "Map",
    "width": 390, "height": 844, "layoutMode": "VERTICAL", "fills": [],
    "children": [{
      "id": "2:1", "type": "TEXT", "name": "Title", "width": 120, "height": 24,
      "characters": "지도", "fontSize": 20,
      "fills": [{ "type": "SOLID", "color": { "r": 0, "g": 0, "b": 0 }, "opacity": 1 }]
    }]
  }]
}
```

모든 노드에 id/type/name/width/height/fills를 보존한다. TEXT는 characters/fontSize, FRAME은 layoutMode, 자손은 children을 내보낸다. 인스턴스의 논리 컴포넌트 이름을 componentName으로, 실제 조작 대상을 interactive: true로 기록한다. fills의 숨김·종류·색·opacity를 보존한다. 이미지/gradient는 현재 미지원으로 이슈가 되므로 별도 검수 없이 통과하지 않는다. 혼합 서식 텍스트 등 계약으로 표현할 수 없는 값은 개별 노드로 내보내거나 미검증으로 남긴다.

`06-figma/node-map.json`:

```json
{ "nodes": [{ "screen": "map", "state": "default", "nodeId": "1:1" }] }
```

## lint:figma

저장소 소스에서는 아래 명령을 사용한다. 설치본은 `node <설치된-plugin-root>/bin/design-harness`로 실행한다.

```sh
npm run lint:figma -- --project my-app --force
npm run design-harness -- check --project my-app --json
```

file/page 일치, 중복/빈 노드·누락 필드, 승인 와이어프레임 화면/상태의 매핑 누락·중복을 검사한다. 노드 색상/alpha·글자 크기를 tokens.json과 비교하고, 금지 문구·44px 미만 조작 영역(명시 interactive 또는 Button 이름)·FRAME 자동 레이아웃·기록된 컴포넌트 이름을 검사한다. 결과는 `07-validation/figma-lint.json`에 입력 SHA-256·노드 수·이슈로 기록한다. 기본 덮어쓰기 거부, 재실행 --force 필요. 정상 0, 규칙 위반 1, 계약/파일 오류 2다.

check는 Figma 단계에서 같은 검사를 재계산해 보고서 전체와 비교한다. 결과 누락·이슈·입력 변경·보고서 조작은 validation/approve/handoff로 넘어가지 못한다. 기존 fixture 수준의 빈 node-map은 더 이상 통과하지 않는다. 사람 리뷰는 lint 생성 후 기록해야 한다.

**한계:** 로컬 JSON의 원격 진위·최신성은 인증하지 않는다. 토큰/컴포넌트 이름의 일치는 실제 Figma 변수 바인딩 증명이 아니다. stroke/effect/이미지 픽셀·텍스트 run·클릭 흐름·대비/잘림·의미 커버리지는 이 검사 범위 밖이며 실제 캡처/조회·독립 검수로 확인한다. 웹 lint와 Figma lint는 서로를 대체하지 않는다.
