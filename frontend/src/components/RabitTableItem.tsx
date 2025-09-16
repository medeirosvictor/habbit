import { useState } from 'react'
import { type RabitData } from '@/shared/types'
import { EMOJIS } from '@/constants'
import PomodoroTimer from './PomodoroTimer'
import { useRabitContext } from '@/hooks/useRabitContext'

interface RabitTableItemProps {
  rabit: RabitData
  currentRabitId: number | null
  setCurrentModalRabitId: (id: number | null) => void
}

function RabitTableItem({ rabit, currentRabitId, setCurrentModalRabitId }: RabitTableItemProps) {
  const { title, is_habit, completed, id } = rabit
  const [pomodoroTimer, setPomodoroTimer] = useState<boolean>(false)
  const statusEmoji = completed ? EMOJIS.complete : EMOJIS.pending

  const { onUpdateRabit } = useRabitContext()

  const toggleDetail = () => {
    if (currentRabitId === id) {
      setCurrentModalRabitId(null)
      return
    }
    setCurrentModalRabitId(id)
  }

  const handleCompleteRabit = () => {
    onUpdateRabit({} as RabitData, id)
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
            <li className="cursor-pointer" onClick={handleCompleteRabit}>
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

export default RabitTableItem
