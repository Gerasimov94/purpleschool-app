import { config as initializeConfig } from 'dotenv';
import { Container } from 'inversify';
import Rollbar from 'rollbar';
import App from 'src/app';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import LoggerService from 'src/common/logger/logger.service';
import { ExceptionFilter } from 'src/errors/exception.filter';
import { IExceptionFilter } from 'src/errors/types';
import { IMonitoring } from 'src/monitoring/monitoring.interface';
import UserController from 'src/users/controllers/users.controller';

initializeConfig();

const rollbar = new Rollbar({
	accessToken: process.env.MONITORING_SERVICE_API_KEY,
	captureUncaught: true,
	captureUnhandledRejections: true,
});

try {
	const appContainer = new Container();
	appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
	appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	appContainer.bind<UserController>(TYPES.UserController).to(UserController);
	appContainer.bind<IMonitoring>(TYPES.MonitoringSystem).toConstantValue(rollbar);
	appContainer.bind<App>(TYPES.App).to(App);
	const app = appContainer.get<App>(TYPES.App);

	app.init();
} catch (error) {
	console.log(error);
}
