import express, { Request, Response, NextFunction}  from 'express'
import usersRouter from './routes/users.routes';
import errorHandler from './middlewares/error.handler.middlewares';
import auth from './routes/auth.route';
import bearerAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import cors from 'cors'

const PORT = 3333;

const app = express()
app.use(cors())
// User json para entender os dados recebidos nas requisições
app.use(express.json())
// faz com que parametros passados pela url sejam entendidos, query params por exemplpo
app.use(express.urlencoded({extended:true}))
//o conjunto de rotas de usuario so podera ser acessado se o usuario fornecer um token jwt em seu header
app.use(auth)
app.use(bearerAuthenticationMiddleware)
app.use(usersRouter)

// COnfigura o middleware de error
app.use(errorHandler)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running! in http://localhost:${PORT}`)
})