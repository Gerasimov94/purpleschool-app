import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import {
	TYPES, INFO_LEVEL, WARNING_LEVEL, ERROR_LEVEL,
} from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import { IMonitoring } from 'src/monitoring/monitoring.interface';
import { Logger } from 'tslog';

@injectable()
export default class LoggerService implements ILogger {
	public logger: Logger<ILogger>;
	private _monitoringService: IMonitoring;

	constructor(@inject(TYPES.MonitoringSystem) monitoringService: ILogger) {
		this.logger = new Logger<ILogger>();
		this._monitoringService = monitoringService;
	}

	log(...args: unknown[]) {
		this.logger.log(INFO_LEVEL, 'info', args.join(', '));
	}

	warn(...args: unknown[]) {
		this.logger.warn(WARNING_LEVEL, 'warn', args);
	}

	error(...args: unknown[]) {
		this._monitoringService.error(args);

		this.logger.error(ERROR_LEVEL, 'error', args);
	}
}
