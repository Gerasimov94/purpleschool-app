/* eslint-disable @typescript-eslint/indent */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class UserRegisterDTO {
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email' })
	email!: string;

	@IsNotEmpty()
	@IsString({ message: 'Missing password' })
	password!: string;

	@IsNotEmpty()
	@IsString({ message: 'Missing name' })
	name!: string;
}
