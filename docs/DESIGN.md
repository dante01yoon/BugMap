---
name: Field Bio & Canopy
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#3f493f'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#6f7a6e'
  outline-variant: '#becabc'
  surface-tint: '#006d30'
  primary: '#00652c'
  on-primary: '#ffffff'
  primary-container: '#15803d'
  on-primary-container: '#d3ffd5'
  inverse-primary: '#79db8d'
  secondary: '#436648'
  on-secondary: '#ffffff'
  secondary-container: '#c4edc6'
  on-secondary-container: '#496d4d'
  tertiary: '#97344a'
  on-tertiary: '#ffffff'
  tertiary-container: '#b64c62'
  on-tertiary-container: '#fff1f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#95f8a7'
  primary-fixed-dim: '#79db8d'
  on-primary-fixed: '#00210a'
  on-primary-fixed-variant: '#005323'
  secondary-fixed: '#c4edc6'
  secondary-fixed-dim: '#a9d0ab'
  on-secondary-fixed: '#00210a'
  on-secondary-fixed-variant: '#2c4e32'
  tertiary-fixed: '#ffd9dd'
  tertiary-fixed-dim: '#ffb2bd'
  on-tertiary-fixed: '#400013'
  on-tertiary-fixed-variant: '#81233b'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
  surface-pure: '#FFFFFF'
  surface-subtle: '#F9FAFB'
  surface-muted: '#F3F4F6'
  border-subtle: '#E5E7EB'
  border-strong: '#D1D5DB'
  text-primary: '#111827'
  text-secondary: '#4B5563'
  text-muted: '#6B7280'
  map-land: '#E6EBE6'
  map-park: '#8FB49A'
  map-water: '#A9C7C2'
  map-road: '#FAFBF7'
  map-label: '#65756A'
  map-water-label: '#587D78'
  map-active-surface: '#EAF3EC'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '300'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '300'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '300'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-code:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style
The design system articulates an ethos of rigorous field botany and entomological observation filtered through clean, contemporary editorial utility. Eliminating decorative excess, gradients, and heavy drop shadows, the aesthetic emphasizes quiet clarity, scientific precision, and rapid one-handed mobile comprehension.

The audience encompasses field naturalists, community breeders, academic researchers, and nature enthusiasts. The visual experience must deliver:
- **Disciplined Restraint:** A strict single-chroma green foundation complemented by architectural monochromes, ensuring specimen imagery and geospatial content remain the primary focal points.
- **Modern Flat Clarity:** Clean planes, crisp linear dividers, deliberate white space, and zero unnecessary visual ornament.
- **Tactile Softness:** Substantial 32px (`rounded-4xl`) corner curvatures and pill-shaped interactive anchors that balance technical data with organic physical comfort.

## Colors
The color architecture relies strictly on a singular chromatic anchor—Forest Green (`#15803D`)—supported entirely by clean, functional monochrome neutrals. Multicolored accents and extraneous secondary color families are eliminated to maintain severe visual economy.

### Key Roles
- **Primary (`#15803D`):** Applied deliberately to essential interactive touchpoints: primary action buttons, active navigation markers, selection rings, and map focal points.
- **Neutral (`#111827`):** Deep charcoal slate providing optimal contrast for primary typographic elements, high-density taxonomy headers, and structural line work.

### Monochrome Surfaces & Dividers
- **Canvas & Elevated Cards (`#FFFFFF`):** Base background for cards, modal sheets, and standard viewports.
- **Subtle Surface (`#F9FAFB`):** Used for inset panels, alternating list bands, and inactive chip backgrounds.
- **Muted Surface (`#F3F4F6`):** Applied to search fields, secondary button states, and disabled controls.
- **Borders & Dividers (`#E5E7EB` / `#D1D5DB`):** Hairline borders delivering crisp definition without shadow reliance.
- **Text Layers:** Deep Slate (`#111827`) for titles, Medium Neutral (`#4B5563`) for body and metadata, and Soft Gray (`#6B7280`) for captions and secondary coordinates.

