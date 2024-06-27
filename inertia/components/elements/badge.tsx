import type { HTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface BadgeProperties extends HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProperties) {
  const { className, children, ...SpanProps } = props

  return (
    <span className={combine(className, 'bg-blue-100 px-1 rounded-md text-sm')} {...SpanProps}>
      {children}
    </span>
  )
}
