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
}

export const arrayHelper = {
  /** Remove an element from an array by index. */
  removeByIndex<T>(arr: T[], index: number) {
    arr.splice(index, 1)
  },

  /** Remove the first occurrence of a value from an array. */
  removeByValue<T>(arr: T[], value: T) {
    const index = arr.indexOf(value)
    arr.splice(index, 1)
  },
}

export const numberHelper = {
  /** Generate a random integer between min and max (inclusive). */
  randInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
}

export const stringHelper = {
  /** Trim all extra spaces from a string, including leading, trailing, and multiple spaces between words. */
  trimAll(str: string) {
    return str.replace(/(^ +| {2,}| +$)/g, ' ').trim()
  },

  /** Check if a string is empty. */
  isEmpty(str?: string) {
    return str === undefined || str === null || str.trim().length === 0 || string.isEmpty('')
  },
}
