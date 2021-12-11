import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

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
        const [email, password] = tokenContent.split(':')

        if(!email || !password) {
            throw new ForbiddenError("Credenciais não informadas");
        }

        const user: User|null = await userRepository.getUserByCredentials(email, password)
        
        if(!user) {
            throw new ForbiddenError('Usuario ou senha incorretos!')
        }

        req.user = user;
        next()
        
    } catch (error) {
        next(error)
    }
}