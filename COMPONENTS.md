# 공통 컴포넌트 가이드

피그마 페이지 **「ㄱ.컴포넌트<이게최종」** 기준. 컴포넌트를 새로 만들거나 쓸 때 이 문서를 따른다.

## 이름 규칙

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트/파일명 | 피그마 이름을 PascalCase로 변환 | `btn-big` → `BtnBig.jsx`, `title-main` → `TitleMain.jsx` |
| 위치 | `src/components/common/` (전부 평평하게, 하위 폴더 없음) | `src/components/common/BtnBig.jsx` |
| 피그마 `속성 1` (variant) | `variant` prop, 값은 피그마 그대로 소문자 | `<Badge variant="good" />`, `<BtnGo variant="more2" />` |
| 피그마 `속성 2` | 의미에 맞는 두 번째 prop (`color`, `size` 등) | `<Img size="medium" color="grey" />` |
| disable/disabled 변형 | HTML 표준 `disabled` prop 사용 | `<BtnBig disabled />` |
| SVG 아이콘 | 피그마에서 export → `src/assets/icons/`, kebab-case | `heart-abled.svg`, `bell-ring.svg` |
| 텍스트/이미지 내용 | props로 받는다 (하드코딩 금지) | `<CardRank name="..." brand="..." img={...} />` |

## 디자인 토큰 (Tailwind 클래스로 사용)

`src/index.css`의 `@theme`에 등록되어 있음. **hex 코드 직접 쓰지 말 것.**

| 토큰 | 값 | Tailwind 예시 |
| --- | --- | --- |
| `offwhite` | #ffffff | `bg-offwhite` |
| `offwhite70` | #ffffff 70% (피그마 `offwhite70%`) | `bg-offwhite70` |
| `offblack` | #1a1a1a | `text-offblack` |
| `offblack70` | #1a1a1a 70% (피그마 `offblack70%`) | `bg-offblack70` |
| `background` | #f7f7f7 | `bg-background` |
| `grey` | #8a8a8a | `text-grey` |
| `light-grey` | #dddddd | `border-light-grey` |
| `2light-grey` | #ededed | `bg-2light-grey` |
| `subtext` | #4d4d4d | `text-subtext` |
| `point-orange` | #ff4800 | `bg-point-orange` |
| `point-orange2` | #ffede6 | `bg-point-orange2` |

### 폰트 스타일 (피그마 Text Styles → `text-*` 유틸리티)

기본 폰트는 Pretendard (index.html에서 CDN 로드, body 기본 적용, letter-spacing -2%).
**행간 주의**: 피그마 행간이 AUTO인 스타일은 CSS에 `line-height: normal`을 명시해야 한다.
안 그러면 Tailwind preflight의 `1.5`를 상속받아 피그마보다 줄간격이 벌어지고, 카드 안 요소 위치가 어긋난다.
`en/*` 스타일은 Cormorant Garamond라서 **`font-en`을 같이** 붙인다: `<p className="font-en text-en-title-28">`.

| 피그마 스타일 | 클래스 | 스펙 |
| --- | --- | --- |
| title/semibold-30px | `text-title-semibold-30` | 30px / 600 |
| title/semibold-24px | `text-title-semibold-24` | 24px / 600 / 자간 -3% |
| title/medium-20px | `text-title-medium-20` | 20px / 500 |
| title/semibold-18px | `text-title-semibold-18` | 18px / 600 / 행간 1.4 |
| subTitle/regular-16px | `text-subtitle-regular-16` | 16px / 400 / 행간 1.4 |
| body/semibold-16px | `text-body-semibold-16` | 16px / 600 |
| body/medium-16px | `text-body-medium-16` | 16px / 500 |
| body/regular-18px | `text-body-regular-18` | 18px / 400 / 행간 1 |
| body/medium-14px | `text-body-medium-14` | 14px / 500 |
| body/medium-14px-line | `text-body-medium-14-line` | 14px / 500 / 밑줄 포함 |
| body/regular-14px | `text-body-regular-14` | 14px / 400 / 행간 1.4 |
| caption/medium-12px | `text-caption-medium-12` | 12px / 500 / 행간 1.4 |
| caption/regular-12px | `text-caption-regular-12` | 12px / 400 |
| caption/semibold-10px | `text-caption-semibold-10` | 10px / 600 |
| chatbot-18 | `text-chatbot-18` | 18px / 400 / 행간 1.3 |
| btn/cta | `text-btn-cta` | 18px / 600 |
| btn/icon | `text-btn-icon` | 14px / 400 |
| en/title_28px | `font-en text-en-title-28` | 28px / 600 |
| en/title-24px | `font-en text-en-title-24` | 24px / 600 |
| en/semibold-24px | `font-en text-en-semibold-24` | 24px / 600 |
| en/semibold-16px | `font-en text-en-semibold-16` | 16px / 600 |

radius/padding은 피그마 수치 그대로 Tailwind 유틸리티 사용: `rounded-lg`(8px), `rounded-2xl`(16px), `rounded-3xl`(24px), `p-3`(12px), `p-4`(16px), `p-5`(20px).

## 컴포넌트 매핑표

상태: ⬜ 대기 / 🟡 작업중 / ✅ 완료

### 버튼

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| btn-big | `BtnBig` | Default, disable | ✅ |
| btn-small | `BtnSmall` | black, white | ✅ |
| btn-hero | `BtnHero` | - | ✅ |
| btn-go | `BtnGo` | go, more, more2, ai, raffle, record | ✅ |

### 아이콘/토글

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| heart | `Heart` | abled, grey1, grey2, grey3 | ✅ |
| bell | `Bell` | ring, none | ✅ |
| checkBox | `CheckBox` | orange, white | ✅ |
| icon (좋아요/댓글 카운트) | `Icon` | `likes`/`comments` props | ✅ |
| profile | `Profile` | default, none(익명) — `name`/`time`/`img` props | ✅ |

