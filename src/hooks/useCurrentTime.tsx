import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export function useCurrentTime() {
  const [time, setTime] = useState(dayjs())

  useEffect(() => {
    const updateTime = () => {
      setTime(dayjs())
    }

    updateTime()

    const delay = 60_000 - (Date.now() % 60_000)

    const timeout = setTimeout(() => {
      updateTime()

      const interval = setInterval(updateTime, 60_000)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [])

  return {
    hours: time.format('HH'),
    minutes: time.format('mm'),
    date: time.format('DD.MM.YYYY'),
  }
}