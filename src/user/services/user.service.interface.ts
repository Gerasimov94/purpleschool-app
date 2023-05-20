import { UserModel } from '@prisma/client';
import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';

export interface IUserService {
	createUser(user: UserRegisterDTO): Promise<UserModel | null | undefined>;
	validateUser(data: UserLoginDTO): Promise<boolean>;
	getUserByEmail(email: UserModel['email']): Promise<UserModel | null>;
}
