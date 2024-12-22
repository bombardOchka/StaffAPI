import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity, StaffType } from './staff.entity';
import { StaffRelationsEntity } from './staffrelation.entity';
import {
	DATE_BEFORE_JOINDATE_ERROR,
	MEMBER_ALREADY_SUBORDINATE_ERROR,
	NO_PERMISSIONS_ERROR,
	SUBORDINATE_NOT_FOUND_ERROR,
	SUPERVISOR_NOT_FOUND_ERROR,
} from './staff.constants';
import { CreateStaffMemberDto } from './dto/createStaffMember.dto';
import { IUserSalaryByDate } from './types/userSalaryByDate.type';

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(StaffEntity) private readonly staffRepository: Repository<StaffEntity>,
		@InjectRepository(StaffRelationsEntity) private readonly staffRelationsRepository: Repository<StaffRelationsEntity>,
	) {}

	async createStaffMember(user: CreateStaffMemberDto): Promise<StaffEntity> {
		return await this.staffRepository.save(user);
	}

	async filterStaff(filters: { firstName?: string; lastName?: string; middleName?: string }): Promise<StaffEntity[]> {
		const query = this.staffRepository.createQueryBuilder('staff');

		if (filters.firstName) {
			query.andWhere('staff.firstName = :firstName', { firstName: filters.firstName });
		}

		if (filters.lastName) {
			query.andWhere('staff.lastName = :lastName', { lastName: filters.lastName });
		}

		if (filters.middleName) {
			query.andWhere('staff.middleName = :middleName', { middleName: filters.middleName });
		}

		return await query.getMany();
	}

	async createStaffRelation(supervisorId: string, subordinateId: string): Promise<StaffRelationsEntity> {
		const supervisor = await this.staffRepository.findOne({ where: { id: Number(supervisorId) } });
		if (!supervisor) {
			throw new NotFoundException(SUPERVISOR_NOT_FOUND_ERROR);
		}

		const subordinate = await this.staffRepository.findOne({ where: { id: Number(subordinateId) } });
		if (!subordinate) {
			throw new NotFoundException(SUBORDINATE_NOT_FOUND_ERROR);
		}

		if (supervisor.type == StaffType.EMPLOYEE) {
			throw new ForbiddenException(NO_PERMISSIONS_ERROR);
		}

		const existingSubordinate = await this.findStaffRelationBySubordinate(subordinateId);
		if (existingSubordinate[0]) {
			throw new ConflictException(MEMBER_ALREADY_SUBORDINATE_ERROR);
		}

		return await this.staffRelationsRepository.save({
			supervisor,
			subordinate,
		});
	}

	async findStaffRelationBySupervisor(supervisorId: string): Promise<StaffRelationsEntity[]> {
		return await this.staffRelationsRepository.find({
			where: { supervisor: { id: Number(supervisorId) } },
			relations: ['supervisor', 'subordinate'],
		});
	}

	async findStaffRelationBySubordinate(subordinateId: string): Promise<StaffRelationsEntity[]> {
		return await this.staffRelationsRepository.find({
			where: { subordinate: { id: Number(subordinateId) } },
			relations: ['supervisor', 'subordinate'],
		});
	}

	async getSalary(staffMemberId: string, pointDate: Date): Promise<IUserSalaryByDate> {
		const staffMember = await this.staffRepository.findOne({ where: { id: Number(staffMemberId) } });
		const staffMemberSalaryByDate: IUserSalaryByDate = {
			id: staffMember.id,
			date: pointDate,
			salary: 0,
			level: 1,
		};

		const staffMemberExperience = this.getYearsBetweenDates(staffMember.joinDate, pointDate);
		if (staffMemberExperience < 0) {
			staffMemberSalaryByDate.error = DATE_BEFORE_JOINDATE_ERROR;
			return staffMemberSalaryByDate;
		}
		staffMemberSalaryByDate.level = staffMemberExperience;

		let staffMemberSalaryBonusByYears: number;
		if (staffMember.type == StaffType.EMPLOYEE) {
			staffMemberSalaryBonusByYears = Math.min(staffMemberExperience * 0.03, 0.3);
			staffMemberSalaryByDate.salary = staffMember.baseSalary * (1 + staffMemberSalaryBonusByYears);
		} else if (staffMember.type == StaffType.MANAGER) {
			staffMemberSalaryBonusByYears = Math.min(staffMemberExperience * 0.05, 0.4);
			staffMemberSalaryByDate.salary = staffMember.baseSalary * (1 + staffMemberSalaryBonusByYears);
			const staffMemberSubordinates = (await this.findStaffRelationBySupervisor(staffMemberId)).map((elem) => elem.subordinate);
			for (const subordinate of staffMemberSubordinates) {
				const subordinateSalaryByDate = await this.getSalary(subordinate.id.toString(), pointDate);
				if (!subordinateSalaryByDate.hasOwnProperty('error') && subordinateSalaryByDate.level == 0) {
					staffMemberSalaryByDate.salary += 0.005 * subordinateSalaryByDate.salary;
				}
			}
		} else if (staffMember.type == StaffType.SALES) {
			staffMemberSalaryBonusByYears = Math.min(staffMemberExperience * 0.01, 0.35);
			staffMemberSalaryByDate.salary = staffMember.baseSalary * (1 + staffMemberSalaryBonusByYears);
			const staffMemberSubordinates = (await this.findStaffRelationBySupervisor(staffMemberId)).map((elem) => elem.subordinate);
			for (const subordinate of staffMemberSubordinates) {
				const subordinateSalaryByDate = await this.getSalary(subordinate.id.toString(), pointDate);
				if (!subordinateSalaryByDate.hasOwnProperty('error')) {
					staffMemberSalaryByDate.salary += 0.003 * subordinateSalaryByDate.salary;
				}
			}
		}
		return { ...staffMemberSalaryByDate, salary: Math.round(staffMemberSalaryByDate.salary) };
	}

	getYearsBetweenDates(date1: Date, date2: Date): number {
		if (date2 < date1) {
			return -1;
		}

		let yearsDifference = date2.getFullYear() - date1.getFullYear();

		if (date2.getMonth() < date1.getMonth() || (date2.getMonth() === date1.getMonth() && date2.getDate() < date1.getDate())) {
			yearsDifference--;
		}

		return yearsDifference;
	}

	async getAllStaffSalaries(date: string): Promise<IUserSalaryByDate[]> {
		const allStaffMembers = await this.filterStaff({});
		const allStaffMembersSalary: IUserSalaryByDate[] = [];
		for (const staffMember of allStaffMembers) {
			const staffMemberSalaryByDate = await this.getSalary(staffMember.id.toString(), new Date(date));
			allStaffMembersSalary.push(staffMemberSalaryByDate);
		}
		return allStaffMembersSalary;
	}
}
