import { useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { BtnBig, BtnGo } from "../components/common";
import checkCircle from "../assets/icons/check-circle.svg";
import chevronGrey from "../assets/icons/chevron-right-grey.svg";
import q1None from "../assets/images/onboarding/q1-none.png";
import q1One from "../assets/images/onboarding/q1-1-2.png";
import q1Three from "../assets/images/onboarding/q1-3-5.png";
import q1Six from "../assets/images/onboarding/q1-6plus.png";
import q2Refresh from "../assets/images/onboarding/q2-refresh.png";
import q2Sleep from "../assets/images/onboarding/q2-sleep.png";
import q2Special from "../assets/images/onboarding/q2-special.png";
import q2Travel from "../assets/images/onboarding/q2-travel.png";
import q2Work from "../assets/images/onboarding/q2-work.png";
import q2Workout from "../assets/images/onboarding/q2-workout.png";
import q3Aquatic from "../assets/images/onboarding/q3-aquatic.png";
import q3Citrus from "../assets/images/onboarding/q3-citrus.png";
import q3Floral from "../assets/images/onboarding/q3-floral.png";
import q3Green from "../assets/images/onboarding/q3-green.png";
import q3Musk from "../assets/images/onboarding/q3-musk.png";
import q3Oriental from "../assets/images/onboarding/q3-oriental.png";
import q3Powdery from "../assets/images/onboarding/q3-powdery.png";
import q3Spicy from "../assets/images/onboarding/q3-spicy.png";
import q3Woody from "../assets/images/onboarding/q3-woody.png";
import q4Casual from "../assets/images/onboarding/q4-casual.png";
import q4Chic from "../assets/images/onboarding/q4-chic.png";
import q4Feminine from "../assets/images/onboarding/q4-feminine.png";
import q4Minimal from "../assets/images/onboarding/q4-minimal.png";
import q5Layering from "../assets/images/onboarding/q5-layering.png";
import q5Signature from "../assets/images/onboarding/q5-signature.png";
import { getOnboardingResultPath } from "../utils/onboardingScoring";
import { saveOnboardingResultType } from "../data/onboardingProfile";

// 피그마: 질문 페이지_Q1~Q5 (3312:24480, 3312:15050, 15103, 15167, 15212)
// 선택지 사진은 각 원/카드 노드를 @2x로 export한 것 (src/assets/images/onboarding/)
const QUESTIONS = [
  {
    title: "현재 보유한 향수는 몇병인가요?",
    sub: "당신의 향을 찾는 첫걸음이에요",
    multi: false,
    cols: 2,
    width: 130,
    height: 130,
    gapX: 12,
    gapY: 20,
    options: [
      { value: "none", label: "아직 없어요", img: q1None },
      { value: "1-2", label: "1~2개", img: q1One },
      { value: "3-5", label: "3~5개", img: q1Three },
      { value: "6+", label: "6개이상", img: q1Six },
    ],
  },
  {
    title: "어떤 순간에 향수를 뿌리시나요?",
    sub: "향을 더하는 그 순간을 알려주세요 (중복 선택 가능)",
    multi: true,
    cols: 3,
    width: 120,
    height: 120,
    gapX: 12,
    gapY: 20,
    options: [
      { value: "travel", label: "여행", img: q2Travel },
      { value: "sleep", label: "잠들기 전", img: q2Sleep },
      { value: "special", label: "특별한 날", img: q2Special },
      { value: "workout", label: "운동 후", img: q2Workout },
      { value: "work", label: "출근 / 학교", img: q2Work },
      { value: "refresh", label: "기분 전환", img: q2Refresh },
    ],
  },
  {
    title: "어떤 향에 끌리시나요?",
    sub: "평소 좋았던 향을 떠올려보세요 (중복 선택 가능)",
    multi: true,
    cols: 3,
    width: 100,
    height: 100,
    gapX: 12,
    gapY: 16,
    options: [
      { value: "floral", label: "플로럴", img: q3Floral },
      { value: "woody", label: "우디", img: q3Woody },
      { value: "aquatic", label: "아쿠아틱", img: q3Aquatic },
      { value: "citrus", label: "시트러스", img: q3Citrus },
      { value: "musk", label: "머스크", img: q3Musk },
      { value: "oriental", label: "오리엔탈", img: q3Oriental },
      { value: "powdery", label: "파우더리", img: q3Powdery },
      { value: "spicy", label: "스파이시", img: q3Spicy },
      { value: "green", label: "그린", img: q3Green },
    ],
  },
  {
    title: "당신을 표현하는 무드는?",
    sub: "평소 스타일을 떠올리며 골라주세요",
    multi: false,
    cols: 4,
    width: 90,
    height: 373,
    gapX: 10,
    gapY: 0,
    options: [
      { value: "minimal", label: "미니멀 · 모던", img: q4Minimal },
      { value: "chic", label: "시크 · 스트리트", img: q4Chic },
      { value: "feminine", label: "패미닌 · 로맨틱", img: q4Feminine },
      { value: "casual", label: "캐주얼 · 데일리", img: q4Casual },
    ],
  },
  {
    title: "당신이 선호하는 방법은?",
    sub: "평소에 향수를 어떻게 뿌리시나요?",
    multi: false,
    cols: 1,
    width: 140,
    height: 140,
    gapX: 0,
    gapY: 20,
    noWrapLabel: true,
    options: [
      { value: "signature", label: "한가지 향수만(시그니처)", img: q5Signature },
      { value: "layering", label: "여러 향수를 같이(레이어링)", img: q5Layering },
    ],
  },
];

const RESULT_STORAGE_KEY = "layer-onboarding-result-path";

function getRandomSelectedImages(answers) {
  const selectedImages = QUESTIONS.flatMap((question, questionIndex) => {
    const answer = answers[questionIndex + 1];
    const values = Array.isArray(answer) ? answer : [answer];

    return question.options
      .filter((option) => values.includes(option.value))
      .map((option) => option.img)
      .filter(Boolean);
  });

  const fallbackImages = QUESTIONS.flatMap((question) =>
    question.options.map((option) => option.img).filter(Boolean)
  );
  const candidates =
    selectedImages.length >= 3
      ? [...new Set(selectedImages)]
      : [...new Set([...selectedImages, ...fallbackImages])];

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[randomIndex]] = [
      candidates[randomIndex],
      candidates[index],
    ];
  }

  return candidates.slice(0, 3);
}

