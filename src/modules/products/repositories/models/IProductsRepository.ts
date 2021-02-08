import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO'
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO'
import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  update(data: IUpdateProductDTO): Promise<Product>;
  updateCategory(product_id: string, categoryName: string): Promise<Product>;
  findByName(title:string): Promise<Product | undefined>;
  findByCategory(categoryName:string): Promise<Product[]>;
  listAll(): Promise<Product[]>;

}