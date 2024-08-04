import type { HTMLAttributes, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface LabelProperties
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>,
    HTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProperties) {
  const { className, name, children, ...labelProps } = props
  return (
    <label className={twMerge(className)} htmlFor={name} {...labelProps}>
      {children}
    </label>
  )
}
