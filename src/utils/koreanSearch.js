// 한글 초성 검색 지원: "ㅂ" 입력 시 "불가리", "불리"처럼 초성이 일치하는 항목을 보여준다
const CHOSUNG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

const getChosung = (text) =>
  [...text]
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return char;
      return CHOSUNG[Math.floor(code / 588)];
    })
    .join("");

const isChosungOnly = (text) => text.length > 0 && [...text].every((char) => CHOSUNG.includes(char));

export const matchesQuery = (text, query) => {
  if (!query.trim()) return true;
  if (isChosungOnly(query)) return getChosung(text).includes(query);
  return text.toLowerCase().includes(query.trim().toLowerCase());
};
