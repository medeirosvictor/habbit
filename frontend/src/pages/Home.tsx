import Activitites from '@/scenes/activitites'
import Shared from '@/scenes/shared'

type Props = {}

function Home({}: Props) {
  return (
    <div>
      <div className="app bg-gray-50 font-bold">
        <Activitites />
        <Shared />
      </div>
    </div>
  )
}

export default Home
