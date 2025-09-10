import { useMemo, useState, useEffect, type FormEvent } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { type ActivityData } from '@/shared/types'
import { useActivityContext } from '@/hooks/useActivityContext'

type ActivityDetailModalProps = {
  currentActivityId: number
  setCurrentModalActivityId: (id: number | null) => void
}

const ActivityDetailModal = ({
  currentActivityId,
  setCurrentModalActivityId,
}: ActivityDetailModalProps) => {
  const { onFetchActivity, onDeleteActivity, onUpdateActivity } = useActivityContext()
  const [formData, setFormData] = useState<ActivityData | null>(null)

  useEffect(() => {
    async function fetchActivity() {
      const data = await onFetchActivity(currentActivityId)
      setFormData(data ?? null)
    }
    fetchActivity()
  }, [currentActivityId])

  const createdDate = useMemo(
    () => (formData ? new Date(formData.created_at) : new Date()),
    [formData],
  )
  const updatedDate = useMemo(
    () => (formData ? new Date(formData.last_updated) : new Date()),
    [formData],
  )

  if (!formData) {
    return (
      <div className="absolute left-0 right-0 top-1/4 z-50 flex items-center justify-center max-w-md mx-auto">
        <div className="bg-amber-50 border-1 rounded-lg p-6 w-full max-h-[80vh] overflow-y-auto shadow-ld">
          <div className="flex flex-col gap-3 mb-4">Loading...</div>
        </div>
      </div>
    )
  }

  const { id, title, description, is_habit, completed, shared, times_completed } = formData

  const updateLastUpdated = () => {
    setFormData((prev) => (prev ? { ...prev, last_updated: new Date() } : prev))
  }

  const handleUpdateActivity = () => {
    updateLastUpdated()
    setTimeout(() => {
      setFormData((prev) => {
        if (prev) onUpdateActivity(prev)
        return prev
      })
    }, 0)
  }

  const handleEditFormSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const handleDeleteActivity = () => {
    onDeleteActivity(id)
    setCurrentModalActivityId(null)
  }

  return (
    <div className="absolute left-0 right-0 top-1/4 z-50 flex items-center justify-center max-w-md mx-auto">
      <div className="bg-amber-50 border-1 rounded-lg p-6 w-full max-h-[80vh] overflow-y-auto shadow-ld">
        <div className="flex flex-col gap-3 mb-4">
          <form className="flex flex-col justify-center gap-3" onSubmit={handleEditFormSubmit}>
            <div className="flex justify-between">
              <input
                className="text-xl font-bold p-1 w-[300px] overflow-ellipsis focus-within:text-sm"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) =>
                  setFormData((prev) => (prev ? { ...prev, title: e.target.value } : prev))
                }
              />
              <button type="button" onClick={() => setCurrentModalActivityId(null)}>
                <XMarkIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
              </button>
            </div>
            <textarea
              id="description"
              value={description ?? ''}
              className="border p-1 shadow-md"
              onChange={(e) =>
                setFormData((prev) => (prev ? { ...prev, description: e.target.value } : prev))
              }
            ></textarea>
            <div className="flex justify-between">
              <p>{is_habit ? 'Habit' : 'Make it a daily habit?'}</p>
              <input
                id="ishabit"
                type="checkbox"
                name="ishabit"
                checked={is_habit}
                onChange={(e) =>
                  setFormData((prev) => (prev ? { ...prev, is_habit: e.target.checked } : prev))
                }
              />
            </div>
            <div className="flex justify-between">
              <p>{completed ? 'Done' : 'Not done yet'}</p>
              <input
                id="completed"
                type="checkbox"
                name="completed"
                checked={completed}
                onChange={(e) =>
                  setFormData((prev) => (prev ? { ...prev, completed: e.target.checked } : prev))
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
  )
}

export default ActivityDetailModal
