import ActivityTable from '@/components/ActivityTable'

function Activities() {
  return (
    <div id="activities" className="flex flex-col max-w-[1060px] mx-auto">
      <ActivityTable isStaticTable={false} />
    </div>
  )
}

export default Activities
