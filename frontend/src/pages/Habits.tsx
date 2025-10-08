import HabitTable from '@/components/HabitTable'
import { useHabitContext } from '@/hooks/useHabitContext'
import { useEffect } from 'react'

function Habits() {
  const { onFetchHabits, getDoneNotHabitHabits, getNotDoneOrHabitHabits } = useHabitContext()

  useEffect(() => {
    onFetchHabits()
  }, [])

  return (
    <div id="habits" className="flex flex-col max-w-[1060px] mx-auto gap-10">
      {/* All habits */}
      <div>
        <h3 className="font-bold text-2xl mb-5"> your habits </h3>
        <HabitTable habits={getNotDoneOrHabitHabits()} isStaticTable={false} />
      </div>

      {/* archived? done + not habit? */}
      <div>
        <h3 className="font-bold text-2xl mb-5">completed \ archived</h3>
        {getDoneNotHabitHabits().length > 0 ? (
          <HabitTable habits={getDoneNotHabitHabits()} isStaticTable={true} />
        ) : (
          <p>No completed habits yet</p>
        )}
      </div>
    </div>
  )
}

export default Habits
