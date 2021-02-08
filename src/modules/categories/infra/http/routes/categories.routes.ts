import {Router, Request, Response} from 'express';
import {container} from 'tsyringe';

import ListCategoriesService from '@modules/categories/services/ListCategoriesService';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

const categoriesRouter = Router()


categoriesRouter.get('/', async (req: Request, res: Response) => {

  const listCategories = container.resolve(ListCategoriesService)

  const categories = await listCategories.execute() 

  return res.json(categories)
})

categoriesRouter.post('/new', async (req: Request, res: Response) => {
  const {title} = req.body;

  const createCategory = container.resolve(CreateCategoryService)

  const newCategory = await createCategory.execute({
    title
  }) 

  return res.json(newCategory)
})



export default categoriesRouter;