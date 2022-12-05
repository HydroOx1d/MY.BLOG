import express from 'express'
import mongoose from 'mongoose'

import {  registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'

mongoose.connect(
  'mongodb+srv://HydroOx1d:qwerty667@full-stack-app.gdtsuu7.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('Connected with Database'))
 .catch((err) => console.log('Failed to connected with Database', err));


const app = express()
app.use(express.json())

const PORT = 8080;

app.post('/auth/login', UserController.login)

app.post('/auth/register',registerValidation, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(
  PORT,
  () => console.log(`Server listening on ${PORT} port`)
)