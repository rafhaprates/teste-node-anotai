import {v4} from 'uuid';

import Category from '@modules/categories/infra/typeorm/entities/Category'

import ICategoriesRepository from '@modules/categories/repositories/models/ICategoriesRepository'


export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = []

  
  public async create(title: string): Promise<Category> {
    const newCategory = new Category();

    Object.assign(newCategory, {title, id: v4() });

    this.categories.push(newCategory);

    return newCategory;
  }

  public async findByName(title:string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.title === title);

    return category;
  }

  public async listAll(): Promise<Category[]> {
    return this.categories;
  }
}