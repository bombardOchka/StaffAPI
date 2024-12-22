import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { StaffEntity } from './staff.entity';

@Entity({ name: 'staffRelations' })
export class StaffRelationsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => StaffEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'supervisorId' })
	supervisor: StaffEntity;

	@ManyToOne(() => StaffEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'subordinateId' })
	subordinate: StaffEntity;
}
