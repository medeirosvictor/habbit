import { useState } from 'react'
import { type ActivityData } from '@/shared/types'
import { EMOJIS } from '@/constants'
import PomodoroTimer from './PomodoroTimer'
import { useActivityContext } from '@/hooks/useActivityContext'

interface ActivityTableItemProps {
  activity: ActivityData
  isOpen: boolean
  setOpenDetailId: (id: number | null) => void
  setCurrentModalActivityId: (id: number) => void
}

function ActivityTableItem({
  activity,
  isOpen,
  setOpenDetailId,
  setCurrentModalActivityId,
}: ActivityTableItemProps) {
  const { title, is_habit, completed, id } = activity
  const [pomodoroTimer, setPomodoroTimer] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<string>(completed ? EMOJIS.complete : EMOJIS.pending)
  const { onUpdateActivity } = useActivityContext()

  const toggleDetail = () => {
    if (isOpen) {
      setOpenDetailId(null)
    } else {
      setCurrentModalActivityId(id)
      setOpenDetailId(id)
    }
  }

  const handleCompleteActivity = () => {
    if (isComplete === EMOJIS.pending) {
      setIsComplete(EMOJIS.complete)
    } else {
      setIsComplete(EMOJIS.pending)
    }
    console.log('Updating activity as complete', id)
    onUpdateActivity({} as ActivityData, id)
  }

  return (
    <>
      <div className="flex justify-between border-b-1 p-2 h-[60px] items-center">
        <div className="w-[150px] flex gap-1 items-center">
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
              {isComplete}
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
