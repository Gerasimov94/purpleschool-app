import { NextFunction, Request, Response } from 'express';
import BaseController from 'src/common/controllers/base.controller';

export interface IUserController extends BaseController {
	login: (_req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
}
