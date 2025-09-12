import { useState } from 'react'
import { type ActivityData } from '@/shared/types'
import { EMOJIS } from '@/constants'
import PomodoroTimer from './PomodoroTimer'
import { useActivityContext } from '@/hooks/useActivityContext'

interface ActivityTableItemProps {
  activity: ActivityData
  currentActivityId: number | null
  setCurrentModalActivityId: (id: number | null) => void
}

function ActivityTableItem({
  activity,
  currentActivityId,
  setCurrentModalActivityId,
}: ActivityTableItemProps) {
  const { title, is_habit, completed, id } = activity
  const [pomodoroTimer, setPomodoroTimer] = useState<boolean>(false)
  const statusEmoji = completed ? EMOJIS.complete : EMOJIS.pending

  const { onUpdateActivity } = useActivityContext()

  const toggleDetail = () => {
    if (currentActivityId === id) {
      setCurrentModalActivityId(null)
      return
    }
    setCurrentModalActivityId(id)
  }

  const handleCompleteActivity = () => {
    onUpdateActivity({} as ActivityData, id)
  }

  return (
    <>
      <div className="flex justify-between border-b-1 p-2 h-[60px] items-center">
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
            <li className="cursor-pointer" onClick={handleCompleteActivity}>
              {statusEmoji}
            </li>
            <li className="cursor-pointer" onClick={() => setPomodoroTimer(!pomodoroTimer)}>
              {EMOJIS.tomato}
            </li>
            <li className="cursor-pointer" onClick={toggleDetail}>
              {EMOJIS.details}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ActivityTableItem
