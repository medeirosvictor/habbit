import ActivityTable from '@/components/ActivityTable'
import { ActivityProvider } from '@/context/ActivityProvider'

function Activities() {
  return (
    <ActivityProvider>
      <div id="activities" className="flex flex-col max-w-[1060px] mx-auto">
        <ActivityTable isStaticTable={false} />
      </div>
    </ActivityProvider>
  )
}

export default Activities
