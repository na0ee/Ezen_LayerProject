import { useState } from "react";
import Category from "./pages/Category";
import Chatbot from "./pages/Chatbot";
import PerfumeDetail from "./pages/PerfumeDetail";
import SearchResult from "./pages/SearchResult";

// 라우터를 넣기 전까지 쓰는 임시 화면 전환기.
// 방문한 화면을 스택으로 쌓아서 뒤로가기를 지원한다.
// initial로 시작 화면을 바꿀 수 있다 (개발 중인 화면 확인용).
export default function Screens({ initial = "category" }) {
  const [stack, setStack] = useState([{ name: initial }]);
  const current = stack[stack.length - 1];

  // 새 화면은 항상 맨 위에서 시작한다 (이전 화면의 스크롤 위치가 남지 않도록)
  const push = (screen) => {
    window.scrollTo(0, 0);
    setStack((prev) => [...prev, screen]);
  };
  const back = () =>
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  if (current.name === "search") {
    return (
      <SearchResult
        query={current.query}
        onBack={back}
        onSelect={(perfume) => push({ name: "detail", perfume })}
      />
    );
  }

  if (current.name === "chatbot") {
    return (
      <Chatbot
        onBack={back}
        onSelectPerfume={(perfume) => push({ name: "detail", perfume })}
      />
    );
  }

  if (current.name === "detail") {
    return (
      <PerfumeDetail
        onBack={back}
        onSearch={() => push({ name: "category" })}
      />
    );
  }

  return (
    <Category
      onSearch={(query) => push({ name: "search", query })}
      // 향 계열·브랜드 칩도 그 이름으로 검색한 것과 같게 동작한다
      onSelect={(section, item) => push({ name: "search", query: item })}
    />
  );
}
