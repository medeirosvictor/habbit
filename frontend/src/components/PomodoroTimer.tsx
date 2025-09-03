import { EMOJIS } from '@/constants'
import useTimer from '@/hooks/useTimer'

interface PomodoroTimerProps {
  initialTime?: number
}

const PomodoroTimer = ({ initialTime }: PomodoroTimerProps) => {
  const { timeLeft, isRunning, isComplete, start, pause, reset, formatTime } = useTimer(initialTime)

  return (
    <div className="flex gap-1">
      <div className="border-1 p-1">{formatTime(timeLeft)}</div>
      <button className="cursor-pointer" onClick={isRunning ? pause : start}>
        {EMOJIS.playpause}
      </button>
      <button className="cursor-pointer" onClick={reset}>
        {EMOJIS.reset}
      </button>
      <div>{isComplete && EMOJIS.complete}</div>
    </div>
  )
}

export default PomodoroTimer
