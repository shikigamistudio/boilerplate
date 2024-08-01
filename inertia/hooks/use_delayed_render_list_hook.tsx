import { useEffect, useState } from 'react'

/**
 * Custom hook to manage the delayed rendering of a list of items
 * @param delay - The delay in milliseconds between the addition of each item to the visible list
 * @param list - The list of items to render with a delay
 * @param duration - The duration in milliseconds of each item
 * @returns The list of items that are currently visible
 */
export function useDelayedRenderList<T>(delay: number, list?: T[], duration?: number) {
  // State to keep track of currently visible items
  const [visibleItems, setVisibleItems] = useState<T[]>([])

  useEffect(() => {
    // Check if the provided list has items
    if (list && list.length > 0) {
      // Initialize current delay to 0
      let currentDelay = 0

      list.forEach((item) => {
        setTimeout(() => {
          // Update the visible items state by appending the current item
          setVisibleItems((prevItems) => [...prevItems, item])

          if (duration) {
            // Remove the toast after 1 minute
            setTimeout(() => {
              // Update the visible items state by removing the current item
              setVisibleItems((prevItems) => prevItems.filter((f) => f !== item))
            }, duration)
          }
        }, currentDelay)

        currentDelay += delay // Adjust the delay between each toast
      })
    }
  }, [list]) // Dependency array, re-run the effect if the list changes

  // Return the list of visible items
  return visibleItems
}
