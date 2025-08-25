import { EMOJIS } from '@/constants'
import useTimer from '@/hooks/useTimer'

interface PomodoroTimerProps {
  initialTime?: number
}

const PomodoroTimer = ({ initialTime }: PomodoroTimerProps) => {
  const { timeLeft, isRunning, isComplete, start, pause, reset, formatTime } = useTimer(initialTime)

  return (
    <div className="flex gap-1">
      <div>{formatTime(timeLeft)}</div>
      <button onClick={isRunning ? pause : start}>{EMOJIS.playpause}</button>
      <button onClick={reset}>{EMOJIS.reset}</button>
    </div>
  )
}

export default PomodoroTimer
