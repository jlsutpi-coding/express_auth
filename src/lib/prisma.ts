import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

export { prisma };
async function main() {
  // Your new model or field should auto-complete here
  const result = await prisma.user.findMany({
    where: { password: { contains: "John" } },
  });
  console.log(result);
}
