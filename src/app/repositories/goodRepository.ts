import { Good } from "../classes/Good";
import { IFullRepository } from "..//repositories/Interfaces/IFullRepository";
import { faker, fakerEN } from "@faker-js/faker";

export class GoodRepository implements IFullRepository<Good> {
  private goods: Good[] = [];


  public create(good: Good): void {
    this.goods.push(good);
  }

  public update(id: number, updates: Partial<Good>): void {
    const index = this.goods.findIndex((good) => good.id === id);
    if (index !== -1) {
      this.goods[index] = { ...this.goods[index], ...updates };
    }
  }

  public delete(id: number): void {
    this.goods = this.goods.filter((good) => good.id !== id);
  }

  public getOne(id: number): Good | undefined {
    return this.goods.find((good) => good.id === id);
  }

  public getAll(): Good[] {
    return this.goods;
  }

  generateData: (quantity: number) => void = () => {
    for (let i = 0; i <= 50; i++) {
      const good: Good = new Good(
        i,
        fakerEN.commerce.productName(),
        faker.number.int({ min: 200, max: 1240 }),
        faker.commerce.productAdjective(),
        faker.number.int({ min: 1, max: 50 }),
        faker.commerce.product()
      );
      this.goods.push(good);
    }
  };
}
