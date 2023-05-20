import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from 'src/common/types/middleware.interface';
import HTTPError from 'src/errors/basic/http-error';

export default class AuthGuardMiddleware implements IMiddleware {
	async execute({ user }: Request, res: Response, next: NextFunction) {
		try {
			if (user) {
				next();
			} else {
				next(new HTTPError(401, 'User unauthorized', 'info'));
			}
		} catch (error) {
			next(new HTTPError(401, 'User unauthorized', 'info'));
		}
	}
}
