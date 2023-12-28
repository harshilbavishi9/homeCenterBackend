import { Request, Response, NextFunction } from "express";

declare module 'express-serve-static-core' {
  interface Request {
    searchRegex?: RegExp;
  }
}

export const searchMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const query: any = req.query.search;

  if (typeof query === 'string') {
    const searchRegex = new RegExp(query, 'i');
    req.searchRegex = searchRegex;
    next();
  } else {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }
};
