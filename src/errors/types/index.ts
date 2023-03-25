import { NextFunction, Response, Request } from 'express';

export interface IExceptionFilter {
	catch(err: Error, req: Request, res: Response, nextFn: NextFunction): void;
}
