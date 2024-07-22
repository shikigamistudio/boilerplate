/**
 * Combines multiple class names into a single string.
 * Filters out undefined or falsy class names, splits each valid class name by space,
 * flattens the resulting array, joins them with a space, and trims the result.
 */
export function combine(...classes: (string | undefined)[]) {
  return (
    classes
      .filter((f) => f) // Filter out undefined or falsy class names
      .map((m) => m?.split(' ')) // Split each valid class name by space
      .flat() // Flatten the resulting array
      .join(' ') // Join class names with a space
      .trim() || undefined // Trim the resulting string; return undefined if empty
  )
}
