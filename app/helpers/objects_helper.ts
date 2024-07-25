import string from '@adonisjs/core/helpers/string'

export const objectHelper = {
  /** Deep clone an object. */
  clone<T extends object>(obj: T): T {
    const clones = new WeakMap()
    const cloneFn = (function baseClone(obj) {
      // Return primitive values as-is
      if (obj !== Object(obj)) return obj

      // Return the cached clone if available
      if (clones.has(obj)) return clones.get(obj)

      // Create a new object to hold the clone
      const cloneObj: any = {}
      clones.set(obj, cloneObj)

      // Recursively clone all properties
      Object.entries(obj).forEach(([k, v]) => (cloneObj[k] = baseClone(v)))
      return cloneObj
    })(obj)

    return cloneFn
  },

  /** Check if an object is empty. */
  isEmpty<T extends object>(obj: T) {
    return Object.entries(obj).filter(([_key, value]) => value !== undefined).length === 0
  },
}

export const arrayHelper = {
  /** Remove an element from an array by index. */
  removeByIndex<T>(arr: T[], index: number) {
    arr.splice(index, 1)
  },

  /** Remove the first occurrence of a value from an array. */
  removeFirstByValue<T>(arr: T[], value: T) {
    const index = arr.indexOf(value)
    if (index !== -1) {
      arr.splice(index, 1)
    }
  },

  /** Remove the all occurrences of a value from an array. */
  removeAllByValue<T>(arr: T[], value: T) {
    /** Step 1: Filter out all elements that are equal to the specified value */
    const filteredArray = arr.filter((item) => item !== value)

    /** Step 2: Clear the original array */
    arr.length = 0

    /** Step 3: Push all the filtered elements back into the original array */
    arr.push(...filteredArray)
  },
}

export const numberHelper = {
  /** Generate a random integer between min and max (inclusive). */
  randInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  /** Generate a random float between min and max (inclusive). */
  randFloat(min: number, max: number) {
    return Math.random() * (max - min) + min
  },
}

export const stringHelper = {
  /** Trim all extra spaces from a string, including leading, trailing, and multiple spaces between words. */
  trimAll(str: string) {
    return str.replace(/(^ +| {2,}| +$)/g, ' ').trim()
  },

  /** Check if a string is empty. */
  isEmpty(str?: string | null) {
    return str === undefined || str === null || str.trim().length === 0 || string.isEmpty('')
  },
}
