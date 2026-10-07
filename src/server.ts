import { app } from "./app.js";
import { prisma } from "./config/prisma.js";

const port = Number(process.env.PORT ?? 3000);
const server = app.listen(port, () => {
  console.info(`API server listening on port ${port}`);
});

async function shutdown(signal: string): Promise<void> {
  console.info(`${signal} received; shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
