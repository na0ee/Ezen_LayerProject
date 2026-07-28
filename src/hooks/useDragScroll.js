import { useEffect, useRef } from "react";

// 가로 스크롤 목록을 마우스로 끌어서 움직인다.
// 모바일은 터치로 스크롤되지만 PC는 스크롤바를 숨겨둬서(no-scrollbar) 끌기가 필요하다.
// 반환한 ref를 overflow-x-auto 컨테이너에 걸면 된다.
export default function useDragScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const handlePointerDown = (event) => {
      if (event.pointerType !== "mouse") return;
      dragging = true;
      startX = event.clientX;
      startScrollLeft = el.scrollLeft;
      // 이미지 끌기·텍스트 선택이 끼어들지 않도록
      event.preventDefault();
      el.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!dragging) return;
      el.scrollLeft = startScrollLeft - (event.clientX - startX);
    };

    const stopDragging = (event) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerup", stopDragging);
    el.addEventListener("pointercancel", stopDragging);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", stopDragging);
      el.removeEventListener("pointercancel", stopDragging);
    };
  }, []);

  return ref;
}
