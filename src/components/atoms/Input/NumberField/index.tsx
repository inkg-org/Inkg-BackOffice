'use client'

import { cn } from '@/src/lib/utils/cn'
import { defaultFormatter, Formatter } from '@/src/lib/utils/formatters'
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
  useId
} from 'react'
import {
  Control,
  RegisterOptions,
  useController,
  useForm
} from 'react-hook-form'
import { mergeRefs } from 'react-merge-refs'

export type NumberFieldSchema = Record<string, any>
export interface NumberFieldProps<Schema extends NumberFieldSchema = {}>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'id' | 'prefix' | 'name'
  > {
  label?: string
  name: keyof Schema
  rules?: RegisterOptions
  control?: Control<any>
  prefix?: ReactNode
  formatter?: Formatter<any>
}

const NumberField = <Schema extends NumberFieldSchema = {}>({
  label,
  name,
  rules,
  control,
  className,
  prefix,
  formatter = defaultFormatter,
  ...inputProps
}: NumberFieldProps<Schema>) => {
  const { control: fallbackControl } = useForm()

  const { field } = useController({
    name: name as string,
    control: control ?? fallbackControl,
    rules
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const parsedValue = Number(event.target.value.replace(/[^0-9.]/g, ''))
    field.onChange(parsedValue)
    inputProps.onChange?.(event)
  }

  const inputRef = mergeRefs([field.ref, inputProps.ref])

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    field.onBlur()
    inputProps.onBlur?.(event)
  }

  const inputValue =
    typeof field.value === 'number' || field.value === ''
      ? field.value
      : formatter.format(field.value)

  const id = useId()

  return (
    <div>
      <label htmlFor={id} className={cn(label ? '' : 'sr-only')}>
        {label}
      </label>
      <div className='relative'>
        {prefix && <span className='absolute z-20 flex'>{prefix}</span>}
        <input
          {...field}
          id={id}
          type='number'
          inputMode='decimal'
          pattern='[0-9]*'
          className={cn(
            'appearance-none rounded-md relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm',
            className
          )}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          value={inputValue}
          {...inputProps}
        />
      </div>
    </div>
  )
}

export default NumberField
