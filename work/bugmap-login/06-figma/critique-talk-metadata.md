# 새 맥락 최종 메타데이터 비평 원문

판정: **ready — 지정된 메타데이터 정합성 범위만**. 단계6 전체는 문서대로 **blocked**이며 사람 승인이 아니다.

- node-map 20행과 manifest 20개가 nodeId·화면·상태·치수·최신 PNG 경로에서 일치한다. 대응 HTML 20개도 존재한다.
- 실제 PNG 20개의 시그니처·치수·바이트 수·SHA-256이 manifest 및 talk-repair-log와 모두 일치한다.
- 4개 오류 루트의 전후 JSON과 resize 호출 8건은 보고서와 일치한다. 390 화면은 172/174→173/173, 360 화면은 157/159→158/158이며 높이는 모두 48이다.
- 수정한 4루트는 `rawExported:false`다. 72:325·72:450은 과거 raw임을 명시하고, 72:930·72:1055는 미내보내기로 구분한다.
- README·change-log·보고서는 최신 Talk 캡처와 과거 bridge 캡처를 구분한다. `nodes.json` 부재, 전체 raw 및 로딩 secondary 바인딩 미완료를 명시하여 완료 범위를 과장하지 않는다.

**발견:** 지정 범위에서 수정이 필요한 불일치는 발견하지 못했다. 유지할 점은 최신 캡처·과거 raw·남은 작업을 분리한 기록이다.

직접 연 캡처는 `captures/talk/72-325.png`, `72-1055.png`다. 대표 오류 화면에서 복구 버튼의 정렬·높이와 주변 문구가 정상적으로 보인다. 원격 조작·조회는 수행하지 않았다.

검토 파일 SHA-256 (`work/bugmap-login/06-figma/` 기준):

|파일|SHA-256|
|---|---|
|README.md|`21bb026b0b4e3539f4908a92bba26866024a63dc681ba290f88bc84cfeaf8fa8`|
|change-log.md|`d7977f4b79a06f9c9e6c86e454c1578aff8c24783e3a78ea1880d8a7dc3b1c79`|
|node-map.json|`0ae3b89f588100fe4e6d157c4f9411fada3f348569e14368edacdc5af57aaff3`|
|capture-manifest.json|`7cbd8fbaf8754a45c939c4609c62303cc0ac1dfff6aebbcc93bfd9a541d33dc9`|
|talk-repair-report.md|`f05d5b6580d5626f6d5ca762053ddf643c78fada6ecb00722496370e755c8002`|
|talk-repair-log.json|`eb374b49f823e667b08490073a15c8eefd53009c45aa27c157314b3771bcac18`|

보고서의 tokens 및 control/figma 입력 해시도 실제 파일과 일치한다.

**미검증:** 20화면 전체 시각 재검토, 작성자의 “20개 모두 직접 열었다”라는 작업 행동, 현재 원격 파일키·노드 상태, 승인1~5의 최신 유효성 및 lint 통과는 이번 독립 검토에서 재검증하지 않았다. 이전 비평 문서는 읽지 않았으며 파일·사람 기록은 수정하지 않았다.
