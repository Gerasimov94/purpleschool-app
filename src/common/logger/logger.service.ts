import { ERROR_LEVEL, INFO_LEVEL, WARNING_LEVEL } from 'src/common/constants';
import { IAbstractMonitoringSystem } from 'src/common/types/abstract';
import { Logger, ILogObj } from 'tslog';

export default class LoggerService {
	public logger: Logger<ILogObj>;
	private _monitoringService: IAbstractMonitoringSystem;
	constructor(monitoringService: IAbstractMonitoringSystem) {
		this.logger = new Logger<ILogObj>();
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
