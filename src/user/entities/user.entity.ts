import { hash } from 'bcryptjs';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class User {
	private _password: string | undefined;

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

	public async setPassword(pwd: string, salt = 1337) {
		this._password = await hash(pwd, salt);

		return this._password;
	}
}
