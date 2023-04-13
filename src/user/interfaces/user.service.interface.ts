import UserLoginDTO from 'src/user/dto/user-login.dto';
import UserRegisterDTO from 'src/user/dto/user-register.dto';
import User from 'src/user/entities/user.entity';

export interface IUserService {
	createUser(user: UserRegisterDTO): Promise<User | null>;
	validateUser(data: UserLoginDTO): Promise<boolean>;
}
