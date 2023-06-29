import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import cors from 'cors';
import 'dotenv/config'
import { postCreateValidation, registerValidation, loginValidation, commentAddValidation} from './validations/index.js';
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import { handleValidationError } from './utils/handleValidationError.js';

mongoose.connect(process.env.MONGODB_SERVER)
  .then(() => console.log('Connected with Database'))
  .catch((err) => console.log('Failed to connected with Database', err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
}) 

const upload = multer({ storage })

const app = express()

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.json())

const PORT = 8080;

app.post('/auth/login', loginValidation, handleValidationError, UserController.login)
app.post('/auth/register',registerValidation, handleValidationError, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationError, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.post('/posts/:id/comment', checkAuth, commentAddValidation, handleValidationError, PostController.addComment)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: '/uploads/' + req.file.originalname
  })
})

app.listen(
  PORT,
  () => console.log(`Server listening on ${PORT} port`)
)