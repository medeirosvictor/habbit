import { type ActivityData } from '@/shared/types'

interface ActivityProps {
  activity: ActivityData;
}

function Activity({ activity }: ActivityProps) {
  const { title, description, coverImage, altImage, isHabit, cost, meta } = activity
  return (
    <div className='border'>
      <p>{title}</p>
      <p>{isHabit}</p>
    </div>
  )
}

export default Activity
