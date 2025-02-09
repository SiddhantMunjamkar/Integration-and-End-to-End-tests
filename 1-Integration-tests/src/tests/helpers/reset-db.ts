import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function resetDB() {
  prismaClient.request.deleteMany({});
}
