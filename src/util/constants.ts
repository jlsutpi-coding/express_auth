export interface User {
  id: number;
  email: string;
  password: string;
}

export const mockUsers = [
  { id: 1, email: "user1@gmail.com", password: "password1" },
  { id: 2, email: "user2@gmail.com", password: "password2" },
  { id: 3, email: "user3@gmail.com", password: "password3" },
  { id: 4, email: "user4@gmail.com", password: "password4" },
];
