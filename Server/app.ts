require('dotenv').config();
import express from 'express'
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import path = require('path')



const app = express()
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(authRoutes)

app.use(express.static(path.join(__dirname, 'public')));

export default app