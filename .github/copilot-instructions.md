# Project instructions

- Use strict TypeScript and keep application logic in `src/services`.
- Keep Prisma-backed data access in `src/models` and HTTP handling in `src/presenters`.
- Validate all incoming request bodies with Zod schemas in `src/validators`.
- Use Prisma for persistence; update `prisma/schema.prisma` before changing database models.
- Never return password hashes or commit `.env` files/secrets.
- Keep API responses and errors consistent with the existing middleware conventions.
