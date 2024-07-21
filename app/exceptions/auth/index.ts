import UnloggedException from './unlogged_exception.js'

// Define an object to map error codes to their corresponding exceptions
const errors = {
  /** Error code for unlogged user */
  E_UNLOGGED: UnloggedException,
}

// Export the errors object for use in other parts of the application
export { errors }
