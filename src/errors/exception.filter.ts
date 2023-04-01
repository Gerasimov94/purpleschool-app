import { Response, Request, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import HTTPError from 'src/errors/basic/http-error';
import { IExceptionFilter } from 'src/errors/types';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	// eslint-disable-next-line no-useless-constructor
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	catch(err: Error | HTTPError, req: Request, res: Response, _next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`${`${err.context}:` ?? ''} Status code ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else if (err instanceof Error) {
			this.logger.error(err.message);
			res.status(500).send({ err: err.message });
		}
	}
}
