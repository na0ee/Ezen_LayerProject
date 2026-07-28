// src/data/perfumeData.js
//
// 향수 상품 목록 데이터.
// - brandId: brands.js의 id 참조
// - familyIds: fragranceFamilies.js의 id 참조 (배열, 1~2개)
// - image: 이미지 파일명 없으면 빈 문자열("") → 컴포넌트에서 기본 이미지로 대체 처리
// - notes: 탑/미들/베이스 노트 구성 (각 배열)
// - noteColors: 탑/미들/베이스 노트의 향 계열을 시각화한 대표 컬러(hex)
//     시트러스=노랑 / 그린=초록 / 아쿠아틱=파랑 / 플로럴=핑크·바이올렛 / 우디=갈색 / 머스크·파우더리=베이지 / 스파이시=주황·빨강
// - aiReview: AI가 요약한 리뷰 (사용자 평을 종합한 한두 문장)
// - detailDescription: 상세 페이지용 자세한 향수 설명 (3줄 구성, "\n"으로 구분 → 화면에서는 white-space: pre-line 등으로 줄바꿈 처리)
// - detailTitle: 상세 설명 전체를 포괄하는 한 단어 제목 (예: "포근함", "온기")
//
// ▶ 새 향수 추가 방법: 아래 배열 맨 뒤에 객체 하나만 추가하면 됨.
//   id는 마지막 값 + 1로, brandId/familyIds는 반드시 brands.js / fragranceFamilies.js에 있는 id만 사용할 것.

