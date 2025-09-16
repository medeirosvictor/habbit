import RabitTable from '@/components/RabitTable'
import { useEffect, useState, type FC } from 'react'
import { useRabitContext } from '@/hooks/useRabitContext'
import type { RabitData } from '@/shared/types'
import { Link } from 'react-router'

const Shared: FC = () => {
  const { onFetchRabits, checkForSharedRabits, rabits } = useRabitContext()
  const [sharedRabits, setSharedRabits] = useState<Array<RabitData>>([])

  useEffect(() => {
    onFetchRabits()
    setSharedRabits(checkForSharedRabits(rabits))
  }, [rabits])

  if (sharedRabits) {
    return (
      <div className="p-4 text-center text-gray-500">
        No rabits shared,{' '}
        <Link to="/rabits" className="text-blue-500 underline">
          go share some!
        </Link>
      </div>
    )
  } else {
    return <RabitTable rabits={sharedRabits} isStaticTable={true} />
  }
}

export default Shared
