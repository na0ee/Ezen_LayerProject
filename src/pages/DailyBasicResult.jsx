import { ResultTypePage } from '../components/common'
import heroImage from '../assets/images/result/daily-basic/hero.png'
import profileGraph from '../assets/images/result/daily-basic/profile-graph.png'
import blackberryBay from '../assets/images/result/daily-basic/blackberry-bay.png'
import orpheon from '../assets/images/result/daily-basic/orpheon.png'
import myslf from '../assets/images/result/daily-basic/myslf.png'

const perfumes = [
  { name: 'Blackberry & Bay Cologne', brand: 'Jo Malone', image: blackberryBay },
  { name: 'Orpheon', brand: 'Diptyque', image: orpheon },
  { name: 'Myslf', brand: 'Yves Saint Laurent', image: myslf },
]

export default function DailyBasicResult() {
  return (
    <ResultTypePage
      heroImage={heroImage}
      heroAlt="햇살이 비치는 테이블 위의 물잔과 반으로 자른 자몽"
      koreanTitle="깔끔한 기본형"
      englishTitle="Daily Basic"
      tags={['# 존재감', '# 가벼운', '#데일리']}
      description="부담 없이 매일 쓸 수 있는 향을 꾸준히 선택해요"
      graphImage={profileGraph}
      graphAlt="편안함을 중심으로 균형 잡힌 향수 취향 그래프"
      graphImageClassName="h-[120px] w-[121px]"
      perfumes={perfumes}
    />
  )
}
