export interface IFullRepository<T> {
  create(item: T): void;
  update(id: number, item: Partial<T>): void;
  delete(id: number): void;
  
  getOne(id: number): T | undefined;
  getAll(): T[];
}
