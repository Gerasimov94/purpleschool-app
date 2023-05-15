import { PrismaClient } from '@prisma/client';

export interface IPrismaService {
	connect: () => void;
	disconnect: () => void;
	prismaClient: PrismaClient;
}
