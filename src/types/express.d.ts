//
// This file is used to extend the Express namespace with a custom User interface.
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      password: string;
    }
  }
}

export {};
