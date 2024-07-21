import { BaseCommand, args, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import User from '#models/user'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a new user'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string()
  declare email: string

  @flags.string({ alias: 'n' })
  declare name?: string

  @flags.string({ alias: 'p', default: 'secret' })
  declare password: string

  @flags.string({ alias: 'v', default: false, allowEmptyValue: true })
  declare verified: boolean

  prepare() {
    // Verify if the email is successfully gave
    if (this.email.trim().length === 0) {
      throw new Error('The email is not set')
    }
    this.email.trim().toLowerCase()

    this.verified = /true/.test('' + this.verified)
  }

  async run() {
    this.logger.info(`Creating user ${this.email} with password "${this.password}"`)

    let emailValidateAt: DateTime<true> | null = null
    if (this.verified) emailValidateAt = DateTime.now()

    await User.create({
      fullName: this.name,
      email: this.email,
      password: this.password,
      emailValidateAt,
    })

    this.logger.success('User created successfully')
  }
}
