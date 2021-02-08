import { getRepository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';
import Category from '@modules/categories/infra/typeorm/entities/Category';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import AppError from '@shared/errors/AppError';


class CreateProductService {

  public async execute({categoryName, title, description, price}:ICreateProductDTO): Promise<Product> {
    const productsRepository = getRepository(Product)
    const categoriesRepository = getRepository(Category)

    const category = await categoriesRepository.findOne({where: {title: categoryName}})

    if (!category) {
      throw new AppError('Category name does not exist')
    }

    const newProduct = productsRepository.create({
      title,
      description,
      price,
      category,
    })

    await productsRepository.save(newProduct)

    return newProduct
  } 
}

export default CreateProductService;