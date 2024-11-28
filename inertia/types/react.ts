import type { FunctionComponent, ComponentClass as ClassComponent, ComponentType } from 'react'

type DefineFunctionComponent<K extends string = 'default'> = {
  [key in K]: FunctionComponent & { layout?: FunctionComponent }
}
type DefineClassComponent<K extends string = 'default'> = {
  [key in K]: ClassComponent & { layout?: ClassComponent }
}

type DefineComponent<K extends string = 'default'> = {
  [key in K]: ComponentType & { layout?: ComponentType }
}

export type { DefineClassComponent, DefineComponent, DefineFunctionComponent }
