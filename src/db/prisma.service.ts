import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from 'src/db/prisma.service.interface';
import 'reflect-metadata';
import { TYPES } from 'src/common/constants';
import { ILogger } from 'src/common/logger/logger.interface';

@injectable()
export default class PrismaService implements IPrismaService {
	private _prismaClient: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this._prismaClient = new PrismaClient();
	}
	async connect() {
		try {
			await this._prismaClient.$connect();
			this.logger.log('[PrismaService]: Successfully connected to DB');
		} catch (err) {
			if (err instanceof Error) {
				this.logger.error(`[PrismaService]: Cannot establish connection to DB: ${err.message}`);
			}
		}
	}

	async disconnect() {
		await this._prismaClient.$disconnect();
	}
}
