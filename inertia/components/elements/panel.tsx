import type { HTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface PanelProperties extends HTMLAttributes<HTMLDivElement> {}

export function Panel(props: PanelProperties) {
  const { className, children, ...panelProps } = props
  return (
    <div className={combine(className, 'border m-2 p-2 rounded-lg bg-white')} {...panelProps}>
      {children}
    </div>
  )
}
