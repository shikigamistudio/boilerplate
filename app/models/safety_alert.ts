import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import User, { type UserEnumFields, type UserId } from './user.js'

/** A custom type for Revert Email Tokens */
export type SafetyAlertToken = Opaque<'SafetyAlertToken', string>

/** Represents safety alert records related to user changes */
export default class SafetyAlert extends BaseModel {
  /** Primary key ID of the safety alert record */
  @column({ isPrimary: true })
  declare token: SafetyAlertToken

  /** The related user id */
  @column()
  declare userId: UserId

  /** The related user model */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  /** Changes of the user */
  @column()
  declare changes: { [Property in UserEnumFields]?: User[Property] }

  /** Date/time when the user record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
