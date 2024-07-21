import type { HttpError } from '@adonisjs/core/types/http'
import { DefaultError } from '~/components/layouts/default_error'

export interface UnauthorizedProps {
  error: HttpError
}

export default function Unauthorized(props: UnauthorizedProps) {
  const { error } = props

  return (
    <DefaultError
      title="Unauthorized"
      infos="Oops, looks like a little break is in order! The 401 error page indicates that authentication has not been completed. Log in now and join the community!"
      error={error}
    />
  )
}
