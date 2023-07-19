import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { connection } from "../sql/connection";
// import { hash, compare } from "../crypt/crypt";
require('dotenv').config();
const webpush = require('web-push')
import { body, validationResult } from 'express-validator';
const secret: string = process.env.SECRET as string;

export const loginHandler = (req: Request, res: Response) => {
    const errors = validationResult(req);
    let messages: Array<string> = []
    if (errors) {
        errors.array().forEach((error) => {
            messages.push(error.msg)
        })
        console.log(messages);
        if (messages.length > 0) {
            return res.status(400).json({
                messages: messages
            })
        }
    }
    const { email, password } = req.body
    const verified = connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (err: any, rows: any, fields: any) {
        if (err) throw err;
        if (rows.length > 0) {
            const token = jwt.sign(req.body, secret, {
                expiresIn: 60 * 60 * 12
                // expiresIn: 60 * 60 * 12
            })

            return res.json({
                token,
            })
        }
        else {
            return res.status(401).json({
                messages: ["Usuario o Contraseña incorrectos"]
            })
        }
    })

}

export const profileHandler = (req: Request, res: Response) => {
    return res.json({
        profile: req.user,
        message: "profile data"
    })
}