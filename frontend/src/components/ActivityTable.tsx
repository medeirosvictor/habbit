import ActivityTableItem from './ActivityTableItem'
import AddActivityForm from './AddActivityForm'
import { useState } from 'react'
import { Link } from 'react-router'
import { useActivityContext } from '@/hooks/useActivityContext'
import { useEffect } from 'react'
import ActivityDetailModal from './ActivityDetailModal'

interface ActivityTableProps {
  isStaticTable?: boolean
}

function ActivityTable({ isStaticTable = true }: ActivityTableProps) {
  const [currentModalActivityId, setCurrentModalActivityId] = useState<number | null>(null)
  const [openDetailId, setOpenDetailId] = useState<number | null>(null)
  const { activities, onFetchActivities } = useActivityContext()

  useEffect(() => {
    onFetchActivities()
  }, [])

  return (
    <div className="border-1 rounded-lg">
      {activities?.map((activity) => (
        <ActivityTableItem
          activity={activity}
          key={activity.id}
          isOpen={openDetailId === activity.id}
          setOpenDetailId={setOpenDetailId}
          setCurrentModalActivityId={setCurrentModalActivityId}
        />
      ))}
      {!isStaticTable ? (
        <AddActivityForm />
      ) : (
        <div className="p-4 text-center text-gray-500">
          No activities shared,{' '}
          <Link to="/activities" className="text-blue-500 underline">
            go share some!
          </Link>
        </div>
      )}

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
