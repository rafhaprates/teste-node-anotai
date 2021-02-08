import {Router, Request, Response} from 'express'

import ListProductsService from '@modules/products/services/ListProductsService';

import GetProductByNameService from '@modules/products/services/GetProductByNameService';

import ListProductsByCategoryService from '@modules/products/services/ListProductsByCategoryService';

import CreateProductService from '@modules/products/services/CreateProductService';

import UpdateProductService from '@modules/products/services/UpdateProductService';

import UpdateProductCategoryService from '@modules/products/services/UpdateProductCategoryService';

import DeleteProductService from '@modules/products/services/DeleteProductService';

const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response) => {

  const listProducts = new ListProductsService()

  const products = await listProducts.execute() 

  return res.json(products)
})

productsRouter.get('/by-name', async (req: Request, res: Response) => {

  const {title} = req.body;

  const listProduct = new GetProductByNameService()

  const product = await listProduct.execute({title}) 

  return res.json(product)
})

productsRouter.get('/by-category', async (req: Request, res: Response) => {
  const {categoryName} = req.body;

  const listProducts = new ListProductsByCategoryService()

  const products = await listProducts.execute({categoryName}) 

  return res.json(products)
})

productsRouter.post('/new', async (req: Request, res: Response) => {
  const {title, description, price, categoryName} = req.body;

  const createProduct = new CreateProductService()

  const newProduct = await createProduct.execute({
    title,
    description,
    price,
    categoryName,
  }) 

  return res.json(newProduct)
})

productsRouter.put('/update-category/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  const {categoryName} = req.body;

  const updateCategory = new UpdateProductCategoryService()

  const updatedProduct = await updateCategory.execute({
    product_id: id,
    categoryName,
  }) 

  return res.json(updatedProduct)
})

productsRouter.put('/update/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, description, price} = req.body;

  const updateCategory = new UpdateProductService()

  const updatedProduct = await updateCategory.execute({
    id,
    title, 
    description, 
    price
  }) 

  return res.json(updatedProduct)
})

productsRouter.delete('/delete/:id', async (req: Request, res: Response) => {
  const {id} = req.params;

  const deleteProduct = new DeleteProductService()

  await deleteProduct.execute({
    id
  }) 

  return res.json({message: 'success'})
})

export default productsRouter;