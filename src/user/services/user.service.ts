import { injectable } from 'inversify';
import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';
import User from 'src/user/entities/user.entity';
import { IUserService } from 'src/user/interfaces/user.service.interface';
import 'reflect-metadata';

@injectable()
export default class UserService implements IUserService {
	async createUser({ name, email, password }: UserRegisterDTO): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);

		return null;
	}

	async validateUser(data: UserLoginDTO): Promise<boolean> {
		return true;
	}
}
