import { CreateStaffMemberDto } from 'src/staff/dto/createStaffMember.dto';
import { StaffType } from '../../src/staff/staff.entity';

export const testStaffMembers: CreateStaffMemberDto[] = [
	{
		firstName: 'Tester1',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.SALES,
		joinDate: new Date('2020-01-01'),
	},
	{
		firstName: 'Tester2',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.MANAGER,
		joinDate: new Date('2021-05-02'),
	},
	{
		firstName: 'Tester3',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.MANAGER,
		joinDate: new Date('2019-12-03'),
	},
	{
		firstName: 'Tester4',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.SALES,
		joinDate: new Date('2023-12-31'),
	},
	{
		firstName: 'Tester5',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.EMPLOYEE,
		joinDate: new Date('2020-04-25'),
	},
	{
		firstName: 'Tester6',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.EMPLOYEE,
		joinDate: new Date('2017-02-05'),
	},
	{
		firstName: 'Tester7',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.SALES,
		joinDate: new Date('2012-05-15'),
	},
	{
		firstName: 'Tester8',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.MANAGER,
		joinDate: new Date('2025-04-04'),
	},
	{
		firstName: 'Tester9',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.EMPLOYEE,
		joinDate: new Date('2015-10-16'),
	},
	{
		firstName: 'Tester10',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.SALES,
		joinDate: new Date('2019-12-01'),
	},
	{
		firstName: 'Tester11',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.SALES,
		joinDate: new Date('2011-11-11'),
	},
	{
		firstName: 'Tester12',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.EMPLOYEE,
		joinDate: new Date('2021-02-13'),
	},
	{
		firstName: 'Tester13',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.EMPLOYEE,
		joinDate: new Date('2022-05-25'),
	},
	{
		firstName: 'Tester14',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.MANAGER,
		joinDate: new Date('2022-04-05'),
	},
	{
		firstName: 'Tester15',
		lastName: 'Shevchenko',
		middleName: 'Grigorovich',
		type: StaffType.EMPLOYEE,
		joinDate: new Date('2020-09-29'),
	},
];

export const testStaffMembersRelations: { supervisorId: number; subordinateId: number }[] = [
	{
		supervisorId: 1,
		subordinateId: 2,
	},
	{
		supervisorId: 2,
		subordinateId: 3,
	},
	{
		supervisorId: 2,
		subordinateId: 4,
	},
	{
		supervisorId: 2,
		subordinateId: 5,
	},
	{
		supervisorId: 4,
		subordinateId: 6,
	},
	{
		supervisorId: 1,
		subordinateId: 7,
	},
	{
		supervisorId: 7,
		subordinateId: 8,
	},
	{
		supervisorId: 7,
		subordinateId: 9,
	},
	{
		supervisorId: 8,
		subordinateId: 10,
	},
	{
		supervisorId: 8,
		subordinateId: 11,
	},
	{
		supervisorId: 11,
		subordinateId: 12,
	},
	{
		supervisorId: 11,
		subordinateId: 13,
	},
	{
		supervisorId: 11,
		subordinateId: 14,
	},
	{
		supervisorId: 1,
		subordinateId: 15,
	},
];
