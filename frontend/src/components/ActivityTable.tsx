import type { ActivityData } from '@/shared/types'
import ActivityTableItem from './ActivityTableItem'
import AddActivityForm from './AddActivityForm'

interface ActivityTableProps {
  activities: Array<ActivityData>
  setActivities: (activities: Array<ActivityData>) => void
}

function ActivityTable({ activities, setActivities }: ActivityTableProps) {
  return (
    <div className="border-1 rounded-md drop-shadow-md">
      {activities.length &&
        activities.map((activity) => <ActivityTableItem activity={activity} key={activity.id} />)}
      <AddActivityForm setActivities={setActivities} />
    </div>
  )
}

export default ActivityTable
