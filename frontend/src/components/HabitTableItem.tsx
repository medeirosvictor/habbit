import { useState } from 'react'
import { type HabitData } from '@/shared/types'
import { EMOJIS } from '@/constants'
import PomodoroTimer from './PomodoroTimer'
import { useHabitContext } from '@/hooks/useHabitContext'

interface HabitTableItemProps {
  habit: HabitData
  currentHabitId: number | null
  setCurrentModalHabitId: (id: number | null) => void
}

function HabitTableItem({ habit, currentHabitId, setCurrentModalHabitId }: HabitTableItemProps) {
  const { title, is_habit, completed, id } = habit
  const [pomodoroTimer, setPomodoroTimer] = useState<boolean>(false)
  const statusEmoji = completed ? EMOJIS.complete : EMOJIS.pending

  const { onUpdateHabit } = useHabitContext()

  const toggleDetail = () => {
    if (currentHabitId === id) {
      setCurrentModalHabitId(null)
      return
    }
    setCurrentModalHabitId(id)
  }

  const handleCompleteHabit = () => {
    onUpdateHabit({} as HabitData, id)
  }

  return (
    <>
      <div className="flex justify-between border-b-1 last:border-b-0 p-2 h-[60px] items-center">
        <div
          className={`w-[250px] flex gap-1 items-center text-sm ${completed ? 'line-through' : ''}`}
        >
          <p>{title}</p>
          <p>{is_habit ? EMOJIS.habbit : ''}</p>
        </div>
        {pomodoroTimer && (
          <div>
            <PomodoroTimer />
          </div>
        )}
        <div>
          <ul className="flex gap-1">
            <li className="cursor-pointer" onClick={handleCompleteHabit}>
              {statusEmoji}
            </li>
            {!completed && (
              <li className="cursor-pointer" onClick={() => setPomodoroTimer(!pomodoroTimer)}>
                {EMOJIS.tomato}
              </li>
            )}
            <li className="cursor-pointer" onClick={toggleDetail}>
              {EMOJIS.details}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default HabitTableItem
