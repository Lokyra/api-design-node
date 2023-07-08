import { NextFunction, Request, Response } from 'express'
import { User } from '@prisma/client'
import jwt, { verify }  from 'jsonwebtoken'
import * as bycrypt from 'bcrypt'   


export const comparePassword = (password: string, hash: string) => {
    return bycrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
    return bycrypt.hash(password, 5)
}

export const createJWT = (user: User) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
    process.env.JWT_SECRET as string
    )
    return token
}

type RequestWithUser = Request & {
    user: string | jwt.JwtPayload
}

export const protect = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization


    if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(401)
        res.json({message: 'You are not authorized'})
        return
    }
    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({message: 'token not valid'})
        return
    }

    try {
        const user = verify(token, process.env.JWT_SECRET as string)
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        res.status(401)
        res.json({message: 'token not valid'})
        return
    }
}
