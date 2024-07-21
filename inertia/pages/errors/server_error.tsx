import type { HttpError } from '@adonisjs/core/types/http'
import { DefaultError } from '~/components/layouts/default_error'

export interface ServerErrorProps {
  error: HttpError
}

export default function ServerError(props: ServerErrorProps) {
  return <DefaultError title="Server Error" error={props.error} />
}
