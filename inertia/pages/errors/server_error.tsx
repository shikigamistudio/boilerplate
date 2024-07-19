import { DefaultError } from './default_error'

export default function ServerError(props: { error: any }) {
  return <DefaultError title="Server Error" error={props.error.message} />
}
