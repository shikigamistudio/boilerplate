import type { HTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface TextProperties extends HTMLAttributes<HTMLParagraphElement> {
  type?: 'p' | 'h1' | 'h2' | 'h3'
}

export function Text(props: TextProperties) {
  const { className, children, type = 'p', ...textProps } = props

  switch (type) {
    case 'h1':
      return (
        <h1 className={combine(className, 'text-2xl font-bold')} {...textProps}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={combine(className, 'text-xl font-medium')} {...textProps}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={combine(className, 'text-lg')} {...textProps}>
          {children}
        </h3>
      )
    case 'p':
    default:
      return (
        <p className={combine(className)} {...textProps}>
          {children}
        </p>
      )
  }
}
