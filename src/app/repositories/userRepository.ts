import { User } from "../classes/User";
import { IFullRepository } from "../repositories/Interfaces/IFullRepository";
import { userFaker } from "./functions/faker";

export class UserRepository implements IFullRepository<User> {
  private users: User[] = [];

  constructor() {
    userFaker(50);
  }

  create(user: User): void {
    this.users.push(user);
  }

  read(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updates: Partial<User>): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
    }
  }

  delete(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getAll(): User[] {
    return this.users;
  }
}
