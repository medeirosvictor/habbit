import ActivityTable from '@/components/ActivityTable'
import { useEffect, useState, type FC } from 'react'
import { useActivityContext } from '@/hooks/useActivityContext'
import type { ActivityData } from '@/shared/types'
import { Link } from 'react-router'

const Shared: FC = () => {
  const { onFetchActivities, checkForSharedActivities, activities } = useActivityContext()
  const [sharedActivities, setSharedActivities] = useState<Array<ActivityData>>([])

  useEffect(() => {
    onFetchActivities()
    setSharedActivities(checkForSharedActivities(activities))
  }, [activities])

  if (sharedActivities) {
    return (
      <div className="p-4 text-center text-gray-500">
        No activities shared,{' '}
        <Link to="/activities" className="text-blue-500 underline">
          go share some!
        </Link>
      </div>
    )
  } else {
    return <ActivityTable activities={sharedActivities} isStaticTable={true} />
  }
}

export default Shared
