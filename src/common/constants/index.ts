export const INFO_LEVEL = 3;
export const WARNING_LEVEL = 4;
export const ERROR_LEVEL = 5;

export const TYPES = {
	ILogger: Symbol.for('ILogger'),
	App: Symbol.for('App'),
	IUserController: Symbol.for('IUserController'),
	IConfigService: Symbol.for('IConfigService'),
	ExceptionFilter: Symbol.for('ExceptionFilter'),
	MonitoringSystem: Symbol.for('MonitoringSystem'),
	IUserService: Symbol.for('IUserService'),
	IPrismaService: Symbol.for('IPrismaService'),
	IUsersRepository: Symbol.for('IUsersRepository'),
};
