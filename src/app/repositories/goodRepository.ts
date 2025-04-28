import { Good } from "../classes/Good";
import { IFullRepository } from "..//repositories/Interfaces/IFullRepository";
import { goodFaker } from "./functions/faker";

export class GoodRepository implements IFullRepository<Good> {
  private goods: Good[] = [];

  constructor() {
    goodFaker(50);
  }

  create(good: Good): void {
    this.goods.push(good);
  }

  read(id: number): Good | undefined {
    return this.goods.find((good) => good.id === id);
  }

  update(id: number, updates: Partial<Good>): void {
    const index = this.goods.findIndex((good) => good.id === id);
    if (index !== -1) {
      this.goods[index] = { ...this.goods[index], ...updates };
    }
  }

  delete(id: number): void {
    this.goods = this.goods.filter((good) => good.id !== id);
  }

  getAll(): Good[] {
    return this.goods;
  }
}
