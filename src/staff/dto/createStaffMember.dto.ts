import { IsString, IsEnum, IsNotEmpty, IsNumber, IsDate, IsOptional } from 'class-validator';
import { StaffType } from '../staff.entity';
import { Transform } from 'class-transformer';

export class CreateStaffMemberDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	middleName: string;

	@IsEnum(StaffType)
	@IsNotEmpty()
	type: StaffType;

	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsNotEmpty()
	joinDate: Date;

	@IsNumber()
	@IsOptional()
	baseSalary?: number;
}
