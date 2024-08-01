import { useEffect, useRef } from 'react'

/**
 * Custom hook to detect clicks outside of a specified element and execute a callback function
 * @param callback - The function to be executed when a click outside the element is detected
 * @returns A reference object to be attached to the element to detect outside clicks
 */
export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  // Create a ref object to be attached to the target element
  const ref = useRef<T>(null)

  useEffect(() => {
    // Function to handle click events
    const handleClick = (event: MouseEvent) => {
      // Ensure the event target is an element
      if (!event.target || !(event.target instanceof Element)) return

      // If the clicked element is outside the ref element, execute the callback
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Add the click event listener to the document
    document.addEventListener('click', handleClick, true)

    // Cleanup function to remove the event listener when the component is unmounted or ref changes
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref])

  // Return the ref object to be attached to the target element
  return ref
}
