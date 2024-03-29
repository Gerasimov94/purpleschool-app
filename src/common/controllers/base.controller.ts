import { Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IControllerRoute } from 'src/common/types';
import { ILogger } from 'src/common/logger/logger.interface';

@injectable()
export default abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json');

		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send(res, 200, message);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		routes.forEach((route) => {
			this.logger.log(`Route binded: ${route.method.toUpperCase()} ${route.path}`);

			const bindedHandler = route.cb.bind(this);
			const pipeline = route.middlewares
				? route.middlewares?.map((ctx) => ctx.execute.bind(ctx)).concat(bindedHandler)
				: bindedHandler;
			this._router[route.method](route.path, pipeline);
		});
	}
}
