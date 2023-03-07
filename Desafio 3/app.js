import express from 'express'
import  ProductManager from './ProductManager.js'


const app = express()
const productManager = new ProductManager('products.json')


app.get('/', (req, res) => {
    res.send('Hola')
}
)
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit

    if(!limit) res.send(products)
    res.send(products.slice(0, limit))
})

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params

    res.json(await productManager.getProductById(+pid))
})

app.listen(8080, () => {
    console.log("Escuchando puerto 8080");
})