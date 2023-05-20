import { inject, injectable } from 'inversify';
import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';
import User from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/services/user.service.interface';
import 'reflect-metadata';
import { IConfigService } from 'src/config/config.service.interface';
import { TYPES } from 'src/common/constants';
import { IUsersRepository } from 'src/user/repository/users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export default class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private _configService: IConfigService,
		@inject(TYPES.IUsersRepository) private _usersRepository: IUsersRepository,
	) {}

	async createUser({
		name,
		email,
		password,
	}: UserRegisterDTO): Promise<UserModel | null | undefined> {
		const newUser = new User(email, name);
		// const salt = this._configService.get<string>('PWD_SALT_LENGTH').replace(/\D/g, '');
		const salt = +this._configService.get<string>('PWD_SALT_LENGTH');
		await newUser.setPassword(password, salt);

		const isUserExists = await this._usersRepository.find(newUser.email);

		if (isUserExists) return null;

		return this._usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDTO) {
		const user = await this._usersRepository.find(email);

		if (user) {
			const res = await new User(user.email, user.name).comparePasswords(password, user.password);

			return res;
		}

		return false;
	}

	async getUserByEmail(email: UserModel['email']) {
		const user = await this._usersRepository.find(email);

		if (user) {
			return user;
		}

		return null;
	}
}
