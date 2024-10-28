import loader from '~/assets/svg/loader.svg'
import { Children, isValidElement } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: ['rounded-md', 'px-4', 'py-2', 'flex', 'justify-center', 'gap-2'],
  variants: {
    aspect: {
      accent: ['bg-blue-200'],
      border: ['bg-blue-50', 'border', 'border-blue-200'],
    },
  },
  defaultVariants: { aspect: 'accent' },
})

export interface ButtonProperties
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

function ButtonIcon(props: { children: ReactNode }) {
  const { children } = props
  return children
}

function Button(props: ButtonProperties) {
  const { className, children, aspect, isLoading, ...buttonProps } = props
  let icon
  const content: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return content.push(child)
    if (child.type === ButtonIcon) {
      icon = child
    } else {
      content.push(child)
    }
  })

  return (
    <button
      className={buttonVariants({
        aspect,
        className,
      })}
      {...buttonProps}
    >
      {!isLoading && icon}
      {isLoading && (
        <img
          src={loader}
          alt="loader"
          className="mr-2 inline w-5 animate-spin animation-duration-[1.5s]"
          width="20"
        />
      )}
      {content}
    </button>
  )
}

Button.Icon = ButtonIcon
export { Button }
