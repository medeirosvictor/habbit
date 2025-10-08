import HabitTable from '@/components/HabitTable'
import { useEffect, useState, type FC } from 'react'
import { useHabitContext } from '@/hooks/useHabitContext'
import type { HabitData } from '@/shared/types'
import { Link } from 'react-router'

const Shared: FC = () => {
  const { onFetchHabits, checkForSharedHabits, habits } = useHabitContext()
  const [sharedHabits, setSharedHabits] = useState<Array<HabitData>>([])

  useEffect(() => {
    onFetchHabits()
    setSharedHabits(checkForSharedHabits(habits))
  }, [habits])

  if (sharedHabits) {
    return (
      <div className="p-4 text-center text-gray-500">
        No habits shared,{' '}
        <Link to="/" className="text-blue-500 underline">
          go share some!
        </Link>
      </div>
    )
  } else {
    return <HabitTable habits={sharedHabits} isStaticTable={true} />
  }
}

export default Shared