export default function OnboardingQuestion() {
  const { step: stepParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(() => location.state?.answers ?? {});
  const returnTo = location.state?.returnTo;

  const step = Number(stepParam);
  const question = QUESTIONS[step - 1];
  if (!question) return <Navigate to="/onboarding/1" replace />;

  const { multi, cols, width, height, gapX, gapY, noWrapLabel } = question;
  const answer = answers[step];

  const isPicked = (value) =>
    multi ? (answer ?? []).includes(value) : answer === value;

  const pick = (value) =>
    setAnswers((prev) => {
      let next;

      if (!multi) {
        next = { ...prev, [step]: value };
      } else {
        const current = prev[step] ?? [];
        next = {
          ...prev,
          [step]: current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      }

      return next;
    });

  const goNext = () => {
    if (step < QUESTIONS.length) {
      navigate(`/onboarding/${step + 1}`, {
        state: { answers, returnTo },
      });
      return;
    }

    const resultPath = getOnboardingResultPath(answers);
    saveOnboardingResultType(resultPath.replace("/result/", ""));
    sessionStorage.setItem(RESULT_STORAGE_KEY, resultPath);

    navigate("/onboarding/loading", {
      state: {
        images: getRandomSelectedImages(answers),
        resultPath,
      },
    });
  };

  const goBack = () => {
    if (step === 1) {
      navigate(returnTo ?? "/profile");
      return;
    }

    navigate(`/onboarding/${step - 1}`, {
      state: { answers, returnTo },
    });
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background pb-20">
      {/* slideindicater */}
      <div className="h-0.5 w-full bg-light-grey">
        <div
          className="h-0.5 bg-point-orange transition-[width] duration-500 ease-out"
          style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="mt-2.5 flex h-[18px] items-center justify-between px-2.5">
        {/* 뒤로가기 — 피그마에서 btn/more를 좌우 반전한 인스턴스 */}
        <button type="button" onClick={goBack} className="flex items-center gap-1.5">
          <img src={chevronGrey} alt="" className="size-[18px] rotate-180" />
          <span className="text-body-regular-14 text-grey">뒤로가기</span>
        </button>
        <BtnGo
          variant="more"
          onClick={() => navigate("/onboarding/skip")}
        >
          건너뛰기
        </BtnGo>
      </div>

      {/* 타이틀 블록은 106px 고정 — 문항마다 제목 높이가 달라도 선택지가 같은 y에 오도록 */}
      <div className="flex flex-1 flex-col items-center justify-center py-8">
      <div className="flex h-[106px] flex-col items-center gap-2.5 px-5">
        <h1 className="text-center text-title-semibold-24 text-offblack">
          {question.title}
        </h1>
        <p className="text-center text-body-regular-14 text-grey">{question.sub}</p>
      </div>

      <div
        className="grid self-center"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${width}px)`,
          columnGap: `${gapX}px`,
          rowGap: `${gapY}px`,
        }}
      >
        {question.options.map(({ value, label, img }) => {
          const picked = isPicked(value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={picked}
              onClick={() => pick(value)}
              className="group relative flex flex-col items-center gap-2.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span
                className={`relative block overflow-hidden rounded-full ${
                  img ? "bg-offblack" : "bg-light-grey"
                }`}
                style={{ width, height }}
              >
                {img && (
                  <img
                    src={img}
                    alt=""
                    className={`size-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      picked
                        ? "scale-105 group-hover:scale-110"
                        : "scale-100 group-hover:scale-110"
                    }`}
                  />
                )}
                {picked && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-point-orange"
                  />
                )}
              </span>
              <span
                className={`text-center text-body-medium-14 text-offblack ${
                  noWrapLabel ? "whitespace-nowrap" : ""
                }`}
                style={noWrapLabel ? undefined : { width }}
              >
                {label}
              </span>
              {picked && (
                <img
                  src={checkCircle}
                  alt=""
                  className={`onboarding-check-pop absolute size-9 ${
                    step === 3 || step === 4
                      ? "-right-1 -top-1"
                      : "right-0 top-0"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      </div>

      <div className="px-5">
        <BtnBig
          disabled={multi ? !answer?.length : !answer}
          onClick={goNext}
        >
          다음
        </BtnBig>
      </div>
    </div>
  );
}
