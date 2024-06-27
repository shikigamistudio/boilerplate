export default function ServerError(props: { error: any }) {
  return (
    <>
      <div className="grid-container grid">
        <div>Server Error</div>

        <span>{props.error.message}</span>
      </div>
    </>
  )
}
