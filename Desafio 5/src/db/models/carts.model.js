import mongoose, { Schema } from 'mongoose'

const cartsSchema = new mongoose.Schema({
    products: {
        default: []
    }
})

export const cartsModel = mongoose.model('carts', cartsSchema)