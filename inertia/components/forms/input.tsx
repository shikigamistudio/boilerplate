import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface InputProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  type: HTMLInputTypeAttribute
  name: string
}

export function Input(props: InputProperties) {
  const { className, ...inputProps } = props
  return (
    <input
      className={combine(className, 'px-2 py-1 rounded border')}
      id={inputProps.name}
      {...inputProps}
    />
  )
}
