import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

export interface InputProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  type: HTMLInputTypeAttribute
  name: string
}

const merge = tv({ base: ['px-2', 'py-1', 'rounded', 'border'] })

export function Input(props: InputProperties) {
  const { className, ...inputProps } = props
  return <input className={merge({ className })} id={inputProps.name} {...inputProps} />
}
