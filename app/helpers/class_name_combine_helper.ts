/**
 * Combines multiple class names into a single string.
 * Filters out undefined or falsy class names, splits each valid class name by space,
 * flattens the resulting array, joins them with a space, and trims the result.
 *
 * @param classes - An array of strings representing class names to combine
 * @returns A string of combined class names or undefined if no valid classes are provided
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
