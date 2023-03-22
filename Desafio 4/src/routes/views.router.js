import { Router } from "express"
import ProductManager from '../ProductManager.js'


const router = Router()
const productManager = new ProductManager('products.json')


router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    /* const product = {
        "id": 4,
        "title": "Smart Tv 39 pulgadas",
        "description": "Smart Tv Noblex 39 Pulgadas Db39x7000 Hd Android Tv",
        "price": 58500,
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_807983-MLA53145382859_012023-O.webp",
        "code": "elec003",
        "stock": 50
    } */
    console.log(products);
    res.render('home', {products})     
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')     
})

export default router