import { faker } from "@faker-js/faker";
import { Employee } from "../classes/Employee";
import { IFullRepository } from "../repositories/Interfaces/IFullRepository";

export class EmployeeRepository implements IFullRepository<Employee> {
  private employees: Employee[] = [];

  create(employee: Employee): void {
    this.employees.push(employee);
  }

  getOne(id: number): Employee | undefined {
    return this.employees.find((employee) => employee.id === id);
  }

  update(id: number, updates: Partial<Employee>): void {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...updates };
    }
  }

  delete(id: number): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  getAll(): Employee[] {
    return this.employees;
  }

  generateData: (quantity: number) => void = () => {

    for (let i = 0; i <= 50; i++) {
      const employee: Employee = new Employee(
        i,
        faker.commerce.department(),
        faker.internet.username(),
        faker.phone.number()
      );
      this.employees.push(employee);
    }
  };
}
