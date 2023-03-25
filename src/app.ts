import express, { Express } from 'express';
import LoggerService from 'src/common/logger/logger.service';
import { ExceptionFilter } from 'src/errors/exception.filter';
import UserController from 'src/users/controllers/users.controller';

interface IApp {
	logger: LoggerService;
	init(): void;
	app: Express;
	port: number;
}

interface AppConfig {
	port: number;
	Logger: LoggerService;
	userController: UserController;
	exceptionFilter: ExceptionFilter;
}

export default class App implements IApp {
	app: Express;
	port: number;
	logger: LoggerService;
	userController: UserController;
	exceptionFilter: ExceptionFilter;

	constructor({
		Logger, port = 8080, userController, exceptionFilter,
	}: AppConfig) {
		this.app = express();
		this.port = port;
		this.logger = Logger;
		this.userController = userController;
		this.exceptionFilter = exceptionFilter;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
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
