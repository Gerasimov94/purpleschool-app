import { config as initializeConfig } from 'dotenv';
import { Container, ContainerModule, interfaces } from 'inversify';
import Rollbar from 'rollbar';
import App from 'src/app';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import LoggerService from 'src/common/logger/logger.service';
import { ExceptionFilter } from 'src/errors/exception.filter';
import { IExceptionFilter } from 'src/errors/types';
import { IMonitoring } from 'src/monitoring/monitoring.interface';
import UserController from 'src/user/controllers/user.controller';
import { IUserController } from 'src/user/interfaces/user.interface';

initializeConfig();

const rollbar = new Rollbar({
	accessToken: process.env.MONITORING_SERVICE_API_KEY,
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const AppBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IMonitoring>(TYPES.MonitoringSystem).toConstantValue(rollbar);
	bind<App>(TYPES.App).to(App);
});

const bootstrap = () => {
	try {
		const appContainer = new Container();
		appContainer.load(AppBindings);
		const app = appContainer.get<App>(TYPES.App);

		app.init();

		return { app, appContainer };
	} catch (err) {
		console.log(err);

		return {
			app: null,
			appContainer: null,
		};
	}
};

export const { app, appContainer } = bootstrap();
