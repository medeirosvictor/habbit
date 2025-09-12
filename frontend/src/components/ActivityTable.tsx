import ActivityTableItem from './ActivityTableItem'
import AddActivityForm from './AddActivityForm'
import { useState } from 'react'
import ActivityDetailModal from './ActivityDetailModal'
import type { ActivityData } from '@/shared/types'

interface ActivityTableProps {
  isStaticTable?: boolean
  activities: Array<ActivityData>
}

function ActivityTable({ activities, isStaticTable = true }: ActivityTableProps) {
  const [currentModalActivityId, setCurrentModalActivityId] = useState<number | null>(null)

  return (
    <div className="border-1 rounded-lg">
      {activities?.map((activity) => (
        <ActivityTableItem
          activity={activity}
          key={activity.id}
          currentActivityId={currentModalActivityId}
          setCurrentModalActivityId={setCurrentModalActivityId}
        />
      ))}
      {!isStaticTable && <AddActivityForm />}

      {/* Details Modal */}
      {currentModalActivityId && (
        <ActivityDetailModal
          currentActivityId={currentModalActivityId}
          setCurrentModalActivityId={setCurrentModalActivityId}
        />
      )}
    </div>
  )
}

export default ActivityTable
