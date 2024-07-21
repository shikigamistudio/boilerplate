import type { HttpError } from '@adonisjs/core/types/http'
import { DefaultError } from '~/components/layouts/default_error'

export interface BadRequestProps {
  error: HttpError
}

export default function BadRequest(props: BadRequestProps) {
  const { error } = props

  return (
    <DefaultError
      title="Bad request"
      infos="Oh no, wrong request! You've reached page 400. Don't worry, try again another time or another request!"
      error={error}
    />
  )
}
