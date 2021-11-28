import Router, { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import userRepository from '../repositories/user.repository'

const usersRouter = Router()

usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).json(users)
})

usersRouter.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    
    // podemos definir qual o formato o objeto request deve possuir
    // Nesse caso estou dizendo que na requisição é esperado o parametro uuid
    // dessa forma é possivel usar o autocomplete com o params

    const uuid  = req.params.uuid

    const user = await userRepository.findById(uuid)
    res.status(StatusCodes.OK).json(user)
})

usersRouter.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    res.status(StatusCodes.CREATED).json(user)

})

usersRouter.put('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const user = { uuid: uuid, msg: 'User alterado' }
    res.status(StatusCodes.OK).json(user)
})

usersRouter.delete('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    const user = { uuid: uuid, msg: 'User deletado' }
    res.status(StatusCodes.OK).json(user)
})

export default usersRouter;