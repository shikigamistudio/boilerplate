export function combine(...classes: (string | undefined)[]) {
  return (
    classes
      .filter((f) => f)
      .map((m) => m?.split(' '))
      .flat()
      .join(' ')
      .trim() || undefined
  )
}
