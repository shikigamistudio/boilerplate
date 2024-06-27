/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import './routes/auth.js'

import router from '@adonisjs/core/services/router'

const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'handle'])
