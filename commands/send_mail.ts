import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import User from '#models/user'
import SendVerifyEmailsAction from '../app/actions/send_verify_emails_action.js'

/** SendMail command class for sending a verification email. */
export default class SendMail extends BaseCommand {
  /** The name of the command. */
  static commandName = 'send:mail'

  /** The description of the command. */
  static description = 'Send a verification email to a user'

  /** Options for the command. */
  static options: CommandOptions = {
    startApp: true, // Option to start the application before running the command
  }

  /** Executes the command to send a verification email. */
  async run() {
    // Create a new user instance with the specified email
    const user = new User()
    user.email = 'user@example.com'

    // Instantiate the SendVerifyEmailsAction with the user
    const sendEmail = new SendVerifyEmailsAction(user)

    // Send the verification email
    await sendEmail.send()
  }
}
