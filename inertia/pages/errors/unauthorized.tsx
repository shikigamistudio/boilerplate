import { DefaultError } from './default_error'

export default function Unauthorized() {
  return (
    <DefaultError
      title="Unauthorized"
      error="Oops, looks like a little break is in order! The 401 error page indicates that authentication has not been completed. Log in now and join the community!"
    />
  )
}
