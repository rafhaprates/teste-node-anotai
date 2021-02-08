import {inject, injectable} from 'tsyringe'

import Category from '@modules/categories/infra/typeorm/entities/Category'
import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository'
import AppError from '@shared/errors/AppError'

interface RequestDTO {
  title: string;
}

@injectable()
class CreateCategoryService {

  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ){}

  public async execute({title}:RequestDTO): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findByName(title)

    if (existingCategory) {
      throw new AppError('This Category name already exists.')
    }

    const newCategory = await this.categoriesRepository.create(title)

    return newCategory
  } 
}

export default CreateCategoryService;