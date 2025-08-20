import type { ActivityData } from "@/shared/types"
import Activity from "./Activity"
import AddActivityForm from "./AddActivityForm"

type ActivityTableProps = {
  activities: Array<ActivityData>
}

function ActivityTable({ activities }: ActivityTableProps) {

  return (
    <div className="border-2">
      {activities.length && activities.map((activity) => (
        <Activity activity={activity} key={activity.id} />
      ))}
        <AddActivityForm />
    </div>
  )
}

export default ActivityTable
