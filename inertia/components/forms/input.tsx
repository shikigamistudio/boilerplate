import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  type: HTMLInputTypeAttribute
  name: string
}

export function Input(props: InputProperties) {
  const { className, ...inputProps } = props
  return (
    <input
      className={twMerge('px-2', 'py-1', 'rounded', 'border', className)}
      id={inputProps.name}
      {...inputProps}
    />
  )
}
