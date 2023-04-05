import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import './db/dbConfig.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

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



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})