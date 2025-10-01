'use client'

import { cn } from '@/src/lib/utils/cn'
import { defaultFormatter, Formatter } from '@/src/lib/utils/formatters'
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState
} from 'react'
import {
  Control,
  RegisterOptions,
  useController,
  useForm
} from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { mergeRefs } from 'react-merge-refs'

export type TextFieldSchema = Record<string, any>
export interface TextFieldProps<Schema extends TextFieldSchema = {}>
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'id' | 'prefix' | 'name'
  > {
  includeObscure?: boolean
  label?: string
  name: keyof Schema
  rules?: RegisterOptions
  control?: Control<any>
  position?: 'top' | 'bottom' | 'middle' | 'none'
  prefix?: ReactNode
  formatter?: Formatter<any>
}
const TextField = <Schema extends TextFieldSchema = {}>({
  includeObscure,
  label,
  name,
  rules,
  control,
  className,
  position = 'middle',
  prefix,
  formatter = defaultFormatter,
  ...inputProps
}: TextFieldProps<Schema>) => {
  const [isObscure, setIsObscure] = useState(false)
  const { control: fallbackControl } = useForm()

  const { field, fieldState: { error } } = useController({
    name: name as string,
    control: control ?? fallbackControl,
    rules
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    field.onChange(formatter.parse(event.target.value))
    inputProps.onChange?.(event)
  }

  const inputRef = mergeRefs([field.ref, inputProps.ref])

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    field.onBlur()
    inputProps.onBlur?.(event)
  }

  const inputValue = field.value ? formatter.format(field.value ?? '') : ''

  const id = useId()

  return (
    <div>
      <label htmlFor={id} className={cn(label ? 'text-sm' : 'sr-only text-sm')}>
        {label}
      </label>
      <div className='relative'>
        {prefix && <span className='absolute z-20 flex'>{prefix}</span>}
        <input
          {...field}
          id={id}
            type={includeObscure ? (isObscure ? 'text' : 'password') : inputProps.type || 'text'}
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
        {includeObscure && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-xl leading-5 z-40'>
            <button
              type='button'
              onClick={() => setIsObscure((e) => !e)}
              className='text-gray-600'
            >
              {isObscure ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}

export default TextField
