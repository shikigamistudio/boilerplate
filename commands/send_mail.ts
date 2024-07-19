import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import mail from '@adonisjs/mail/services/main'

import VerifyEmailNotification from '#mails/verify_email_notification'
import User from '#models/user'

export default class SendMail extends BaseCommand {
  static commandName = 'send:mail'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const user = new User()
    user.email = 'user@example.com'

    await mail.send(new VerifyEmailNotification(user))
  }
}
