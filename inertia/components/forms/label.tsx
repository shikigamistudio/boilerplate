import type { HTMLAttributes, InputHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

export interface LabelProperties
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>,
    HTMLAttributes<HTMLLabelElement> {}

const merge = tv({ base: [] })

export function Label(props: LabelProperties) {
  const { className, name, children, ...labelProps } = props
  return (
    <label className={merge({ className })} htmlFor={name} {...labelProps}>
      {children}
    </label>
  )
}
