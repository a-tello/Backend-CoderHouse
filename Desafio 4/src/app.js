import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import homeRouter from './routes/home.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars') 

app.use('/realtimeproducts',viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', () => {
    console.log('Cliente conectado');
})