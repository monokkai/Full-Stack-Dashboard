export interface IFullRepository<T> {
  create(item: T): void;
  read(id: number): T | undefined;
  update(id: number, item: Partial<T>): void;
  delete(id: number): void;
  getAll(): T[];
}
