import { NextFunction, Request, Response } from 'express';

import BaseController from 'src/common/controllers/base.controller';
import LoggerService from 'src/common/logger/logger.service';
import HTTPError from 'src/errors/basic/http-error';

export default class UserController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger);

		this.bindRoutes([
			{ method: 'get', path: '/register', cb: this.register },
			{ method: 'post', path: '/login', cb: this.login },
		]);
	}

	private login(_req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, 'login err'));
	}

	private register(_req: Request, res: Response) {
		this.ok(res, 'register');
	}
}
