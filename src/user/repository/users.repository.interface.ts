import { UserModel } from '@prisma/client';
import User from 'src/user/entities/user.entity';

export interface IUsersRepository {
	create(user: User): Promise<UserModel | undefined>;
	find(user: UserModel['email']): Promise<UserModel | null>;
}
