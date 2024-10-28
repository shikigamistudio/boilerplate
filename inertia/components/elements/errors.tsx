import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import type { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

const merge = tv({ base: ['text-sm', 'font-light', 'text-red-400'] })

export interface ErrorProperties extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {}

export function Errors(props: ErrorProperties) {
  const { errors } = usePage<SharedProps>().props
  const { className, ...errorProps } = props

  if (typeof errors !== 'string') return <></>

  return (
    <p className={merge({ className })} {...errorProps}>
      {errors}
    </p>
  )
}
