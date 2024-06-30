import type { HTMLAttributes, InputHTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface LabelProperties
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>,
    HTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProperties) {
  const { className, name, children, ...labelProps } = props
  return (
    <label className={combine(className)} htmlFor={name} {...labelProps}>
      {children}
    </label>
  )
}
