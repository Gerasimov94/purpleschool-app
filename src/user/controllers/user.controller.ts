/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import BaseController from 'src/common/controllers/base.controller';
import { ILogger } from 'src/common/logger/logger.interface';
import ValidateMiddleware from 'src/common/middlewares/validation.middleware';
import HTTPError from 'src/errors/basic/http-error';
import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';
import { IUserController } from 'src/user/entities/user.interface';
import { IUserService } from 'src/user/services/user.service.interface';
import { sign } from 'jsonwebtoken';
import { IConfigService } from 'src/config/config.service.interface';
import AuthGuardMiddleware from 'src/common/middlewares/auth.guard.middleware';

@injectable()
export default class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.IConfigService) private configService: IConfigService,
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
			{
				method: 'get',
				path: '/info',
				cb: this.info,
				middlewares: [new AuthGuardMiddleware()],
			},
		]);
	}

	async login(
		{ body }: Request<Record<never, never>, Record<never, never>, UserLoginDTO>,
		res: Response,
		next: NextFunction,
	) {
		const isUserValid = await this.userService.validateUser(body);

		if (!isUserValid) return next(new HTTPError(401, 'Auth error', 'login'));

		const jwt = await this.signJWT(body.email, this.configService.get('JWT_SECRET'));

		this.ok(res, { jwt });
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

	async info(
		req: Request<Record<never, never>, Record<never, never>, UserRegisterDTO>,
		res: Response,
	) {
		const user = await this.userService.getUserByEmail(req.user);

		this.ok(res, { user_id: user?.id, email: user?.email });
	}

	async signJWT(email: string, secret: string) {
		try {
			const res = sign({ email, iat: Math.floor(Date.now() / 1000) }, secret, {
				algorithm: 'HS256',
			});

			return res;
		} catch (error) {
			this.loggerService.error('Cannot sign JWT');
		}
	}
}
