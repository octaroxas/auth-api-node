import express, { Request, Response, NextFunction}  from 'express'

const PORT = 3333;

const app = express()


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({msg: 'ok'})
})

app.listen(PORT, () => {
    console.log(`Server is running! in http://localhost:${PORT}`)
})