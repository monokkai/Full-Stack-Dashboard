import Employee from "@/app/classes/Employee";
import { Good } from "@/app/classes/Good";
import { User } from "@/app/classes/User";
import { faker, fakerEN } from "@faker-js/faker";

export const userFaker: (quantity: number) => User[] = () => {
  const users: User[] = [];

  for (let i = 0; i < 50; i++) {
    const user: User = new User(
      i,
      fakerEN.internet.username(),
      faker.number.int({ min: 10, max: 100 }),
      faker.internet.email(),
      faker.phone.number()
    );
    users.push(user);
  }

  return users;
};

export const goodFaker: (quantity: number) => Good[] = () => {
  const goods: Good[] = [];

  for (let i = 0; i <= 50; i++) {
    const good: Good = new Good(
      i,
      fakerEN.commerce.productName(),
      faker.number.int({ min: 200, max: 1240 }),
      faker.commerce.productAdjective(),
      faker.number.int({ min: 1, max: 50 }),
      faker.commerce.product()
    );
    goods.push(good);
  }

  return goods;
};

export const employeeFaker: (quantity: number) => Employee[] = () => {
  const employees: Employee[] = [];

  for (let i = 0; i <= 50; i++) {
    const employee: Employee = new Employee(
      i,
      faker.commerce.department(),
      faker.internet.username(),
      faker.phone.number()
    );
    employees.push(employee);
  }

  return employees;
};
