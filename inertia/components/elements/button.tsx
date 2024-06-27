import type { ButtonHTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  aspect?: 'accent' | 'border'
}

export function Button(props: ButtonProperties) {
  const { className, children, aspect, ...ButtonProps } = props

  let aspectStyle = ''
  switch (aspect) {
    case 'border':
      aspectStyle = 'bg-blue-50 border border-blue-200'
      break
    case 'accent':
    default:
      aspectStyle = 'bg-blue-200'
      break
  }

  return (
    <button className={combine(className, aspectStyle, 'rounded-md py-2')} {...ButtonProps}>
      {children}
    </button>
  )
}
