import { getRepository } from 'typeorm'

import Product from '@modules/products/infra/typeorm/entities/Product'

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  id: string;
}

class DeleteProductService {

  public async execute({id}:RequestDTO): Promise<void> {
    const productsRepository = getRepository(Product)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product id does not exist')
    }

    await productsRepository.delete(product)

  } 
}

export default DeleteProductService;