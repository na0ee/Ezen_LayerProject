import { ResultTypePage } from '../components/common'
import heroImage from '../assets/images/result/bold-signature/hero.png'
import profileGraph from '../assets/images/result/bold-signature/profile-graph.png'
import blackberryBay from '../assets/images/result/bold-signature/blackberry-bay.png'
import orpheon from '../assets/images/result/bold-signature/orpheon.png'
import myslf from '../assets/images/result/bold-signature/myslf.png'

const perfumes = [
  { name: 'Blackberry & Bay Cologne', brand: 'Jo Malone', image: blackberryBay },
  { name: 'Orpheon', brand: 'Diptyque', image: orpheon },
  { name: 'Myslf', brand: 'Yves Saint Laurent', image: myslf },
]

export default function BoldSignatureResult() {
  return (
    <ResultTypePage
      heroImage={heroImage}
      heroAlt="검은 천 위로 흐르는 골드 리퀴드"
      koreanTitle="강렬한 시그니처형"
      englishTitle="Bold signature"
      tags={['# 존재감', '# 자신감', '#시그니처']}
      description="존재감 있는 향을 하나 자신 있게 밀고 가요"
      graphImage={profileGraph}
      graphAlt="표현적이고 클래식한 성향이 강한 향수 취향 그래프"
      perfumes={perfumes}
    />
  )
}
