import express, { Request, Response, NextFunction}  from 'express'
import usersRouter from './routes/users.routes';

const PORT = 3333;

const app = express()
// User json para entender os dados recebidos nas requisições
app.use(express.json())
// faz com que parametros passados pela url sejam entendidos, query params por exemplpo
app.use(express.urlencoded({extended:true}))
app.use(usersRouter)

app.listen(PORT, () => {
    console.log(`Server is running! in http://localhost:${PORT}`)
})