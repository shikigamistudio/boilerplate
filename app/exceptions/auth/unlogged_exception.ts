import { Exception } from '@adonisjs/core/exceptions'

export default class UnloggedException extends Exception {
  static status = 401
  static code = 'E_UNLOGGED'
  static message = 'The user must be logged'
}
