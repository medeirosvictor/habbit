import HabitTableItem from './HabitTableItem'
import AddHabitForm from './AddHabitForm'
import { useState } from 'react'
import HabitDetailModal from './HabitDetailModal'
import type { HabitData } from '@/shared/types'

interface HabitTableProps {
  isStaticTable?: boolean
  habits: Array<HabitData>
}

function HabitTable({ habits, isStaticTable = true }: HabitTableProps) {
  const [currentModalHabitId, setCurrentModalHabitId] = useState<number | null>(null)

  return (
    <div className="border-1 rounded-lg">
      {habits?.map((habit) => (
        <HabitTableItem
          habit={habit}
          key={habit.id}
          currentHabitId={currentModalHabitId}
          setCurrentModalHabitId={setCurrentModalHabitId}
        />
      ))}
      {!isStaticTable && <AddHabitForm />}

      {/* Details Modal */}
      {currentModalHabitId && (
        <HabitDetailModal
          currentHabitId={currentModalHabitId}
          setCurrentModalHabitId={setCurrentModalHabitId}
        />
      )}
    </div>
  )
}

export default HabitTable
