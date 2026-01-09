import { registerUser} from '../controllers/registercontroller.js'

import { Router } from 'express'
const route = Router()


route.post('/register',registerUser);
export default route;