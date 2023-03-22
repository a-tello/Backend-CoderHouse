import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from './ProductManager.js'

const PORT = 8080
const app = express()
const productManager = new ProductManager('products.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars') 

app.use('/',viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const socketServer = new Server(httpServer)
const arrayProducts = []

socketServer.on('connection', async (socket) => {
    console.log(`${socket.id} connected`)

    const products = await productManager.getProducts()
    socket.emit('showProducts', products)
    
    socket.on('addProduct', async product => {
        await productManager.addProduct(product)
        const updatedProducts = await productManager.getProducts()
        socketServer.emit('showProducts', updatedProducts)
    })

    socket.on('deleteProduct', async (idProduct) => {
        await productManager.deleteProductById(+idProduct)
        const updatedProducts = await productManager.getProducts()
        socketServer.emit('showProducts', updatedProducts)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })

})

