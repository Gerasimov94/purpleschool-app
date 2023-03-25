import { Response, Request, NextFunction } from 'express';
import LoggerService from 'src/common/logger/logger.service';
import HTTPError from 'src/errors/basic/http-error';
import { IExceptionFilter } from 'src/errors/types';

export class ExceptionFilter implements IExceptionFilter {
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof Error) {
			this.logger.error(err.message);
			res.status(500).send({ err: err.message });
		}
		if (err instanceof HTTPError) {
			this.logger.error(`${err.context}: Status code ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		}
	}
}
