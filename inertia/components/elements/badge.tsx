import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface BadgeProperties extends HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProperties) {
  const { className, children, ...spanProps } = props

  return (
    <span
      className={twMerge('bg-blue-100', 'px-1', 'rounded-md', 'text-sm', className)}
      {...spanProps}
    >
      {children}
    </span>
  )
}
