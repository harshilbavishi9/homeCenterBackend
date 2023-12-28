import express, { Router } from 'express';
import ProductController from '../controller/productController'
import { isAuthenticatedUser } from '../middleware/auth';
import { multiUpload } from '../utils/multer';
import { searchMiddleware } from '../middleware/search';
import { paginationMiddleware } from '../middleware/page';
import { filterMiddleware } from '../middleware/filterProduct';
const router: Router = express.Router();
const Controller = new ProductController()

router.post('/create', isAuthenticatedUser, multiUpload, Controller.createProduct)

router.get('/all',
  paginationMiddleware,
  searchMiddleware,
  filterMiddleware, Controller.getAllProduct)

// router.get('/all', Controller.getAllProduct)


router.get('/single/:id', Controller.getProduct)

router.put('/:id', multiUpload, Controller.updateProduct)

router.delete('/:id', Controller.deleteProduct)



export default router;