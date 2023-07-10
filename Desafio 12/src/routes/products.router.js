import { addOneProduct, deleteOneProduct, getAllProducts, getOneProductById, updatedOneProduct } from '../controllers/products.controller.js'
import { Router } from 'express'
import { verifyTokenAdmin, verifyTokenPremium, verifyTokenPremiumOrAdmin } from '../middleware/jwt.middleware.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/:pid', getOneProductById)
router.post('/', verifyTokenPremiumOrAdmin, addOneProduct)
router.put('/:pid', verifyTokenAdmin, updatedOneProduct)
router.delete('/:pid', verifyTokenPremiumOrAdmin, deleteOneProduct)

export default router