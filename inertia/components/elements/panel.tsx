import { Children, isValidElement, type HTMLAttributes, type ReactNode } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

interface PanelFooterProperties extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function PanelFooter(props: PanelFooterProperties) {
  const { children, className, ...panelFooterProps } = props
  return (
    <div className={combine(className, 'flex mt-4')} {...panelFooterProps}>
      {children}
    </div>
  )
}

export interface PanelProperties extends HTMLAttributes<HTMLDivElement> {}

function Panel(props: PanelProperties) {
  const { className, children, ...panelProps } = props
  let footer
  const content: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return content.push(child)
    if (child.type === PanelFooter) {
      footer = child
    } else {
      content.push(child)
    }
  })

  return (
    <div className={combine(className, 'border p-4 rounded-lg bg-white')} {...panelProps}>
      {content}
      {footer}
    </div>
  )
}

Panel.Footer = PanelFooter
export { Panel }
