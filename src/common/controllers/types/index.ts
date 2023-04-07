import { Router, Request, Response, NextFunction } from 'express';

export interface IControllerRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	cb: (req: Request, res: Response, next: NextFunction) => void;
}
