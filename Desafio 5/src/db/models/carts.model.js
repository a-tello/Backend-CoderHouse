import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {type: String},
            quantity: {type: Number}
        }
    ]
})

export const cartsModel = mongoose.model('carts', cartsSchema)