import { Children, isValidElement, type HTMLAttributes, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

interface PanelFooterProperties extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const mergePanel = tv({ base: ['flex', 'mt-4'] })
const merge = tv({ base: ['border', 'p-4', 'rounded-lg', 'bg-white'] })

function PanelFooter(props: PanelFooterProperties) {
  const { children, className, ...panelFooterProps } = props
  return (
    <div className={mergePanel({ className })} {...panelFooterProps}>
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
    <div className={merge({ className })} {...panelProps}>
      {content}
      {footer}
    </div>
  )
}

Panel.Footer = PanelFooter
export { Panel }
