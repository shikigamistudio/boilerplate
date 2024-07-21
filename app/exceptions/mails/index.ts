// Import custom exceptions for email verification
import AlreadyVerifiedEmailException from './already_verified_email_exception.js'
import InvalidExpiredUrlException from './invalid_expired_url_exception.js'

// Define an object to map error codes to their corresponding exceptions
const errors = {
  /** Error code for already verified email */
  E_ALREADY_VERIFIED_EMAIL: AlreadyVerifiedEmailException,
  /** Error code for invalid or expired URL */
  E_INVALID_EXPIRED_URL: InvalidExpiredUrlException,
}

// Export the errors object for use in other parts of the application
export { errors }
