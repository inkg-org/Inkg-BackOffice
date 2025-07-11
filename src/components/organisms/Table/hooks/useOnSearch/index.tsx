'use client'

import { useCallback, useState } from 'react'

export interface useOnSearchProps {
  /**
   * Función que se ejecutará cuando se realice la búsqueda.
   */
  onSearch?: (value: string) => void

  /**
   * Tiempo de espera antes de ejecutar la función onSearch (en milisegundos).
   */
  delay?: number
}

/**
 * Hook que ejecuta la función onSearch en el delay especificado.
 * Si la función se vuelve a ejecutar antes de que el delay se termine, se cancela la ejecución anterior.
 */
const useOnSearch = ({ onSearch, delay }: useOnSearchProps) => {
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >()

  const handleSearch = useCallback(
    (value: string) => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(
        setTimeout(() => {
          onSearch?.(value)
        }, delay ?? 300)
      )
    },
    [delay, onSearch, timeoutId]
  )

  return { handleSearch }
}

export default useOnSearch
