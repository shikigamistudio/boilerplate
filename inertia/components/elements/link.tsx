import { Link as LinkInertia, type InertiaLinkProps } from '@inertiajs/react'

import { combine } from '#helpers/class_name_combine_helper'

export interface LinkProperties extends Omit<InertiaLinkProps, 'as'> {
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export function Link(props: LinkProperties) {
  const { className, children, onProgress, ...linkProps } = props

  const linkClasses = 'text-blue-500 hover:underline'

  if (linkProps.href.match(/^(https?:\/\/)?(www\.)?.*\./)) {
    linkProps.href = linkProps.href.replace(/^(https?:\/\/)?/, 'http://')
    linkProps.target = linkProps.target || '_blank'
    return (
      <a className={combine(className, linkClasses)} {...linkProps}>
        {children}
      </a>
    )
  }

  let asElement: string | undefined
  if (linkProps.method && linkProps.method !== 'get') {
    asElement = 'button'
  }

  return (
    <LinkInertia
      className={combine(className, linkClasses)}
      as={asElement}
      onProgress={onProgress}
      {...linkProps}
    >
      {children}
    </LinkInertia>
  )
}
