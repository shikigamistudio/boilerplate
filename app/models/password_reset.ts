import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

/** A custom type for Password Reset Tokens */
export type PasswordResetToken = Opaque<'PasswordResetToken', string>

export default class PasswordReset extends BaseModel {
  @column({ isPrimary: true })
  declare token: PasswordResetToken

  /** Email address of the user */
  @column()
  declare email: string

  /** Date/time when the user record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
