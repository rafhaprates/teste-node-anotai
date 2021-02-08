import { getRepository } from 'typeorm'

import Product from '@modules/products/infra/typeorm/entities/Product'

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  title: string;
}

class ListProductsService {

  public async execute({title}:RequestDTO): Promise<Product> {
    const productsRepository = getRepository(Product)

    const product = await productsRepository.findOne({where: {title}})

    if (!product) {
      throw new AppError('Product title does not exist')
    }

    return product
  } 
}

export default ListProductsService;