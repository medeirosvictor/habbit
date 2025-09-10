import { useState, type FormEvent, type FC } from 'react'
import { useActivityContext } from '@/hooks/useActivityContext'

export const AddActivityForm: FC = () => {
  const [title, setTitle] = useState<string>('')
  const { onCreateActivity } = useActivityContext()

  const handleAddActivity = async (e: FormEvent) => {
    e.preventDefault()
    if (!title) return
    await onCreateActivity(title)
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
