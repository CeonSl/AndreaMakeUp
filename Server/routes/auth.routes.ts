import { Router } from "express";
import { loginHandler, profileHandler } from "../controllers/auth.controller";
// , webpushHandler
import { requireAuth } from '../middlewares/requireAuth'
import { body } from "express-validator";

const router = Router()

router.post('/login',
    body('email', 'Debe ingresar un email valido').isEmail().escape(),
    body('password', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }).escape(),
    loginHandler)

router.get('/graphics', requireAuth, profileHandler)

export default router