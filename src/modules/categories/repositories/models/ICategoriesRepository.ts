import Category from '@modules/categories/infra/typeorm/entities/Category';

export default interface IProductRepository {
  create(title: string): Promise<Category>;
  listAll(): Promise<Category[]>;
  findByName(title:string): Promise<Category | undefined> ;
}