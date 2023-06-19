import express from 'express'
import handlebars from 'express-handlebars'
import config from './config.js'
import { __dirname } from './utils.js'
import './DAL/mongoDB/dbConfig.js'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'

import { Server } from 'socket.io'
import MessageManager from './DAL/DAO/messagesManagerMongo.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import passport from 'passport'
import cors from 'cors'
import './passport/passportStrategies.js'
import { generateProduct } from './utils/mocks.js'
import { errorMiddleware } from './errors/error.middleware.js'
import { logger } from './winston.js'

const PORT = config.port
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({origin:'localhost:8080',allowedHeaders:true}))

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine(
    {
        helpers:{
            link: (url, variable) => `${url}${variable}`,
            link_purchase: (url, variable) => `${url}${variable}/purchase`
        }
    }))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(
    session({
        secret: 'sessionKey',
        resave: false,
        saveUninitialized: true,
        store: new mongoStore({
            mongoUrl: config.mongo_URI
        })
    })
)
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.redirect('/views/login')
})
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/chat', chatRouter)
app.use('/views', viewsRouter)
app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionsRouter)
app.get('/mockingproducts', (req, res) => {
    try {
        const mockProducts = generateProduct(100)
        res.json({message:'Products created', products: mockProducts})
    } catch (error) {
        throw error
    }
})
app.get('/loggerTest', (req,res) => {
    logger.fatal(`Method: ${req.method} - URL: ${req.url}`)
    logger.error(`Method: ${req.method} - URL: ${req.url}`)
    logger.warning(`Method: ${req.method} - URL: ${req.url}`)
    logger.info(`Method: ${req.method} - URL: ${req.url}`)
    logger.http(`Method: ${req.method} - URL: ${req.url}`)
    logger.debug(`Method: ${req.method} - URL: ${req.url}`)
    res.render('test', {message:'Testeando logger'})
})

app.use(errorMiddleware)

const httpServer = app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
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

    socket.on('userConnected', username => {
        socket.broadcast.emit('alertUserConnected', username)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })

})
