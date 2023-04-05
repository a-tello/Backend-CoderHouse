import { Router } from 'express'
//import ProductManager from '../dao/productManagerFS.js'
import ProductManager from '../dao/productManagerMongo.js'

//const productManager = new ProductManager('products.json')
const productManager = new ProductManager()
const router = Router()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.json({message: 'productos', products})
})


export default router