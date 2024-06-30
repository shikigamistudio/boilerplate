import type { ReactNode } from 'react'

import { Input, type InputProperties } from './input'
import { Label } from './label'

export interface InputGroupProperties extends InputProperties {
  errorMessage?: string
  children: string | ReactNode
}

export function InputGroup(props: InputGroupProperties) {
  const { children: htmlLabel, errorMessage, ...inputProps } = props

  return (
    <div>
      <Label name={inputProps.name} className="inline-block pl-2">
        {htmlLabel}
      </Label>
      <Input {...inputProps} className="w-full" />
      {errorMessage && <p className="text-sm font-light text-red-400">{errorMessage}</p>}
    </div>
  )
}
