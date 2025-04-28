import { Employee } from "../classes/Employee";
import { IFullRepository } from "../repositories/Interfaces/IFullRepository";
import { employeeFaker } from "./functions/faker";

export class EmployeeRepository implements IFullRepository<Employee> {
  private employees: Employee[] = [];

  constructor() {
    employeeFaker(50);
  }

  create(employee: Employee): void {
    this.employees.push(employee);
  }

  read(id: number): Employee | undefined {
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
}
