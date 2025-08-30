import Activitites from '@/scenes/activitites'
import Shared from '@/scenes/shared'

type Props = {}

function Home({}: Props) {
  return (
    <>
      <section className="">
        <Activitites />
      </section>
      <section>
        <Shared />
      </section>
    </>
  )
}

export default Home
