import { ResultTypePage } from '../components/common'
import heroImage from '../assets/images/result/layer-maximalist/hero.png'
import profileGraph from '../assets/images/result/layer-maximalist/profile-graph.png'
import blackberryBay from '../assets/images/result/layer-maximalist/blackberry-bay.png'
import orpheon from '../assets/images/result/layer-maximalist/orpheon.png'
import myslf from '../assets/images/result/layer-maximalist/myslf.png'

const perfumes = [
  { name: 'Blackberry & Bay Cologne', brand: 'Jo Malone', image: blackberryBay },
  { name: 'Orpheon', brand: 'Diptyque', image: orpheon },
  { name: 'Myslf', brand: 'Yves Saint Laurent', image: myslf },
]

export default function LayerMaximalistResult() {
  return (
    <ResultTypePage
      heroImage={heroImage}
      heroAlt="다양한 질감과 색상의 패브릭, 진주와 꽃이 겹쳐진 콜라주"
      koreanTitle="레이어 맥시멀리스트형"
      englishTitle="Layer Maximalist"
      tags={['# 존재감', '# 레이어링', '#실험적']}
      description="여러 향을 적극적으로 겹쳐서 나만의 조합을 실험해요"
      graphImage={profileGraph}
      graphAlt="여러 향이 층층이 겹쳐진 향수 취향 그래프"
      graphImageClassName="h-[120px] w-[121px]"
      perfumes={perfumes}
    />
  )
}
