import { Request, Response, Router, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const auth = Router();

auth.post('/token',basicAuthenticationMiddleware ,async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = req.user;

        if(!user) {
            throw new ForbiddenError('Credenciais não informadas!')
        }

        const payload = {username: user?.username}
        const options =  {subject: user?.uuid}
        
        const jwt = JWT.sign(payload,'secret-hash',options)
        res.status(StatusCodes.OK).json({token: jwt})

    } catch(error) {
        next(error);
    }

})

// retorna ok se o token for valido
auth.get('/token/validate',jwtAuthenticationMiddleware,(req: Request, res: Response, next: NextFunction)=>{
    res.sendStatus(StatusCodes.OK)
})

export default auth;