import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const configOrm: SqliteConnectionOptions = {
	type: 'sqlite',
	database: 'database.sqlite',
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],
	synchronize: false,
	migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
	logging: false,
};
