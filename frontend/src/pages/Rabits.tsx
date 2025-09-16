import RabitTable from '@/components/RabitTable'
import { useRabitContext } from '@/hooks/useRabitContext'
import { get } from 'http'
import { useEffect } from 'react'

function Rabits() {
  const { onFetchRabits, getDoneNotHabitRabits, getNotDoneOrHabitRabits } = useRabitContext()

  useEffect(() => {
    onFetchRabits()
  }, [])

  return (
    <div id="rabits" className="flex flex-col max-w-[1060px] mx-auto gap-10">
      {/* All rabits */}
      <div>
        <h3 className="font-bold text-2xl mb-5"> your rabits </h3>
        <RabitTable rabits={getNotDoneOrHabitRabits()} isStaticTable={false} />
      </div>

      {/* archived? done + not habit? */}
      <div>
        <h3 className="font-bold text-2xl mb-5">completed \ archived</h3>
        {getDoneNotHabitRabits().length > 0 ? (
          <RabitTable rabits={getDoneNotHabitRabits()} isStaticTable={true} />
        ) : (
          <p>No completed rabits yet</p>
        )}
      </div>
    </div>
  )
}

export default Rabits
