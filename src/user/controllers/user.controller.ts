/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import BaseController from 'src/common/controllers/base.controller';
import { ILogger } from 'src/common/logger/logger.interface';
import ValidateMiddleware from 'src/common/validation/validation.middleware';
import HTTPError from 'src/errors/basic/http-error';
import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';
import User from 'src/user/entities/user.entity';
import { IUserController } from 'src/user/entities/user.interface';
import { IUserService } from 'src/user/services/user.service.interface';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				method: 'post',
				path: '/register',
				cb: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDTO)],
			},
			{
				method: 'post',
				path: '/login',
				cb: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDTO)],
			},
		]);
	}

	async login(
		{ body }: Request<Record<never, never>, Record<never, never>, UserLoginDTO>,
		res: Response,
		next: NextFunction,
	) {
		const isUserValid = await this.userService.validateUser(body);

		if (!isUserValid) return next(new HTTPError(422, 'User is not found', 'login'));

		this.ok(res, { isUserValid });
	}

	async register(
		{ body }: Request<Record<never, never>, Record<never, never>, UserRegisterDTO>,
		res: Response,
		next: NextFunction,
	) {
		const user = await this.userService.createUser(body);

		if (!user) return next(new HTTPError(422, 'This user already exists', 'register'));
		this.ok(res, { user });
	}
}
