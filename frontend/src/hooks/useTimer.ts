import { useState, useEffect } from 'react'

interface UseTimerReturn {
  start: () => void
  pause: () => void
  reset: () => void
  timeLeft: number
  isRunning: boolean
  isComplete: boolean
  formatTime: (time: number) => string
  getProgressPercentage: () => number
}

const useTimer = (initialTime: number = 25 * 60): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime: number) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isRunning, timeLeft])

  const start = (): void => setIsRunning(true)
  const pause = (): void => setIsRunning(false)
  const reset = (): void => {
    setTimeLeft(initialTime)
    setIsRunning(false)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    return ((initialTime - timeLeft) / initialTime) * 100
  }

  return {
    timeLeft,
    isRunning,
    isComplete: timeLeft === 0,
    start,
    pause,
    reset,
    formatTime,
    getProgressPercentage,
  }
}

export default useTimer
