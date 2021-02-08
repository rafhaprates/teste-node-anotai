import {inject, injectable} from 'tsyringe'

import Category from '@modules/categories/infra/typeorm/entities/Category'
import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository'


@injectable()
class ListCategoriesService {

  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.listAll()

    return categories
  } 
}

export default ListCategoriesService;