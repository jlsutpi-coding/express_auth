import "express-session";

declare module "express-session" {
  interface SessionData {
    user: { id: number; username: string; password: string };
    cart: { productId: number; quantity: number }[];
  }
}
