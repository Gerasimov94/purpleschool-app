import App from 'src/app';
import Logger from 'src/common/logger/logger.service';
import { config as initializeConfig } from 'dotenv';
import Rollbar from 'rollbar';
import UserController from 'src/users/controllers/users.controller';
import { ExceptionFilter } from 'src/errors/exception.filter';

initializeConfig();

const rollbar = new Rollbar({
	accessToken: process.env.MONITORING_SERVICE_API_KEY,
	captureUncaught: true,
	captureUnhandledRejections: true,
});

const logger = new Logger(rollbar);

(async () => {
	const app = new App({
		Logger: logger,
		port: 8080,
		userController: new UserController(logger),
		exceptionFilter: new ExceptionFilter(logger),
	});

	await app.init();
})();
