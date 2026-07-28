import { useState } from "react";
import { allPerfumes } from "./data/perfumeUtils";
import Category from "./pages/Category";
import Chatbot from "./pages/Chatbot";
import PerfumeDetail from "./pages/PerfumeDetail";
import SearchResult from "./pages/SearchResult";

// 내가 만든 화면 묶음. 라우터 정리가 끝나면 App.jsx의 Route로 옮기고 이 파일은 지운다.
const SCREENS = [
  { id: "category", label: "카테고리" },
  { id: "search", label: "검색결과" },
  { id: "detail", label: "향수 상세" },
  { id: "chatbot", label: "챗봇" },
];

export default function Preview() {
  // 방문한 화면을 쌓아서 뒤로가기를 지원한다 (첫 화면에서는 아무 일도 하지 않음)
  const [stack, setStack] = useState(["category"]);
  const [query, setQuery] = useState("");
  // 상세 화면에서 보여줄 향수 (검색결과·챗봇·관련 향수에서 고른 것)
  const [selected, setSelected] = useState(allPerfumes[0]);

  const openDetail = (item) => {
    if (item) setSelected(item);
    go("detail");
  };

  const screen = stack[stack.length - 1];
  const go = (next) => {
    window.scrollTo(0, 0);
    setStack((prev) => [...prev, next]);
  };
  const back = () => {
    window.scrollTo(0, 0);
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };
  const setScreen = (next) => {
    window.scrollTo(0, 0);
    setStack([next]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 flex items-center gap-2 bg-offblack px-4 py-2">
        <span className="text-caption-regular-12 text-offwhite">미리보기</span>
        {SCREENS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setScreen(item.id)}
            className={`rounded-full px-3 py-1 text-caption-regular-12 ${
              screen === item.id
                ? "bg-offwhite text-offblack"
                : "bg-offblack70 text-offwhite"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {screen === "category" && (
        <Category
          onBack={back}
          onSearch={(value) => {
            setQuery(value);
            go("search");
          }}
          onSelect={(_, item) => {
            setQuery(item);
            go("search");
          }}
        />
      )}
      {screen === "search" && (
        <SearchResult query={query} onBack={back} onSelect={openDetail} />
      )}
      {screen === "detail" && (
        <PerfumeDetail
          item={selected}
          onBack={back}
          onSearch={() => go("category")}
          onSelectRelated={openDetail}
        />
      )}
      {screen === "chatbot" && (
        <Chatbot onBack={back} onSelectPerfume={openDetail} />
      )}
    </div>
  );
}
