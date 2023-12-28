import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface DecodedToken {
    admin: DecodedToken | undefined;
    userId: string;
}

interface CustomRequest extends Request {
    user?: DecodedToken;
}

const verifyToken = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded: DecodedToken = jwt.verify(token, process.env.TOKEN_KEY as Secret) as DecodedToken;
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

const verifyTokenAndAdmin = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.admin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

export { verifyToken, verifyTokenAndAdmin };
