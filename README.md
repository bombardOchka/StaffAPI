# StaffAPI

The API about calculating salary for staff members by arbitrary time. The app has two tables: first - staff members table, which contains info (full name, joinDate, baseSalary, type) about all staff members, second - staff members relations, which contains nodes between supervisor and subordinates. The program has only one feature, which stores all the API logic. It's a good app for calculating salaries with minimal input, it need modernization to global realize this program. At start it need more CRUD operation, app has only base salary for staff members and low specification, at a minimum, the program should include a date of layoffs. If count of types of staff members will increase, the logic will need to be refactored, to make it more flexible. Logic for difference base salary was inserted, if you want you can add the "baseSalary" with your salary to create staff member.

Staff-API using SQLite database by migrations
To create migration:
- npm run db:drop
- npm run db:create -- src/migrations/<MigrationName>
- npm run db:migrate
