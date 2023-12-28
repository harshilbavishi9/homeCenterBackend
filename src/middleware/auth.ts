import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import User, { IUserModel } from '../model/userModel';

interface CustomRequest extends Request {
  user?: IUserModel | null;
}

export const isAuthenticatedUser = (async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token: string = req.headers['x-access-token'] as string;
  if (!token) {
    return res.status(401).json({ status: false, message: "Please Login to access this resource" });
  }

  try {
    const decodedData: any = verify(token, process.env.TOKEN_KEY as string);
    req.user = await User.findById(decodedData?.user_id);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, message: "Invalid Token Please Login Again" });
  }
});

// export const authorizeRoles = (...roles: string[]) => {
//   return (req: CustomRequest, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       res.status(403).json({ status: false, message: `Role: ${req.user.role} is not allowed to access this resource` });
//       return next()
//     }
//     next();
//   };
// };
