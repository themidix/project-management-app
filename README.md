# project-management-app

Project Management API
Overview
This is the backend API for a project management application. It is built using Node.js, Express, and TypeORM, and it provides RESTful endpoints for user authentication, project management, and task management. The API is designed to be consumed by a React frontend, allowing users to register, log in, and manage their projects and tasks.

Features
User Authentication:

Register a new user.
Login with email and password to receive a JWT token.
Secure endpoints using JWT-based authentication.
Project Management:

Create new projects.
List all projects associated with a logged-in user.
Update project details.
Delete projects.
Task Management:

Add, update, and delete tasks associated with a project (future implementation).
Tech Stack
Node.js: JavaScript runtime environment.
Express: Web framework for Node.js.
TypeORM: ORM for managing database interactions.
PostgreSQL: Relational database management system.
JWT: For secure authentication.
Getting Started
Prerequisites
Node.js (v14 or higher)
PostgreSQL
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/project-management-api.git
cd project-management-api
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following:

bash
Copy code
JWT_SECRET=your_secret_key
Configure the database:

Ensure PostgreSQL is running and create a database named project_management. Update the database connection details in data-source.ts:

typescript
Copy code
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "your_password",
  database: "project_management",
  synchronize: true,
  logging: true,
  entities: [User, Project, Task],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"]
});
Run migrations:

If you have any migrations, run them using TypeORM CLI:

bash
Copy code
npm run typeorm migration:run
Start the server:

bash
Copy code
npm run dev
The server will start on http://localhost:5000.

API Endpoints
Authentication
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login and receive a JWT token.
Projects
POST /api/projects: Create a new project (requires JWT token).
GET /api/projects: Get a list of all projects for the authenticated user.
PUT /api/projects/
: Update a specific project.
DELETE /api/projects/
: Delete a specific project.
Tasks (Future Implementation)
POST /api/projects/
/tasks: Add a new task to a project.
PUT /api/tasks/
: Update a specific task.
DELETE /api/tasks/
: Delete a specific task.
Error Handling
Errors are returned as JSON objects with the following structure:

json
Copy code
{
  "message": "Error message",
  "error": "Detailed error message"
}
Contribution
Contributions are welcome! Please fork the repository and submit a pull request for any features or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
