export interface IConfigService {
	get: <T extends number | string>(key: string) => T;
}
