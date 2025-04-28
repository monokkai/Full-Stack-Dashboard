import { User } from "./User";

export class Employee {
  public id: number;
  public position: string;
  public name: string;
  public phone: string;
  public readonly users: User[] = [];

  constructor(
    id: number,
    position: string,
    name: string,
    phone: string,
  ) {
    this.id = id;
    this.position = position;
    this.name = name;
    this.phone = phone;
  }
}

export default Employee;
