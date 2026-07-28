// src/data/storeLocations.js
//
// 브랜드별 오프라인 매장 정보. brands.js의 id를 키로 사용.
// 매장이 없는 브랜드는 이 객체에 항목을 추가하지 않음 (LocCard 미표시 처리).

export const storeLocations = {
  "maison-margiela": {
    name: "Maison Margiela The Hyundai Seoul",
    address: "서울특별시 영등포구 여의대로 108, 더현대 서울 2층",
    hours: "월–목 10:30–20:00 / 금–일 10:30–20:30",
    phone: "02-3277-0297",
    url: "https://www.maisonmargiela.com/ko-kr/",
  },
  bvlgari: {
    name: "BVLGARI PARFUMS 롯데백화점 본점",
    address: "서울특별시 중구 남대문로 81, 롯데백화점 본점 1층",
    hours: "월–목 10:30–20:00 / 금–일 10:30–20:30",
    phone: "02-772-3059",
    url: "https://www.bulgari.com/ko-kr/fragrances.html",
  },
  buly: {
    name: "오피신 유니버셀 불리 신세계백화점 강남점",
    address: "서울특별시 서초구 신반포로 176, 신세계백화점 강남점 B1층",
    hours: "평일 10:30–20:00 / 주말 10:30–20:30",
    phone: "02-3479-6045",
    url: "https://buly1803.com/",
  },
  "jo-malone": {
    name: "조 말론 런던 신세계백화점 강남점",
    address: "서울특별시 서초구 신반포로 176, 신세계백화점 강남점 1층",
    hours: "월–목 10:30–20:00 / 금–일 10:30–20:30",
    phone: "02-3479-1555",
    url: "https://www.jomalone.co.kr/",
  },
  byredo: {
    name: "BYREDO 신세계백화점 강남점",
    address: "서울특별시 서초구 신반포로 176, 신세계백화점 강남점",
    hours: "월–목 10:30–20:00 / 금–일 10:30–20:30",
    phone: "02-3479-1704",
    url: "https://www.byredo.com/ko_kr/",
  },
  "le-labo": {
    name: "르 라보 가로수길 부티크",
    address: "서울특별시 강남구 압구정로10길 28",
    hours: "매일 11:00–21:00",
    phone: "02-541-7945",
    url: "https://www.lelabofragrances.co.kr/",
  },
  aesop: {
    name: "이솝 가로수길",
    address: "서울특별시 강남구 가로수길 54",
    hours: "매일 11:00–21:00",
    phone: "02-512-1987",
    url: "https://kr.aesop.com/",
  },
  diptyque: {
    name: "딥티크 가로수길 부티크",
    address: "서울특별시 강남구 가로수길 15",
    hours: "매일 11:00–21:00",
    phone: "0507-1391-7494",
    url: "https://www.diptyqueparis.com/",
  },
  chanel: {
    name: "샤넬 프레그런스 앤 뷰티 신세계백화점 강남점",
    address: "서울특별시 서초구 신반포로 176, 신세계백화점 강남점",
    hours: "월–목 10:30–20:00 / 금–일 10:30–20:30",
    phone: "02-3479-1704",
    url: "https://www.chanel.com/kr/fragrance/",
  },
  "santa-maria-novella": {
    name: "산타 마리아 노벨라",
    address: "서울 강남구 봉은사로 524",
    hours: "10:30–22:00",
    phone: "02-6002-3133",
    url: "https://eu.smnovella.com/",
  },
};
