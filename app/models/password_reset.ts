import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

/** A custom type for Password Reset Tokens */
export type PasswordResetToken = Opaque<'PasswordResetToken', string>

/** Represents a record used for password reset requests */
export default class PasswordReset extends BaseModel {
  /** Primary key ID of the password reset record */
  @column({ isPrimary: true })
  declare token: PasswordResetToken

  /** Email address of the user */
  @column()
  declare email: string

  /** Date/time when the user record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
