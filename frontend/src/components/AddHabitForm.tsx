import { useState, type FormEvent, type FC } from 'react'
import { useHabitContext } from '@/hooks/useHabitContext'

export const AddHabitForm: FC = () => {
  const [title, setTitle] = useState<string>('')
  const { onCreateHabit } = useHabitContext()

  const handleAddHabit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title) return
    await onCreateHabit(title)
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={handleAddHabit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full focus:border-0 p-2"
          type="text"
          placeholder="add a new habit 🐇"
        />
      </form>
    </div>
  )
}

export default AddHabitForm
