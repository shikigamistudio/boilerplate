import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import type { HTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface ErrorProperties extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {}

export function Errors(props: ErrorProperties) {
  const { errors } = usePage<SharedProps>().props
  const { className, ...errorProps } = props

  if (typeof errors !== 'string') return <></>

  return (
    <p className={combine(className, 'text-sm font-light text-red-400')} {...errorProps}>
      {errors}
    </p>
  )
}
