import type { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const merge = tv({ base: ['bg-blue-100', 'px-1', 'rounded-md', 'text-sm'] })

export interface BadgeProperties extends HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProperties) {
  const { className, children, ...spanProps } = props

  return (
    <span className={merge({ className })} {...spanProps}>
      {children}
    </span>
  )
}
