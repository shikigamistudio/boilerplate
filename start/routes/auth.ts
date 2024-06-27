import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')

router
  .group(() => {
    router.get('login', [LoginController, 'handle'])
    router.post('login', [LoginController, 'execute'])
    router.get('register', [RegisterController, 'handle'])
    router.post('register', [RegisterController, 'execute'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.delete('logout', [LogoutController, 'execute'])
  })
  .use(middleware.auth())