export const perfumeData = [
  // ── 메종 마르지엘라 ──────────────────────────
  {
    id: 1,
    perfume: {
      brandId: "maison-margiela",
      name: "레이지 선데이 모닝",
      description: "깨끗한 침구를 떠올리게 하는 포근하고 은은한 향",
      detailDescription:
        "갓 세탁한 새하얀 침구 속에서 맞는 여유로운 일요일 아침의 포근함과 느긋함을 그대로 담아낸 향수다.\n" +
        "알데하이드와 배의 산뜻한 첫인상 뒤로 은방울꽃과 아이리스, 장미가 부드럽게 피어나며 비누처럼 깨끗한 인상을 남긴다.\n" +
        "잔향은 화이트 머스크와 앰버가 포근하게 감싸 주어 계절과 상황을 가리지 않는 데일리 향으로 손색이 없다.",
      detailTitle: "포근함",
      image: "/assets/perfume/maison-margiela/lazy-sunday-morning.png",
      detailImages: [
        "/assets/perfume/maison-margiela/lazy-sunday-morning-d1.jpg",
        "/assets/perfume/maison-margiela/lazy-sunday-morning-d2.jpg",
        "/assets/perfume/maison-margiela/lazy-sunday-morning-d3.jpg",
      ],
      familyIds: ["floral", "musk"],
      notes: {
        top: ["알데하이드", "배", "베르가못"],
        middle: ["은방울꽃", "아이리스", "장미"],
        base: ["화이트 머스크", "앰버"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#E4D9C8" },
      aiReview:
        "'세탁한 이불 냄새'라는 평이 가장 많으며, 부담 없이 매일 뿌리기 좋은 클린 머스크로 호평받는다. 지속력은 보통이라는 의견이 다수.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    perfume: {
      brandId: "maison-margiela",
      name: "바이 더 파이어플레이스",
      description: "타오르는 장작과 따뜻한 향신료가 어우러진 포근한 향",
      detailDescription:
        "눈 내리는 겨울날, 벽난로 앞에서 몸을 녹이는 순간을 향으로 옮긴 작품이다.\n" +
        "클로브와 핑크 페퍼의 알싸한 오프닝에 이어 달콤하게 구운 밤과 구아이악 우드의 스모키함이 서서히 번져 나간다.\n" +
        "바닐라와 캐시미어 우드의 잔향이 오래도록 포근하게 남아 쌀쌀한 계절의 니트 위에 특히 잘 어울린다.",
      detailTitle: "온기",
      image: "/assets/perfume/maison-margiela/by-the-fireplace.png",
      detailImages: [
        "/assets/perfume/maison-margiela/by-the-fireplace-d1.jpg",
        "/assets/perfume/maison-margiela/by-the-fireplace-d2.jpg",
        "/assets/perfume/maison-margiela/by-the-fireplace-d3.jpg",
      ],
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["클로브", "핑크 페퍼", "오렌지"],
        middle: ["밤나무", "구아이악 우드"],
        base: ["바닐라", "캐시미어 우드", "페루 발삼"],
      },
      noteColors: { top: "#D08159", middle: "#9C6B4A", base: "#E6CE9C" },
      aiReview:
        "달콤한 밤·바닐라와 스모키한 우드의 조합이 겨울 시그니처로 인기. 포근하면서도 세련됐다는 평이 많고 남녀 모두 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 3,
    perfume: {
      brandId: "maison-margiela",
      name: "재즈 클럽",
      description: "럼과 담배, 바닐라가 어우러진 깊고 분위기 있는 향",
      detailDescription:
        "시가 연기와 위스키 잔이 어른거리는 뉴욕 재즈 바의 밤공기를 연상시키는 향수다.\n" +
        "핑크 페퍼와 레몬의 산뜻한 시작이 럼의 달큰함과 클라리 세이지로 이어지며 깊고 어른스러운 무드를 만든다.\n" +
        "바닐라와 타바코 리프의 스모키한 잔향이 길게 이어져 가을·겨울 저녁 자리에서 존재감을 발휘한다.",
      detailTitle: "낭만",
      image: "/assets/perfume/maison-margiela/jazz-club.png",
      detailImages: [
        "/assets/perfume/maison-margiela/jazz-club-d1.jpg",
        "/assets/perfume/maison-margiela/jazz-club-d2.jpg",
        "/assets/perfume/maison-margiela/jazz-club-d3.jpg",
      ],
      familyIds: ["oriental", "woody"],
      notes: {
        top: ["핑크 페퍼", "네롤리", "레몬"],
        middle: ["럼", "클라리 세이지"],
        base: ["바닐라", "타바코 리프", "베티버"],
      },
      noteColors: { top: "#F5C542", middle: "#C89B5C", base: "#7A4E31" },
      aiReview:
        "럼과 타바코의 달콤·스모키함이 '남성 시그니처'로 자주 언급된다. 지속력·확산력이 좋다는 평가가 지배적.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    perfume: {
      brandId: "maison-margiela",
      name: "언더 더 레몬 트리",
      description: "상큼한 레몬과 푸른 잎사귀가 어우러진 싱그러운 향",
      detailDescription:
        "햇살 좋은 날 레몬나무 그늘 아래에서 느껴지는 싱그러움을 담은 향수다.\n" +
        "갓 짜낸 듯한 레몬과 쁘띠그레인의 상큼함이 터진 뒤 그린 노트와 카다멈이 잎사귀의 푸릇함을 더한다.\n" +
        "머스크와 앰버우드가 은은하게 마무리해 무더운 여름철 가볍게 뿌리기 좋은 청량한 시트러스다.",
      detailTitle: "싱그러움",
      image: "/assets/perfume/maison-margiela/under-the-lemon-trees.png",
      detailImages: [
        "/assets/perfume/maison-margiela/under-the-lemon-trees-d1.jpg",
        "/assets/perfume/maison-margiela/under-the-lemon-trees-d2.jpg",
        "/assets/perfume/maison-margiela/under-the-lemon-trees-d3.jpg",
      ],
      familyIds: ["citrus", "green"],
      notes: {
        top: ["레몬", "쁘띠그레인"],
        middle: ["그린 노트", "카다멈"],
        base: ["머스크", "앰버우드"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#E4D9C8" },
      aiReview:
        "인공적이지 않은 '진짜 레몬잎' 같은 시트러스 그린이 여름용으로 호평. 상큼하지만 지속력은 짧은 편이라는 의견.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 5,
    perfume: {
      brandId: "maison-margiela",
      name: "세일링 데이",
      description: "시원한 바닷바람과 맑은 바닷물을 떠올리게 하는 청량한 향",
      detailDescription:
        "돛을 올리고 바다로 나아가는 순간의 상쾌한 바람과 물보라를 그린 향수다.\n" +
        "해양 노트와 베르가못의 청량한 오프닝에 해조류와 코리앤더가 더해져 짭조름한 바다 내음이 생생하게 살아난다.\n" +
        "앰버그리스와 머스크의 잔잔한 잔향까지 이어지는 흐름이 여름 데일리로 부담 없이 어울린다.",
      detailTitle: "청량함",
      image: "/assets/perfume/maison-margiela/sailing-day.png",
      detailImages: [
        "/assets/perfume/maison-margiela/sailing-day-d2.jpg",
        "/assets/perfume/maison-margiela/sailing-day-d3.jpg",
      ],
      familyIds: ["aquatic", "green"],
      notes: {
        top: ["해양 노트", "베르가못"],
        middle: ["해조류", "코리앤더"],
        base: ["앰버그리스", "머스크"],
      },
      noteColors: { top: "#7EC0E8", middle: "#52946B", base: "#DCCFC0" },
      aiReview:
        "짭짤한 소금기와 청량한 아쿠아틱이 '바다 그 자체'라는 평. 여름 데일리로 부담 없다는 반응이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 불가리 ──────────────────────────
  {
    id: 6,
    perfume: {
      brandId: "bvlgari",
      name: "옴니아 크리스탈린",
      description: "맑은 연꽃과 배의 수분감이 어우러진 깨끗하고 투명한 향",
      detailDescription:
        "맑은 크리스탈처럼 투명하고 깨끗한 무드를 담은 불가리의 대표 플로럴이다.\n" +
        "대나무와 나시 배의 수분감 가득한 오프닝이 연꽃과 화이트 티의 은은한 꽃향으로 자연스럽게 이어진다.\n" +
        "발사 우드와 머스크가 깔끔하게 마무리해 오피스나 일상에서 부담 없이 쓰기 좋은 청순한 향이다.",
      detailTitle: "투명함",
      image: "/assets/perfume/bvlgari/omnia-crystalline.png",
      familyIds: ["floral", "aquatic"],
      notes: {
        top: ["대나무", "나시 배"],
        middle: ["연꽃", "화이트 티"],
        base: ["발사 우드", "구아이악 우드", "머스크"],
      },
      noteColors: { top: "#7FC29B", middle: "#7EC0E8", base: "#E4D9C8" },
      aiReview:
        "가볍고 깨끗한 물·배 향이 '청순하다'는 평으로 여성 데일리에 인기. 은은해서 오피스용으로 좋다는 의견 다수.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 7,
    perfume: {
      brandId: "bvlgari",
      name: "로즈 골데아 블러썸 딜라이트",
      description: "갓 피어난 장미와 부드러운 머스크가 어우러진 화사한 향",
      detailDescription:
        "막 피어난 장미 정원을 거니는 듯한 화사함을 담은 로맨틱 플로럴이다.\n" +
        "석류와 라즈베리의 상큼달콤한 과즙미가 장미와 피오니의 부드러운 꽃잎 향으로 사랑스럽게 이어진다.\n" +
        "머스크와 샌들우드의 포근한 잔향이 과하지 않게 남아 봄·여름 데이트 향수로 특히 인기가 높다.",
      detailTitle: "사랑스러움",
      image: "/assets/perfume/bvlgari/rose-goldea-blossom-delight.png",
      familyIds: ["floral", "musk"],
      notes: {
        top: ["석류", "라즈베리"],
        middle: ["장미", "피오니"],
        base: ["머스크", "샌들우드"],
      },
      noteColors: { top: "#D96A8A", middle: "#E27396", base: "#B08968" },
      aiReview:
        "과하지 않은 프루티 로즈가 '사랑스럽다'는 평. 달콤하면서 깨끗해 봄·여름 여성향으로 선호도가 높다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 8,
    perfume: {
      brandId: "bvlgari",
      name: "아쿠아 뿌르 옴므",
      description: "짙푸른 바다와 상쾌한 시트러스를 떠올리게 하는 시원한 향",
      detailDescription:
        "깊고 푸른 지중해의 바닷속을 그대로 옮겨 놓은 듯한 남성 아쿠아틱의 명작이다.\n" +
        "만다린과 쁘띠그레인의 산뜻한 시작 뒤로 포시도니아 해초와 미네랄 노트가 짭조름한 바다의 깊이를 그려낸다.\n" +
        "산톨리나와 클라리 세이지의 드라이한 마무리가 깔끔해 무더운 여름 비즈니스 룩에도 잘 어울린다.",
      detailTitle: "깊이",
      image: "/assets/perfume/bvlgari/aqva-pour-homme.png",
      detailImages: [
        "/assets/perfume/bvlgari/aqva-pour-homme-d1.jpg",
        "/assets/perfume/bvlgari/aqva-pour-homme-d2.jpg",
        "/assets/perfume/bvlgari/aqva-pour-homme-d3.jpg",
      ],
      familyIds: ["aquatic", "citrus"],
      notes: {
        top: ["만다린", "쁘띠그레인"],
        middle: ["포시도니아(해초)", "미네랄 노트"],
        base: ["산톨리나", "클라리 세이지"],
      },
      noteColors: { top: "#F5C542", middle: "#4A90B8", base: "#52946B" },
      aiReview:
        "짭조름한 해조·미네랄 감이 '깊은 바다' 같다는 평으로 남성 아쿠아틱 명작으로 꼽힌다. 여름 대표작이라는 의견.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 9,
    perfume: {
      brandId: "bvlgari",
      name: "불가리 맨 우드 에센스",
      description: "푸른 숲과 따뜻한 나무의 생동감이 느껴지는 깊고 편안한 향",
      detailDescription:
        "도시적인 세련됨과 자연의 생명력을 동시에 담아낸 어반 우디 향수다.\n" +
        "사이프러스와 베르가못의 상쾌한 숲 공기 같은 오프닝이 시더우드와 베티버의 단단한 나무 향으로 이어진다.\n" +
        "벤조인과 앰버의 따뜻한 잔향이 부드럽게 감싸 사계절 내내 신뢰감 있는 인상을 만들어 준다.",
      detailTitle: "안정감",
      image: "/assets/perfume/bvlgari/man-wood-essence.png",
      familyIds: ["woody", "green"],
      notes: {
        top: ["사이프러스", "베르가못"],
        middle: ["시더우드", "베티버"],
        base: ["벤조인", "앰버"],
      },
      noteColors: { top: "#7FC29B", middle: "#9C6B4A", base: "#C89B5C" },
      aiReview:
        "상쾌한 시더·사이프러스가 '깔끔한 숲 향'으로 호평. 무난하게 데일리로 쓰기 좋은 남성 우디라는 평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 10,
    perfume: {
      brandId: "bvlgari",
      name: "불가리 맨 인 블랙",
      description:
        "따뜻한 향신료와 짙은 우디 노트가 어우러진 강렬하고 관능적인 향",
      detailDescription:
        "카리스마 넘치는 블랙 수트를 향으로 표현한 듯한 강렬하고 관능적인 오리엔탈이다.\n" +
        "럼과 스파이스의 화끈한 오프닝에 이어 튜베로즈와 레더가 어우러지며 남성적인 깊이를 더한다.\n" +
        "통카빈과 벤조인의 달콤하고 묵직한 잔향이 오래 지속되어 가을·겨울 저녁 모임에서 존재감이 확실하다.",
      detailTitle: "카리스마",
      image: "/assets/perfume/bvlgari/man-in-black.png",
      detailImages: [
        "/assets/perfume/bvlgari/man-in-black-d1.jpg",
        "/assets/perfume/bvlgari/man-in-black-d2.jpg",
        "/assets/perfume/bvlgari/man-in-black-d3.jpg",
      ],
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["럼", "스파이스"],
        middle: ["튜베로즈", "아이리스", "레더"],
        base: ["통카빈", "벤조인", "구아이악 우드"],
      },
      noteColors: { top: "#D08159", middle: "#8B5E3C", base: "#7A4E31" },
      aiReview:
        "달콤한 럼·통카와 가죽의 조합이 '섹시하고 존재감 강하다'는 평. 지속력·확산력이 뛰어나 가을·겨울 저녁용으로 추천된다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 불리(Buly 1803) ──────────────────────────
  {
    id: 11,
    perfume: {
      brandId: "buly",
      name: "베르칸 오렌지 블로썸",
      description: "오렌지꽃과 베르가못, 네롤리가 어우러진 맑고 화사한 향",
      detailDescription:
        "지중해의 오렌지 과수원에 부는 바람처럼 맑고 우아한 화이트 플로럴이다.\n" +
        "베르가못과 네롤리의 싱그러운 오프닝이 오렌지 블로섬과 재스민의 화사한 꽃향으로 자연스럽게 피어난다.\n" +
        "머스크와 앰버의 은은한 잔향이 인공적인 느낌 없이 깨끗하게 마무리되어 낮 시간 어느 자리에나 어울린다.",
      detailTitle: "우아함",
      image: "/assets/perfume/buly/orange-blossom.png",
      familyIds: ["floral", "citrus"],
      notes: {
        top: ["베르가못", "네롤리"],
        middle: ["오렌지 블로섬", "재스민"],
        base: ["머스크", "앰버"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F5E6E0", base: "#E4D9C8" },
      aiReview:
        "청량한 네롤리와 오렌지꽃이 '깨끗하고 우아하다'는 평. 인공감 없이 자연스러운 화이트 플로럴로 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 12,
    perfume: {
      brandId: "buly",
      name: "키소 유자",
      description: "상큼한 유자와 민트, 푸른 월계수 잎이 어우러진 산뜻한 향",
      detailDescription:
        "일본 키소 계곡의 맑은 공기와 갓 딴 유자를 떠올리게 하는 산뜻한 시트러스다.\n" +
        "톡 터지는 유자와 민트의 청량감이 월계수 잎의 허브 그린으로 이어지며 세련된 인상을 만든다.\n" +
        "베티버와 머스크의 차분한 잔향이 가볍게 남아 여름철 유니섹스 데일리로 제격이다.",
      detailTitle: "상쾌함",
      image: "/assets/perfume/buly/kiso-yuzu.png",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["유자", "민트"],
        middle: ["월계수 잎", "그린 노트"],
        base: ["베티버", "머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#52946B" },
      aiReview:
        "상큼한 유자에 허브 그린이 더해져 '청량하고 세련됐다'는 평. 여름 유니섹스 시트러스로 인기.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 13,
    perfume: {
      brandId: "buly",
      name: "코미 포레스트",
      description:
        "비가 내린 뒤 이끼와 소나무 숲을 떠올리게 하는 촉촉하고 깊은 향",
      detailDescription:
        "비가 갠 직후의 침엽수림을 걷는 듯한 촉촉하고 깊은 숲의 향이다.\n" +
        "소나무와 베르가못의 청명한 오프닝 뒤로 젖은 이끼와 사이프러스가 숲 바닥의 습기를 생생하게 그려낸다.\n" +
        "베티버와 시더우드의 잔향이 고요하게 이어져 차분한 개성을 원하는 이들에게 잘 어울린다.",
      detailTitle: "숲내음",
      image: "/assets/perfume/buly/komi-forest.png",
      familyIds: ["green", "woody"],
      notes: {
        top: ["소나무", "베르가못"],
        middle: ["이끼", "사이프러스"],
        base: ["베티버", "시더우드"],
      },
      noteColors: { top: "#7FC29B", middle: "#52946B", base: "#9C6B4A" },
      aiReview:
        "촉촉한 이끼·솔 향이 '숲속에 있는 듯하다'는 평. 차분하고 개성 있는 그린 우디로 마니아층의 지지를 받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 14,
    perfume: {
      brandId: "buly",
      name: "다마스크 로즈",
      description: "싱그러운 장미에 생강과 베티버가 은은하게 더해진 우아한 향",
      detailDescription:
        "이른 아침 이슬을 머금은 다마스크 장미를 갓 꺾어 온 듯한 생생한 로즈 향이다.\n" +
        "생강과 베르가못의 알싸하고 산뜻한 시작이 장미 본연의 향을 한층 입체적으로 끌어올린다.\n" +
        "베티버와 머스크의 잔향이 달지 않게 마무리되어 우아하면서도 개성 있는 로즈를 찾는 이들에게 제격이다.",
      detailTitle: "생생함",
      image: "/assets/perfume/buly/damask-rose.png",
      familyIds: ["floral", "spicy"],
      notes: {
        top: ["생강", "베르가못"],
        middle: ["다마스크 로즈"],
        base: ["베티버", "머스크"],
      },
      noteColors: { top: "#D08159", middle: "#E27396", base: "#52946B" },
      aiReview:
        "달지 않고 생생한 '진짜 장미' 같다는 평. 생강의 스파이시함이 더해져 우아하면서 개성 있다는 반응.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 15,
    perfume: {
      brandId: "buly",
      name: "마카사르",
      description:
        "부드러운 아이리스와 앰버, 담배 향이 어우러진 따뜻하고 짙은 향",
      detailDescription:
        "고급 가구의 원목과 오래된 서재를 연상시키는 중후하고 따뜻한 오리엔탈이다.\n" +
        "베르가못과 스파이스의 오프닝을 지나 파우더리한 아이리스와 타바코가 깊고 부드러운 무드를 만든다.\n" +
        "앰버와 샌들우드, 레더의 잔향이 묵직하게 이어져 가을·겨울 격식 있는 자리에 잘 어울린다.",
      detailTitle: "중후함",
      image: "/assets/perfume/buly/makassar.png",
      familyIds: ["oriental", "powdery"],
      notes: {
        top: ["베르가못", "스파이스"],
        middle: ["아이리스", "타바코"],
        base: ["앰버", "샌들우드", "레더"],
      },
      noteColors: { top: "#D08159", middle: "#CDB9DE", base: "#8B5E3C" },
      aiReview:
        "파우더리한 아이리스와 담배·앰버가 '고급스럽고 중후하다'는 평. 가을·겨울 유니섹스로 선호되는 개성파.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 조 말론 ──────────────────────────
  {
    id: 16,
    perfume: {
      brandId: "jo-malone",
      name: "잉글리쉬 페어 앤 프리지아",
      description:
        "잘 익은 배와 화이트 프리지아에 파촐리가 은은하게 더해진 부드럽고 우아한 향",
      detailDescription:
        "가을 과수원에서 갓 딴 배의 싱그러움을 담은 조 말론의 베스트셀러다.\n" +
        "즙이 가득한 배와 멜론의 오프닝이 프리지아와 장미의 화사한 부케로 부드럽게 이어진다.\n" +
        "파촐리와 머스크의 잔향이 세련되게 마무리되어 첫 니치 향수나 선물용으로 실패가 없는 선택이다.",
      detailTitle: "달콤함",
      image: "/assets/perfume/jo-malone/english-pear-freesia.png",
      detailImages: [
        "/assets/perfume/jo-malone/english-pear-freesia-d1.jpg",
        "/assets/perfume/jo-malone/english-pear-freesia-d2.jpg",
        "/assets/perfume/jo-malone/english-pear-freesia-d3.jpg",
      ],
      familyIds: ["floral", "woody"],
      notes: {
        top: ["배", "멜론"],
        middle: ["프리지아", "장미"],
        base: ["파촐리", "머스크", "앰버"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#C89B5C" },
      aiReview:
        "달콤한 배와 화사한 프리지아가 '실패 없는 인기 향'으로 꼽힌다. 세련되고 대중적이라 선물용으로 자주 추천.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 17,
    perfume: {
      brandId: "jo-malone",
      name: "우드 세이지 앤 씨 솔트",
      description:
        "바닷소금과 세이지가 어우러져 거친 해안의 바람을 떠올리게 하는 시원한 향",
      detailDescription:
        "바람 부는 영국 해안 절벽을 맨발로 걷는 듯한 자유로운 무드의 향수다.\n" +
        "암브레트 씨드의 포근한 시작에 씨 솔트의 짭짤한 미네랄감이 더해져 탁 트인 해변을 그려낸다.\n" +
        "세이지와 드리프트우드의 중성적인 잔향이 깔끔하게 남아 성별과 계절을 가리지 않는 스테디셀러다.",
      detailTitle: "자유로움",
      image: "/assets/perfume/jo-malone/wood-sage-sea-salt.png",
      detailImages: [
        "/assets/perfume/jo-malone/wood-sage-sea-salt-d1.jpg",
        "/assets/perfume/jo-malone/wood-sage-sea-salt-d2.jpg",
        "/assets/perfume/jo-malone/wood-sage-sea-salt-d3.jpg",
      ],
      familyIds: ["aquatic", "woody"],
      notes: {
        top: ["암브레트 씨드"],
        middle: ["씨 솔트"],
        base: ["세이지", "드리프트우드"],
      },
      noteColors: { top: "#DCCFC0", middle: "#7EC0E8", base: "#52946B" },
      aiReview:
        "짭짤한 소금기와 세이지가 '탁 트인 해변 같다'는 평으로 유니섹스 베스트셀러. 깔끔하고 중성적이라 호불호가 적다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 18,
    perfume: {
      brandId: "jo-malone",
      name: "라임 바질 앤 만다린",
      description:
        "상큼한 라임에 바질과 화이트 타임이 더해진 산뜻하고 감각적인 향",
      detailDescription:
        "카리브해의 산들바람에서 영감을 받은 조 말론의 상징적인 시그니처 향이다.\n" +
        "톡 쏘는 라임과 만다린의 상큼함에 바질과 화이트 타임의 허브향이 더해져 흔한 시트러스와 차별화된다.\n" +
        "파촐리와 베티버가 은은한 깊이로 마무리해 캐주얼부터 포멀까지 두루 어울리는 만능 향수다.",
      detailTitle: "활력",
      image: "/assets/perfume/jo-malone/lime-basil-mandarin.png",
      detailImages: [
        "/assets/perfume/jo-malone/lime-basil-mandarin-d1.jpg",
        "/assets/perfume/jo-malone/lime-basil-mandarin-d2.jpg",
        "/assets/perfume/jo-malone/lime-basil-mandarin-d3.jpg",
      ],
      familyIds: ["citrus", "green"],
      notes: {
        top: ["라임", "만다린", "베르가못"],
        middle: ["바질", "화이트 타임"],
        base: ["파촐리", "베티버"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#9C6B4A" },
      aiReview:
        "톡 쏘는 라임에 허브 바질이 더해져 '시트러스인데 세련됐다'는 평. 조 말론 대표 시그니처로 남녀 모두 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 19,
    perfume: {
      brandId: "jo-malone",
      name: "피오니 앤 블러쉬 스웨이드",
      description:
        "풍성한 피오니와 장미에 부드러운 스웨이드가 어우러진 화사한 향",
      detailDescription:
        "만개한 작약 꽃다발을 품에 안은 듯한 화사하고 로맨틱한 플로럴이다.\n" +
        "레드 애플의 과즙 어린 오프닝이 피오니와 장미, 재스민의 풍성한 꽃향으로 사랑스럽게 피어난다.\n" +
        "부드러운 스웨이드의 잔향이 벨벳처럼 감싸 봄철 데이트나 결혼식 하객 룩에 특히 잘 어울린다.",
      detailTitle: "설렘",
      image: "/assets/perfume/jo-malone/peony-blush-suede.png",
      detailImages: [
        "/assets/perfume/jo-malone/peony-blush-suede-d1.jpg",
        "/assets/perfume/jo-malone/peony-blush-suede-d2.jpg",
        "/assets/perfume/jo-malone/peony-blush-suede-d3.jpg",
      ],
      familyIds: ["floral", "powdery"],
      notes: {
        top: ["레드 애플"],
        middle: ["피오니", "장미", "재스민"],
        base: ["스웨이드"],
      },
      noteColors: { top: "#D96A8A", middle: "#F0A6BE", base: "#B08968" },
      aiReview:
        "풍성한 작약과 부드러운 스웨이드가 '여성스럽고 우아하다'는 평. 봄 시즌 선물용으로 특히 인기.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 20,
    perfume: {
      brandId: "jo-malone",
      name: "머르 앤 통카",
      description:
        "따뜻한 몰약과 통카빈의 바닐라 향이 어우러진 깊고 관능적인 향",
      detailDescription:
        "나미비아 몰약 나무의 신비로운 수액에서 영감을 받은 깊고 관능적인 향이다.\n" +
        "라벤더의 차분한 오프닝을 지나 몰약의 발사믹한 깊이가 서서히 퍼지며 이국적인 무드를 만든다.\n" +
        "통카빈과 바닐라, 아몬드의 달콤한 잔향이 오래 지속되어 쌀쌀한 계절의 저녁 향수로 사랑받는다.",
      detailTitle: "관능",
      image: "/assets/perfume/jo-malone/myrrh-tonka.png",
      detailImages: [
        "/assets/perfume/jo-malone/myrrh-tonka-d1.jpg",
        "/assets/perfume/jo-malone/myrrh-tonka-d2.jpg",
        "/assets/perfume/jo-malone/myrrh-tonka-d3.jpg",
      ],
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["라벤더"],
        middle: ["몰약"],
        base: ["통카빈", "바닐라", "아몬드"],
      },
      noteColors: { top: "#9FA8DA", middle: "#C89B5C", base: "#E6CE9C" },
      aiReview:
        "달콤한 통카·바닐라에 몰약의 깊이가 더해져 '중독성 있다'는 평. 콜론 인텐스 라인 중 지속력이 뛰어나 겨울용으로 추천.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 바이레도 ──────────────────────────
  {
    id: 21,
    perfume: {
      brandId: "byredo",
      name: "블랑쉬",
      description:
        "깨끗한 흰 셔츠와 갓 세탁한 린넨을 떠올리게 하는 맑고 포근한 향",
      detailDescription:
        "갓 다린 흰 셔츠와 새하얀 린넨의 청결함을 미니멀하게 담아낸 향수다.\n" +
        "알데하이드의 비누 같은 첫인상 뒤로 장미와 바이올렛, 피오니가 은은하게 겹쳐지며 깨끗한 꽃내음을 더한다.\n" +
        "화이트 머스크와 블론드 우드의 잔향이 살결처럼 부드럽게 남아 '깨끗한 사람'의 인상을 완성해 준다.",
      detailTitle: "순수",
      image: "/assets/perfume/byredo/blanche.png",
      detailImages: [
        "/assets/perfume/byredo/blanche-d1.jpg",
        "/assets/perfume/byredo/blanche-d2.jpg",
        "/assets/perfume/byredo/blanche-d3.jpg",
      ],
      familyIds: ["floral", "musk"],
      notes: {
        top: ["알데하이드", "핑크 페퍼"],
        middle: ["장미", "바이올렛", "피오니"],
        base: ["머스크", "샌들우드", "블론드 우드"],
      },
      noteColors: { top: "#E4D9C8", middle: "#B79ED1", base: "#DCCFC0" },
      aiReview:
        "'비누·깨끗한 빨래' 이미지로 유명하며 청결한 화이트 머스크로 큰 사랑을 받는다. 은은하고 세련됐다는 평이 지배적.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 22,
    perfume: {
      brandId: "byredo",
      name: "발 다프리크",
      description:
        "밝은 베르가못과 부드러운 꽃향에 베티버와 시더우드가 어우러진 따뜻한 향",
      detailDescription:
        "1920년대 파리를 매혹시킨 아프리카 문화와 재즈의 열기에서 영감을 받은 향수다.\n" +
        "베르가못과 네롤리, 마리골드의 따뜻한 시트러스가 바이올렛과 재스민의 부드러운 꽃향과 어우러진다.\n" +
        "베티버와 시더우드의 잔향이 세련되게 이어져 사계절 데일리로 완성도가 높은 바이레도의 대표작이다.",
      detailTitle: "세련됨",
      image: "/assets/perfume/byredo/bal-dafrique.png",
      detailImages: [
        "/assets/perfume/byredo/bal-dafrique-d1.jpg",
        "/assets/perfume/byredo/bal-dafrique-d2.jpg",
        "/assets/perfume/byredo/bal-dafrique-d3.jpg",
      ],
      familyIds: ["citrus", "woody"],
      notes: {
        top: ["베르가못", "레몬", "네롤리", "마리골드"],
        middle: ["바이올렛", "재스민", "시클라멘"],
        base: ["베티버", "시더우드", "머스크", "앰버"],
      },
      noteColors: { top: "#F5C542", middle: "#B79ED1", base: "#9C6B4A" },
      aiReview:
        "따뜻한 시트러스와 우디가 균형 잡혀 '데일리로 완벽하다'는 평. 바이레도 대표 베스트셀러로 유니섹스 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 23,
    perfume: {
      brandId: "byredo",
      name: "모하비 고스트",
      description:
        "은은한 바이올렛과 샌들우드, 머스크가 어우러진 부드럽고 신비로운 향",
      detailDescription:
        "모하비 사막에서 꽃을 피우는 고스트 플라워의 신비로움을 담은 향수다.\n" +
        "암브레트의 부드러운 오프닝에 바이올렛과 매그놀리아가 은은하게 겹쳐지며 몽환적인 분위기를 자아낸다.\n" +
        "샌들우드와 머스크의 크리미한 잔향이 조용히 오래 남아 과하지 않은 세련됨을 원하는 이들에게 제격이다.",
      detailTitle: "신비",
      image: "/assets/perfume/byredo/mojave-ghost.png",
      detailImages: [
        "/assets/perfume/byredo/mojave-ghost-d1.jpg",
        "/assets/perfume/byredo/mojave-ghost-d2.jpg",
        "/assets/perfume/byredo/mojave-ghost-d3.jpg",
      ],
      familyIds: ["woody", "powdery"],
      notes: {
        top: ["암브레트", "자메이칸 네스베리"],
        middle: ["바이올렛", "매그놀리아", "샌들우드"],
        base: ["시더우드", "머스크", "앰버"],
      },
      noteColors: { top: "#DCCFC0", middle: "#B79ED1", base: "#B08968" },
      aiReview:
        "은은한 우디 플로럴이 '조용하지만 세련됐다'는 평. 과하지 않아 데일리·유니섹스로 선호되는 스테디셀러.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 24,
    perfume: {
      brandId: "byredo",
      name: "집시 워터",
      description:
        "상쾌한 주니퍼와 레몬에 후추, 솔잎, 인센스가 더해진 차분한 숲의 향",
      detailDescription:
        "모닥불 가에 모여 자유롭게 살아가는 유랑의 삶에서 영감을 받은 향수다.\n" +
        "베르가못과 주니퍼 베리의 청량한 오프닝이 인센스와 솔잎의 신비로운 숲 내음으로 이어진다.\n" +
        "샌들우드와 바닐라의 부드러운 드라이다운이 중독적으로 남아 우디 입문자에게도 자주 추천된다.",
      detailTitle: "방랑",
      image: "/assets/perfume/byredo/gypsy-water.png",
      detailImages: [
        "/assets/perfume/byredo/gypsy-water-d1.jpg",
        "/assets/perfume/byredo/gypsy-water-d2.jpg",
        "/assets/perfume/byredo/gypsy-water-d3.jpg",
      ],
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["베르가못", "레몬", "페퍼", "주니퍼 베리"],
        middle: ["인센스", "솔잎", "오리스"],
        base: ["앰버", "샌들우드", "바닐라"],
      },
      noteColors: { top: "#F5C542", middle: "#8B7E6A", base: "#E6CE9C" },
      aiReview:
        "상쾌한 솔·주니퍼에 달큰한 바닐라 드라이다운이 '중독적'이라는 평. 유니섹스 우디로 바이레도 인기작.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 25,
    perfume: {
      brandId: "byredo",
      name: "선데이즈드",
      description:
        "밝은 시트러스와 네롤리에 부드러운 화이트 머스크가 어우러진 산뜻하고 편안한 향",
      detailDescription:
        "한여름 태양 아래에서 느끼는 나른한 행복감을 담은 밝은 시트러스다.\n" +
        "레몬과 그린 만다린의 반짝이는 오프닝이 네롤리와 이모르뗄의 부드러운 달콤함으로 이어진다.\n" +
        "화이트 머스크의 포근한 잔향이 산뜻하게 마무리되어 휴가지는 물론 일상에서도 기분을 환하게 만들어 준다.",
      detailTitle: "햇살",
      image: "/assets/perfume/byredo/sundazed.png",
      detailImages: [
        "/assets/perfume/byredo/sundazed-d1.jpg",
        "/assets/perfume/byredo/sundazed-d2.jpg",
        "/assets/perfume/byredo/sundazed-d3.jpg",
      ],
      familyIds: ["citrus", "musk"],
      notes: {
        top: ["레몬", "그린 만다린", "베르가못"],
        middle: ["네롤리", "이모르뗄"],
        base: ["머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#EFD9CE", base: "#E4D9C8" },
      aiReview:
        "화사한 시트러스에 포근한 머스크가 이어져 '기분 좋은 여름 향'이라는 평. 가볍고 밝아 데일리로 추천된다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 르 라보 ──────────────────────────
  {
    id: 26,
    perfume: {
      brandId: "le-labo",
      name: "산탈 33",
      description:
        "샌들우드와 시더우드에 은은한 향신료가 더해진 건조하고 깊은 향",
      detailDescription:
        "미국 서부 사막의 모닥불과 가죽 안장에서 영감을 받은 니치 향수의 아이콘이다.\n" +
        "바이올렛과 카다멈의 오프닝을 지나 아이리스와 앰브록스가 건조하면서도 매끈한 질감을 만들어 낸다.\n" +
        "샌들우드와 시더우드, 레더의 잔향이 강한 확산력으로 오래 지속되어 시그니처 향으로 삼기 좋다.",
      detailTitle: "존재감",
      image: "/assets/perfume/le-labo/santal-33.png",
      detailImages: [
        "/assets/perfume/le-labo/santal-33-d1.jpg",
        "/assets/perfume/le-labo/santal-33-d2.jpg",
        "/assets/perfume/le-labo/santal-33-d3.jpg",
      ],
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["바이올렛", "카다멈"],
        middle: ["아이리스", "앰브록스"],
        base: ["샌들우드", "시더우드", "레더", "앰버"],
      },
      noteColors: { top: "#B79ED1", middle: "#CDB9DE", base: "#7A4E31" },
      aiReview:
        "건조한 샌들우드·가죽 향이 '중성적이고 힙하다'는 평으로 니치 향수의 아이콘. 확산력이 강하다는 의견이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 27,
    perfume: {
      brandId: "le-labo",
      name: "어나더 13",
      description: "부드러운 머스크가 피부에 포근하고 오묘하게 남는 깨끗한 향",
      detailDescription:
        "향수를 뿌리지 않은 듯, 원래 좋은 체취처럼 스며드는 스킨 센트의 대명사다.\n" +
        "앰브록스의 은은한 오프닝에 재스민과 암브레트가 살짝 얹혀 비누 같은 깨끗함을 더한다.\n" +
        "머스크와 배의 잔향이 피부에 밀착되듯 오래 남아 매일 뿌려도 질리지 않는 데일리 향수로 꼽힌다.",
      detailTitle: "은은함",
      image: "/assets/perfume/le-labo/another-13.png",
      detailImages: [
        "/assets/perfume/le-labo/another-13-d1.jpg",
        "/assets/perfume/le-labo/another-13-d2.jpg",
        "/assets/perfume/le-labo/another-13-d3.jpg",
      ],
      familyIds: ["musk", "powdery"],
      notes: {
        top: ["앰브록스"],
        middle: ["재스민", "암브레트"],
        base: ["머스크", "모스", "배"],
      },
      noteColors: { top: "#DCCFC0", middle: "#F5E6E0", base: "#E4D9C8" },
      aiReview:
        "'스킨 센트'의 대명사로 은은한 머스크가 '내 체취 같다'는 평. 유니섹스 데일리로 압도적 지지를 받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 28,
    perfume: {
      brandId: "le-labo",
      name: "베르가모트 22",
      description:
        "베르가못과 자몽의 쌉싸름한 생동감이 돋보이는 밝고 산뜻한 향",
      detailDescription:
        "아침 햇살에 반짝이는 베르가못 과육을 그대로 옮겨 놓은 듯한 고급 시트러스다.\n" +
        "베르가못과 자몽의 쌉싸름한 오프닝이 오렌지 블로섬의 화사함으로 부드럽게 이어진다.\n" +
        "머스크와 앰버, 시더우드의 잔향이 깊이를 더해 가벼운 시트러스에 아쉬움을 느꼈던 이들에게 제격이다.",
      detailTitle: "산뜻함",
      image: "/assets/perfume/le-labo/bergamote-22.png",
      detailImages: [
        "/assets/perfume/le-labo/bergamote-22-d1.jpg",
        "/assets/perfume/le-labo/bergamote-22-d2.jpg",
        "/assets/perfume/le-labo/bergamote-22-d3.jpg",
      ],
      familyIds: ["citrus", "green"],
      notes: {
        top: ["베르가못", "자몽", "쁘띠그레인"],
        middle: ["오렌지 블로섬"],
        base: ["머스크", "베티버", "앰버", "시더우드"],
      },
      noteColors: { top: "#F5C542", middle: "#F5E6E0", base: "#B08968" },
      aiReview:
        "밝은 시트러스가 머스크로 오래 이어져 '고급스러운 시트러스'라는 평. 여름 유니섹스로 인기가 높다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 29,
    perfume: {
      brandId: "le-labo",
      name: "리스 41",
      description:
        "재스민과 튜베로즈, 백합에 바닐라가 더해진 풍성하고 따뜻한 꽃향",
      detailDescription:
        "한여름 만개한 백합 정원의 풍성함을 그대로 담은 화려한 플로럴이다.\n" +
        "재스민과 백합의 진한 오프닝에 튜베로즈와 일랑일랑이 더해져 크리미하고 관능적인 꽃향이 피어난다.\n" +
        "바닐라와 머스크의 따뜻한 잔향이 우아하게 이어져 존재감 있는 플로럴을 찾는 이들에게 사랑받는다.",
      detailTitle: "화려함",
      image: "/assets/perfume/le-labo/lys-41.png",
      detailImages: [
        "/assets/perfume/le-labo/lys-41-d1.jpg",
        "/assets/perfume/le-labo/lys-41-d2.jpg",
        "/assets/perfume/le-labo/lys-41-d3.jpg",
      ],
      familyIds: ["floral", "oriental"],
      notes: {
        top: ["재스민", "백합"],
        middle: ["튜베로즈", "일랑일랑"],
        base: ["바닐라", "머스크", "우드"],
      },
      noteColors: { top: "#F5E6E0", middle: "#F0A6BE", base: "#E6CE9C" },
      aiReview:
        "풍성한 백합·튜베로즈에 바닐라가 더해져 '화려하고 관능적'이라는 평. 존재감 있는 플로럴을 찾는 이들에게 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 30,
    perfume: {
      brandId: "le-labo",
      name: "네롤리 36",
      description:
        "오렌지 블로섬과 만다린에 머스크가 어우러진 밝고 부드러운 향",
      detailDescription:
        "햇살 가득한 오렌지 꽃밭의 밝은 에너지를 담은 향수다.\n" +
        "네롤리와 오렌지 블로섬, 만다린이 어우러진 오프닝이 환하고 생기 있는 첫인상을 만든다.\n" +
        "머스크와 바닐라의 달콤하고 포근한 잔향이 부드럽게 이어져 남녀 모두 부담 없이 쓰기 좋은 데일리 향이다.",
      detailTitle: "명랑함",
      image: "/assets/perfume/le-labo/neroli-36.png",
      detailImages: [
        "/assets/perfume/le-labo/neroli-36-d1.jpg",
        "/assets/perfume/le-labo/neroli-36-d2.jpg",
        "/assets/perfume/le-labo/neroli-36-d3.jpg",
      ],
      familyIds: ["floral", "citrus"],
      notes: {
        top: ["네롤리", "오렌지 블로섬", "만다린"],
        middle: ["베르가못"],
        base: ["머스크", "바닐라"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F5C542", base: "#E6CE9C" },
      aiReview:
        "밝은 네롤리에 부드러운 바닐라 머스크가 더해져 '달콤하고 포근하다'는 평. 유니섹스 데일리로 무난하게 추천.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 이솝 ──────────────────────────
  {
    id: 31,
    perfume: {
      brandId: "aesop",
      name: "타싯",
      description: "유자와 바질, 베티버가 어우러진 싱그럽고 산뜻한 향",
      detailDescription:
        "고대 그리스의 안뜰에서 영감을 받은, 절제된 세련미가 돋보이는 향수다.\n" +
        "상쾌한 유자와 바질의 오프닝이 그린 노트의 푸릇함으로 이어지며 깨끗하고 지적인 무드를 만든다.\n" +
        "베티버의 드라이한 잔향이 담백하게 마무리되어 미니멀한 취향의 유니섹스 데일리로 잘 어울린다.",
      detailTitle: "절제미",
      image: "/assets/perfume/aesop/tacit.png",
      familyIds: ["citrus", "green"],
      notes: {
        top: ["유자", "바질"],
        middle: ["그린 노트"],
        base: ["베티버"],
      },
      noteColors: { top: "#F5C542", middle: "#7FC29B", base: "#52946B" },
      aiReview:
        "상쾌한 유자에 허브 그린이 더해져 '깨끗하고 세련됐다'는 평. 이솝 특유의 절제된 무드로 유니섹스 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 32,
    perfume: {
      brandId: "aesop",
      name: "카르스트",
      description:
        "차가운 바닷바람에 주니퍼와 커민이 더해진 선명하고 독특한 향",
      detailDescription:
        "바람에 깎인 석회암 해안, 카르스트 지형의 거칠고 선명한 공기를 담은 향수다.\n" +
        "해양 노트와 주니퍼의 차가운 오프닝에 커민과 스파이스가 더해져 흔치 않은 개성을 만들어 낸다.\n" +
        "우드와 베티버의 잔향이 단단하게 이어져 뻔한 아쿠아틱이 지겨워진 이들에게 신선한 선택지가 된다.",
      detailTitle: "개성",
      image: "/assets/perfume/aesop/karst.png",
      familyIds: ["aquatic", "spicy"],
      notes: {
        top: ["해양 노트", "주니퍼"],
        middle: ["커민", "스파이스"],
        base: ["우드", "베티버"],
      },
      noteColors: { top: "#7EC0E8", middle: "#D08159", base: "#9C6B4A" },
      aiReview:
        "짭짤한 해양감에 스파이시함이 더해져 '개성 강하다'는 평. 흔하지 않은 아쿠아틱을 찾는 마니아에게 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 33,
    perfume: {
      brandId: "aesop",
      name: "글룸",
      description:
        "미모사와 아이리스에 은은한 향신료가 더해진 부드럽고 몽환적인 향",
      detailDescription:
        "해질 무렵의 어스름한 빛을 뜻하는 이름처럼 몽환적인 무드의 플로럴이다.\n" +
        "사프란의 이국적인 오프닝을 지나 미모사와 아이리스, 수선화가 파우더리하게 겹겹이 피어난다.\n" +
        "우드와 스파이스의 잔향이 아련하게 남아 조용하지만 기억에 남는 개성을 원하는 이들에게 어울린다.",
      detailTitle: "몽환",
      image: "/assets/perfume/aesop/gloam.png",
      familyIds: ["floral", "powdery"],
      notes: {
        top: ["사프란"],
        middle: ["미모사", "아이리스", "수선화"],
        base: ["우드", "스파이스"],
      },
      noteColors: { top: "#D08159", middle: "#CDB9DE", base: "#9C6B4A" },
      aiReview:
        "사프란과 파우더리 플로럴이 '몽환적이고 고급스럽다'는 평. 독특하고 우아해 개성파에게 사랑받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 34,
    perfume: {
      brandId: "aesop",
      name: "마라케시 인텐스",
      description: "카다멈과 클로브, 샌들우드가 어우러진 따뜻하고 풍성한 향",
      detailDescription:
        "모로코 마라케시의 향신료 시장을 거니는 듯한 이국적이고 따뜻한 향이다.\n" +
        "카다멈과 베르가못의 알싸한 오프닝에 클로브와 장미, 재스민이 더해져 풍성한 레이어를 만든다.\n" +
        "샌들우드와 시더우드의 잔향이 포근하게 이어져 가을·겨울 유니섹스 향수로 꾸준히 사랑받는다.",
      detailTitle: "이국미",
      image: "/assets/perfume/aesop/marrakech-intense.png",
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["카다멈", "베르가못"],
        middle: ["클로브", "장미", "재스민"],
        base: ["샌들우드", "시더우드"],
      },
      noteColors: { top: "#D08159", middle: "#E27396", base: "#9C6B4A" },
      aiReview:
        "따뜻한 향신료에 우디가 더해져 '이국적이고 포근하다'는 평. 가을·겨울 유니섹스로 선호되는 스파이시 우디.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 35,
    perfume: {
      brandId: "aesop",
      name: "훨",
      description: "편백나무와 베티버, 인센스가 어우러진 고요하고 깊은 숲의 향",
      detailDescription:
        "일본의 오래된 편백나무 숲, 그 고요한 새벽 공기에서 영감을 받은 향수다.\n" +
        "사이프러스의 청명한 오프닝이 베티버의 흙내음으로 가라앉으며 명상적인 분위기를 자아낸다.\n" +
        "인센스와 프랑킨센스의 스모키한 잔향이 깊게 이어져 차분하고 사색적인 무드를 완성한다.",
      detailTitle: "고요",
      image: "/assets/perfume/aesop/hwyl.png",
      familyIds: ["woody", "green"],
      notes: {
        top: ["사이프러스"],
        middle: ["베티버"],
        base: ["인센스", "프랑킨센스"],
      },
      noteColors: { top: "#7FC29B", middle: "#52946B", base: "#8B7E6A" },
      aiReview:
        "스모키한 편백·인센스가 '고요하고 명상적'이라는 평. 차분한 우디를 찾는 이들에게 이솝 대표작으로 꼽힌다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 딥티크 ──────────────────────────
  {
    id: 36,
    perfume: {
      brandId: "diptyque",
      name: "오 데 상스",
      description:
        "비터 오렌지와 오렌지 블로섬에 주니퍼와 파촐리가 어우러진 선명하고 싱그러운 향",
      detailDescription:
        "'감각의 물'이라는 이름처럼 오렌지의 모든 면모를 입체적으로 풀어낸 향수다.\n" +
        "쌉싸름한 비터 오렌지와 안젤리카의 오프닝이 오렌지 블로섬과 주니퍼 베리의 싱그러움으로 이어진다.\n" +
        "파촐리의 잔향이 깊이를 더해 단순한 시트러스를 넘어선 세련된 완성도를 보여 준다.",
      detailTitle: "감각",
      image: "/assets/perfume/diptyque/eau-des-sens.png",
      detailImages: [
        "/assets/perfume/diptyque/eau-des-sens-d1.jpg",
        "/assets/perfume/diptyque/eau-des-sens-d2.jpg",
        "/assets/perfume/diptyque/eau-des-sens-d3.jpg",
      ],
      familyIds: ["citrus", "green"],
      notes: {
        top: ["비터 오렌지", "안젤리카"],
        middle: ["오렌지 블로섬", "주니퍼 베리"],
        base: ["파촐리"],
      },
      noteColors: { top: "#F5C542", middle: "#EFD9CE", base: "#9C6B4A" },
      aiReview:
        "쌉싸름한 비터 오렌지에 파촐리의 깊이가 더해져 '고급스러운 시트러스'라는 평. 유니섹스로 데일리 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 37,
    perfume: {
      brandId: "diptyque",
      name: "플뢰르 드 포",
      description:
        "포근한 화이트 머스크와 아이리스가 피부처럼 부드럽게 감싸는 은은한 향",
      detailDescription:
        "'피부의 꽃'이라는 이름 그대로 살결에 스며드는 듯한 은은한 머스크 향이다.\n" +
        "알데하이드와 베르가못의 깨끗한 오프닝이 아이리스와 암브레트의 파우더리함으로 부드럽게 이어진다.\n" +
        "머스크와 레더, 앰버의 잔향이 포근하게 감싸 가까이 다가온 사람에게만 은은하게 전해지는 매력이 있다.",
      detailTitle: "살결",
      image: "/assets/perfume/diptyque/fleur-de-peau.png",
      detailImages: [
        "/assets/perfume/diptyque/fleur-de-peau-d1.jpg",
        "/assets/perfume/diptyque/fleur-de-peau-d2.jpg",
        "/assets/perfume/diptyque/fleur-de-peau-d3.jpg",
      ],
      familyIds: ["musk", "powdery"],
      notes: {
        top: ["알데하이드", "베르가못"],
        middle: ["아이리스", "암브레트"],
        base: ["머스크", "레더", "앰버"],
      },
      noteColors: { top: "#E4D9C8", middle: "#CDB9DE", base: "#8B5E3C" },
      aiReview:
        "파우더리 아이리스와 머스크가 '살결 같은 포근함'이라는 평. 은은하고 고급스러워 유니섹스로 사랑받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 38,
    perfume: {
      brandId: "diptyque",
      name: "도손",
      description:
        "튜베로즈와 재스민의 풍성한 꽃향에 바닷바람의 청량함이 더해진 향",
      detailDescription:
        "베트남 도손 해변의 튜베로즈 향기를 어린 시절의 기억으로 풀어낸 향수다.\n" +
        "장미와 오렌지 플라워의 산뜻한 오프닝이 튜베로즈와 재스민의 풍성한 화이트 플로럴로 피어난다.\n" +
        "머스크와 벤조인의 잔향이 가볍게 마무리되어 무거운 튜베로즈가 부담스러웠던 이들도 여름 내내 즐기기 좋다.",
      detailTitle: "청초함",
      image: "/assets/perfume/diptyque/do-son.png",
      detailImages: [
        "/assets/perfume/diptyque/do-son-d1.jpg",
        "/assets/perfume/diptyque/do-son-d2.jpg",
        "/assets/perfume/diptyque/do-son-d3.jpg",
      ],
      familyIds: ["floral", "aquatic"],
      notes: {
        top: ["장미", "아프리칸 오렌지 플라워"],
        middle: ["튜베로즈", "재스민"],
        base: ["머스크", "벤조인", "핑크 페퍼"],
      },
      noteColors: { top: "#F0A6BE", middle: "#F5E6E0", base: "#E4D9C8" },
      aiReview:
        "무겁지 않고 청량한 튜베로즈가 '가벼운 화이트 플로럴'로 호평. 여름에도 부담 없다는 평이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 39,
    perfume: {
      brandId: "diptyque",
      name: "탐다오",
      description:
        "부드러운 샌들우드에 사이프러스와 은은한 향신료가 어우러진 차분한 향",
      detailDescription:
        "베트남 탐다오 고원의 샌들우드 숲에서 영감을 받은 딥티크의 대표 우디다.\n" +
        "사이프러스와 로즈우드의 오프닝을 지나 크리미한 샌들우드가 중심을 잡으며 부드럽게 퍼져 나간다.\n" +
        "앰버와 머스크의 잔향이 포근하게 이어져 명상하듯 차분한 하루를 만들어 주는 힐링 향수로 꼽힌다.",
      detailTitle: "편안함",
      image: "/assets/perfume/diptyque/tam-dao.png",
      detailImages: [
        "/assets/perfume/diptyque/tam-dao-d1.jpg",
        "/assets/perfume/diptyque/tam-dao-d2.jpg",
        "/assets/perfume/diptyque/tam-dao-d3.jpg",
      ],
      familyIds: ["woody", "spicy"],
      notes: {
        top: ["사이프러스", "로즈우드"],
        middle: ["샌들우드", "시더우드"],
        base: ["앰버", "머스크", "스파이스"],
      },
      noteColors: { top: "#7FC29B", middle: "#9C6B4A", base: "#C89B5C" },
      aiReview:
        "부드럽고 크리미한 샌들우드가 '따뜻하고 편안하다'는 평. 딥티크 대표 우디로 유니섹스 스테디셀러.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 40,
    perfume: {
      brandId: "diptyque",
      name: "로",
      description:
        "클로브와 시나몬에 꽃과 나무 향이 더해진 따뜻하고 고전적인 향",
      detailDescription:
        "중세의 카네이션 포푸리에서 영감을 받은 딥티크의 고전적인 스파이시 오리엔탈이다.\n" +
        "클로브와 시나몬의 알싸하고 따뜻한 오프닝이 장미와 제라늄의 클래식한 꽃향과 어우러진다.\n" +
        "샌들우드의 잔향이 단정하게 마무리되어 빈티지한 무드와 뚜렷한 개성을 원하는 이들에게 사랑받는다.",
      detailTitle: "고전미",
      image: "/assets/perfume/diptyque/leau.png",
      detailImages: [
        "/assets/perfume/diptyque/leau-d1.jpg",
        "/assets/perfume/diptyque/leau-d2.jpg",
        "/assets/perfume/diptyque/leau-d3.jpg",
      ],
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["클로브", "시나몬"],
        middle: ["장미", "제라늄"],
        base: ["샌들우드"],
      },
      noteColors: { top: "#C0563A", middle: "#E27396", base: "#9C6B4A" },
      aiReview:
        "진한 클로브·시나몬이 '고전적이고 개성 강하다'는 평. 스파이시 오리엔탈을 좋아하는 마니아층의 지지를 받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 샤넬 ──────────────────────────
  {
    id: 41,
    perfume: {
      brandId: "chanel",
      name: "샹스 오 탕드르",
      description:
        "재스민과 장미에 부드러운 화이트 머스크가 어우러진 맑고 사랑스러운 향",
      detailDescription:
        "분홍빛 행운을 담은 듯한 샤넬 샹스 라인의 가장 부드러운 버전이다.\n" +
        "자몽과 퀸스의 과즙 어린 오프닝이 재스민과 히아신스의 맑은 꽃향으로 사랑스럽게 이어진다.\n" +
        "화이트 머스크와 아이리스의 포근한 잔향이 은은하게 남아 봄날의 데일리 향수로 꾸준히 사랑받는다.",
      detailTitle: "다정함",
      image: "/assets/perfume/chanel/chance-eau-tendre.png",
      detailImages: [
        "/assets/perfume/chanel/chance-eau-tendre-d1.jpg",
        "/assets/perfume/chanel/chance-eau-tendre-d2.jpg",
        "/assets/perfume/chanel/chance-eau-tendre-d3.jpg",
      ],
      familyIds: ["floral", "musk"],
      notes: {
        top: ["자몽", "퀸스"],
        middle: ["재스민", "히아신스"],
        base: ["앰버", "화이트 머스크", "아이리스"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#E4D9C8" },
      aiReview:
        "프루티한 자몽에 화사한 플로럴이 '사랑스럽고 대중적'이라는 평. 여성 데일리로 꾸준히 사랑받는 스테디셀러.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 42,
    perfume: {
      brandId: "chanel",
      name: "블루 드 샤넬",
      description:
        "산뜻한 시트러스와 깊은 시더우드, 샌들우드가 어우러진 깔끔하고 세련된 향",
      detailDescription:
        "'남자 향수의 정석'으로 불리는, 실패 없는 우디 아로마틱의 대표작이다.\n" +
        "자몽과 레몬, 민트의 청량한 오프닝에 생강과 넛맥의 스파이시함이 세련된 긴장감을 더한다.\n" +
        "인센스와 시더우드, 샌들우드의 깊은 잔향이 오래 이어져 비즈니스와 캐주얼 어디에나 어울린다.",
      detailTitle: "신뢰감",
      image: "/assets/perfume/chanel/bleu-de-chanel.png",
      detailImages: [
        "/assets/perfume/chanel/bleu-de-chanel-d1.jpg",
        "/assets/perfume/chanel/bleu-de-chanel-d2.jpg",
        "/assets/perfume/chanel/bleu-de-chanel-d3.jpg",
      ],
      familyIds: ["woody", "citrus"],
      notes: {
        top: ["자몽", "레몬", "민트", "핑크 페퍼"],
        middle: ["생강", "넛맥", "재스민"],
        base: ["인센스", "베티버", "시더우드", "샌들우드"],
      },
      noteColors: { top: "#F5C542", middle: "#D08159", base: "#7A4E31" },
      aiReview:
        "청량한 시트러스에 우디의 깊이가 더해져 '남자 향수의 정석'이라는 평. 실패 없는 대중적 명작으로 압도적 지지.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 43,
    perfume: {
      brandId: "chanel",
      name: "코코 마드모아젤",
      description:
        "생기 있는 오렌지와 장미, 재스민에 파촐리가 더해진 화사하고 관능적인 향",
      detailDescription:
        "당당하고 자유로운 현대 여성을 그려낸 샤넬의 아이코닉한 향수다.\n" +
        "오렌지와 베르가못의 생기 넘치는 오프닝이 장미와 재스민의 우아한 꽃향으로 화사하게 이어진다.\n" +
        "파촐리와 바닐라, 화이트 머스크의 관능적인 잔향이 오래 남아 낮과 밤 어디서든 존재감을 발휘한다.",
      detailTitle: "당당함",
      image: "/assets/perfume/chanel/coco-mademoiselle.png",
      detailImages: [
        "/assets/perfume/chanel/coco-mademoiselle-d1.jpg",
        "/assets/perfume/chanel/coco-mademoiselle-d2.jpg",
        "/assets/perfume/chanel/coco-mademoiselle-d3.jpg",
      ],
      familyIds: ["oriental", "citrus"],
      notes: {
        top: ["오렌지", "베르가못", "자몽"],
        middle: ["장미", "재스민", "리치"],
        base: ["파촐리", "베티버", "바닐라", "화이트 머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#E27396", base: "#9C6B4A" },
      aiReview:
        "화사한 시트러스에 관능적인 파촐리가 더해져 '세련되고 당당하다'는 평. 여성 향수의 아이콘으로 선호도가 매우 높다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 44,
    perfume: {
      brandId: "chanel",
      name: "N°5 로",
      description:
        "밝은 시트러스와 장미, 재스민에 화이트 머스크가 부드럽게 이어지는 깨끗한 향",
      detailDescription:
        "전설의 N°5를 현대적으로 재해석한, 가볍고 투명한 알데하이드 플로럴이다.\n" +
        "레몬과 만다린의 반짝이는 오프닝이 장미와 재스민, 일랑일랑의 클래식한 부케로 이어진다.\n" +
        "시더우드와 화이트 머스크의 깨끗한 잔향이 산뜻하게 마무리되어 클래식 입문용으로도 손색이 없다.",
      detailTitle: "모던함",
      image: "/assets/perfume/chanel/no5-leau.png",
      detailImages: [
        "/assets/perfume/chanel/no5-leau-d1.jpg",
        "/assets/perfume/chanel/no5-leau-d2.jpg",
        "/assets/perfume/chanel/no5-leau-d3.jpg",
      ],
      familyIds: ["floral", "powdery"],
      notes: {
        top: ["레몬", "만다린", "알데하이드"],
        middle: ["장미", "재스민", "일랑일랑"],
        base: ["시더우드", "화이트 머스크"],
      },
      noteColors: { top: "#F7DC6F", middle: "#F0A6BE", base: "#E4D9C8" },
      aiReview:
        "고전 N°5보다 가볍고 깨끗해 '젊고 현대적'이라는 평. 알데하이드 플로럴 입문용으로도 자주 추천된다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 45,
    perfume: {
      brandId: "chanel",
      name: "샹스",
      description:
        "재스민과 핑크 페퍼, 파촐리가 어우러진 생기 있고 매혹적인 향",
      detailDescription:
        "'기회는 잡는 것'이라는 메시지를 담은 샹스 라인의 오리지널이다.\n" +
        "핑크 페퍼와 파인애플의 톡 쏘는 오프닝이 재스민과 아이리스의 화사함으로 생기 있게 이어진다.\n" +
        "파촐리와 앰버, 바닐라의 잔향이 풍성하게 퍼져 밝고 당찬 에너지를 온종일 유지해 준다.",
      detailTitle: "생기",
      image: "/assets/perfume/chanel/chance.png",
      detailImages: [
        "/assets/perfume/chanel/chance-d1.jpg",
        "/assets/perfume/chanel/chance-d2.jpg",
        "/assets/perfume/chanel/chance-d3.jpg",
      ],
      familyIds: ["floral", "spicy"],
      notes: {
        top: ["핑크 페퍼", "레몬", "파인애플"],
        middle: ["재스민", "아이리스"],
        base: ["파촐리", "베티버", "앰버", "바닐라"],
      },
      noteColors: { top: "#F5C542", middle: "#F0A6BE", base: "#C89B5C" },
      aiReview:
        "톡 쏘는 핑크 페퍼에 화사한 플로럴이 '생기 있고 화려하다'는 평. 확산력이 좋고 존재감 있다는 반응이 많다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },

  // ── 산타 마리아 노벨라 ──────────────────────────
  {
    id: 46,
    perfume: {
      brandId: "santa-maria-novella",
      name: "아쿠아 델라 레지나",
      description:
        "이탈리아 시트러스와 네롤리에 로즈메리와 라벤더가 더해진 산뜻하고 우아한 향",
      detailDescription:
        "16세기 카트린 드 메디치 왕비를 위해 조향된, 세계에서 가장 오래된 향수 중 하나다.\n" +
        "베르가못과 레몬, 네롤리의 클래식한 시트러스가 로즈메리와 라벤더의 허브향과 우아하게 어우러진다.\n" +
        "머스크의 담백한 잔향이 기품 있게 마무리되어 시대를 초월한 품격을 일상에서 느끼게 해 준다.",
      detailTitle: "품격",
      image: "/assets/perfume/santa-maria-novella/acqua-della-regina.png",
      detailImages: [
        "/assets/perfume/santa-maria-novella/acqua-della-regina-d1.jpg",
        "/assets/perfume/santa-maria-novella/acqua-della-regina-d2.jpg",
        "/assets/perfume/santa-maria-novella/acqua-della-regina-d3.jpg",
      ],
      familyIds: ["citrus", "green"],
      notes: {
        top: ["베르가못", "레몬", "네롤리"],
        middle: ["로즈메리", "라벤더", "오렌지 블로섬"],
        base: ["머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#9FA8DA", base: "#E4D9C8" },
      aiReview:
        "허브가 가미된 클래식 시트러스가 '우아하고 품격 있다'는 평. 세계에서 가장 오래된 향수 중 하나로 상징성이 크다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 47,
    perfume: {
      brandId: "santa-maria-novella",
      name: "아쿠아",
      description:
        "맑은 물결을 떠올리게 하는 연꽃과 프리지아에 부드러운 머스크가 이어지는 투명한 향",
      detailDescription:
        "맑은 샘물에 꽃잎이 떠 있는 듯한 투명하고 잔잔한 향수다.\n" +
        "베르가못과 아쿠아틱 노트의 시원한 오프닝이 연꽃과 프리지아의 여린 꽃향으로 부드럽게 이어진다.\n" +
        "머스크와 우드의 은은한 잔향이 가볍게 남아 계절을 가리지 않는 단정한 데일리 향으로 좋다.",
      detailTitle: "잔잔함",
      image: "/assets/perfume/santa-maria-novella/acqua.png",
      detailImages: [
        "/assets/perfume/santa-maria-novella/acqua-d1.jpg",
        "/assets/perfume/santa-maria-novella/acqua-d2.jpg",
        "/assets/perfume/santa-maria-novella/acqua-d3.jpg",
      ],
      familyIds: ["aquatic", "floral"],
      notes: {
        top: ["베르가못", "아쿠아틱 노트"],
        middle: ["연꽃", "프리지아"],
        base: ["머스크", "우드"],
      },
      noteColors: { top: "#7EC0E8", middle: "#F5E6E0", base: "#E4D9C8" },
      aiReview:
        "맑은 물빛 플로럴이 '깨끗하고 시원하다'는 평. 은은해서 계절 구애 없이 데일리로 쓰기 좋다는 반응.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 48,
    perfume: {
      brandId: "santa-maria-novella",
      name: "로사 노벨라",
      description:
        "풍성한 장미와 화이트 플라워에 은은한 향신료와 나무 향이 더해진 생기 있는 향",
      detailDescription:
        "피렌체 수도원 정원에서 갓 꺾어 온 장미를 연상시키는 정통 로즈 향수다.\n" +
        "베르가못의 산뜻한 오프닝 뒤로 생생한 장미와 화이트 플라워가 겹겹이 피어나며 중심을 이룬다.\n" +
        "스파이스와 우드, 머스크의 잔향이 달지 않게 마무리되어 클래식하고 고급스러운 장미를 찾는 이들에게 제격이다.",
      detailTitle: "격조",
      image: "/assets/perfume/santa-maria-novella/rosa-novella.png",
      detailImages: [
        "/assets/perfume/santa-maria-novella/rosa-novella-d1.jpg",
        "/assets/perfume/santa-maria-novella/rosa-novella-d2.jpg",
        "/assets/perfume/santa-maria-novella/rosa-novella-d3.jpg",
      ],
      familyIds: ["floral", "spicy"],
      notes: {
        top: ["베르가못"],
        middle: ["장미", "화이트 플라워"],
        base: ["스파이스", "우드", "머스크"],
      },
      noteColors: { top: "#F5C542", middle: "#E27396", base: "#9C6B4A" },
      aiReview:
        "생생한 로즈에 스파이시 우디가 더해져 '고급스러운 장미 향'이라는 평. 달지 않은 정통 로즈를 찾는 이들에게 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 49,
    perfume: {
      brandId: "santa-maria-novella",
      name: "리리스",
      description:
        "아이리스의 부드러운 파우더 향에 갈바넘과 네롤리가 더해진 맑고 세련된 향",
      detailDescription:
        "아이리스 뿌리의 서늘한 파우더리함을 정제된 감각으로 풀어낸 향수다.\n" +
        "갈바넘의 푸릇한 오프닝과 네롤리의 산뜻함이 아이리스의 우아한 분내음으로 자연스럽게 이어진다.\n" +
        "머스크와 파우더리 노트의 잔향이 차분하게 남아 단정하고 지적인 인상을 완성해 준다.",
      detailTitle: "단정함",
      image: "/assets/perfume/santa-maria-novella/liris.png",
      detailImages: [
        "/assets/perfume/santa-maria-novella/liris-d1.jpg",
        "/assets/perfume/santa-maria-novella/liris-d2.jpg",
        "/assets/perfume/santa-maria-novella/liris-d3.jpg",
      ],
      familyIds: ["powdery", "green"],
      notes: {
        top: ["갈바넘", "네롤리"],
        middle: ["아이리스"],
        base: ["머스크", "파우더리 노트"],
      },
      noteColors: { top: "#7FC29B", middle: "#CDB9DE", base: "#DCCFC0" },
      aiReview:
        "파우더리한 아이리스에 그린의 청량함이 더해져 '차분하고 세련됐다'는 평. 아이리스 애호가들에게 특히 호평.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 50,
    perfume: {
      brandId: "santa-maria-novella",
      name: "멜로그라노",
      description:
        "석류와 장미, 일랑일랑에 따뜻한 향신료와 머스크가 어우러진 깊고 고전적인 향",
      detailDescription:
        "석류를 뜻하는 이름처럼 피렌체의 가을 햇살과 과실의 깊이를 담은 브랜드의 상징작이다.\n" +
        "석류와 시트러스의 새콤한 오프닝이 장미와 일랑일랑, 카네이션의 클래식한 꽃향과 겹쳐진다.\n" +
        "머스크와 스파이스, 우드의 잔향이 고풍스럽게 이어져 오래도록 기억에 남는 개성을 선사한다.",
      detailTitle: "고풍",
      image: "/assets/perfume/santa-maria-novella/melograno.png",
      detailImages: [
        "/assets/perfume/santa-maria-novella/melograno-d1.jpg",
        "/assets/perfume/santa-maria-novella/melograno-d2.jpg",
        "/assets/perfume/santa-maria-novella/melograno-d3.jpg",
      ],
      familyIds: ["oriental", "spicy"],
      notes: {
        top: ["석류", "시트러스"],
        middle: ["장미", "일랑일랑", "카네이션"],
        base: ["머스크", "스파이스", "우드"],
      },
      noteColors: { top: "#D96A8A", middle: "#E27396", base: "#9C6B4A" },
      aiReview:
        "석류의 프루티함에 향신료 오리엔탈이 더해져 '깊고 고풍스럽다'는 평. 브랜드의 상징적 향으로 개성파에게 사랑받는다.",
    },
    likeCount: 0,
    isLiked: false,
    isBookmarked: false,
  },
];
