import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffEntity } from './staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRelationsEntity } from './staffrelation.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StaffEntity]), TypeOrmModule.forFeature([StaffRelationsEntity])],
	providers: [StaffService],
	controllers: [StaffController],
	exports: [StaffService],
})
export class StaffModule {}
