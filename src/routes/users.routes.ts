import Router, { Response, Request, NextFunction } from 'express'

const usersRouter = Router()

usersRouter.get('/users', (req: Request, res: Response, next: NextFunction) => {
    const users = [
        {
            userName: 'Octa'
        }
    ]
    res.status(200).send(users)
})

usersRouter.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    
    // podemos definir qual o formato o objeto request deve possuir
    // Nesse caso estou dizendo que na requisição é esperado o parametro uuid
    // dessa forma é possivel usar o autocomplete com o params

    const uuid  = req.params.uuid

    const user = { uuid: uuid, userName: 'Octa' }
    res.status(200).send(user)
})

export default usersRouter;