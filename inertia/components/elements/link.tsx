import { Link as LinkInertia, type InertiaLinkProps } from '@inertiajs/react'

import { combine } from '#helpers/class_name_combine_helper'

export interface LinkProperties extends Omit<InertiaLinkProps, 'as'> {}

export function Link(props: LinkProperties) {
  const { className, children, ...LinkProps } = props

  let asElement: string | undefined
  if (LinkProps.method && LinkProps.method !== 'get') {
    asElement = 'button'
  }

  return (
    <LinkInertia
      className={combine(className, 'text-blue-500 hover:underline')}
      as={asElement}
      {...LinkProps}
    >
      {children}
    </LinkInertia>
  )
}
