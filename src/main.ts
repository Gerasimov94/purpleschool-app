import { config as initializeConfig } from 'dotenv';
import { Container, ContainerModule, interfaces } from 'inversify';
import Rollbar from 'rollbar';
import App from 'src/app';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import LoggerService from 'src/common/logger/logger.service';
import ConfigService from 'src/config/config.service';
import { IConfigService } from 'src/config/config.service.interface';
import PrismaService from 'src/db/prisma.service';
import { IPrismaService } from 'src/db/prisma.service.interface';
import { ExceptionFilter } from 'src/errors/exception.filter';
import { IExceptionFilter } from 'src/errors/types';
import { IMonitoring } from 'src/monitoring/monitoring.interface';
import UserController from 'src/user/controllers/user.controller';
import { IUserController } from 'src/user/entities/user.interface';
import { IUserService } from 'src/user/services/user.service.interface';
import UsersRepository from 'src/user/repository/users.repository';
import { IUsersRepository } from 'src/user/repository/users.repository.interface';
import UserService from 'src/user/services/user.service';

initializeConfig();

const rollbar = new Rollbar({
	accessToken: process.env.MONITORING_SERVICE_API_KEY,
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const AppBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.App).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IMonitoring>(TYPES.MonitoringSystem).toConstantValue(rollbar);
	bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
	bind<IPrismaService>(TYPES.IPrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope();
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
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
