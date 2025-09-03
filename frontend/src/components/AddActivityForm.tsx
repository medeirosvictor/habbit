import type { ActivityData } from '@/shared/types'
import { useState, type FormEvent, type Dispatch, type SetStateAction } from 'react'
import api from '@/api'

interface AddActivityFormProps {
  setActivities: Dispatch<SetStateAction<ActivityData[]>>
}

function AddActivityForm({ setActivities }: AddActivityFormProps) {
  const [title, setTitle] = useState<string>('')

  const newActivity: ActivityData = {
    id: Date.now(),
    title,
    description: '',
    is_habit: false,
    completed: false,
    shared: false,
    created_at: new Date(),
    last_updated: new Date(),
    times_completed: 0,
  }

  const handleAddActivity = (e: FormEvent) => {
    e.preventDefault()
    if (!title) return

    api
      .post('/api/activities/', { title })
      .then((res) => {
        if (res.status === 201) {
          console.log('activity created')
          setActivities((prev) => [...prev, newActivity])
        } else console.log('failed to create')
      })
      .catch((err) => console.log(err))

    setTitle('')
  }

  return (
    <div>
      <form onSubmit={handleAddActivity}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full focus:border-0 p-2"
          type="text"
          placeholder="add a new activity 🐇"
        />
      </form>
    </div>
  )
}

export default AddActivityForm
