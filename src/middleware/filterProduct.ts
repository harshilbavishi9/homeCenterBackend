import { Request, Response, NextFunction } from "express";

declare module 'express-serve-static-core' {
  interface Request {
    startDate: Date;
    specificDate: {
      start: number,
      end: number
    };
  }
}
export const filterMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const timeFilter: any = req.query.time;
  const specificDate: any = req.query.date;
  const currentDate = new Date();

  if (!specificDate && !timeFilter) {
    req.startDate = new Date('2023-10-01');
  }

  if (specificDate && timeFilter) {
    return res.status(400).json({
      message: "Do not use date and time together",
      status: false
    })
  }

  if (timeFilter) {

    const match = timeFilter.match(/(\d+)([dmy])/);

    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];

      switch (unit) {
        case 'd':
          currentDate.setDate(currentDate.getDate() - value);
          break;
        case 'm':
          currentDate.setMonth(currentDate.getMonth() - value);
          break;
        case 'y':
          currentDate.setFullYear(currentDate.getFullYear() - value);
          break;
        default:
          currentDate;
          break;
      }
      req.startDate = currentDate;
    }
  }

  if (specificDate) {

    const parts = specificDate.split('-');
    if (parts.length === 3) {

      const specificDateString = new Date(JSON.stringify(specificDate));
      const start = specificDateString.setHours(0, 0, 0, 0);
      const end = specificDateString.setHours(23, 59, 59, 999);

      req.specificDate = {
        start: start,
        end: end
      };
    }

  }

  next();
};