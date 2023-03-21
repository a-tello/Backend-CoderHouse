import express from 'express'
import { __dirname } from './utils.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public' ))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
