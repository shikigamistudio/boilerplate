import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import User, { type UserId } from './user.js'

/** A custom type for Revert Email Tokens */
export type AccountChangeToken = Opaque<'RevertEmailChangeToken', string>

export default class AccountChange extends BaseModel {
  @column({ isPrimary: true })
  declare token: AccountChangeToken

  /** The related user id */
  @column()
  declare userId: UserId

  /** The related user model */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  /** Email address of the user */
  @column()
  declare email: string

  /** Date/time when the user record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
