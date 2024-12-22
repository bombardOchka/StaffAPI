import { BadRequestException, Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffEntity } from './staff.entity';
import { StaffRelationsEntity } from './staffrelation.entity';
import { CreateStaffMemberDto } from './dto/createStaffMember.dto';
import { IUserSalaryByDate } from './types/userSalaryByDate.type';
import { DATE_BEFORE_JOINDATE_ERROR } from './staff.constants';
import { TotalSalary } from './types/totalSalary.type';
@Controller('staff')
export class StaffController {
	constructor(private readonly staffService: StaffService) {}

	@Post('')
	@UsePipes(new ValidationPipe())
	async createStaffMember(@Body() staffMember: CreateStaffMemberDto): Promise<StaffEntity> {
		return await this.staffService.createStaffMember(staffMember);
	}

	@Get('filter')
	async getStaffWithFilter(
		@Query('firstName') firstName?: string,
		@Query('lastName') lastName?: string,
		@Query('middleName') middleName?: string,
	): Promise<StaffEntity[]> {
		return await this.staffService.filterStaff({ firstName, lastName, middleName });
	}

	@Post('relation/supervisor/:supervisorId/subordinate/:subordinateId')
	async createStaffRelation(
		@Param('supervisorId') supervisorId: string,
		@Param('subordinateId') subordinateId: string,
	): Promise<StaffRelationsEntity> {
		return await this.staffService.createStaffRelation(supervisorId, subordinateId);
	}

	@Get('relation/supervisor/:supervisorId')
	async findStaffRelationBySupervisor(@Param('supervisorId') supervisorId: string): Promise<StaffRelationsEntity[]> {
		return await this.staffService.findStaffRelationBySupervisor(supervisorId);
	}

	@Get('relation/subordinate/:subordinateId')
	async findStaffRelationBySubordinate(@Param('subordinateId') subordinateId: string): Promise<StaffRelationsEntity[]> {
		return await this.staffService.findStaffRelationBySubordinate(subordinateId);
	}

	@Get('salary')
	async getStaffMemberSalary(@Query('id') id: string, @Query('date') date: string): Promise<IUserSalaryByDate | BadRequestException> {
		const staffMemberSalaryByDate = await this.staffService.getSalary(id, new Date(date));
		if (staffMemberSalaryByDate.hasOwnProperty('error')) {
			throw new BadRequestException(DATE_BEFORE_JOINDATE_ERROR);
		}
		return staffMemberSalaryByDate;
	}

	@Get('salaryAll')
	async getAllStaffMembersSalary(@Query('date') date: string): Promise<IUserSalaryByDate[]> {
		return await this.staffService.getAllStaffSalaries(date);
	}

	@Get('salaryTotal')
	async getTotalStaffMembersSalary(@Query('date') date: string): Promise<TotalSalary> {
		const allStaffMembersSalary = await this.staffService.getAllStaffSalaries(date);
		const totalSalary = allStaffMembersSalary.reduce((sum, employee) => sum + employee.salary, 0);
		return { date: new Date(date), totalSalary };
	}
}
