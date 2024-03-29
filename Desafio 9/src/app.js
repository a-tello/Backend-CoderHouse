import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import './DAL/dbConfig.js'
import config from './config.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import { Server } from 'socket.io'
import MessageManager from './DAL/messagesManagerMongo.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import './passport/passportStrategies.js'
import passport from 'passport'

const PORT = config.port
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


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

 
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

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

    socket.on('userConnected', username => {
        socket.broadcast.emit('alertUserConnected', username)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })

})
