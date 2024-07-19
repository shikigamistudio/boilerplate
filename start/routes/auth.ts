import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

/** Import controllers asynchronously */
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const ProfileController = () => import('#controllers/auth/profile_controller')
const SendVerifyEmailsController = () => import('#controllers/auth/send_verify_emails_controller')
const VerifyEmailController = () => import('#controllers/auth/verify_email_controller')

/** Define routes for unauthenticated users (guest routes) */
router
  .group(() => {
    router.get('login', [LoginController, 'handle']) // route to display the login page
    router.post('login', [LoginController, 'execute']) // route to process the login action
    router.get('register', [RegisterController, 'handle']) // route to display the register page
    router.post('register', [RegisterController, 'execute']) // route to process the register action
  })
  .use(middleware.guest()) // Apply guest middleware to the group

/** Define routes for authenticated users */
router
  .group(() => {
    router.delete('logout', [LogoutController, 'execute']) // route to perform the logout action
    router.get('profile', [ProfileController, 'handle']) // route to display the profile page
    router.post('profile', [ProfileController, 'execute']) // route to process the profile update action
    router.post('send-verify-email', [SendVerifyEmailsController, 'execute']) // route to send a verification email
    router.get('verify-email/:id', [VerifyEmailController, 'handle']).as('verify-email') // route to verify the email address with a given ID
  })
  .use(middleware.auth()) // Apply authentication middleware to the group
