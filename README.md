# To-Do List REST API Server with Hapi.js

## Overview

This project is a simple REST API server built using JavaScript and Node.js with the Hapi.js framework. The primary purpose is to manage a to-do list, offering basic CRUD operations and additional features like filtering, sorting, and authentication.

## Features

- **List To-Do Items:** Retrieve to-do list items with optional filters and sorting.
- **Add To-Do Item:** Create a new to-do item with a unique identifier, description, and creation date.
- **Edit To-Do Item:** Modify the description or mark an item as complete, with validation checks.
- **Remove To-Do Item:** Delete a to-do item from the list.
- **Documentation:** Auto-generated API documentation using hapi-swagger.
- **Validation:** Input and output validation using Joi.
- **Database:** PostgreSQL with Knex.js query builder.
- **Async Operations:** Utilizes async/await for handling asynchronous operations.
- **ESLint Integration:** ESLint and Hapi.js plugin for code consistency.
- **User Authentication:** Manage to-do lists for multiple users.
- **JWT Integration:** Utilizes Hapi.js jwt for authentication.
- **Login/Sign Route:** Authenticate users.

## REST API Routes

- `POST /todos`: Add a to-do item.
- `GET /todos?filter=<STATE>&orderBy=<FIELD>`: List to-do items with optional filters and sorting.
- `PATCH /todo/{id}`: Edit a to-do item.
- `DELETE /todo/{id}`: Remove a to-do item.

### Authentication Routes

- `POST /login`: Authenticate a user and return a JWT token.
- `POST /users`: Create a new user account, optionally returning a JWT token.

## Technologies

- Node.js
- Hapi.js framework
- PostgreSQL with Knex.js
- Joi for validation
- hapi-swagger for documentation
