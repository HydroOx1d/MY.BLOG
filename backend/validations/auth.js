import { body } from "express-validator";

export const registerValidation = [
  body('email', 'Укажите корректную почту').isEmail(),
  body('password', 'Не менее, чем 5 символов').isLength({min: 5}),
  body('username', 'Имя пользователя должно быть не короче, чем 3 символа').isLength({min: 3}),
  body('avatarUrl', 'Некорректная сыылка на аватарку').optional().isURL()
]