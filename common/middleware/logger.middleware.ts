import { Request, Response, NextFunction } from 'express';

// use the functional middleware whenerver the middle ware does not have any dependencies
// import { Injectable, NestMiddleware } from '@nestjs/common';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
