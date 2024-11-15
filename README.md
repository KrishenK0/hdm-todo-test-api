# Introduction
This repository contains the backend code for the **HDM Todo List** project. The goal of this project is to implement a todo list using React for the backend and NestJS for the backend. Tasks are stored in an external MySQL database, which communicates with the backend through the **Prisma ORM**.

## Backend Implementation
Each controller for the backend is implemented within `TaskController`, which handles multiple actions such as GET, POST, PATCH, and DELETE. Each controller corresponds to a specific **CRUD** action on the database.

## Select
To retrieve the list of tasks, perform a **GET** request to the API. The request is intercepted by the `getAll()` method and handled by the `GetAllTasksUseCase` class. It performs a SELECT query on the database using the `TaskRepository` class, specifically with the method `this.prisma.task.findMany()`.

## Delete
To delete a task, perform a **DELETE** request to the API endpoint. The request is handled by the `DeleteTask` class, which was already implemented. This class performs a delete operation on the table using Prisma and the ID provided in the request body.

## Create
To create a task, send a **POST** request with the task parameters (name, progress, etc.) in the request body. The `SaveTaskUseCase` class will handle this request. `SaveTaskUseCase` has two roles: creating new tasks and updating existing ones. First, it validates the values (e.g., name must not be null or too long). Then, it saves the data using `TaskRepository`. If the provided **ID** is null, it creates a new task, if an ID is present, it updates the existing task with that ID.

## Update
To update a task, send a **PATCH** request with the task parameters in the request body (make sure to include the ID, or it will create a new task). `SaveTaskUseCase` handles this request. Through the save method in `TaskRepository` using **Prisma**, it updates the specified row in the database based on the provided ID.

# Choices and Decisions
## Git
To provide a clearer view of each implementation step, I structured commits such that each commit represents one specific implementation. This approach allows for easier comprehension of the work done and provides context for each change. Additionally, this approach simplifies code review and debugging for external reviewers.

## Bonus
I decided to add a "progress" attribute for tasks, which required adding a new field in the database. I modified the schema and then executed the command `npx prisma migrate dev` to apply the updated schema to the database.

## Dependencies
For simplicity, I chose not to add new dependencies to the project, as the required implementations were straightforward. Fewer dependencies reduce the amount of code to debug, improve security, and typically increase performance.

# Challenges and Solutions
## Database
Since the database was external, I used **Docker** to deploy a **MySQL** instance. However, the provided Dockerfile was configured for a Linux environment. I modified the line `RUN cp /usr/share/zoneinfo/Europe/Brussels /etc/localtime` to `ENV TZ=Europe/Brussels` to make it compatible with Windows, which was the environment I used for development.

Author: Antoine