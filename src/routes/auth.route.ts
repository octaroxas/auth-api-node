import { Request, Response, Router, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const auth = Router();

auth.post('/login',basicAuthenticationMiddleware ,async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = req.user;
        console.log(user)

        if(!user) {
            throw new ForbiddenError('Credenciais não informadas!')
        }

        const payload = {
            id: user?.id, 
            name: user?.name, 
            email: user.email, 
            user_type: user.user_type,
            description_text: user.description_text,
            profile_pic:user?.profile_pic, 
            profile_cover: user?.profile_cover
        }
        const options =  {subject: user?.id}
        
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