import { Good } from "./Good";

export class User {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public phone: string,
    public email: string,
    public goods: Good[] = []
  ) {}
}
