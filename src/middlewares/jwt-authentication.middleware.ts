import JWT  from 'jsonwebtoken';
import { NextFunction, Response, Request} from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

export default async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    try {

        const authHeader = req.headers['authorization']

        if(!authHeader){
            throw new ForbiddenError('Credenciais não informadas!')
        }

        const [authType, token] = authHeader.split(' ')

        if(authType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválida!')
        }

        try {
            const tokenPayload = JWT.verify(token,'secret-hash')

            if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new ForbiddenError('Token invalido!')
            }

            const uuid = tokenPayload.sub;
            const user = await userRepository.findById(uuid)

            req.user = user;
            next()
        } catch (error) {
            throw new ForbiddenError('Token invalido!')
        }
    } catch (error) {
        next(error)
    }
}