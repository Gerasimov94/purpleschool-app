import { Router, Request, Response, NextFunction } from 'express';
import { IMiddleware } from 'src/common/types/middleware.interface';

export interface IControllerRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	cb: (req: Request, res: Response, next: NextFunction) => void;
	middlewares?: IMiddleware[];
}
