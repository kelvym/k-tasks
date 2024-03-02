import { useEffect, useState } from 'react'

type UseDebounceProps = {
  value: string
  milliseconds: number
}

export const useDebounce = ({ value, milliseconds }: UseDebounceProps) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, milliseconds)

    return () => {
      clearTimeout(handler)
    }
  }, [value, milliseconds])

  return debounceValue
}
