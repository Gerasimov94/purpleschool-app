export interface IAbstractLogger {
	log(args: unknown[]): void;
	error(args: unknown[]): void;
	warn(args: unknown[]): void;
}

export type IAbstractMonitoringSystem = IAbstractLogger;
