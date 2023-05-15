import { compare, hash } from 'bcryptjs';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class User {
	private _password!: string;

	// eslint-disable-next-line no-useless-constructor
	constructor(private readonly _email: string, private readonly _name: string) {}

	get email() {
		return this._email;
	}

	get name() {
		return this._name;
	}

	get password() {
		return this._password;
	}

	public async setPassword(pwd: string, salt = 10) {
		this._password = await hash(pwd, salt);

		return this._password;
	}

	public async comparePasswords(pwd: string, saltedPwd: string) {
		const isEqual = await compare(pwd, saltedPwd);

		return isEqual;
	}
}
