import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StaffType {
	EMPLOYEE = 'Employee',
	MANAGER = 'Manager',
	SALES = 'Sales',
}

@Entity({ name: 'staff' })
export class StaffEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	middleName: string;

	@Column({
		type: 'text',
	})
	type: StaffType;

	@Column()
	joinDate: Date;

	@Column({ default: 1000 })
	baseSalary: number;
}
