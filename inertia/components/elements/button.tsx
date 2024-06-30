import { Children, ReactNode, isValidElement } from 'react'
import loader from '~/assets/loader.svg'
import type { ButtonHTMLAttributes } from 'react'

import { combine } from '#helpers/class_name_combine_helper'

export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  aspect?: 'accent' | 'border'
  isLoading?: boolean
}

function ButtonIcon(props: { children: ReactNode }) {
  const { children } = props
  return children
}

function Button(props: ButtonProperties) {
  const { className, children, aspect, isLoading, ...buttonProps } = props
  let icon
  let content: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return content.push(child)
    if (child.type === ButtonIcon) {
      icon = child
    } else {
      content.push(child)
    }
  })

  let aspectStyle = ''
  switch (aspect) {
    case 'border':
      aspectStyle = 'bg-blue-50 border border-blue-200'
      break
    case 'accent':
    default:
      aspectStyle = 'bg-blue-200'
      break
  }

  return (
    <button
      className={combine(className, aspectStyle, 'rounded-md py-2 flex justify-center gap-2')}
      {...buttonProps}
    >
      {icon}
      {icon === undefined && isLoading && (
        <img
          src={loader}
          alt="loader"
          className="w-5 animate-spin animation-duration-[1.5s]"
          width="20"
        />
      )}
      {content}
    </button>
  )
}

Button.Icon = ButtonIcon
export { Button }
