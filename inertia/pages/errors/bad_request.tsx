import { DefaultError } from './default_error'

export default function BadRequest() {
  return (
    <DefaultError
      title="Bad request"
      error="Oh no, wrong request! You've reached page 400. Don't worry, try again another time or another request!"
    />
  )
}
