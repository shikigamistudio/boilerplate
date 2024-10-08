import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

/** Import controllers asynchronously */
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const ForgotPasswordController = () => import('#controllers/auth/forgot_password_controller')
const ResetPasswordController = () => import('#controllers/auth/reset_password_controller')
const ProfileController = () => import('#controllers/auth/profile_controller')
const SendVerifyEmailController = () => import('#controllers/auth/send_verify_email_controller')
const VerifyEmailController = () => import('#controllers/auth/verify_email_controller')
const RestoreSettingsController = () => import('#controllers/auth/restore_settings_controller')
const DeleteUsersController = () => import('#controllers/auth/delete_users_controller')

/** Regex to verify ther uuid format */
const uuidRegex = /^[a-zA-Z0-9]{8}-([a-zA-Z0-9]{4}-){3}[a-zA-Z0-9]{12}$/

/** Define routes for unauthenticated users (guest routes) */
router
  .group(() => {
    router.get('login', [LoginController, 'handle']) // route to display the login page
    router.post('login', [LoginController, 'execute']) // route to process the login action
    router.get('register', [RegisterController, 'handle']) // route to display the register page
    router.post('register', [RegisterController, 'execute']) // route to process the register action
    router.get('forgot-password', [ForgotPasswordController, 'handle']) // route for displaying the forgot password page
    router.post('forgot-password', [ForgotPasswordController, 'execute']) // route for handling the forgot password form submission
    router
      .get('reset-password/:token', [ResetPasswordController, 'handle'])
      .where('token', uuidRegex)
      .as('reset-password') // route for displaying the reset password page
    router
      .post('reset-password/:token', [ResetPasswordController, 'execute'])
      .where('token', uuidRegex) // route for handling the reset password form submission
  })
  .use(middleware.guest()) // Apply guest middleware to the group

/** Define routes for authenticated users */
router
  .group(() => {
    router.delete('logout', [LogoutController, 'execute']) // route to perform the logout action
    router.get('profile', [ProfileController, 'handle']).as('profile') // route to display the profile page
    router.post('profile', [ProfileController, 'execute']) // route to process the profile update action
    router.post('send-verify-email', [SendVerifyEmailController, 'execute']) // route to send a verification email
    router
      .get('verify-email/:id', [VerifyEmailController, 'handle'])
      .where('id', uuidRegex)
      .as('verify-email') // route to verify the email address with a given ID
    router
      .get('retry-verify-email', [SendVerifyEmailController, 'execute']) // route for retrying email verification
      .as('retry.verify-email')
    router.delete('delete-user', [DeleteUsersController, 'execute']) // route to perform the delete user action
  })
  .use(middleware.auth()) // Apply authentication middleware to the group

/** Define routes for all users */
router
  .get('restore-settings/:token', [RestoreSettingsController, 'handle'])
  .where('token', uuidRegex)
  .as('restore-settings') // route to revert the account with a given Token
