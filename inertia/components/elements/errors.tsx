import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ErrorProperties extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {}

export function Errors(props: ErrorProperties) {
  const { errors } = usePage<SharedProps>().props
  const { className, ...errorProps } = props

  if (typeof errors !== 'string') return <></>

  return (
    <p className={twMerge('text-sm', 'font-light', 'text-red-400', className)} {...errorProps}>
      {errors}
    </p>
  )
}