### 헤더/내비게이션

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| header | `Header` | main, main2, detail, detail-back, write, write-tit, community (피그마의 `Detail`은 소문자 `detail`로 통일) | ✅ |
| bottomnav | `BottomNav` | Default/Variant2~4 → `active="home\|community\|magazine\|my"` prop으로 통합 | ✅ |
| tab-nav | `TabNav` | variant=home/community/magazine/my, 속성2(white/grey) → `active` boolean | ✅ |
| icon-bottomnav | `IconBottomNav` | variant=home/community/magazine/my + `active` (BottomNav 내부용) | ✅ |

### 타이틀

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| title-main | `TitleMain` | title1, title2, title3 | ✅ |
| title-section | `TitleSection` | default, button | ✅ |
| title-mag | `TitleMag` | default(영문 세리프), subtext(한글+부제) — 피그마 `+subtext` | ✅ |
| middlecard | `MiddleCard` | 190×256, 배경이미지+그라데이션+하트 | ✅ |
| card (3212:33337, 매거진) ⚠️ | `MagListCard` | 262×289. 피그마 이름이 `card`라 겹침 + `card-mag`(=`CardMag`)와 헷갈려서 `MagListCard`로 등록 — 피그마 개명 권장 | ✅ |
| magazine_card | `MagazineCard` | 262×336, 태그+제목+본문 | ✅ |

### 검색/카테고리/태그

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| search | `Search` | icon, no-icon (피그마 `< icon`/`no icon`) | ✅ |
| category | `Category` | page, tab — `items`/`active`/`onChange` props | ✅ |
| categorychip | `CategoryChip` | 188×54 큰 칩 (향 계열 선택용) | ✅ |
| keywordlist | `KeywordList` | white, grey — `keywords` 배열 prop, # 자동 부착 | ✅ |
| badge | `Badge` | good, bad, review, q&a | ✅ |
| tab (2208:5166 칩) | `Tab` | default(=active)/variant1 → `active` boolean | ✅ |
| tab-sub | `TabSub` | a(내가 추천한), b(추천받은) — 피그마에서 `tab`→`tab-sub`로 개명됨 | ✅ |
| tag-mag | `TagMag` | 이미지 위 반투명 태그 | ✅ |
| # | `HashTag` | - | ⬜ |

### 카드

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| card-info | `CardInfo` | `variant="perfume\|raffle"` × `type="a\|b\|c\|d"` (피그마에서 `card`→`card-info` 개명) | ✅ |
| card-small | `CardSmall` | small, medium-a, medium-b(+`showHeart`), medium-recommend (피그마에서 `card`→`card-small` 개명) | ✅ |
| card-challenge-small | `CardChallengeSmall` | 380×120 가로형 | ✅ |
| card-challenge | `CardChallenge` | 390×260 배경이미지형 | ✅ |
| card/rank | `CardRank` | 240×300, 순위 뱃지 + 이미지 + 이름/브랜드 + 하트 | ✅ |
| card/main/review | `CardMainReview` | 320×380, 배경이미지 + 하단 반투명 박스 | ✅ |
| card-mag- ⚠️ | `CardMag` | 320×452 배경이미지 + 하단 반투명 박스(높이 124px 고정). 피그마 이름 끝에 하이픈이 붙어 있음(`card-mag-`) — 오타로 보임 | ✅ |
| review | `Review` | 390×127, 리뷰 작성 유도 카드 | ✅ |
| review_summary | `ReviewSummary` | 390×192, 프로필+뱃지+본문+카운트 | ✅ |
| review_summary1 | `ReviewSummary1` | 390×303, 향수 여러 개 + 키워드 + 날짜 | ✅ |
| review_summary2 | `ReviewSummary2` | 300×128, 가로 목록용 (본문 2줄 말줄임). 피그마에서 `recom_card`→개명 | ✅ |
| review_Aisummary | `ReviewAiSummary` | 390×108, AI 리뷰 요약 | ✅ |
| main/banner | `MainBanner` | 390×214, 이미지만 | ✅ |
| main/banner/text | `MainBannerText` | 390×214, 라벨+카피+응모 버튼 | ✅ |
| main/card/challenge | - | `card-challenge-small`과 동일한 디자인 → `CardChallengeSmall` 사용 | ✅ |
| img | `Img` | `size="xsmall\|small\|medium\|big"` × `color="grey\|white"` (38/50/60/100px) | ✅ |

### 커뮤니티

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| community-enter | `CommunityEnter` | title, brand, ml, txt — 글작성 폼 필드 (피그마에서 개명됨) | ✅ |
| community-toggle | `CommunityToggle` | on/off → `checked` boolean (스위치는 CSS 구현) | ✅ |
| # | `HashTag` | 삭제 버튼 포함 태그 칩 | ✅ |
| Community/질문게시판/댓글 (3243:32261) | - | 신규 추가된 심볼 — 배치 지정 시 등록 | ⬜ |
| card (3257:72937), Frame 1707482726, con2 | - | 커뮤니티 섹션에 신규 추가된 심볼들 — 이름 정리 후 배치 지정 필요 | ⬜ |

### 챗봇

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| Bubble | `Bubble` | botBubble/userBubble → `variant="bot"\|"user"` | ✅ |
| quickcategory | `QuickCategory` | default, selected, under | ✅ |
| input | `Input` | Default/focused/ing → CSS 상태로 자동 처리 (focus-within) | ✅ |
| card (3135:18607 챗봇용) | `ChatCard` | shop, chatbot — 이름 겹침 회피로 ChatCard로 등록 | ✅ |
