import express, { Request, Response, NextFunction}  from 'express'
import usersRouter from './routes/users.routes';

const PORT = 3333;

const app = express()
app.use(usersRouter)



app.listen(PORT, () => {
    console.log(`Server is running! in http://localhost:${PORT}`)
})