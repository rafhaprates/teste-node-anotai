import { getRepository, Repository } from 'typeorm'

import Category from '@modules/categories/infra/typeorm/entities/Category'

import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository'


export default class CategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = getRepository(Category)
  }

  public async create(title: string): Promise<Category> {
    const newCategory = this.categoriesRepository.create({
      title,
    })

    await this.categoriesRepository.save(newCategory);

    return newCategory;
  }

  public async findByName(title: string): Promise<Category | undefined> {
    const category = await this.categoriesRepository.findOne({where: {title}});

    return category
  }

  public async listAll(): Promise<Category[]> {
    return this.categoriesRepository.find()
  }
}