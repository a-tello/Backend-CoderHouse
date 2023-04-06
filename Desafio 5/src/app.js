import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import './db/dbConfig.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import { Server } from 'socket.io'
import MessageManager from './dao/messagesManagerMongo.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/chat', chatRouter)



const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

const socketServer = new Server(httpServer)
const messageManager = new MessageManager()

socketServer.on('connection', async (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('message', async info => {
        await messageManager.addMessage(info)
        const updatedMessages = await messageManager.getMessages()
        socketServer.emit('chat', updatedMessages)
    })
    /* const products = await productManager.getProducts()
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
    }) */

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })

})
