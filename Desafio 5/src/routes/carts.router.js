import { Router } from 'express'
//import ProductManager from '../dao/productManagerFS.js'
import CartManager from '../dao/cartManagerMongo.js'

//const productManager = new ProductManager('products.json')
const cartManager = new CartManager()
const router = Router()

router.get('/', async (req, res) => {
    const products = await CartManager.getProducts()
    res.json({message: 'productos', products})
})


export default router