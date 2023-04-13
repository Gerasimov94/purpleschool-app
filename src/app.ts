import { json } from 'body-parser';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import { IConfigService } from 'src/config/config.service.interface';
import { IPrismaService } from 'src/db/prisma.service.interface';
import { IExceptionFilter } from 'src/errors/types';
import { IUserController } from 'src/user/interfaces/user.interface';

@injectable()
export default class App {
	app: Express;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IPrismaService) private prismaService: IPrismaService,
	) {
		this.app = express();
		this.port = 8080;
	}

	useRoutes() {
		this.app.use('/user', this.userController.router);
	}

	useMiddleware() {
		this.app.use(json());
	}

	useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	async init() {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		await this.prismaService.connect();
		this.app.listen(this.port, () => {
			this.logger.log(`Server is running at port: ${this.port}`);
		});
	}
}
