// 월 달력 그리드 계산 — 주 단위 배열([[1~7일], [8~14일], ...])로 반환, 빈 칸은 null
export function getCalendarWeeks(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const leadingBlanks = (firstWeekday + 6) % 7;
  const totalCells = leadingBlanks + daysInMonth;
  const totalWeeks = Math.ceil(totalCells / 7);

  return Array.from({ length: totalWeeks }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const cellIndex = weekIndex * 7 + dayIndex;
      const day = cellIndex - leadingBlanks + 1;
      return day >= 1 && day <= daysInMonth ? day : null;
    }),
  );
}
