import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from 'src/common/constants';
import { IPrismaService } from 'src/db/prisma.service.interface';
import User from 'src/user/entities/user.entity';
import { IUsersRepository } from 'src/user/repository/users.repository.interface';
import 'reflect-metadata';

@injectable()
export default class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.IPrismaService) private prismaService: IPrismaService) {}

	async create({ email, password, name }: User) {
		return this.prismaService.prismaClient.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: UserModel['email']) {
		return this.prismaService.prismaClient.userModel.findFirst({
			where: { email },
		});
	}
}
