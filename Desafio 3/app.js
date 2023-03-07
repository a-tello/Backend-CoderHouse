import express from 'express'
import  ProductManager from './ProductManager.js'

const app = express()
const productManager = new ProductManager('products.json')

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    const {limit} = req.query

    if(!limit) return res.status(200).json(products)
    res.status(200).json(products.slice(0, limit))
})

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params
        
    try {
        const product = await productManager.getProductById(+pid) 
        res.status(200).json(product)
    } catch(error) {
        res.status(400).json({error: error.message})
    } 
})

app.listen(8080, () => {
    console.log("Escuchando puerto 8080");
})