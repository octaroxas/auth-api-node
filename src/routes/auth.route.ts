import { Request, Response, Router, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";

const auth = Router();

auth.post('/token', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers['authorization'];
        
        if(!authHeader) {
            throw new ForbiddenError("Credenciais não informadas!")
        } 

        const [authType, token] = authHeader.split(' ');

        if(authType !== 'Basic' || !token ) {
            throw new ForbiddenError('Tipo de autenticação inválida!')
        }

        // o token base64 é desemcriptado e armazenado em tokenContent como uma string
        const tokenContent = Buffer.from(token,'base64').toString('utf-8')

        // tokenContent = username:password
        const [username, password] = tokenContent.split(':')

        if(!username || !password) {
            throw new ForbiddenError("Credenciais não informadas");
        }

        const user = await userRepository.getUserByCredentials(username, password)
        
        if(!user) {
            throw new ForbiddenError('Usuario ou senha incorretos!')
        }

        const payload = {username: user.username}
        const options =  {subject: user?.uuid}
        
        const jwt = JWT.sign(payload,'secret-hash',options)
        res.status(StatusCodes.OK).json({token: jwt})

    } catch(error) {
        next(error);
    }

})

export default auth;