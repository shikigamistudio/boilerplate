import { BaseCommand, args, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import User from '#models/user'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a new user'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string()
  declare email: string

  @flags.string({ alias: 'p', default: 'secret' })
  declare password: string

  prepare() {
    // Verify if the email is successfully gave
    if (this.email.trim().length === 0) {
      throw new Error('The email is not set')
    }
    this.email.trim().toLowerCase()
  }

  async run() {
    this.logger.info(`Creating user ${this.email} with password "${this.password}"`)
    await User.create({ email: this.email.toLowerCase(), password: this.password })
    this.logger.success('User created successfully')
  }
}
