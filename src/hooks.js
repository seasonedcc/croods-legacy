import { useEffect, useRef } from 'react'

export const useMounted = () => {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
  }, [])
  return mounted.current
}

export const usePrevious = value => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useDidUpdate = (f, conditions) => {
  const didMoutRef = useRef(false)
  useEffect(() => {
    if (!didMoutRef.current) {
      didMoutRef.current = true
      return
    }

    // Cleanup effects when f returns a function
    return f && f() //eslint-disable-line
  }, conditions)
}
