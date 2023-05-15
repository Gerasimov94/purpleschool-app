/* eslint-disable @typescript-eslint/indent */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UserLoginDTO {
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email' })
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}
