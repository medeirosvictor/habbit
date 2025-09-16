import { useState, type FormEvent, type FC } from 'react'
import { useRabitContext } from '@/hooks/useRabitContext'

export const AddRabitForm: FC = () => {
  const [title, setTitle] = useState<string>('')
  const { onCreateRabit } = useRabitContext()

  const handleAddRabit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title) return
    await onCreateRabit(title)
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={handleAddRabit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full focus:border-0 p-2"
          type="text"
          placeholder="add a new rabit 🐇"
        />
      </form>
    </div>
  )
}

export default AddRabitForm
