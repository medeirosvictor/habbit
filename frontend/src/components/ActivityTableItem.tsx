import { useMemo, useState, type FormEvent } from 'react'
import { type ActivityData } from '@/shared/types'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { EMOJIS } from '@/constants'
import PomodoroTimer from './PomodoroTimer'
import { useActivityContext } from '@/hooks/useActivityContext'

interface ActivityTableItemProps {
  activity: ActivityData
  isOpen: boolean
  setOpenDetailId: (id: number | null) => void
}

function ActivityTableItem({ activity, isOpen, setOpenDetailId }: ActivityTableItemProps) {
  const [formData, setFormData] = useState<ActivityData>(activity)
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
  } = formData
  const [pomodoroTimer, setPomodoroTimer] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<string>(completed ? EMOJIS.complete : EMOJIS.pending)
  const createdDate = useMemo(() => new Date(created_at), [created_at])
  const updatedDate = useMemo(() => new Date(last_updated), [last_updated])
  const { onDeleteActivity, onUpdateActivity } = useActivityContext()

  const toggleDetail = () => {
    if (isOpen)
      setOpenDetailId(null) // close
    else setOpenDetailId(activity.id) // open
  }

  const handleCompleteActivity = () => {
    if (isComplete === EMOJIS.pending) {
      setIsComplete(EMOJIS.complete)
    } else {
      setIsComplete(EMOJIS.pending)
    }
  }

  const handleDeleteActivity = () => {
    onDeleteActivity(id)
    setOpenDetailId(null)
  }

  const updateTimesCompleted = () => {
    const updatedTimesCompleted = completed ? (times_completed ?? 0) + 1 : (times_completed ?? 0)
    setFormData((prev) => ({ ...prev, times_completed: updatedTimesCompleted }))
  }

  const updateLastUpdated = () => {
    setFormData((prev) => ({ ...prev, last_updated: new Date() }))
  }

  const handleUpdateActivity = () => {
    updateTimesCompleted()
    updateLastUpdated()
    onUpdateActivity(formData)
  }

  const handleEditFormSubmit = (e: FormEvent) => {
    e.preventDefault()
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
      {/* Details Modal */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-1/2 z-50 flex items-center justify-center max-w-md mx-auto">
          <div className="bg-amber-50 border-1 rounded-lg p-6 w-full max-h-[80vh] overflow-y-auto shadow-ld">
            <div className="flex flex-col gap-3 mb-4">
              <form className="flex flex-col justify-center gap-3" onSubmit={handleEditFormSubmit}>
                <div className="flex justify-between">
                  <input
                    className="text-xl font-bold p-1"
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                  <button type="button" onClick={() => setOpenDetailId(null)}>
                    <XMarkIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                  </button>
                </div>
                <textarea
                  id="description"
                  defaultValue={description}
                  className="border p-1 shadow-md"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                ></textarea>
                <div className="flex justify-between">
                  <p>{is_habit ? 'Habit' : 'Make it a daily habit?'}</p>
                  <input
                    id="ishabit"
                    type="checkbox"
                    name="ishabit"
                    defaultChecked={is_habit}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, is_habit: e.target.checked }))
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p>{completed ? 'Done' : 'Not done yet'}</p>
                  <input
                    id="completed"
                    type="checkbox"
                    name="completed"
                    defaultChecked={completed}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, completed: e.target.checked }))
                    }
                  />
                </div>
                <p className="underline">{shared ? 'Shared' : 'Share with friends'}</p>
                <div>
                  <p>{`Completed ${times_completed ?? 0} times`} </p>
                  <p>created: {createdDate.toLocaleDateString()}</p>
                  <p>updated: {updatedDate.toLocaleDateString()}</p>
                </div>
              </form>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleUpdateActivity}
                className="cursor-pointer border-2 p-1 border-emerald-600 hover:text-white hover:bg-emerald-600"
              >
                save changes
              </button>
              <button
                type="button"
                onClick={handleDeleteActivity}
                className="cursor-pointer border-2 p-1 border-red-600 hover:text-white hover:bg-red-600"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ActivityTableItem
