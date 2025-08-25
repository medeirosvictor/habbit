import type { ActivityData } from '@/shared/types'
import { useState, type FormEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface AddActivityFormProps {
  setActivities: (activities: Array<ActivityData>) => void
}

function AddActivityForm({ setActivities }: AddActivityFormProps) {
  const [formData, setFormData] = useState<ActivityData>({
    id: '',
    title: '',
    description: '',
    coverImage: '',
    altImage: '',
    isHabit: false,
    cost: 0,
    meta: {
      hasBeenCompletedToday: false,
      dateCreated: '',
      dateLastUpdated: '',
      numberOfTimesCompleted: 0,
      shared: false,
    },
  })
  const { title } = formData

  const handleAddActivity = (e: FormEvent) => {
    e.preventDefault()
    if (!title) return

    const newActivity = {
      ...formData,
      id: uuidv4(),
      title,
    }

    setActivities((prev) => [...prev, newActivity])
    setFormData((prev) => ({ ...formData, title: '', id: '' }))
  }

  return (
    <div>
      <form onSubmit={handleAddActivity}>
        <input
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full focus:border-0 p-2"
          type="text"
          placeholder="quick add a todo"
        />
      </form>
    </div>
  )
}

export default AddActivityForm
