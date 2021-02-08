import { getRepository } from 'typeorm'

import Product from '@modules/products/infra/typeorm/entities/Product'
import Category from '@modules/categories/infra/typeorm/entities/Category'

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  product_id: string;
  categoryName: string;
}

class UpdateProductCategoryService {

  public async execute({categoryName, product_id}:RequestDTO): Promise<Product> {
    const productsRepository = getRepository(Product)
    const categoriesRepository = getRepository(Category)

    const category = await categoriesRepository.findOne({where: {title: categoryName}})

    if (!category) {
      throw new AppError('Category name does not exist')
    }

    const product = await productsRepository.findOne({where: {id: product_id}})

    if (!product) {
      throw new AppError('Product id does not exist')
    }

    Object.assign(product, {category})

    await productsRepository.save(product)

    return product
  } 
}

export default UpdateProductCategoryService;