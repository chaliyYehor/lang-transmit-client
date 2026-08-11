import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export function useCurrentTime() {
  const [time, setTime] = useState(dayjs())

  useEffect(() => {
    const updateTime = () => {
      setTime(dayjs())
    }

    // Сразу выставляем актуальное время
    updateTime()

    // Сколько миллисекунд осталось до следующей минуты
    const delay = 60_000 - (Date.now() % 60_000)

    const timeout = setTimeout(() => {
      updateTime()

      // После попадания в начало минуты обновляемся каждые 60 секунд
      const interval = setInterval(updateTime, 60_000)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [])

  return {
    hours: time.format('HH'),
    minutes: time.format('mm'),
  }
}