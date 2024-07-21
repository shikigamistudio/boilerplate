import { DefaultError } from '~/components/layouts/default_error'

export default function NotFound() {
  return (
    <DefaultError
      title="Page not found"
      infos="Oh, no, you don't! You've reached the mysterious page 404. It seems that the page you're looking for doesn't exist, but don't despair!"
    />
  )
}