## Typography
Typography is strictly anchored to Pretendard (with fallback to neutral system sans-serif like Inter). The scale is rigorously structured around three explicit weight roles: **Light (300)** for long-form narrative body and scientific descriptions, **Medium (500)** for interactive labels, taxonomy chips, and subheaders, and **Bold (700)** for primary headlines and data values.

### Formatting Rules
- **Taxonomy & Latin Names:** Latin binomial names (`Dorcus titanus castanicolor`) are rendered in `body-sm` (Light 300) with subtle italicization. Korean vernacular names use `headline-sm` or `label-lg` (Medium 500).
- **Tabular Figures & Specimen Metrics:** Field metrics (`78.4 mm`, `37.5665° N`) leverage `label-code` with strict tabular numerals for rapid comparison across rows.

## Layout & Spacing
The layout system enforces a structured 4px/8px modular rhythm designed for mobile and tablet touch surfaces. Content flows within a flexible grid that shifts cleanly between dual-column catalog cards and single-column detailed logs.

- **Margins & Gutters:** Base screen margins are set at `1rem` (16px), maintaining consistent breathing room along the device edge. In-grid column gaps use `1rem` (16px) gutters.
- **Touch Targets & Rhythm:** Touch-interactive components observe a minimum target dimension of 44px (with 48px standard for primary actions). Stacked section containers maintain `1.25rem` (20px) to `2rem` (32px) margins to maintain spacious, uncluttered layouts.

## Elevation & Depth
In alignment with strict flat design principles, multi-tiered drop shadows and colored ambient glows are completely eliminated. Depth is communicated strictly through surface layering and crisp structural outlines.

- **Level 0 (Base Canvas):** Pure white (`#FFFFFF`) or pale neutral grey (`#F9FAFB`) background planes.
- **Level 1 (Card & Panel Surface):** Flat `#FFFFFF` backed by a 1px solid border (`#E5E7EB`). Contrast is derived from subtle surface shift (`#F9FAFB` vs. `#FFFFFF`) rather than box shadows.
- **Level 2 (Overlays & Bottom Sheets):** Crisp white containers defined by a 1px outline (`#D1D5DB`) and an ultra-subtle, non-decorative occlusion rim (`0px 4px 16px rgba(17, 24, 39, 0.05)`).
- **Interactive Feedback:** Touch feedback triggers a subtle background shift (e.g., `#F9FAFB` to `#F3F4F6`) or an inverse tone rather than a dynamic elevation change.

## Shapes
The shape language features an extra-rounded, soft silhouette. Cards, sheets, and modular panels feature an expanded 32px corner radius (`rounded-4xl`), creating an inviting, pebble-like aesthetic that tempers technical scientific data.

- **Cards, Panels & Containers:** Formed with a strict 32px corner radius (`rounded-4xl`).
- **Buttons & Control Pills:** Formed with a 32px corner radius or full pill (`rounded-full` / 9999px).
- **Nested Media & Images:** Specimen images nested within 32px cards inherit an internal radius of 20px–24px to ensure harmonic concentric curvature.

## Components

