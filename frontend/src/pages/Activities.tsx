import ActivityTable from '@/components/ActivityTable'
import { useActivityContext } from '@/hooks/useActivityContext'
import { useEffect } from 'react'

function Activities() {
  const { onFetchActivities, activities } = useActivityContext()

  useEffect(() => {
    onFetchActivities()
  }, [])

  return (
    <div id="activities" className="flex flex-col max-w-[1060px] mx-auto">
      <ActivityTable activities={activities} isStaticTable={false} />
    </div>
  )
}

export default Activities
