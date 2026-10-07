//
// This file is used to extend the Express namespace with a custom User interface.
declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      displayName: string | null;
      password: string;
    }
  }
}

export {};
