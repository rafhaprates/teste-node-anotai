import { getRepository } from 'typeorm'

import Product from '@modules/products/infra/typeorm/entities/Product'

import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO'

import AppError from '@shared/errors/AppError';

class UpdateProductService {

  public async execute({id, title, description, price}:IUpdateProductDTO): Promise<Product> {
    const productsRepository = getRepository(Product)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product id does not exist')
    }

    Object.assign(product, {
      title: title || product.title,
      description: description || product.description,
      price: price || product.price
    })

    await productsRepository.save(product)

    return product
  } 
}

export default UpdateProductService;