/**
 * Tipo para el formateador de un componente de input, el format es el valor que se va a mostrar en el input
 * y el parse es el valor que se va a guardar en el submit del form
 */
export type Formatter<T = string> = {
  format: (value: T) => string
  parse: (value: string) => T
}

/**
 * Formateador por defecto para los inputs
 */
export const defaultFormatter: Formatter = {
  /**
   * Obtiene una entrada y devuelve el valor mostrado al usuario en el input
   */
  format: (value) => value,
  /**
   * Obtiene una entrada y devuelve el valor necesitado por el código
   */
  parse: (value) => value
}

export const currencyFormatter: Formatter<number> = {
  format: (value) => {
    if (isNaN(value)) return ''

    const [integerPart, decimalPart] = value.toString().split('.')

    const formattedInteger = integerPart
      .split('')
      .reverse()
      .reduce((acc, digit, index) => {
        if (index > 0 && index % 3 === 0) {
          if (index % 6 === 0) {
            acc.push("'")
          } else {
            acc.push('.')
          }
        }
        acc.push(digit)
        return acc
      }, [] as string[])
      .reverse()
      .join('')

    const formattedValue = decimalPart
      ? `${formattedInteger},${decimalPart}`
      : formattedInteger

    return `$${formattedValue}`
  },

  parse: (value) => {
    const rawValue = parseInt(value.replace(/\D/g, ''), 10) || 0

    return rawValue
  }
}
