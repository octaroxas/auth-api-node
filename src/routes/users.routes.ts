import Router, { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware'
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

usersRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const userUuid = await userRepository.create(req.body)
    res.status(StatusCodes.CREATED).json(userUuid)

})

usersRouter.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const id = req.params.uuid
    const { name, passwrd } = req.body
    await userRepository.update({name, passwrd, id})
    res.status(StatusCodes.OK).json()
})

usersRouter.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid
        await userRepository.remove(uuid)
        res.status(StatusCodes.OK).json()
    } catch(err) {
        next(err)
    }
})

usersRouter.get('/user-profile', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    res.json(user)

})

export default usersRouter;