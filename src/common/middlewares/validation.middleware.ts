import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from 'src/common/types/middleware.interface';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export default class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	async execute({ body }: Request, res: Response, next: NextFunction) {
		const instance = plainToInstance(this.classToValidate, body);

		try {
			const errors = await validate(instance);

			if (errors.length) {
				res.status(422).send({ errors });
			} else {
				next();
			}
		} catch (error) {
			res.send(422).send({ error: 'Cannot validate errors' });
		}
	}
}
