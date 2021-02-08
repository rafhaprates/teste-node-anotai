import 'reflect-metadata';

import AppError from '@shared/errors/AppError'

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

let categoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    categoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const newCategory = await createCategoryService.execute({
      title:'newCategoryTitle',
    });

    expect(newCategory).toHaveProperty('id');
  });

  it('should not be able to create a category with an existing title', async () => {
    await createCategoryService.execute({
      title:'newCategoryTitle',
    });

    await expect(createCategoryService.execute({
      title:'newCategoryTitle',
    })).rejects.toBeInstanceOf(AppError)
  });
})