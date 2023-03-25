import { Router, Response } from 'express';
import { IControllerRoute } from 'src/common/controllers/types';
import LoggerService from 'src/common/logger/logger.service';

export default abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: LoggerService) {
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

	public created(res:Response) {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		routes.forEach((route) => {
			this.logger.log(route.path, route.method);
			const bindedHandler = route.cb.bind(this);
			this._router[route.method](route.path, bindedHandler);
		});
	}
}
