import { ResultTypePage } from '../components/common'
import heroImage from '../assets/images/result/soft-wanderer/hero.png'
import profileGraph from '../assets/images/result/soft-wanderer/profile-graph.png'
import blackberryBay from '../assets/images/result/soft-wanderer/blackberry-bay.png'
import orpheon from '../assets/images/result/soft-wanderer/orpheon.png'
import myslf from '../assets/images/result/soft-wanderer/myslf.png'

const perfumes = [
  { name: 'Blackberry & Bay Cologne', brand: 'Jo Malone', image: blackberryBay },
  { name: 'Orpheon', brand: 'Diptyque', image: orpheon },
  { name: 'Myslf', brand: 'Yves Saint Laurent', image: myslf },
]

export default function SoftWandererResult() {
  return (
    <ResultTypePage
      heroImage={heroImage}
      heroAlt="분홍빛과 푸른빛이 어우러진 잔잔한 바다의 노을"
      koreanTitle="부드러운 탐험가형"
      englishTitle="Soft Wanderer"
      tags={['# 은은한', '# 다양한', '#호기심']}
      description="은은한 향들을 여러 개 시도하며 취향을 넓혀가요"
      graphImage={profileGraph}
      graphAlt="편안하고 독특한 성향의 향수 취향 그래프"
      graphImageClassName="h-[120px] w-[157px]"
      perfumes={perfumes}
    />
  )
}
