import ActivityTable from '@/components/ActivityTable'
import { useEffect, type FC } from 'react'
import { useActivityContext } from '@/hooks/useActivityContext'
import { ActivityProvider } from '@/context/ActivityProvider'

const Shared: FC = () => {
  const { onFetchActivities } = useActivityContext()

  useEffect(() => {
    onFetchActivities()
  }, [])

  return (
    <ActivityProvider>
      <ActivityTable isStaticTable={true} />
    </ActivityProvider>
  )
}

export default Shared
