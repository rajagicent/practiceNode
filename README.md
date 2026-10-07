# Practice Node API

Express + TypeScript API using an MVP (Model–View–Presenter) structure, with Prisma and PostgreSQL.

## Requirements

- Node.js 20.19 or newer
- PostgreSQL

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set the database URL and a strong JWT secret.
3. Generate Prisma Client with `npm run prisma:generate` (required before type-checking or building).
4. Create and apply the initial database migration with `npm run prisma:migrate -- --name init`.
5. Start the development server with `npm run dev`.

The API listens on port 3000 by default. Visit `GET /api/health` to check its status.

## Scripts

- `npm run dev` — run TypeScript with Nodemon.
- `npm run build` — compile to `dist/`.
- `npm start` — run the compiled server.
- `npm run typecheck` — check TypeScript types.
- `npm run prisma:generate` — generate the Prisma Client.
- `npm run prisma:migrate` — run Prisma's development migration flow.
- `npm run prisma:studio` — open Prisma Studio.

## API routes

- `POST /api/auth/signup` — create an account (`email`, `password`, minimum 8 characters).
- `POST /api/auth/login` — authenticate (`email`, `password`).
- `GET /api/health` — health check.

Authentication responses include a signed JWT and safe user data. Passwords are hashed with bcrypt and are never returned.

## Structure

```text
src/
├── config/         # Prisma client and configuration
├── models/         # Prisma-backed data models
├── middleware/    # Validation and error handling
├── presenters/     # HTTP handlers that coordinate services and views
├── routes/         # API route definitions
├── services/       # Application/business logic
├── utils/          # Shared helpers and errors
├── validators/     # Request validation schemas
├── views/           # JSON response formatting
├── app.ts          # Express app and middleware setup
└── server.ts       # HTTP server lifecycle
prisma/
└── schema.prisma   # Model definitions and database schema
```

In this API, Prisma-backed models provide data access, presenters handle HTTP requests, and views format JSON responses.
