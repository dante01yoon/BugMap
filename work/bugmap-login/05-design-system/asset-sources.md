# 공식 브랜드 자산의 출처와 적용

조회일 2026-11-13 KST. 개별 파일 SHA-256·바이트·원본 치수는 [assets-manifest.json](assets-manifest.json), 실제 원본 색 관찰은 [render-report.json](render-report.json)의 assetPixels에 있다. 웹 문서 지침, 원본 픽셀, 최종 렌더 관찰을 구분한다.

## Kakao

[공식 디자인 가이드](https://developers.kakao.com/docs/ko/kakaologin/design-guide), [문서가 연결한 리소스 다운로드](https://developers.kakao.com/tool/resource/login)를 실제 브라우저로 확인했다. 가로폭은 심볼·레이블을 유지한 채 좌우 확장할 수 있고 전체 확대는 비율을 유지한다. 문서는 컨테이너 #FEE500, 검정 심볼과 검정85% 레이블, 12px radius의 도해 기준을 설명한다.

사용자가 제공한 `assets/Kakao Login/` 원본은 문서의 다운로드 경로에서 받았다고 인계된 자산이며 **해당 사용자 다운로드 요청의 실제 최종 URL/시간은 미확인**이다. 다운로드 엔드포인트를 추정해 기입하지 않았다. 읽은 공식 리소스 페이지에는 SVG 미리보기도 있었지만 사용자 파일의 개별 전송 출처를 그 URL로 단정하지 않는다. 사용자 원본은 수정하지 않았다.

최종 사용 파일: `Kakao Login/SVG/kakao_login_kr_medium.svg` 224×46, 실제 fill #FEE500/#191919, rx8. 원본을 48/46=1.043478배로 균등 확대해233.739×48px로 표시하고 빈 컨테이너 배경만 358/328px로 좌우 확장했다. 외곽 반경은 원본8×48/46=8.347826px다. 문서의 도해 수치12px와 현재 제공 파일의 rx8이 다르므로 원본을 우선 보존했으며 무조건12px로 재그리지 않았다. 심볼·한국어 레이블의 path/색/비율은 그대로다. 일반 Lucide나 말풍선 대체 마크를 사용하지 않았다.

## NAVER

[공식 사용 가이드](https://developers.naver.com/docs/login/bi/bi.md)를 실제로 읽었다. 공식 PNG 다운로드 링크는 [NAVER_login_KR.zip](https://developers.naver.com/inc/devcenter/downloads/bi/NAVER_login_KR.zip), Illustrator 링크는 [NAVER_login_KR.ai](https://developers.naver.com/inc/devcenter/downloads/bi/NAVER_login_KR.ai)다. Figma 다운로드는 사용하지 않았다. 이번 사용자는 `assets/NAVER_login_KR/`를 직접 제공했으며 해당 사용자 요청의 최종 다운로드 URL/시간은 미확인이다. 위 URL은 **공식 가이드에서 확인한 링크**다. 최초 curl은 샌드박스 DNS 오류였고, escalation 시도 도중 사용자 자료 인계로 중단해 새 다운로드 성공으로 기록하지 않았다.

가이드는 지정색 변경·N 로고 형태 변경을 금지하고, 완성형 가로폭 조정 및 로고+레이블 가운데 정렬을 허용한다. 완성형 N은16px 이상, 로고와 레이블 사이8px를 유지한다.

최종 사용: `NAVER_login_Light_KR_white_center_H48.png` 원본1472×192 → 368×48px, 0.25배. 원본의 중앙 표식·레이블을 유지하며 너비358/328px에 맞춰 **양쪽 빈 컨테이너 영역만 대칭 축소**한다. CSS에서 원본 전체를 중앙에 동일 비율로 두고 바깥 빈 가장자리만 컨트롤의 clipping/border로 정리한다. 로고와 레이블은 잘리거나 늘어나지 않으며 원본 PNG는 수정하지 않는다. 외곽8px와1px #D9D9D9 테두리를 사용한다.

원본 픽셀 관찰: 흰형은 #FFFFFF 면, #03A94D N, #000000 레이블, #D9D9D9 테두리다. 이는 연구에서 발견한 화이트 변형 alt의 흰 레이블 표기와 달리 실제 원본/화면 표의 검정 레이블을 뒷받침한다. 검정/흰색 텍스트 대비는21:1이다. 녹색 N은3.09:1이며 로고 식별의 색이다.

`NAVER_login_Light_KR_green_narrow_H48.png` 원본840×192 → 210×48px,0.25배와 지정색 배경 좌우 확장은 보드 대안이다. 녹색형의 흰 레이블은3.09:1로 일반 텍스트4.5:1에 못 미치므로 최종 대표 화면에서 사용하지 않는다. 브랜드 레이블을 로고 예외로 취급해 통과라고 보고하지 않는다.

## Apple

[공식 HIG](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/), 연결된 [공식 Markdown](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple.md), [공식 버튼 미리보기/API](https://account.apple.com/signinwithapple/button)를 확인했다. HIG는 시스템 버튼과 원본 비율 유지, 동등한 크기·노출, 최소140×30px와 높이의1/10 여백을 안내한다. 검정은 밝은 배경, 흰 외곽선은 밝은 배경에서 선택할 수 있다. Apple 디자인 리소스의 로고를 임의로 새로 그리지 말라는 지침도 확인했다. 이 작업은 커스텀 로고 대신 공식 API가 생성한 **완성형 PNG**를 사용한다.

공식 미리보기 UI에서 Korean/Sign in/Black/height48/width358 또는328/radius8/2x를 설정하고 Download로 저장했다. 실제 생성 한국어 레이블은 **Apple로 로그인**이다. 소셜 표식을 Lucide/문자/이미지 생성으로 대신하지 않았다.

직접 다운로드한 원본 URL:

- [검정358×48 @2x](https://appleid.cdn-apple.com/appleid/button?height=48&width=358&color=black&border=false&type=sign-in&border_radius=8&scale=2&locale=ko_KR) → `apple-signin-ko-black-358x48@2x.png`,716×96 원본→358×48 표시
- [검정328×48 @2x](https://appleid.cdn-apple.com/appleid/button?height=48&width=328&color=black&border=false&type=sign-in&border_radius=8&scale=2&locale=ko_KR) → `apple-signin-ko-black-328x48@2x.png`,656×96 원본→328×48 표시
- [흰 외곽선328×48 @2x](https://appleid.cdn-apple.com/appleid/button?height=48&width=328&color=white&border=true&type=sign-in&border_radius=8&scale=2&locale=ko_KR) → `apple-signin-ko-white-outline-328x48@2x.png`,656×96 원본→328×48 표시, 보드 대안

두 검정 원본의 흰 Apple 표식·흰 레이블과 흰 외곽선 원본의 검정 표식·검정 레이블을 이미지 도구로 직접 열어 확인했다. API 입력값과 원본 전체를50%로 표시하며 폭에 따른 비균등 확대나 글꼴 교체가 없다. 버튼 간12px와 좌우16px는48px 높이의1/10인4.8px 이상이다.

## 일반 UI 아이콘과 재배포 경계

Bug/Camera/MapPin/LoaderCircle은 프로젝트의 설치된 Lucide React Native1.70.0 도형 데이터를 읽어 정적 HTML 검토용 SVG로 출력했다. [icons.csv](icons.csv)와 `assets/lucide-license.txt`에 출처를 남겼다. 실제 앱 구현은 프로젝트 Lucide 컴포넌트를 사용해야 한다. Figma에서 아이콘/브랜드를 추출하지 않았다. 브랜드 자산은 해당 제공자 로그인 식별 용도로만 사용하며 일반 앱 로고나 장식으로 쓰지 않는다.
