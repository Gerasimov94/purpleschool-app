import { inject, injectable } from 'inversify';
import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';
import User from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/interfaces/user.service.interface';
import 'reflect-metadata';
import { IConfigService } from 'src/config/config.service.interface';
import { TYPES } from 'src/common/constants';

@injectable()
export default class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService)
		private _configService: IConfigService,
	) {}

	async createUser({ name, email, password }: UserRegisterDTO): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this._configService.get<string>('PWD_SALT');
		await newUser.setPassword(password, +salt.replace(/\D/g, ''));

		return null;
	}

	async validateUser(data: UserLoginDTO): Promise<boolean> {
		return true;
	}
}
