export interface User {
  id: number;
  username: string;
  displayName: string;
  password: string;
}

export const mockUsers = [
  {
    id: 1,
    username: "user1",
    displayName: "user1@gmail.com",
    password: "password1",
  },
  {
    id: 2,
    username: "user2",
    displayName: "user2@gmail.com",
    password: "password2",
  },
  {
    id: 3,
    username: "user3",
    displayName: "user3@gmail.com",
    password: "password3",
  },
  {
    id: 4,
    username: "user4",
    displayName: "user4@gmail.com",
    password: "password4",
  },
];
