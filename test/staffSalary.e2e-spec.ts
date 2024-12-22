import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateStaffMemberDto } from 'src/staff/dto/createStaffMember.dto';
import { testStaffMembers, testStaffMembersRelations } from './test-data/staffMembers';

describe('AppController (e2e)', () => {
	let app: INestApplication;
	const staffMembers: CreateStaffMemberDto[] = testStaffMembers;
	const staffMembersRelations: { supervisorId: number; subordinateId: number }[] = testStaffMembersRelations;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		for (const member of staffMembers) {
			await request(app.getHttpServer()).post('/staff').send(member);
		}

		for (const relation of staffMembersRelations) {
			await request(app.getHttpServer()).post(`/staff/relation/supervisor/${relation.supervisorId}/subordinate/${relation.subordinateId}`);
		}
	});

	it('/staff/salary (GET) - staff member (1)', async () => {
		const response = await request(app.getHttpServer()).get('/staff/salary?id=1&date=2024-01-01').expect(200);
		expect(response.body).toHaveProperty('salary', 1050);
	});

	it('/staff/salary (GET) - staff member (8)', async () => {
		return await request(app.getHttpServer()).get('/staff/salary?id=8&date=2024-01-01').expect(400);
	});

	it('/staff/salaryTotal (GET)', async () => {
		const response = await request(app.getHttpServer()).get('/staff/salaryTotal?date=2024-01-01').expect(200);
		expect(response.body).toHaveProperty('totalSalary', 15382);
	});

	afterAll(async () => {
		await app.close();
	});
});
