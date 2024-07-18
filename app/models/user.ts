import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

/** Authentication finder using 'scrypt' hashing algorithm for password */
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'], // Use email as the unique identifier for authentication
  passwordColumnName: 'password', // Name of the column storing hashed passwords
})

/** A custom type for User ID */
export type UserId = Opaque<'UserId', string>

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UserId

  /** Full name of the user */
  @column()
  declare fullName?: string

  /** Email address of the user */
  @column()
  declare email: string

  /** Hashed password stored securely */
  @column({ serializeAs: null })
  declare password: string

  /** Date/time when the user record was created */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /** Date/time when the user record was last update */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
