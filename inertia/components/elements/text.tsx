import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const textVariants = tv({
  base: [],
  variants: {
    type: {
      p: [],
      h1: ['text-2xl', 'font-bold'],
      h2: ['text-xl', 'font-medium'],
      h3: ['text-lg'],
    },
  },
})

export interface TextProperties
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export function Text(props: TextProperties) {
  const { className, children, type = 'p', ...textProps } = props

  if (type === null) throw new Error('type need to be set')

  const Component = type

  return (
    <Component className={textVariants({ type, className })} {...textProps}>
      {children}
    </Component>
  )
}
