import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffController } from './staff/staff.controller';
import { StaffModule } from './staff/staff.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from './config/orm.config';

@Module({
	imports: [TypeOrmModule.forRoot(configOrm), StaffModule],
	controllers: [AppController, StaffController],
	providers: [AppService],
})
export class AppModule {}
