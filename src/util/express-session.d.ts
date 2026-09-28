import "express-session";

declare module "express-session" {
  interface SessionData {
    user: User;
    cart: { productId: number; quantity: number }[];
  }
}
