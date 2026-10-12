// types/express.d.ts
import type { User as PrismaUser } from "../generated/prisma";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

export {};
