import { getRepository } from 'typeorm'

import Product from '@modules/products/infra/typeorm/entities/Product'
import Category from '@modules/categories/infra/typeorm/entities/Category'

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  categoryName: string;
}

class ListProductsByCategoryService {

  public async execute({categoryName}:RequestDTO): Promise<Product[]> {
    const productsRepository = getRepository(Product)
    const categoriesRepository = getRepository(Category)

    const category = await categoriesRepository.findOne({where: {title: categoryName}})

    if (!category) {
      throw new AppError('Category name does not exist')
    }

    const products = await productsRepository.find({where: {category_id: category.id}})

    if (!products.length) {
      throw new AppError('There is no product for that category')
    }

    return products
  } 
}

export default ListProductsByCategoryService;