import { Exception } from '@adonisjs/core/exceptions'

export default class InvalidExpiredUrlException extends Exception {
  static status = 400
  static code = 'E_INVALID_EXPIRED_URL'
  static message = 'Invalid or expired URL'
}
