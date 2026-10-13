import "express-session";
import type { User } from "../../generated/prisma";

declare module "express-session" {
  interface SessionData {
    user: User;
    cart: { productId: number; quantity: number }[];
  }
}
