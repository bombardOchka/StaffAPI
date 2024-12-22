import { DataSource } from 'typeorm';
import { configOrm } from './config/orm.config';
export default new DataSource(configOrm);
