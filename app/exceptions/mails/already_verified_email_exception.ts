import { Exception } from '@adonisjs/core/exceptions'

export default class AlreadyVerifiedEmailException extends Exception {
  static status = 400
  static code = 'E_ALREADY_VERIFIED_EMAIL'
  static message = 'The user has already validate his email'
}
