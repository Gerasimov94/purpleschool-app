import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from 'src/common/types/middleware.interface';
import { verify } from 'jsonwebtoken';

export default class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	async execute(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.headers.authorization) {
				verify(req.headers.authorization.split(' ')[2], this.secret, (err, payload: any) => {
					if (err) {
						next();
					} else if (payload) {
						req.user = payload.email;

						next();
					}
				});
			} else {
				next();
			}
		} catch (error) {
			res.send(403).send({ error: 'Invalid JWT' });
		}
	}
}
