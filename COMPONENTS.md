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
| icon (좋아요/댓글 카운트) | `Icon` | - | ⬜ |
| profile | `Profile` | Default, none | ⬜ |

### 헤더/내비게이션

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| header | `Header` | main, main2, detail, detail-back, write, write-tit, community (피그마의 `Detail`은 소문자 `detail`로 통일) | ✅ |
| bottomnav | `BottomNav` | Default, Variant2~4 | ⬜ |
| tab-nav | `TabNav` | home/community/magazine/my × white/grey | ⬜ |
| icon-bottomnav | `IconBottomNav` | home/commu/mag/my × white/grey (BottomNav 내부용) | ⬜ |

### 타이틀

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| title-main | `TitleMain` | title1, title2, title3 | ⬜ |
| title-section | `TitleSection` | Default, button | ⬜ |
| title-mag | `TitleMag` | default, +subtext | ⬜ |

### 검색/카테고리/태그

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| search | `Search` | icon, no icon | ⬜ |
| category | `Category` | tab, page | ⬜ |
| categorychip | `CategoryChip` | - | ⬜ |
| keywordlist | `KeywordList` | white, grey | ⬜ |
| badge | `Badge` | good, bad, review, q&a | ⬜ |
| tab ⚠️ | `Tab` | 피그마에 `tab` 프레임이 2개(2208:5166, 2208:5194) — 작업 시 어느 쪽인지 확인 필요 | ⬜ |
| tag-mag | `TagMag` | - | ⬜ |
| # | `HashTag` | - | ⬜ |

### 카드

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| card ⚠️ | - | `card` 프레임이 3개(perfume/raffle용 2208:19691, small/medium용 2208:20373, 챗봇용 3135:18607) — 작업 시 분리 이름 결정 필요 | ⬜ |
| card/rank | `CardRank` | - | ⬜ |
| card-mag | `CardMag` | - | ⬜ |
| card-challenge | `CardChallenge` | - | ⬜ |
| recom_card | `RecomCard` | - | ⬜ |
| review | `Review` | - | ⬜ |
| review_summary | `ReviewSummary` | - | ⬜ |
| review_Aisummary | `ReviewAiSummary` | - | ⬜ |
| main/banner | `MainBanner` | -, text(main/banner/text) | ⬜ |
| img | `Img` | xsmall/small/medium/big × white/grey | ⬜ |

### 커뮤니티

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| community ⚠️ | `Community` | 프레임 2개(입력폼용 title/brand/ml/txt, 토글용 on/off) — 작업 시 분리 이름 결정 필요 | ⬜ |

### 챗봇

| 피그마 이름 | 컴포넌트 | variants | 상태 |
| --- | --- | --- | --- |
| Bubble | `Bubble` | botBubble, userBubble | ⬜ |
| quickcategory | `QuickCategory` | Default, Selected, under | ⬜ |
| input | `Input` | Default, focused, ing | ⬜ |
