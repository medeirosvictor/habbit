import RabitTableItem from './RabitTableItem'
import AddRabitForm from './AddRabitForm'
import { useState } from 'react'
import RabitDetailModal from './RabitDetailModal'
import type { RabitData } from '@/shared/types'

interface RabitTableProps {
  isStaticTable?: boolean
  rabits: Array<RabitData>
}

function RabitTable({ rabits, isStaticTable = true }: RabitTableProps) {
  const [currentModalRabitId, setCurrentModalRabitId] = useState<number | null>(null)

  return (
    <div className="border-1 rounded-lg">
      {rabits?.map((rabit) => (
        <RabitTableItem
          rabit={rabit}
          key={rabit.id}
          currentRabitId={currentModalRabitId}
          setCurrentModalRabitId={setCurrentModalRabitId}
        />
      ))}
      {!isStaticTable && <AddRabitForm />}

      {/* Details Modal */}
      {currentModalRabitId && (
        <RabitDetailModal
          currentRabitId={currentModalRabitId}
          setCurrentModalRabitId={setCurrentModalRabitId}
        />
      )}
    </div>
  )
}

export default RabitTable
