import vine from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

/** The password's options */
export type Options = {
  /** Option for requiring lowercase letters */
  minuscule?: boolean
  /** Option for requiring uppercase letters */
  majuscule?: boolean
  /** Option for requiring numbers */
  number?: boolean
  /** Option for requiring special characters */
  special?: boolean
}

/** Implementation of the password validation function */
function password(value: unknown, options: Options | undefined, field: FieldContext) {
  /**
   * Step 1: Skip validation for non-string values.
   * The "string" rule will handle the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  /** Step 2: Skip further validation if the field is already invalid. */
  if (!field.isValid) {
    return
  }

  /** Step 3: build the regex pattern and message */
  const regexValue = ['^'] // Start building the regex pattern
  const message = [] // Initialize an array to hold validation messages

  // Add lowercase letter requirement to regex and message
  if (options === undefined || options.minuscule === undefined || options.minuscule) {
    regexValue.push('(?=.*[a-z])')
    message.push('one lowercase letter')
  }

  // Add uppercase letter requirement to regex and message
  if (options === undefined || options.majuscule === undefined || options.majuscule) {
    regexValue.push('(?=.*[A-Z])')
    message.push('one uppercase letter')
  }

  // Add number requirement to regex and message
  if (options === undefined || options.number === undefined || options.number) {
    regexValue.push('(?=.*\\d)')
    message.push('one number')
  }

  // Add special character requirement to regex and message
  if (options === undefined || options.special === undefined || options.special) {
    regexValue.push('(?=.*\\W)')
    message.push('one special character')
  }

  regexValue.push('.+$') // End the regex pattern
  const regex = new RegExp(regexValue.join('')) // Combine all parts into a single regex pattern

  /** Step 4: If the value does not match the regex pattern, report an error */
  if (!regex.test(value)) {
    const lastMessage = message.pop() // Remove the last message item for formatting
    field.report(
      'The {{field}} must contain at least ' + message.join(', ') + ' and ' + lastMessage,
      'password',
      field
    )
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const passwordRule = vine.createRule(password)
