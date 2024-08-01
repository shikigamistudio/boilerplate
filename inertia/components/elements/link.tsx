import { Link as LinkInertia, type InertiaLinkProps } from '@inertiajs/react'

import { combine } from '#helpers/class_name_combine_helper'

const components = {
  inertia: LinkInertia,
  anchor: 'a',
}

export interface LinkProperties extends Omit<InertiaLinkProps, 'as'> {
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export function Link(props: LinkProperties) {
  const { className, children, onProgress, ...linkProps } = props

  const linkClasses = 'text-blue-500 hover:underline'

  let Component: (typeof components)[keyof typeof components] = components.inertia

  if (linkProps.href.match(/^(https?:\/\/)?(www\.)?.*\./)) {
    Component = components.anchor
    if (!linkProps.href.startsWith('http')) linkProps.href = 'http://' + linkProps.href
    linkProps.target = linkProps.target || '_blank'
  }

  let asElement: string | undefined
  if (linkProps.method && linkProps.method !== 'get') {
    asElement = 'button'
  }

  return (
    <Component
      className={combine(className, linkClasses)}
      as={asElement}
      onProgress={onProgress}
      {...linkProps}
    >
      {children}
    </Component>
  )
}
