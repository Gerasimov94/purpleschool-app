/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import BaseController from 'src/common/controllers/base.controller';
import { ILogger } from 'src/common/logger/logger.interface';
import HTTPError from 'src/errors/basic/http-error';
import { IUserController } from 'src/user/interfaces/user.interface';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) public loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{ method: 'get', path: '/register', cb: this.register },
			{ method: 'post', path: '/login', cb: this.login },
		]);
	}

	login(_req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, 'login err'));
	}

	register(_req: Request, res: Response, _next: NextFunction) {
		this.ok(res, 'register');
	}
}
