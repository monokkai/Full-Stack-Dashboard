import { faker, fakerEN } from "@faker-js/faker";
import { User } from "../classes/User";
import { IFullRepository } from "../repositories/Interfaces/IFullRepository";

export class UserRepository implements IFullRepository<User> {
  private users: User[] = [];

  create(user: User): void {
    this.users.push(user);
  }

  getOne(id: number): User | undefined {
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

  generateData: (quantity: number) => void = () => {
    let listOfCities: string[] = [];
    const cities: number = 5;
    let j: number = 0;
    while (j < cities) {
      listOfCities.push(faker.location.city());
      j++;
    }

    for (let i = 0; i < 50; i++) {
      const user: User = new User(
        i,
        fakerEN.internet.username(),
        faker.number.int({ min: 10, max: 100 }),
        faker.phone.number(),
        faker.internet.email(),
        [],
        listOfCities[getRandomInt(0, 4)],
        faker.date.birthdate()
      );
      this.users.push(user);
    }
  };
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