### Iconography
All UI icons must be selected from the [Lucide icon catalog](https://lucide.dev/icons) and used as `lucide-react-native` components. Figma icon nodes, exported vectors, or rasterized copies are not UI icon sources. Select the closest semantic Lucide icon; provider buttons may use generic Lucide symbols instead of provider marks.

All system icons adhere strictly to the Lucide icon guidelines:
- **Geometry:** 24x24 pixel grid with uniform 2px stroke width (`stroke-width: 2`).
- **Style:** Clean lines, rounded caps and joins (`stroke-linecap: round`, `stroke-linejoin: round`), with no solid fills or decorative drop shadows.

### Buttons
- **Primary Button:** Solid Forest Green (`#15803D`), pure white text (`#FFFFFF`, Medium 500), 48px height, 32px or full pill border-radius. Active state shifts cleanly to `#166534`.
- **Secondary Button:** Surface `#F3F4F6`, text `#111827` (Medium 500), 1px solid `#E5E7EB`, 48px height, 32px radius.
- **Ghost/Text Action:** Zero background, text `#15803D` (Medium 500) with Lucide line icon trailing.

### Chips & Filter Tags
- **Taxonomy Filter Chips:** Full pill shape (`rounded-full`), 36px height, 14px horizontal padding.
  - *Inactive:* Surface `#FFFFFF`, border `1px solid #E5E7EB`, text `#4B5563`.
  - *Active:* Surface `#15803D`, border `1px solid #15803D`, text `#FFFFFF`.
- **Metadata Badges:** Subdued `#F3F4F6` surface, `#111827` text (Medium 500), border `1px solid #E5E7EB`, full pill shape.

### Input Fields & Search Bars
- **Search Control:** 48px height, 32px radius, surface `#F9FAFB`, border `1px solid #E5E7EB`. Leading 20px Lucide search icon in `#6B7280`. Focused state renders a crisp 2px border in `#15803D` with no blur shadow.
- **Form Fields:** Inset text inputs feature 32px radius, `#FFFFFF` surface, `1px solid #E5E7EB`, and `14px` Medium label headers.

### Cards & Feed Tiles
- **Observation Card:** Surface `#FFFFFF`, border `1px solid #E5E7EB`, radius `32px`, padding `16px`. Internal media features 20px corner curvature. Header presents taxonomy title in Bold (`#111827`) alongside a pill-shaped metadata tag. Bottom metadata row displays clean line icons with tabular coordinate strings.

### Lists, Checkboxes & Radio Buttons
- **List Dividers:** Crisp hairline rule `1px solid #F3F4F6` with zero drop shadows.
- **Checkboxes & Radios:** 20px controls with 2px stroke border (`#D1D5DB`). Selected state renders solid `#15803D` fill with white line checkmark. Radio buttons utilize a 32px full circle with a centered solid `#15803D` dot.

## Main / Discovery Map — 메인 / 발견 지도

### Reference & Scope
- 기준 시안: Figma `BugMap`의 `02 · 메인 / 발견 지도` (노드 `4:150`, 기준 화면 390×844).
- [화면 캡처](../design/main-map/4:150.png)와 [지도 원본 SVG](../design/main-map/map-background.svg)를 참고한다. 지도 배경은 별도 이미지이며, 그 위의 검색창·마커·버튼·문구는 편집 가능한 UI 레이어다.
- Kyro 참고 화면에서 넓은 지도, 떠 있는 조작부, 하단 검색 패널 구성을 가져온다. 곤충맵의 초록·흰색 스타일을 적용한다.
- 이 절은 제작한 시안의 적용 기준이다. 지역명·발견 수·곤충·시각은 예시이고 지도는 모식도다. 실제 지도 SDK·공급자와 출시 기능 범위는 PRD·TDD를 따른다.

### Map Palette & Layering
- **지도 전용 색상:** 지면 `#E6EBE6`, 공원 `#8FB49A`, 수면 `#A9C7C2`, 도로 `#FAFBF7`, 지역 라벨 `#65756A`, 수면 라벨 `#587D78`. 지형은 저채도 녹색 계열의 명도 차와 얇은 경계선으로 구분한다.
- 위 색상은 지리 정보를 구분하기 위한 배경색이다. 일반 UI의 단일 강조색 `#15803D` 규칙은 유지하며, 지도 배경색을 버튼·상태 강조색으로 확장하지 않는다.
- 지도 위에 흰색 조작부와 마커를 올려 대비를 만든다. 현재 시안의 지도 조작부·하단 패널은 그림자와 테두리 없이 면의 대비로 분리하며, 일반 카드의 테두리 규칙에 대한 화면별 예외로 둔다.
- 레이어 순서: 지도 → 지역 라벨·마커·현재 위치 → 상단 지역 선택·지도 조작부 → 하단 검색·내비게이션 패널. 조작부끼리 겹치지 않게 배치한다.

### Layout & Controls
| 요소 | 현재 시안의 기준 | 구성 |
|---|---|---|
| 지도 | 화면 전체 배경 | 검색 패널 뒤까지 이어지는 지도, 도로·공원·수면·지역 라벨 |
| 상단 지역 선택 | 좌우 기본 여백 16px, 높이 58px | 곤충 아이콘, 지역명, 보조 문구, 펼침 아이콘을 담은 흰색 필 |
| 지도 레이어 | 우측 상단 48×48px | 흰색 원형 버튼과 회색 레이어 아이콘 |
| 현재 위치로 이동 | 검색 패널 위 좌측 48×48px | 흰색 원형 버튼과 초록색 위치 아이콘 |
| 발견 기록하기 | 검색 패널 위 우측 160×48px | 초록색 필 버튼, 흰색 더하기 아이콘·문구 |
| 하단 패널 | 좌우·하단 여백 8px, 374×224px | 흰색, 32px 모서리, 상단 중앙 회색 핸들 |
| 패널 검색창 | 패널 내부 좌우 16px, 높이 48px | `#F3F4F6` 배경, 필 형태, 검색 아이콘, “곤충 이름이나 지역을 검색하세요” |
| 기록 요약 | 검색창 아래 | 제목, 초록색 기록 수, “목록 보기”, “공개된 위치를 기준으로 표시해요” 안내 |

- 기준 치수는 390×844 시안의 값이다. 실제 기기에서는 안전 영역을 반영해 상단 조작부·패널·기록 버튼을 배치한다.
- **검색은 하단에 둔다.** `전체`, `~5km`, `5–10km` 같은 작은 필터 탭 행은 배치하지 않는다. PRD의 기간·유형 필터 요구사항 자체를 삭제한 것은 아니며, 해당 진입 방식은 별도 설계한다.
- 핸들은 하단 패널의 성격을 나타내는 시각 단서다. 패널 확장·축소와 키보드 노출 상태는 아직 설계하지 않았다.

### Markers & Current Location
- **묶음 마커:** 흰색 필에 초록색 점과 `관찰 7`, `채집 3`처럼 유형·기록 수를 표시한다. 현재 시안의 시각 높이는 36px이며 실제 터치 영역은 최소 44px로 확보한다.
- **선택 기록 요약:** 흰색 둥근 컨테이너에 초록색 곤충 아이콘, 굵은 곤충명, 회색 유형·실제 발견 시각을 표시한다. 예: `넓적사슴벌레` / `관찰 · 오늘 08:42 발견`.
- 요약 마커는 전체 기록 상세와 구분한다. PRD의 사진·작성자·설명은 상세 화면에서 제공하며, 아이콘을 기록 사진의 대체물로 취급하지 않는다.
- **현재 위치:** 초록색 중심점, 흰색 테두리, 연한 초록색 바깥 원으로 표시해 기록 마커와 구분한다. 바깥 원에 위치 정확도 수치의 의미를 부여하지 않는다.
- 기록 마커와 집계에는 공개 위치만 사용한다. 현재 위치 표시는 내 기기 위치이며 다른 사용자의 정확한 발견 좌표를 뜻하지 않는다.

### Bottom Navigation & Implementation Notes
- 현재 시안은 `지도 / 내 기록 / 커뮤니티 / 채팅 / 마이` 순서의 5개 항목을 사용한다. 커뮤니티·채팅의 출시 시점은 PRD의 단계별 범위를 따른다.
- 활성 항목은 `#EAF3EC`의 둥근 배경과 `#15803D` 아이콘·라벨로 표시한다. 비활성 항목은 `#6B7280`을 사용한다. 각 항목은 최소 44px 터치 영역을 확보한다.
- 현재 시안은 Pretendard 대신 문서에서 허용한 Inter 대체 폰트를 사용했다. 지역명은 16px Bold, 기록명·검색·주요 동작은 14px, 기록 시각은 11px를 적용했다.
- 시안의 일부 보조 문구·내비게이션 라벨은 10px이며 기존 공통 최소 라벨 11px와 차이가 있다. 구현 시 공통 크기로 조정하고 한글 가독성·잘림을 다시 검수한다.
- 시안의 기존 곤충·카메라·악수·채팅 아이콘은 Figma 출처와 관계없이 앱 구현에서 사용하지 않는다. 구현할 때 각 의미에 맞는 Lucide 아이콘을 고르고 24px·2px 선 규칙을 적용한다.
- 로딩·빈 결과·검색 결과·위치 권한 거부·네트워크 오류 상태와 상세 전환은 이번 기본 화면 시안에 포함되지 않았다.

## Record Entry — 발견·채집 기록 작성

### 시안과 구성
- 2026-11-09 사용자 요청에 따라 로컬 Figma `BugMap`에 추가했다. 메인 오른쪽 `03 · 발견·채집 기록 / 모바일`은 **390×844**, 노드 `13:433`이다. `03 · 발견·채집 기록 / 전체 펼침`은 **390×1432**, 노드 `12:235`이다.
- 기준 캡처: [모바일 화면](../design/record-entry/13:433.png), [전체 입력 폼](../design/record-entry/12:235.png). UI는 편집 가능한 텍스트·프레임·도형이며 지도 배경만 기존 메인 화면의 이미지를 재사용한다.
- 메인의 기록하기 동작으로 진입하는 별도 작성 화면을 설계했다. 상단에 뒤로·제목·닫기, 가운데에 스크롤하는 폼, 하단에 저장 안내와 고정 저장 버튼을 둔다. 작성 중에는 메인 하단 내비게이션을 표시하지 않는다.
- 폼 순서: **사진 촬영·첨부 → 곤충 이름 및 관찰/채집 → 위치 저장·공개 범위 → 발견 날짜·시간 → 관찰 글**. 사진을 화면 맨 위에 두고 위치·일시 아래에 관찰 글을 배치하는 것은 사용자 요청이다. 곤충 이름과 유형은 PRD MAP-01을 반영했다.

### 입력과 상태
- 사진 영역에 `1장 이상 필수`, `촬영하기`, `사진 첨부`를 표시한다. 현재는 첨부 전 상태다. 사진 최대 장수·크기·업로드 후 썸네일 배치는 미확정이다.
- 곤충 이름 입력과 `이름 모름` 선택, `관찰했어요 / 채집했어요` 선택을 제공한다. 시안의 관찰 선택은 화면 예시이며 제품 기본값의 확정이 아니다.
- 위치 카드에는 지도 미리보기·현재 위치 조작부·장소·주소·변경 진입점을 둔다. 서울숲 주소는 위치가 지정된 상태의 예시다. 실제 저장 위치는 지도에서 확인·수정한 좌표다.
- 공개 범위는 `대략적인 위치`를 예시로 표시한다. PRD·TDD의 권장안이며 기본값·공개 해상도를 확정하지 않는다. 정확/대략 선택 목록은 후속 설계 대상이다.
- 발견 날짜와 시간을 나란한 선택 필드로 두고 실제 발견 시각임을 안내한다. `2026. 11. 09. / 오전 09:41`은 예시다. 달력·시간 선택기는 후속 설계 대상이다.
- 관찰 글은 선택 입력으로 두고 주변 환경·곤충 행동을 적도록 안내한다. 글자 수 제한은 새로 정하지 않았다.
- 필수 정보가 완성되지 않은 초기 상태의 저장 버튼은 비활성 회색으로 표시한다. 입력 완료 후에는 공통 Primary Button 기준의 초록색으로 전환한다는 설계 제안이다.

### 스타일·검증·범위
- 메인과 동일한 흰색·회색 표면, `#15803D` 강조색, 16px 좌우 여백, 둥근 카드·필 버튼을 적용했다. 지도 미리보기는 기존 지도 색상을 유지한다. 글꼴은 기존 화면과 동일한 Inter 대체 폰트이며 보조 문구는 11px 이상이다.
- 모바일 캡처에서 첫 화면·고정 저장 영역을, 전체 펼침 캡처에서 위치·날짜·시간·관찰 글까지의 순서와 잘림·겹침을 확인했다. Figma 구조 조회로 두 화면의 크기와 편집 가능한 레이어 구성을 확인했다.
- 산출물은 정적 디자인이다. 메인 버튼과의 프로토타입 연결, 실제 스크롤·촬영·파일 첨부·위치 저장·선택기·저장 기능은 구현하거나 동작 검증하지 않았다. 키보드·권한 거부·첨부 및 저장 오류·입력 완료 상태도 후속 설계 대상이다.

## Login Implementation — 선택 프레임 기준 초기 코드

- 2026-11-09 구현 기준은 기존 `01 · 로그인 / iOS`가 아니라, 사용자가 현재 선택한 `Container` **노드 `2:3`(390×804.75)** 이다. 배경은 부모 `2:2`의 `#FAF8FF`를 따른다. [배경 포함 참조 캡처](../design/login/reference/2:2.png).
- 브랜드 헤더 → 가로 소개 카드 3개·페이지 표시 → 카카오/네이버/Apple → 이메일/비회원 보조 동작 → 안내 필·약관 문구 순서다. 16px 여백, 32px 모서리, 48px 소셜 버튼과 제공자 고유색을 재현한다. 이 선택 화면의 배경·제공자 고유색은 일반 UI 색상 원칙의 화면별 예외다.
- 아이콘은 Figma에서 가져오지 않는다. `src/features/auth/AppIcon.tsx`에서 의미가 맞는 Lucide 아이콘을 React Native 컴포넌트로 매핑한다. 로그인 화면은 곤충에 `Bug`, 지도에 `Compass`·`Navigation`, 촬영에 `Camera`, 소개에 `Sparkles`·`Brain`·`Handshake`·`BadgeCheck`·`UsersRound`, 제공자 버튼에 `MessageCircle`·`Search`·`Smartphone`을 사용한다. 제공자 표식은 Lucide의 일반 기호로 대체한다.
- 구현은 `src/features/auth/LoginScreen.tsx`·`FeatureCarousel.tsx`, 토큰은 `src/theme/tokens.ts`에 있다. 시스템 글꼴과 자연스러운 줄 높이를 사용하며, Figma의 작은 고정 텍스트 프레임으로 인해 글자를 자르지 않는다. 실제 화면의 폰트·줄바꿈·기하 비교는 실행 환경이 복구된 뒤 검수해야 한다.
- 사용자 요청에 따라 인증·이메일·비회원 이동·정책 페이지 기능은 연결하지 않았다. 버튼은 제공자 스타일을 유지하면서 접근성 비활성 상태를 전달한다. 소개 카드의 스크롤·페이지 선택 UI만 코드로 구성했으며 런타임 동작은 미검증이다.
- 페이지 표시의 점은 원본 크기를 유지하고, 선택 버튼의 터치 영역·간격은 공통 기준에 맞게 각각 44×44로 확대했다. 원본의 좁은 점 간격에 대한 접근성 보정이며, 표시 행 높이와 로그인 섹션 여백을 함께 조정했다.
- 시안의 `AI 종 자동 식별`, `정확도 98%`, `15,000+ 애호가`, 경로 안내·보안 등의 문구는 원본의 디자인 예시다. PRD의 범위·성능·운영 약속으로 확정한 것이 아니다. 네이버 제공자도 기존 Google 권장안과 다르므로 인증 구현 전에 문구·제공자를 정합화한다.
- 검증 상태: 참조 캡처를 확인하고 자산 16개의 파일·치수·코드 참조를 검사했다. npm 접속 실패로 Expo 의존성이 없어 앱 실행 캡처·전체 타입 검사·번들·기기 동작은 검증하지 못했다. 참조 이미지를 실행 결과로 간주하지 않는다.
