# 곤충맵 로그인 디자인 시스템

2026-11-13 KST. **ready: 자체 검수 완료, 독립 비평과 사람의 시각 방향 승인 전**. 현재 1~4단계 passed를 직접 확인하고 착수했다. PRD 문서의 초안 상태 표기보다 현재 CLI 승인·해시 판정을 따른다. 작업 범위는 이 05-design-system 폴더이며 기존 원격 프레임이나 제품 코드를 수정하지 않았다.

- [검토 인덱스](index.html): 두 크기 기본 화면과 10개 상태별 링크
- [컴포넌트 보드](board.html), [보드 캡처](captures/components-board.png), [실제 입력 초점 캡처](captures/components-board-focus.png)
- [390×844 기본](captures/390x844-default.png), [360×800 기본](captures/360x800-default.png), [좁은 화면 오류](captures/360x800-network_error.png)
- [생성 DESIGN.md](DESIGN.md) / [생성 증거](design-md.json), [tokens](tokens.json), [components](components.json), [copy](copy.json), [Lucide 목록](icons.csv)
- [공식 자산 출처·배율](asset-sources.md), [원본 파일 SHA-256](assets-manifest.json), [입력·산출물 SHA-256](hashes.json), [실제 렌더 검사](render-report.json), [자체 검수](self-check.md)

브랜드 → 가치 설명 → 사진·위치 기록 시각 → 제공자 선택 → 상태/복구 → 정책 보조 영역 순서를 유지했다. 사진·지도 시각은 실제 데이터를 가장하지 않는 Lucide Camera/MapPin의 단순한 가치 카드로 구성했다. 공통 forest green #15803D, white, neutrals와 16px 좌우, 32px 카드, 48px 주요 동작을 재사용한다. 브랜드 버튼만 공식 규정의 색과 반경을 사용한다. 캐러셀·가짜 수치·AI·성능/시간/보안 약속·이메일/비회원 동작은 추가하지 않았다.

Pretendard가 우선 서체지만 현재 환경에 폰트 파일이 없어 대체 서체로 렌더했다. CDP의 CSS.getPlatformFontsForNode에서 제목은 AppleSDGothicNeo-Bold/.SFNS-Bold, 본문은 AppleSDGothicNeo-Light/.SFNS-Regular, 정책은 AppleSDGothicNeo-Medium/.SFNS-Regular를 확인했다. computed font-family 문자열이나 document.fonts.check만으로 Pretendard가 실제 표시됐다고 주장하지 않는다. 폰트가 설치된 구현 환경에서는 다시 캡처해야 한다.

두 크기×10상태의 최종 PNG 20개와 보드 2개, preview PNG 1개를 실제 Chromium으로 생성하고 이미지 도구로 직접 열었다. 360px에서는 제목 줄높이32px, 가치 카드72px, 일부 세로 간격을 줄여 오류/장애도 정책 최하단766px와 하단34px를 확보했다. 390px는 정책 최하단810px와 하단34px다. 확대 글자처럼 높이가 넘는 경우 문서 전체를 세로 스크롤할 수 있다. 가로 고정 오버레이나 정책 링크는 없다.

`screen.html?state=...`는 디자인 검토용 작은 상태 미리보기다. 제공자 선택→진행, 오류의 다시 시도→같은 제공자 진행, 다른 방법→기본 선택만 연결했다. 취소/성공/지원정보를 가짜 인증 콜백으로 발생시키지 않는다. policy_pending과 success는 **내부 검토 설명판**이며 제품의 정책 화면이나 추가 완료 화면이 아니다. 미지원 예시는 지원정보가 해당 인증 브라우저를 실제 미지원으로 판정한 경우에만 적용한다.

재생성: 저장소 루트에서 `node work/bugmap-login/05-design-system/build.mjs`, `node tools/design-harness/bin/design-harness design-md --project bugmap-login --force`, `node work/bugmap-login/05-design-system/render.mjs`. build는 이 폴더의 작성자 소유 생성 파일만 갱신하며 사용자 제공 브랜드 원본을 건드리지 않는다. render는 로컬 localhost와 격리된 Chromium/CDP를 사용하며 외부 npm 의존성이 없다. browser-review.mjs는 저장소 browser.mjs에 플랫폼 폰트 증거를 위한 CDP 접근만 노출한 이 단계 전용 복사본이다.

다음은 조정자가 새 맥락의 비평가에게 현재 JSON·생성 문서·23개 최종 PNG·원본 자산/해시를 전달하는 일이다. 사람의 직접 시스템 승인 전 Figma 단계로 진행하지 않는다. 이 단계의 ready와 기계 검사는 사람 승인이나 실제 인증·접근성 전체 검증을 대신하지 않는다.
