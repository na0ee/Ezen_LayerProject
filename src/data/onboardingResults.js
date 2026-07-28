import boldHero from "../assets/images/result/bold-signature/hero.png";
import boldGraph from "../assets/images/result/bold-signature/profile-graph.png";
import boldBlackberryBay from "../assets/images/result/bold-signature/blackberry-bay.png";
import boldOrpheon from "../assets/images/result/bold-signature/orpheon.png";
import boldMyslf from "../assets/images/result/bold-signature/myslf.png";
import softHero from "../assets/images/result/soft-wanderer/hero.png";
import softGraph from "../assets/images/result/soft-wanderer/profile-graph.png";
import softBlackberryBay from "../assets/images/result/soft-wanderer/blackberry-bay.png";
import softOrpheon from "../assets/images/result/soft-wanderer/orpheon.png";
import softMyslf from "../assets/images/result/soft-wanderer/myslf.png";
import whiteHero from "../assets/images/result/white-canvas/hero.png";
import whiteGraph from "../assets/images/result/white-canvas/profile-graph.png";
import whiteBlackberryBay from "../assets/images/result/white-canvas/blackberry-bay.png";
import whiteOrpheon from "../assets/images/result/white-canvas/orpheon.png";
import whiteMyslf from "../assets/images/result/white-canvas/myslf.png";
import dailyHero from "../assets/images/result/daily-basic/hero.png";
import dailyGraph from "../assets/images/result/daily-basic/profile-graph.png";
import dailyBlackberryBay from "../assets/images/result/daily-basic/blackberry-bay.png";
import dailyOrpheon from "../assets/images/result/daily-basic/orpheon.png";
import dailyMyslf from "../assets/images/result/daily-basic/myslf.png";
import moodHero from "../assets/images/result/mood-shifter/hero.png";
import moodGraph from "../assets/images/result/mood-shifter/profile-graph.png";
import moodBlackberryBay from "../assets/images/result/mood-shifter/blackberry-bay.png";
import moodOrpheon from "../assets/images/result/mood-shifter/orpheon.png";
import moodMyslf from "../assets/images/result/mood-shifter/myslf.png";
import layerHero from "../assets/images/result/layer-maximalist/hero.png";
import layerGraph from "../assets/images/result/layer-maximalist/profile-graph.png";
import layerBlackberryBay from "../assets/images/result/layer-maximalist/blackberry-bay.png";
import layerOrpheon from "../assets/images/result/layer-maximalist/orpheon.png";
import layerMyslf from "../assets/images/result/layer-maximalist/myslf.png";

const perfumes = (blackberryBay, orpheon, myslf) => [
  { name: "Blackberry & Bay Cologne", brand: "Jo Malone", image: blackberryBay },
  { name: "Orpheon", brand: "Diptyque", image: orpheon },
  { name: "Myslf", brand: "Yves Saint Laurent", image: myslf },
];

export const ONBOARDING_RESULTS = {
  "bold-signature": {
    heroImage: boldHero,
    heroAlt: "강렬한 시그니처 유형",
    koreanTitle: "강렬한 시그니처형",
    englishTitle: "Bold Signature",
    tags: ["#존재감", "#자신감", "#시그니처"],
    description: "존재감 있는 향 하나를 자신 있게 밀고 가는 타입",
    graphImage: boldGraph,
    graphAlt: "강렬한 시그니처 향수 취향 그래프",
    perfumes: perfumes(boldBlackberryBay, boldOrpheon, boldMyslf),
  },
  "soft-wanderer": {
    heroImage: softHero,
    heroAlt: "부드러운 탐험가 유형",
    koreanTitle: "부드러운 탐험가형",
    englishTitle: "Soft Wanderer",
    tags: ["#은은한", "#다양함", "#호기심"],
    description: "은은한 향들을 여러 개 시도하며 취향을 넓혀가는 타입",
    graphImage: softGraph,
    graphAlt: "부드러운 탐험가 향수 취향 그래프",
    graphImageClassName: "h-[120px] w-[157px]",
    perfumes: perfumes(softBlackberryBay, softOrpheon, softMyslf),
  },
  "white-canvas": {
    heroImage: whiteHero,
    heroAlt: "조용한 시그니처 유형",
    koreanTitle: "조용한 시그니처형",
    englishTitle: "White Canvas",
    tags: ["#은은한", "#한결같은", "#데일리"],
    description: "한 가지 향을 은은하게, 나만 아는 방식으로 오래 지키는 타입",
    graphImage: whiteGraph,
    graphAlt: "조용한 시그니처 향수 취향 그래프",
    graphImageClassName: "h-[120px] w-[131px]",
    perfumes: perfumes(whiteBlackberryBay, whiteOrpheon, whiteMyslf),
  },
  "daily-basic": {
    heroImage: dailyHero,
    heroAlt: "데일리 베이직 유형",
    koreanTitle: "데일리 베이직형",
    englishTitle: "Daily Basic",
    tags: ["#무난한", "#데일리", "#꾸준함"],
    description: "부담 없이 매일 쓸 수 있는 무난한 향을 꾸준히 선택하는 타입",
    graphImage: dailyGraph,
    graphAlt: "데일리 베이직 향수 취향 그래프",
    graphImageClassName: "h-[120px] w-[121px]",
    perfumes: perfumes(dailyBlackberryBay, dailyOrpheon, dailyMyslf),
  },
  "mood-shifter": {
    heroImage: moodHero,
    heroAlt: "무드 시프터 유형",
    koreanTitle: "무드 시프터형",
    englishTitle: "Mood Shifter",
    tags: ["#기분전환", "#다양함", "#자유로운"],
    description: "그날 기분에 따라 여러 무드의 향을 자유롭게 바꿔 쓰는 타입",
    graphImage: moodGraph,
    graphAlt: "무드 시프터 향수 취향 그래프",
    graphImageClassName: "h-[120px] w-[134px]",
    perfumes: perfumes(moodBlackberryBay, moodOrpheon, moodMyslf),
  },
  "layer-maximalist": {
    heroImage: layerHero,
    heroAlt: "레이어 맥시멀리스트 유형",
    koreanTitle: "레이어 맥시멀리스트형",
    englishTitle: "Layer Maximalist",
    tags: ["#레이어링", "#존재감", "#실험적"],
    description: "여러 향을 적극적으로 겹쳐서 나만의 조합을 실험하는 타입",
    graphImage: layerGraph,
    graphAlt: "레이어 맥시멀리스트 향수 취향 그래프",
    graphImageClassName: "h-[120px] w-[121px]",
    perfumes: perfumes(layerBlackberryBay, layerOrpheon, layerMyslf),
  },
};
