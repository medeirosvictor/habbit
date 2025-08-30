import { useMemo, useState } from 'react'
import { type ActivityData } from '@/shared/types'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { EMOJIS } from '@/constants'
import PomodoroTimer from './PomodoroTimer'

interface ActivityTableItemProps {
  activity: ActivityData
}

function ActivityTableItem({ activity }: ActivityTableItemProps) {
  const {
    id,
    title,
    description,
    is_habit,
    completed,
    shared,
    created_at,
    last_updated,
    times_completed,
  } = activity
  const [pomodoroTimer, setPomodoroTimer] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<string>(completed ? EMOJIS.complete : EMOJIS.pending)

  const createdDate = useMemo(() => new Date(created_at), [created_at])
  const updatedDate = useMemo(() => new Date(last_updated), [last_updated])

  const handleCompleteActivity = () => {
    if (isComplete === EMOJIS.pending) {
      setIsComplete(EMOJIS.complete)
    } else {
      setIsComplete(EMOJIS.pending)
    }
  }

  const handlePomodoroThisActivity = () => {
    setPomodoroTimer(true)
  }

  const [isDetailToggled, setIsDetailToggled] = useState<boolean>(false)

  return (
    <>
      <div className="flex justify-between border-b-1 p-2">
        <div className="">
          <p>{title}</p>
          <p>{is_habit}</p>
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
            <li className="cursor-pointer" onClick={handlePomodoroThisActivity}>
              {EMOJIS.tomato}
            </li>
            <li className="cursor-pointer" onClick={() => setIsDetailToggled(!isDetailToggled)}>
              {EMOJIS.details}
            </li>
          </ul>
        </div>
      </div>
      {/* Details Modal */}
      {isDetailToggled && (
        <div className="fixed left-0 right-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={() => setIsDetailToggled(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="flex flex-col text-md gap-3">
              <textarea defaultValue={description} className="border p-1 shadow-md"></textarea>
              <p>{is_habit ? 'Habit' : 'Wanna make it a habit?'}</p>
              <p>created: {createdDate.toLocaleDateString()}</p>
              <p>updated: {updatedDate.toLocaleDateString()}</p>
              <p>Completed: {times_completed} times</p>
              <p>Today? {completed ? 'Yes' : 'No'}</p>
              <p>{shared ? 'Shared' : 'Not Shared'}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="cursor-pointer">Save Changes</button>
              <button className="cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActivityTableItem
