import { DotenvParseOutput, config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';
import { IConfigService } from 'src/config/config.service.interface';
import 'reflect-metadata';

@injectable()
export default class ConfigService implements IConfigService {
	private config!: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result = config();

		if (result.error) {
			logger.error('[ConfigService]: Cannot read from .env file. Check syntax and file existance');
		} else {
			this.logger.log('[ConfigService]: .env config successfully loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
