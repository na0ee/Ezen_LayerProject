import { ResultTypePage } from '../components/common'
import heroImage from '../assets/images/result/mood-shifter/hero.png'
import profileGraph from '../assets/images/result/mood-shifter/profile-graph.png'
import blackberryBay from '../assets/images/result/mood-shifter/blackberry-bay.png'
import orpheon from '../assets/images/result/mood-shifter/orpheon.png'
import myslf from '../assets/images/result/mood-shifter/myslf.png'

const perfumes = [
  { name: 'Blackberry & Bay Cologne', brand: 'Jo Malone', image: blackberryBay },
  { name: 'Orpheon', brand: 'Diptyque', image: orpheon },
  { name: 'Myslf', brand: 'Yves Saint Laurent', image: myslf },
]

export default function MoodShifterResult() {
  return (
    <ResultTypePage
      heroImage={heroImage}
      heroAlt="분홍빛과 푸른빛이 어우러진 투명한 오로라 오브제"
      koreanTitle="분위기 카멜레온형"
      englishTitle="Mood Shifter"
      tags={['# 기분전환', '# 다양함', '#자유로운']}
      description="그날 기분에 따라 여러 무드의 향을 자유롭게 바꿔 써요"
      graphImage={profileGraph}
      graphAlt="다양한 방향으로 자유롭게 퍼지는 향수 취향 그래프"
      graphImageClassName="h-[120px] w-[134px]"
      perfumes={perfumes}
    />
  )
}
