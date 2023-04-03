import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import { ExceptionFilter } from 'src/errors/exception.filter';
import { IUserController } from 'src/user/interfaces/user.interface';

@injectable()
export default class App {
	app: Express;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8080;
	}

	useRoutes() {
		this.app.use('/user', this.userController.router);
	}

	useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	async init() {
		this.useRoutes();
		this.useExceptionFilter();
		this.app.listen(this.port, () => {
			this.logger.log(`Server is running at port: ${this.port}`);
		});
	}
}
