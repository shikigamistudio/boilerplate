/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

/** Import the authentication routes defined in a separate file */
import './routes/auth.js'
import './routes/fragments.js'

import router from '@adonisjs/core/services/router'

/** Import controllers asynchronously */
const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'handle']) // route to display the landing page
