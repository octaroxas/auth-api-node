import { Request, Response, Router, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

const auth = Router();

auth.post('/token', (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers['authorization'];
        
        if(!authHeader) {
            throw new ForbiddenError("Credenciais não informadas!")
        } else {
            res.json(authHeader)
        }

    } catch(error) {
        next(error);
    }

})

export default auth;