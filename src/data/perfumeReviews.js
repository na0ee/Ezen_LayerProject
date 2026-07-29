// 향수 리뷰 더미 데이터 생성 모듈 (백엔드 연동 전 임시).
// 향수 id를 시드로 조합해 같은 향수는 항상 같은 리뷰, 향수마다 다른 구성이 나온다.
// 리뷰 id 형식: "review-<향수id>-<순번>"

const reviewNicknames = [
  "예은티비",
  "향수덕후",
  "노트탐험가",
  "시트러스단",
  "무드컬렉터",
  "퍼퓸로그",
  "데일리센트",
  "윈터머스크",
  "향기수집가",
  "살구뭉치",
];

const reviewAvatars = [
  "/assets/recommend/yujin.png",
  "/assets/recommend/by_sana.png",
  "/assets/recommend/katarina.png",
  "/assets/recommend/yawn.png",
  "/assets/recommend/3an.png",
];

const reviewTimes = [
  "방금 전",
  "5분 전",
  "32분 전",
  "1시간 전",
  "3시간 전",
  "어제",
  "2일 전",
  "일주일 전",
];

const reviewContents = [
  {
    badge: "good",
    text: "포장 뜯자마자 뿌려봤는데 첫인상부터 좋았어요\n잔향이 은은하게 남아서 데일리로 쓰기 딱입니다",
  },
  {
    badge: "good",
    text: "매장에서 시향하고 바로 구매한 향수예요\n호불호가 갈릴 수 있지만 저한테는 인생향입니다",
  },
  {
    badge: "good",
    text: "선물용으로 샀다가 제가 쓰고 있어요\n계절 상관없이 무난하게 어울리는 향이라 만족합니다",
  },
  {
    badge: "good",
    text: "지속력이 생각보다 길어서 놀랐어요\n아침에 뿌리면 퇴근할 때까지 은은하게 남아있습니다",
  },
  {
    badge: "good",
    text: "흔하지 않은 향이라 뿌리고 나가면 무슨 향수냐고 꼭 물어봐요\n개성 있는 향 찾는 분들께 추천합니다",
  },
  {
    badge: "good",
    text: "차분하고 정돈된 느낌이라 출근할 때 자주 손이 가요\n과하지 않아서 사무실에서도 부담 없습니다",
  },
  {
    badge: "good",
    text: "첫 니치 향수로 입문했는데 후회 없습니다\n가격이 있지만 그만한 값을 하는 것 같아요",
  },
  {
    badge: "bad",
    text: "기대했던 향이랑은 조금 달랐어요\n저한테는 너무 무거워서 손이 잘 안 가네요",
  },
  {
    badge: "bad",
    text: "시향했을 때는 좋았는데 막상 뿌리니 지속력이 아쉬워요\n가격 생각하면 재구매는 고민될 것 같습니다",
  },
];

const commentTexts = [
  "저도 이거 쓰는데 완전 공감해요",
  "시향해보고 싶어지네요",
  "정보 감사합니다! 위시리스트에 담아둘게요",
  "오 저랑 취향이 비슷하시네요",
  "매장 어디서 시향하셨어요?",
  "잔향 궁금했는데 도움 됐어요",
  "지속력은 어느 정도인가요?",
  "선물용으로도 괜찮을까요?",
];

/** 리뷰 하나에 붙는 댓글 2~3개. 같은 리뷰면 항상 같은 결과가 나온다 */
export function buildComments(reviewId) {
  const seed = [...String(reviewId)].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  const count = 2 + (seed % 2);
  // 목록 길이와 서로소인 간격(3, 2)을 써야 index마다 다른 항목이 걸린다.
  // 예전 식은 index * 8 % 8 = 0이 되어 댓글 문구가 전부 같아졌다
  return Array.from({ length: count }, (_, index) => {
    const commentSeed = seed * 3 + index * 7;
    return {
      id: `${reviewId}-comment-${index}`,
      author:
        reviewNicknames[(seed + index * 3) % reviewNicknames.length],
      avatar: reviewAvatars[(seed + index * 2) % reviewAvatars.length],
      message: commentTexts[(seed + index * 3) % commentTexts.length],
      likes: ((commentSeed * 13) % 40) + 2,
      replies: (commentSeed * 5) % 15,
    };
  });
}

/** 향수 하나에 붙는 리뷰 3~5개. 같은 향수면 항상 같은 결과가 나온다 */
export function buildReviews(perfumeId) {
  const count = 3 + (perfumeId % 3);
  return Array.from({ length: count }, (_, index) => {
    const seed = perfumeId * 7 + index * 13;
    const content = reviewContents[(seed * 31 + index) % reviewContents.length];
    return {
      id: `review-${perfumeId}-${index}`,
      name: reviewNicknames[(seed * 17 + index * 5) % reviewNicknames.length],
      avatar: reviewAvatars[(seed * 11 + index * 3) % reviewAvatars.length],
      time: reviewTimes[(seed * 23 + index) % reviewTimes.length],
      badge: content.badge,
      text: content.text,
      likes: ((seed * 37) % 120) + 3,
      comments: (seed * 13) % 30,
    };
  });
}
