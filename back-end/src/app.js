// Importa as variáveis de ambiente do arquivo .env
import dotenv from 'dotenv'
dotenv.config()

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
//import usersRouter from "./routes/users.js";

const app = express();

// Helmet é um pacote que provê várias medidas de segurança,
// como esconder a tecnologia empregada pelo back-end
// (cabeçalho X-Powered-By)
import helmet from 'helmet'
app.use(helmet())

import cors from 'cors'
app.use(cors({
  origin: process.env.FRONT_END_SERVER.split(','),
  credentials: true   // Aceita cookies na requisição
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
//app.use("/users", usersRouter);

// MIDDLEWARE DE AUTENTICAÇÃO
import auth from './middleware/auth.js'
app.use(auth)

// MIDDLEWARE DE LIMITAÇÃO DE TAXA DE ACESSO

// Todas as rotas serão afetadas
// import rateLimiter from './middleware/rate-limiter.js'
// app.use(rateLimiter)

/**************************************************
 * ROTAS
 **************************************************/

import userRouter from './routes/user.js'
app.use('/users', userRouter)

export default app;