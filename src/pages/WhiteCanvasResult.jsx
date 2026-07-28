import { ResultTypePage } from '../components/common'
import heroImage from '../assets/images/result/white-canvas/hero.png'
import profileGraph from '../assets/images/result/white-canvas/profile-graph.png'
import blackberryBay from '../assets/images/result/white-canvas/blackberry-bay.png'
import orpheon from '../assets/images/result/white-canvas/orpheon.png'
import myslf from '../assets/images/result/white-canvas/myslf.png'

const perfumes = [
  { name: 'Blackberry & Bay Cologne', brand: 'Jo Malone', image: blackberryBay },
  { name: 'Orpheon', brand: 'Diptyque', image: orpheon },
  { name: 'Myslf', brand: 'Yves Saint Laurent', image: myslf },
]

export default function WhiteCanvasResult() {
  return (
    <ResultTypePage
      heroImage={heroImage}
      heroAlt="햇살이 비치는 흰 침구 위의 흰색 머그컵과 책"
      koreanTitle="순백의 캔버스형"
      englishTitle="White Canvas"
      tags={['# 깔끔한', '# 한결같은', '#데일리']}
      description="한 가지 향을 은은하게, 나만 아는 방식으로 오래 지켜요"
      graphImage={profileGraph}
      graphAlt="클래식하고 편안한 성향의 향수 취향 그래프"
      graphImageClassName="h-[120px] w-[131px]"
      perfumes={perfumes}
    />
  )
}
