import express from 'express'
import productsRouter from './routes/products.router'
import cartsRouter from './routes/carts.router.js'

const app = express()

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)

app.listen(8080, () => {
    console.log('Listen 8080');
})
